import React from "react";
import "../style.css";

const resources = [
  // ===== PYTHON =====
  { title: "Python for Beginners – Full Course", level: "Beginner", tag: "Python", desc: "Complete Python tutorial covering basics.", source: "freeCodeCamp", time: "4h 26m", icon: "🐍" },
  { title: "Automate the Boring Stuff with Python", level: "Beginner", tag: "Python", desc: "Practical programming using real-world tasks.", source: "Udemy (Free)", time: "Self-paced", icon: "🐍" },
  { title: "Python OOP Tutorial", level: "Intermediate", tag: "Python", desc: "Object-oriented programming in Python.", source: "Corey Schafer", time: "2h 30m", icon: "🐍" },
  { title: "Real Python – Intermediate Tutorials", level: "Intermediate", tag: "Python", desc: "Curated intermediate Python tutorials.", source: "Real Python", time: "", icon: "🐍" },
  { title: "Python Advanced Concepts", level: "Advanced", tag: "Python", desc: "Decorators, generators, context managers.", source: "Tech With Tim", time: "1h 45m", icon: "🐍" },
  { title: "Python Official Documentation", level: "Advanced", tag: "Python", desc: "Comprehensive Python reference.", source: "Python.org", time: "", icon: "🐍" },

  // ===== REACT =====
  { title: "React Tutorial for Beginners", level: "Beginner", tag: "React", desc: "Learn React fundamentals.", source: "Net Ninja", time: "3h", icon: "⚛️" },
  { title: "React – Official Tutorial", level: "Beginner", tag: "React", desc: "Official React documentation guide.", source: "React.dev", time: "", icon: "⚛️" },
  { title: "React Hooks – Complete Guide", level: "Intermediate", tag: "React", desc: "Master useState, useEffect, hooks.", source: "Web Dev Simplified", time: "1h 30m", icon: "⚛️" },

  // ===== DSA =====
  { title: "Data Structures – Full Course", level: "Beginner", tag: "DSA", desc: "Arrays, trees, graphs explained.", source: "freeCodeCamp", time: "8h", icon: "🧠" },
  { title: "GeeksforGeeks – DSA Guide", level: "Intermediate", tag: "DSA", desc: "Comprehensive DSA articles.", source: "GeeksforGeeks", time: "", icon: "🧠" },
  { title: "LeetCode Practice", level: "Intermediate", tag: "DSA", desc: "Practice coding problems.", source: "LeetCode", time: "", icon: "🧠" },
  { title: "Advanced Algorithms – MIT OCW", level: "Advanced", tag: "DSA", desc: "Advanced algorithms by MIT.", source: "MIT OCW", time: "40h", icon: "🧠" },

  // ===== ML =====
  { title: "ML Crash Course by Google", level: "Beginner", tag: "Machine Learning", desc: "Intro to ML with TensorFlow.", source: "Google", time: "15h", icon: "🤖" },
  { title: "Scikit-Learn Tutorial", level: "Intermediate", tag: "Machine Learning", desc: "ML using scikit-learn.", source: "freeCodeCamp", time: "2h 30m", icon: "🤖" },
  { title: "Deep Learning Specialization", level: "Advanced", tag: "Machine Learning", desc: "Neural networks and deep learning.", source: "Coursera", time: "80h", icon: "🤖" },

  // ===== UI =====
  { title: "UI Design for Beginners", level: "Beginner", tag: "UI Design", desc: "Learn UI design basics.", source: "Envato", time: "1h", icon: "🎨" },
  { title: "Figma Tutorial – Complete Course", level: "Beginner", tag: "UI Design", desc: "Master Figma.", source: "freeCodeCamp", time: "3h", icon: "🎨" },
  { title: "Advanced UI Design Patterns", level: "Advanced", tag: "UI Design", desc: "Design systems and patterns.", source: "Smashing Magazine", time: "", icon: "🎨" },

  // ===== CYBER =====
  { title: "Cybersecurity for Beginners", level: "Beginner", tag: "Cybersecurity", desc: "Intro to cybersecurity.", source: "freeCodeCamp", time: "8h", icon: "🔐" },
  { title: "TryHackMe – Learn Hacking", level: "Intermediate", tag: "Cybersecurity", desc: "Hands-on cybersecurity labs.", source: "TryHackMe", time: "", icon: "🔐" },

  // ===== JS =====
  { title: "JavaScript Full Course for Beginners", level: "Beginner", tag: "JavaScript", desc: "Complete JS tutorial.", source: "freeCodeCamp", time: "3h 26m", icon: "📜" },
  { title: "JavaScript.info – Modern Tutorial", level: "Beginner", tag: "JavaScript", desc: "Modern JS tutorial.", source: "JavaScript.info", time: "", icon: "📜" },
  { title: "JavaScript ES6+ Features", level: "Intermediate", tag: "JavaScript", desc: "Modern JS features.", source: "Traversy Media", time: "1h", icon: "📜" },
  { title: "You Don’t Know JS (Book)", level: "Advanced", tag: "JavaScript", desc: "Deep JS concepts.", source: "GitHub", time: "", icon: "📜" },

  // ===== DATA =====
  { title: "Data Science Full Course", level: "Beginner", tag: "Data Science", desc: "Learn data science with Python.", source: "freeCodeCamp", time: "6h", icon: "📊" },
  { title: "Kaggle Learn – Intro to Data Science", level: "Beginner", tag: "Data Science", desc: "Hands-on Kaggle learning.", source: "Kaggle", time: "", icon: "📊" },
  { title: "Data Analysis with Python", level: "Beginner", tag: "Data Analysis", desc: "Pandas, NumPy basics.", source: "freeCodeCamp", time: "4h 30m", icon: "📊" },

  // ===== SQL =====
  { title: "SQL Full Course", level: "Beginner", tag: "SQL", desc: "Learn SQL basics.", source: "freeCodeCamp", time: "4h", icon: "🗄️" },
  { title: "W3Schools SQL Tutorial", level: "Beginner", tag: "SQL", desc: "Interactive SQL learning.", source: "W3Schools", time: "", icon: "🗄️" },
  { title: "SQL for Data Analysis", level: "Intermediate", tag: "Data Analysis", desc: "SQL queries for data.", source: "Khan Academy", time: "", icon: "🗄️" },

  // ===== WEB =====
  { title: "HTML & CSS Full Course", level: "Beginner", tag: "HTML/CSS", desc: "Build responsive websites.", source: "freeCodeCamp", time: "6h 30m", icon: "🌐" },
  { title: "MDN Web Docs – HTML/CSS", level: "Beginner", tag: "HTML/CSS", desc: "Official docs.", source: "MDN", time: "", icon: "🌐" },
  { title: "CSS Grid & Flexbox Mastery", level: "Intermediate", tag: "HTML/CSS", desc: "Modern CSS layouts.", source: "Traversy Media", time: "1h 30m", icon: "🌐" },

  // ===== NODE =====
  { title: "Node.js Tutorial for Beginners", level: "Beginner", tag: "Node.js", desc: "Backend basics.", source: "Net Ninja", time: "2h 30m", icon: "🟢" },
  { title: "Express.js Crash Course", level: "Intermediate", tag: "Node.js", desc: "Build REST APIs.", source: "Traversy Media", time: "1h 30m", icon: "🟢" },

  // ===== FLUTTER =====
  { title: "Flutter Tutorial for Beginners", level: "Beginner", tag: "Flutter", desc: "Build apps.", source: "Net Ninja", time: "3h 30m", icon: "📱" },
  { title: "Flutter Official Docs", level: "Beginner", tag: "Flutter", desc: "Official docs.", source: "Flutter.dev", time: "", icon: "📱" },

  // ===== MARKETING =====
  { title: "Digital Marketing Full Course", level: "Beginner", tag: "Digital Marketing", desc: "SEO & marketing.", source: "freeCodeCamp", time: "3h", icon: "📢" },
  { title: "Google Digital Garage", level: "Beginner", tag: "Digital Marketing", desc: "Certification by Google.", source: "Google", time: "", icon: "📢" }
];

