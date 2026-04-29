

import React, { useEffect, useState } from "react";
import { userAPI } from "../services/userApi";
import "../style.css";


function Explore() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await userAPI.getAll();
      setUsers(res.data.users || []);
    } catch (err) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await userAPI.getAll({ search });
      setUsers(res.data.users || []);
    } catch (err) {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="explore-page">
      <div className="explore-hero">
        <h1>Explore <span>Skills</span></h1>
        <p>Discover students and skills available for exchange</p>
      </div>
      <div className="explore-controls">
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Search by name or college..." value={search} onChange={e => setSearch(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="card-grid">
          {users.map((user, index) => (
            <div className="card" key={user.id || user._id || index}>
              <div className="card-header">
                <img src={user.profileImage || `https://i.pravatar.cc/100?img=${index+1}`} alt="user" />
                <div>
                  <h3>{user.name}</h3>
                  <p>{user.college} • {user.location} • ⭐ {user.rating || 0}</p>
                </div>
              </div>
              <div className="section">
                <h4>TEACHES</h4>
                <div className="tags blue">
                  {(user.skills || []).map((skill, i) => (
                    <span key={i}>{skill.name}</span>
                  ))}
                </div>
              </div>
              <div className="section">
                <h4>WANTS TO LEARN</h4>
                <div className="tags light">
                  {(user.learningGoals || []).map((goal, i) => (
                    <span key={i}>{goal.name}</span>
                  ))}
                </div>
              </div>
              <div className="btns">
                <button className="view">View Profile</button>
                <button className="connect">Connect</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* ...existing footer code... */}
      <div className="footer">
        <div className="footer-grid">
          <div>
            <h2>SkillBridge</h2>
            <p>Empowering students to learn 
            from each other through skill exchange.</p>
          </div>
          <div>
            <h4>Platform</h4>
            <p>Explore Skills</p>
            <p>Join Now</p>
            <p>How It Works</p>
          </div>
          <div>
            <h4>Company</h4>
            <p>About Us</p>
            <p>Blog</p>
            <p>Careers</p>
          </div>
          <div>
            <h4>Connect</h4>
            <p>GitHub</p>
            <p>LinkedIn</p>
            <p>Email</p>
          </div>
        </div>
        <div className="copyright">
          © 2026 SkillBridge. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Explore;