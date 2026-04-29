import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide badge name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide badge description'],
  },
  icon: {
    type: String,
    default: '🏆',
  },
  category: {
    type: String,
    enum: ['skill', 'teaching', 'learning', 'community', 'milestone'],
    default: 'milestone',
  },
  criteria: {
    type: String,
    required: true,
  },
  requiredValue: {
    type: Number,
    default: 1,
  },
  color: {
    type: String,
    default: '#2a7de1',
  },
}, { timestamps: true });

// Static method to initialize default badges
badgeSchema.statics.initDefaultBadges = async function() {
  const defaultBadges = [
    {
      name: 'First Connection',
      description: 'Made your first connection on SkillBridge',
      icon: '🤝',
      category: 'milestone',
      criteria: 'connections',
      requiredValue: 1,
      color: '#4CAF50',
    },
    {
      name: 'Skill Sharer',
      description: 'Shared your first skill with the community',
      icon: '📚',
      category: 'teaching',
      criteria: 'skills_shared',
      requiredValue: 1,
      color: '#2196F3',
    },
    {
      name: 'Quick Learner',
      description: 'Started learning a new skill',
      icon: '📖',
      category: 'learning',
      criteria: 'learning_started',
      requiredValue: 1,
      color: '#FF9800',
    },
    {
      name: 'Community Builder',
      description: 'Connected with 5 different users',
      icon: '🌟',
      category: 'community',
      criteria: 'connections',
      requiredValue: 5,
      color: '#9C27B0',
    },
    {
      name: 'Skill Master',
      description: 'Added 5 or more skills to your profile',
      icon: '🎓',
      category: 'skill',
      criteria: 'skills_count',
      requiredValue: 5,
      color: '#E91E63',
    },
    {
      name: 'Active Learner',
      description: 'Started learning 3 different skills',
      icon: '🧠',
      category: 'learning',
      criteria: 'learning_count',
      requiredValue: 3,
      color: '#00BCD4',
    },
    {
      name: 'Mentor',
      description: 'Helped 3 different users learn',
      icon: '👨‍🏫',
      category: 'teaching',
      criteria: 'students_helped',
      requiredValue: 3,
      color: '#795548',
    },
    {
      name: 'Top Contributor',
      description: 'Made 10 skill exchanges',
      icon: '🏅',
      category: 'milestone',
      criteria: 'exchanges',
      requiredValue: 10,
      color: '#FFD700',
    },
  ];

  for (const badge of defaultBadges) {
    await this.findOneAndUpdate(
      { name: badge.name },
      badge,
      { upsert: true, new: true }
    );
  }
};

const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;