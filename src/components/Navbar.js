import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <span className="blue">Skill</span>
          <span className="black">Bridge</span>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/login" className="login-btn">Log In</Link></li>
          <li><Link to="/signup" className="signup-btn">Sign Up</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;