import User from '../models/User.js';
import Connection from '../models/Connection.js';

// Get all users with filters
export const getAllUsers = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      skill, 
      college,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    const query = { isActive: true };

    // Search by name, email, or college
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } },
        { 'skills.name': { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by skill
    if (skill) {
      query['skills.name'] = { $regex: skill, $options: 'i' };
    }

    // Filter by college
    if (college) {
      query.college = { $regex: college, $options: 'i' };
    }

    // Sort options
    const sort = { [sortBy]: order === 'asc' ? 1 : -1 };

    const users = await User.find(query)
      .select('-password')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('badges');

    const total = await User.countDocuments(query);

    res.status(200).json({
      success: true,
      users,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get users with specific skills (for skill matching)
export const getUsersBySkill = async (req, res) => {
  try {
    const { skill, proficiency } = req.query;

    if (!skill) {
      return res.status(400).json({ success: false, message: 'Please provide a skill name' });
    }

    const query = { 
      isActive: true,
      'skills.name': { $regex: skill, $options: 'i' }
    };

    if (proficiency) {
      query['skills.proficiency'] = proficiency;
    }

    const users = await User.find(query)
      .select('name college location skills learningGoals profileImage badges rating')
      .limit(50)
      .populate('badges');

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get recommended users based on skill matching
export const getRecommendedUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.userId);
    
    if (!currentUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get skills the current user wants to learn
    const learningSkills = currentUser.learningGoals.map(g => g.name.toLowerCase());
    
    // Find users who can teach those skills
    const query = {
      isActive: true,
      _id: { $ne: currentUser._id },
      $or: [
        { 'skills.name': { $in: learningSkills } },
        { 'learningGoals.name': { $in: currentUser.skills.map(s => s.name) } },
      ],
    };

    const recommended = await User.find(query)
      .select('name college location skills learningGoals profileImage badges rating totalConnections')
      .limit(20)
      .populate('badges');

    res.status(200).json({
      success: true,
      count: recommended.length,
      users: recommended,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get trending skills
export const getTrendingSkills = async (req, res) => {
  try {
    const skillsAggregation = await User.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$skills' },
      { $group: { _id: '$skills.name', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 },
    ]);

    const trendingSkills = skillsAggregation.map(s => ({
      name: s._id,
      count: s.count,
    }));

    res.status(200).json({
      success: true,
      trendingSkills,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get dashboard stats
export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isActive: true });
    const totalSkills = await User.aggregate([
      { $match: { isActive: true } },
      { $unwind: '$skills' },
      { $group: { _id: '$skills.name' } },
      { $count: 'uniqueSkills' },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalSkills: totalSkills[0]?.uniqueSkills || 0,
        activeConnections: await Connection.countDocuments({ status: 'accepted' }),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};