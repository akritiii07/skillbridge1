import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'blocked'],
    default: 'pending',
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot be more than 500 characters'],
  },
  skillToTeach: {
    type: String,
  },
  skillToLearn: {
    type: String,
  },
}, { timestamps: true });

// Index for efficient queries
connectionSchema.index({ requester: 1, recipient: 1 }, { unique: true });
connectionSchema.index({ recipient: 1, status: 1 });
connectionSchema.index({ requester: 1, status: 1 });

// Static method to check if connection exists
connectionSchema.statics.checkConnection = async function(userId1, userId2) {
  const connection = await this.findOne({
    $or: [
      { requester: userId1, recipient: userId2 },
      { requester: userId2, recipient: userId1 },
    ],
    status: { $in: ['pending', 'accepted'] },
  });
  return connection;
};

const Connection = mongoose.model('Connection', connectionSchema);

export default Connection;