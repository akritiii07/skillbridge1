import SkillExchange from '../models/SkillExchange.js';
import User from '../models/User.js';

// Create a new skill exchange
export const createSkillExchange = async (req, res) => {
  try {
    const { teacherId, skill, notes } = req.body;

    if (!teacherId || !skill) {
      return res.status(400).json({ success: false, message: 'Please provide teacher ID and skill' });
    }

    // Check if teacher exists
    const teacher = await User.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' });
    }

    // Check if exchange already exists
    const existingExchange = await SkillExchange.findOne({
      teacher: teacherId,
      learner: req.userId,
      skill: { $regex: skill, $options: 'i' },
      status: { $in: ['pending', 'active'] },
    });

    if (existingExchange) {
      return res.status(400).json({ success: false, message: 'Skill exchange already exists' });
    }

    // Create exchange
    const exchange = await SkillExchange.create({
      teacher: teacherId,
      learner: req.userId,
      skill,
      notes: notes || '',
    });

    res.status(201).json({
      success: true,
      message: 'Skill exchange created successfully',
      exchange,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get my skill exchanges (as teacher and learner)
export const getMyExchanges = async (req, res) => {
  try {
    const { role, status } = req.query;

    let query = {
      $or: [
        { teacher: req.userId },
        { learner: req.userId },
      ],
    };

    if (role === 'teacher') {
      query = { teacher: req.userId };
    } else if (role === 'learner') {
      query = { learner: req.userId };
    }

    if (status) {
      query.status = status;
    }

    const exchanges = await SkillExchange.find(query)
      .populate('teacher', 'name college location profileImage')
      .populate('learner', 'name college location profileImage')
      .sort({ updatedAt: -1 });

    // Separate by role
    const asTeacher = exchanges.filter(e => e.teacher._id.toString() === req.userId.toString());
    const asLearner = exchanges.filter(e => e.learner._id.toString() === req.userId.toString());

    res.status(200).json({
      success: true,
      exchanges: {
        asTeacher,
        asLearner,
        all: exchanges,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update exchange status
export const updateExchangeStatus = async (req, res) => {
  try {
    const { exchangeId } = req.params;
    const { status, progress, notes } = req.body;

    const exchange = await SkillExchange.findById(exchangeId);

    if (!exchange) {
      return res.status(404).json({ success: false, message: 'Exchange not found' });
    }

    // Check if user is part of this exchange
    if (exchange.teacher.toString() !== req.userId.toString() && 
        exchange.learner.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (status) exchange.status = status;
    if (progress !== undefined) exchange.progress = progress;
    if (notes !== undefined) exchange.notes = notes;

    if (status === 'completed') {
      exchange.endDate = new Date();
      
      // Update user skill exchanges count
      await User.findByIdAndUpdate(exchange.teacher, {
        $inc: { skillExchanges: 1 },
      });
      await User.findByIdAndUpdate(exchange.learner, {
        $inc: { skillExchanges: 1 },
      });
    }

    await exchange.save();

    res.status(200).json({
      success: true,
      message: 'Exchange updated successfully',
      exchange,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add feedback to exchange
export const addFeedback = async (req, res) => {
  try {
    const { exchangeId } = req.params;
    const { rating, comment, role } = req.body;

    if (!rating || !role) {
      return res.status(400).json({ success: false, message: 'Please provide rating and role' });
    }

    const exchange = await SkillExchange.findById(exchangeId);

    if (!exchange) {
      return res.status(404).json({ success: false, message: 'Exchange not found' });
    }

    // Check if user is part of this exchange
    if (exchange.teacher.toString() !== req.userId.toString() && 
        exchange.learner.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Add feedback based on role
    if (role === 'teacher') {
      if (exchange.teacher.toString() !== req.userId.toString()) {
        return res.status(403).json({ success: false, message: 'You are not the teacher of this exchange' });
      }
      exchange.feedback.teacherRating = rating;
      if (comment) exchange.feedback.teacherComment = comment;
    } else if (role === 'learner') {
      if (exchange.learner.toString() !== req.userId.toString()) {
        return res.status(403).json({ success: false, message: 'You are not the learner of this exchange' });
      }
      exchange.feedback.learnerRating = rating;
      if (comment) exchange.feedback.learnerComment = comment;
    }

    await exchange.save();

    // Update teacher rating
    const teacherExchanges = await SkillExchange.find({ 
      teacher: exchange.teacher,
      'feedback.teacherRating': { $exists: true },
    });
    
    if (teacherExchanges.length > 0) {
      const avgRating = teacherExchanges.reduce((sum, e) => sum + e.feedback.teacherRating, 0) / teacherExchanges.length;
      await User.findByIdAndUpdate(exchange.teacher, { rating: Math.round(avgRating * 10) / 10 });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback added successfully',
      exchange,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get exchange by ID
export const getExchangeById = async (req, res) => {
  try {
    const { exchangeId } = req.params;

    const exchange = await SkillExchange.findById(exchangeId)
      .populate('teacher', 'name college location profileImage skills')
      .populate('learner', 'name college location profileImage skills');

    if (!exchange) {
      return res.status(404).json({ success: false, message: 'Exchange not found' });
    }

    // Check if user is part of this exchange
    if (exchange.teacher._id.toString() !== req.userId.toString() && 
        exchange.learner._id.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      exchange,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};