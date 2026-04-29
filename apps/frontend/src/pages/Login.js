import loginImg from "../assets/login-page-image.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authAPI } from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await authAPI.login({ email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
    <div className="login-container">
      {/* LEFT SIDE */}
      <div className="login-left">

        <Link to="/" className="back">← Back to home</Link>

        <div className="login-card">
          <h2>Welcome back</h2>
          <p className="subtitle">
            Log in to continue your skill exchange journey
          </p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input 
              type="email" 
              placeholder="alex@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input 
              type="password" 
              placeholder="password123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="extra">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">

        <div className="illustration-box">
          <img src={loginImg} alt="dashboard" />
        </div>

        <p className="caption">
          Your personalized dashboard awaits
        </p>

      </div>

    </div>
    </div>
  );
}

export default Login;