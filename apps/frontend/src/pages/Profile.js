import React from "react";
import "../style.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const rewards = [
    "🥇 First Skill Exchange",
    "🔥 Active Learner",
    "🤝 Community Helper",
    "⭐ Top Rated Mentor",
    "🎯 7 Day Streak",
  ];

  const certifications = [
    "Python Basics Certificate",
    "React Fundamentals",
    "Communication Skills",
    "Cybersecurity Essentials",
    "Problem Solving Masterclass",
  ];

  return (
    <div className="profile-page">

      {/* Header */}
      <div className="profile-card">
        <div className="profile-avatar">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>

        <div>
          <h1>{user.name || "User Name"}</h1>
          <p>{user.email || "user@email.com"}</p>
          <span>{user.college || "Your College"}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="profile-section">
        <h2>🛠 Skills</h2>

        <div className="tag-wrap">
          {(user.skills || []).length > 0 ? (
            user.skills.map((skill, index) => (
              <span key={index} className="green-tag">
                {typeof skill === "object" ? skill.name : skill}
              </span>
            ))
          ) : (
            <>
              <span className="green-tag">C++</span>
              <span className="green-tag">React</span>
            </>
          )}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="profile-section">
        <h2>🎯 Learning Goals</h2>

        <div className="tag-wrap">
          {(user.learningGoals || []).length > 0 ? (
            user.learningGoals.map((goal, index) => (
              <span key={index} className="purple-tag">
                {typeof goal === "object" ? goal.name : goal}
              </span>
            ))
          ) : (
            <>
              <span className="purple-tag">Python</span>
              <span className="purple-tag">AI</span>
            </>
          )}
        </div>
      </div>

      {/* Rewards */}
      <div className="profile-section">
        <h2>🏆 Rewards & Achievements</h2>

        <div className="reward-grid">
          {rewards.map((item, index) => (
            <div className="reward-card" key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="profile-section">
        <h2>📜 Certifications</h2>

        <div className="cert-grid">
          {certifications.map((item, index) => (
            <div className="cert-card" key={index}>
              <h3>{item}</h3>
              <button>View Certificate</button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Profile;