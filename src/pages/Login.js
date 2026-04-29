import loginImg from "../assets/login-page-image.png";
import { Link } from "react-router-dom";

function Login() {
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

          <label>Email</label>
          <input type="email" placeholder="alex@university.edu" />

          <label>Password</label>
          <input type="password" placeholder="password123" />

          <button className="login-btn">Log In</button>

          <p className="extra">
            Don't have an account? <span>Sign up</span>
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