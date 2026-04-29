import User from '../models/User.js';
import Connection from '../models/Connection.js';

// Send connection request
export const sendConnectionRequest = async (req, res) => {
  try {
    const { recipientId, message, skillToTeach, skillToLearn } = req.body;

    if (!recipientId) {
      return res.status(400).json({ success: false, message: 'Please provide recipient ID' });
    }

    // Check if trying to connect to self
    if (recipientId === req.userId.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot connect to yourself' });
    }

    // Check if recipient exists
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if connection already exists
    const existingConnection = await Connection.checkConnection(req.userId, recipientId);
    if (existingConnection) {
      return res.status(400).json({ success: false, message: 'Connection request already exists' });
    }

    // Create connection request
    const connection = await Connection.create({
      requester: req.userId,
      recipient: recipientId,
      message: message || '',
      skillToTeach: skillToTeach || '',
      skillToLearn: skillToLearn || '',
    });

    res.status(201).json({
      success: true,
      message: 'Connection request sent successfully',
      connection,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Accept connection request
export const acceptConnection = async (req, res) => {
  try {
    const { connectionId } = req.params;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return res.status(404).json({ success: false, message: 'Connection not found' });
    }

    // Check if user is the recipient
    if (connection.recipient.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to accept this request' });
    }

    if (connection.status !== 'pending') {
      return res.status(400).json({ success: false, message: 'Connection request is not pending' });
    }

    // Update connection status
    connection.status = 'accepted';
    await connection.save();

    // Update user connections count
    await User.findByIdAndUpdate(connection.requester, {
      $inc: { totalConnections: 1 },
      $addToSet: { connections: connection.recipient },
    });

    await User.findByIdAndUpdate(connection.recipient, {
      $inc: { totalConnections: 1 },
      $addToSet: { connections: connection.requester },
    });

    res.status(200).json({
      success: true,
      message: 'Connection accepted successfully',
      connection,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reject connection request
export const rejectConnection = async (req, res) => {
  try {
    const { connectionId } = req.params;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return res.status(404).json({ success: false, message: 'Connection not found' });
    }

    // Check if user is the recipient
    if (connection.recipient.toString() !== req.userId.toString() && 
        connection.requester.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    connection.status = 'rejected';
    await connection.save();

    res.status(200).json({
      success: true,
      message: 'Connection rejected',
      connection,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all connections for current user
export const getMyConnections = async (req, res) => {
  try {
    const { status } = req.query;

    const query = {
      $or: [
        { requester: req.userId },
        { recipient: req.userId },
      ],
    };

    if (status) {
      query.status = status;
    }

    const connections = await Connection.find(query)
      .populate('requester', 'name college location skills profileImage badges rating')
      .populate('recipient', 'name college location skills profileImage badges rating')
      .sort({ updatedAt: -1 });

    // Separate pending requests (sent and received)
    const pendingSent = connections.filter(
      c => c.status === 'pending' && c.requester._id.toString() === req.userId.toString()
    );
    const pendingReceived = connections.filter(
      c => c.status === 'pending' && c.recipient._id.toString() === req.userId.toString()
    );
    const accepted = connections.filter(c => c.status === 'accepted');

    res.status(200).json({
      success: true,
      connections: {
        pendingSent,
        pendingReceived,
        accepted,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get pending connection requests
export const getPendingRequests = async (req, res) => {
  try {
    const connections = await Connection.find({
      recipient: req.userId,
      status: 'pending',
    })
      .populate('requester', 'name college location skills learningGoals profileImage badges rating')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: connections.length,
      requests: connections,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove connection
export const removeConnection = async (req, res) => {
  try {
    const { connectionId } = req.params;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return res.status(404).json({ success: false, message: 'Connection not found' });
    }

    // Check if user is part of this connection
    if (connection.requester.toString() !== req.userId.toString() && 
        connection.recipient.toString() !== req.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Update user connections count
    const otherUserId = connection.requester.toString() === req.userId.toString() 
      ? connection.recipient 
      : connection.requester;

    await User.findByIdAndUpdate(req.userId, {
      $inc: { totalConnections: -1 },
      $pull: { connections: otherUserId },
    });

    await User.findByIdAndUpdate(otherUserId, {
      $inc: { totalConnections: -1 },
      $pull: { connections: req.userId },
    });

    await connection.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Connection removed successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};