const Resources = () => {
  return (
    <div className="resources-container">

      <div className="resources-header">
        <div className="header-content">
          <div className="badge">📚Curated free resources</div>
          <h1 className="header-title">Learning Resources Hub</h1>
          <p className="header-sub">Explore curated courses, tutorials, docs and practice tracks.</p>

          <div className="search-box">
            <input placeholder="Search skills, topics..." />
            <button className="filter-btn">Filters</button>
          </div>
        </div>
      </div>

      <div className="trending">
        <h3>Trending Skills</h3>
        <div className="trending-list">
          <div className="trending-item">Python +20%</div>
          <div className="trending-item">React +20%</div>
          <div className="trending-item">ML +20%</div>
          <div className="trending-item">DSA +20%</div>
          <div className="trending-item">UI +20%</div>
          <div className="trending-item">Cyber +20%</div>
        </div>
      </div>

      <div className="resources-grid">
        {resources.map((item, index) => (
          <div className="card" key={index}>
            <div className="bookmark">🔖</div>

            <div className="card-icon">{item.icon}</div>

            <div className="card-tags">
              <span className={`tag ${item.level.toLowerCase()}`}>{item.level}</span>
              <span className="tag">{item.tag}</span>
            </div>

            <div className="card-title">{item.title}</div>
            <div className="card-desc">{item.desc}</div>

            <div className="card-footer">
              <span>{item.source}</span>
              <span>{item.time}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Resources;