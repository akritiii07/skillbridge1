import skillImage from "../assets/skill-exchange.png";
import communityImage from "../assets/community.png";
function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">

        <div className="hero-content">

          <div className="tag">
            ✨ The future of peer-to-peer learning
          </div>

          <h1>
            Learn Skills by <br />
            <span>Teaching Skills</span>
          </h1>

          <p className="description">
            Exchange your expertise with fellow students. No money needed —
            just your skills, curiosity, and willingness to grow together.
          </p>

          <div className="buttons">
            <button className="btn-primary">Join Now →</button>
            <button className="btn-secondary">Explore Skills</button>
          </div>

          <div className="stats">
            <div><strong>2,500+</strong> Students</div>
            <div><strong>500+</strong> Skills</div>
            <div><strong>50+</strong> Universities</div>
          </div>

        </div>

      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="how-section">

        <div className="how-left">

          <h2 className="how-title">
            How It <span>Works</span>
          </h2>

          <p className="how-subtitle">
            Three simple steps to start exchanging skills
          </p>

          <div className="how-step">
            <div className="step-icon">👤</div>
            <div>
              <small>Step 1</small>
              <h3>Create Profile</h3>
              <p>
                Sign up and list the skills you can teach and want to learn.
              </p>
            </div>
          </div>

          <div className="how-step">
            <div className="step-icon">🎯</div>
            <div>
              <small>Step 2</small>
              <h3>Get Matched</h3>
              <p>
                Our algorithm finds students with complementary skills.
              </p>
            </div>
          </div>

          <div className="how-step">
            <div className="step-icon">🤝</div>
            <div>
              <small>Step 3</small>
              <h3>Swap & Learn</h3>
              <p>
                Connect, schedule sessions, and grow together.
              </p>
            </div>
          </div>

        </div>

        <div className="how-right">
         <img src={skillImage} alt="how it works" />
        
        </div>

      </section>
  {/*SKILLS SECTION */}

    <section className="skills-section">

  <h2 className="skills-title">
    Popular <span>Skills</span>
  </h2>

  <p className="skills-subtitle">
    Most in-demand skills on SkillBridge right now
  </p>

  <div className="skills-grid">

    <div className="skill-card">
      <div className="skill-icon">🐍</div>
      <h3>Python</h3>
      <p>↗ 156 learners</p>
    </div>

    <div className="skill-card">
      <div className="skill-icon">⚛️</div>
      <h3>React</h3>
      <p>↗ 134 learners</p>
    </div>

    <div className="skill-card">
      <div className="skill-icon">🎨</div>
      <h3>UI Design</h3>
      <p>↗ 98 learners</p>
    </div>

    <div className="skill-card">
      <div className="skill-icon">🤖</div>
      <h3>Machine Learning</h3>
      <p>↗ 87 learners</p>
    </div>

    <div className="skill-card">
      <div className="skill-icon">📜</div>
      <h3>JavaScript</h3>
      <p>↗ 145 learners</p>
    </div>

    <div className="skill-card">
      <div className="skill-icon">📊</div>
      <h3>Data Science</h3>
      <p>↗ 76 learners</p>
    </div>

    <div className="skill-card active-card">
      <div className="skill-icon">📷</div>
      <h3>Photography</h3>
      <p>↗ 65 learners</p>
    </div>

    <div className="skill-card">
      <div className="skill-icon">📱</div>
      <h3>Mobile Dev</h3>
      <p>↗ 72 learners</p>
    </div>

  </div>
</section>
<section className="mentors-section">

  <h2 className="mentors-title">
    Featured <span>Mentors</span>
  </h2>

  <p className="mentors-subtitle">
    Top-rated students ready to exchange skills
  </p>

  <div className="mentors-grid">

    <div className="mentor-card">
      <div className="mentor-img">👩</div>
      <h3>Alex Chen</h3>
      <small>MIT</small>
      <p>⭐ 4.8 (24)</p>
      <div className="mentor-tags">
        <span>React</span>
        <span>JavaScript</span>
      </div>
    </div>

    <div className="mentor-card">
      <div className="mentor-img">👩‍💻</div>
      <h3>Maya Patel</h3>
      <small>Stanford</small>
      <p>⭐ 4.9 (31)</p>
      <div className="mentor-tags">
        <span>Python</span>
        <span>Machine Learning</span>
      </div>
    </div>

    <div className="mentor-card">
      <div className="mentor-img">👨</div>
      <h3>Jordan Rivera</h3>
      <small>UCLA</small>
      <p>⭐ 4.7 (19)</p>
      <div className="mentor-tags">
        <span>UI Design</span>
        <span>Figma</span>
      </div>
    </div>

    <div className="mentor-card">
      <div className="mentor-img">👨‍🏫</div>
      <h3>Priya Sharma</h3>
      <small>Georgia Tech</small>
      <p>⭐ 4.6 (15)</p>
      <div className="mentor-tags">
        <span>Flutter</span>
        <span>Dart</span>
      </div>
    </div>

  </div>
