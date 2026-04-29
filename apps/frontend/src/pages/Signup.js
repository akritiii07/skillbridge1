import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    location: "",
    teachSkills: [],
    learnSkills: [],
    availability: "Online",
  });

  const [teachInput, setTeachInput] = useState("");
  const [learnInput, setLearnInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addTeachSkill = (e) => {
    e.preventDefault();
    if (!teachInput.trim()) return;

    setFormData((prev) => ({
      ...prev,
      teachSkills: [...prev.teachSkills, teachInput],
    }));

    setTeachInput("");
  };

  const addLearnSkill = (e) => {
    e.preventDefault();
    if (!learnInput.trim()) return;

    setFormData((prev) => ({
      ...prev,
      learnSkills: [...prev.learnSkills, learnInput],
    }));

    setLearnInput("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await authAPI.signup(formData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <Link to="/" className="back">← Back to home</Link>

        <div className="signup-card">
          <h2>Create your account</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSignup}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="college"
              placeholder="College"
              value={formData.college}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
            />

            <div>
              <input
                type="text"
                placeholder="Skill you can teach"
                value={teachInput}
                onChange={(e) => setTeachInput(e.target.value)}
              />
              <button onClick={addTeachSkill}>Add</button>
            </div>

            <div>
              <input
                type="text"
                placeholder="Skill you want to learn"
                value={learnInput}
                onChange={(e) => setLearnInput(e.target.value)}
              />
              <button onClick={addLearnSkill}>Add</button>
            </div>

            <select
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
            >
              <option>Online</option>
              <option>Offline</option>
              <option>Both</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;