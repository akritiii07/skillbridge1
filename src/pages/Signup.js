import React from "react";

function Signup() {
  return (
    <div className="signup-page">

      <div className="signup-container">

        <a href="/" className="back">← Back to home</a>

        <div className="signup-card">

          <h2>Create your account</h2>
          <p className="subtitle">
            Join the skill exchange community
          </p>

          {/* FULL NAME + EMAIL */}
          <div className="row">
            <div className="field">
              <label>Full Name</label>
              <input type="text" placeholder="Your name" />
            </div>

            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="you@uni.edu" />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="Min 6 characters" />
            <small>Must be at least 6 characters</small>
          </div>

          {/* COLLEGE + LOCATION */}
          <div className="row">
            <div className="field">
              <label>College</label>
              <input type="text" placeholder="MIT" />
            </div>

            <div className="field">
              <label>Location</label>
              <input type="text" placeholder="Boston, MA" />
            </div>
          </div>

          {/* SKILLS TEACH */}
          <div className="field">
            <label>Skills You Can Teach</label>
            <div className="skill-row">
              <input type="text" placeholder="e.g. Python" />
              <button>Add</button>
            </div>
            <small>Add skills you can teach others</small>
          </div>

          {/* SKILLS LEARN */}
          <div className="field">
            <label>Skills You Want to Learn</label>
            <div className="skill-row">
              <input type="text" placeholder="e.g. React" />
              <button>Add</button>
            </div>
            <small>What do you want to learn?</small>
          </div>

          {/* AVAILABILITY */}
          <div className="field">
            <label>Availability</label>
            <div className="availability">
              <button className="active">Online</button>
              <button>Offline</button>
              <button>Both</button>
            </div>
            <small>Select how you prefer to connect</small>
          </div>

          {/* SUBMIT */}
          <button className="signup-btn-main">
            Create Account
          </button>

          <p className="extra">
            Already have an account? <span>Log in</span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;