</section>

<section className="why-section">

  <h2 className="why-title">
    Why <span>SkillBridge</span>?
  </h2>

  <div className="why-container">

    <div className="why-left">
     
      <img src={communityImage} alt="students learning" />
       
    </div>

    <div className="why-right">

      <div className="why-card">
        <div className="why-icon">💲</div>
        <h3>100% Free</h3>
        <p>No money exchanges hands. Just skills.</p>
      </div>

      <div className="why-card">
        <div className="why-icon">👥</div>
        <h3>Peer Community</h3>
        <p>Connect with students from top universities.</p>
      </div>

      <div className="why-card">
        <div className="why-icon">🏆</div>
        <h3>Build Portfolio</h3>
        <p>Track progress and earn skill badges.</p>
      </div>

      <div className="why-card">
        <div className="why-icon">🌍</div>
        <h3>Learn Anywhere</h3>
        <p>Online or offline, at your own pace.</p>
      </div>

    </div>

  </div>
</section>
<section className="testimonial-section">

  <h2 className="testimonial-title">
    What Students <span>Say</span>
  </h2>

  <p className="testimonial-subtitle">
    Real stories from our community
  </p>

  <div className="testimonial-grid">

    <div className="testimonial-card">
      <div className="stars">★★★★★</div>
      <div className="quote">❞</div>

      <p>
        "SkillBridge helped me learn Python in exchange for my
        photography skills. Best learning experience ever!"
      </p>

      <div className="student-info">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt=""
        />
        <div>
          <h4>Sarah Kim</h4>
          <span>Yale University</span>
        </div>
      </div>
    </div>

    <div className="testimonial-card">
      <div className="stars">★★★★★</div>
      <div className="quote">❞</div>

      <p>
        "I taught web development and learned graphic design.
        The matching system is incredibly accurate."
      </p>

      <div className="student-info">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140061.png"
          alt=""
        />
        <div>
          <h4>David Okonkwo</h4>
          <span>Princeton</span>
        </div>
      </div>
    </div>

    <div className="testimonial-card">
      <div className="stars">★★★★☆</div>
      <div className="quote">❞</div>

      <p>
        "Finally a platform that makes learning affordable
        and social. I've made great friends through skill swaps!"
      </p>

      <div className="student-info">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png"
          alt=""
        />
        <div>
          <h4>Emma Larsson</h4>
          <span>Columbia University</span>
        </div>
      </div>
    </div>

  </div>
</section>

<section className="cta-section">

  <div className="cta-overlay">

    <div className="cta-content">
      <h2>
        Ready to Start <span>Swapping?</span>
      </h2>

      <p>
        Join thousands of students already exchanging skills
        and building their future together. It's free,
        collaborative, and life-changing.
      </p>

      <button className="cta-btn">
        Get Started Free →
      </button>
    </div>

  </div>
</section>


<footer className="footer-section">

  <div className="footer-grid">

    <div className="footer-col">
      <h3><span>Skill</span>Bridge</h3>
      <p>
        Empowering students to learn from each other
        through skill exchange.
      </p>
    </div>

    <div className="footer-col">
      <h4>Platform</h4>
      <a href="/">Explore Skills</a>
      <a href="/">Join Now</a>
      <a href="/">How It Works</a>
    </div>

    <div className="footer-col">
      <h4>Company</h4>
      <a href="/">About Us</a>
      <a href="/">Blog</a>
      <a href="/">Careers</a>
    </div>

    <div className="footer-col">
      <h4>Connect</h4>

      <div className="social-icons">
  <a href="/" className="icon-box">f</a>
  <a href="/" className="icon-box">ln</a>
  <a href="/" className="icon-box">ig</a>
  <a href="/" className="icon-box">✉</a>
</div>
    </div>

  </div>

  <div className="footer-bottom">
    © 2026 SkillBridge. All rights reserved.
  </div>

</footer>
    </>
  );
}

export default Home;