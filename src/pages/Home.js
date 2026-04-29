function Home() {
  return (
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
  );
}

export default Home;