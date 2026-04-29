import User from "../models/User.js";
import Badge from "../models/Badge.js";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// Assign badges
const assignBadges = async (user) => {
  const badges = await Badge.find({});
  const newBadges = [];

  for (const badge of badges) {
    if (user.badges.includes(badge._id)) continue;

    let shouldAssign = false;

    switch (badge.criteria) {
      case "connections":
        shouldAssign = user.totalConnections >= badge.requiredValue;
        break;
      case "skills_count":
        shouldAssign = user.skills.length >= badge.requiredValue;
        break;
      case "learning_count":
        shouldAssign = user.learningGoals.length >= badge.requiredValue;
        break;
      case "exchanges":
        shouldAssign = user.skillExchanges >= badge.requiredValue;
        break;
      default:
        break;
    }

    if (shouldAssign) newBadges.push(badge._id);
  }

  if (newBadges.length > 0) {
    user.badges = [...user.badges, ...newBadges];
    await user.save();
  }

  return newBadges;
};

// SIGNUP
export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      college,
      location,
      skills,
      learningGoals,
      teachSkills,
      learnSkills,
      interests,
      availability,
      bio,
      phone,
      profileImage,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    user = await User.create({
      name,
      email,
      password,

      college: college || "",
      location: location || "",
      bio: bio || "",
      phone: phone || "",
      profileImage: profileImage || "",
      availability: availability || "Online",

      teachSkills: teachSkills || [],
      learnSkills: learnSkills || [],

      skills: (skills || teachSkills || []).map((item) =>
        typeof item === "string"
          ? { name: item, proficiency: "Intermediate" }
          : item
      ),

      learningGoals: (learningGoals || learnSkills || []).map((item) =>
        typeof item === "string" ? { name: item } : item
      ),

      interests: interests || [],
    });

    await Badge.initDefaultBadges();
    await assignBadges(user);

    const token = generateToken(user._id);

    user.lastActive = new Date();
    await user.save();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        location: user.location,
        bio: user.bio,
        phone: user.phone,
        profileImage: user.profileImage,
        availability: user.availability,
        skills: user.skills,
        learningGoals: user.learningGoals,
        teachSkills: user.teachSkills,
        learnSkills: user.learnSkills,
        interests: user.interests,
        badges: user.badges,
        rating: user.rating,
        totalConnections: user.totalConnections,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    user.lastActive = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      token,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("badges");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    Object.assign(user, req.body);

    await user.save();
    await assignBadges(user);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET USER BY ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("badges");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};