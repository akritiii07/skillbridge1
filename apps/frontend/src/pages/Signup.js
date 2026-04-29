import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    try {
      const response = await authAPI.signup(formData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
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
          <p className="subtitle">
            Join the skill exchange community
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSignup}>
            {/* FULL NAME + EMAIL */}
            <div className="row">
              <div className="field">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="field">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="you@uni.edu"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="field">
              <label>Password</label>
              <input 
                type="password" 
                name="password"
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <small>Must be at least 6 characters</small>
            </div>

            {/* LOCATION */}
            <div className="field">
              <label>Location</label>
              <input 
                type="text" 
                name="location"
                placeholder="Boston, MA"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            {/* SUBMIT */}
            <button className="signup-btn-main" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="extra">
            Already have an account? <Link to="/login">Log in</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;