import mongoose from 'mongoose';

const skillExchangeSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'cancelled'],
    default: 'pending',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot be more than 1000 characters'],
  },
  feedback: {
    teacherRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    teacherComment: {
      type: String,
      maxlength: [500, 'Comment cannot be more than 500 characters'],
    },
    learnerRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    learnerComment: {
      type: String,
      maxlength: [500, 'Comment cannot be more than 500 characters'],
    },
  },
}, { timestamps: true });

// Index for efficient queries
skillExchangeSchema.index({ teacher: 1, status: 1 });
skillExchangeSchema.index({ learner: 1, status: 1 });
skillExchangeSchema.index({ teacher: 1, learner: 1 });

const SkillExchange = mongoose.model('SkillExchange', skillExchangeSchema);

export default SkillExchange;