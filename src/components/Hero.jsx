export default function Hero({ assets, counters, stats, onNavigate }) {
  return (
    <section className="hero section reveal visible" id="home" data-section="home">
      <div className="hero-copy" data-cursor-trail>
        <p className="eyebrow">Computer Engineering Student</p>
        <h1>Designing. Building. Solving.</h1>
        <p className="lead">
          I’m <span className="highlight-name">Ishaan Jog</span>, a computer engineering student focused on software development,
          problem solving, and building projects that feel practical in internships, academic work, and real-world use.
        </p>

        <div className="hero-actions">
          <button className="button primary" onClick={() => onNavigate("projects")}>
            Explore Projects
          </button>
          <button className="button secondary" onClick={() => onNavigate("contact")}>
            Get In Touch
          </button>
        </div>

        <div className="stats">
          {stats.map((stat) => (
            <div key={stat.key}>
              <strong>{counters[stat.key]}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <aside className="hero-card" data-cursor-trail>
        <div className="portrait">
          <img src={assets.photo} alt="Ishaan Jog portrait" />
        </div>
        <div className="card-content">
          <p className="card-label">Quick profile</p>
          <ul>
            <li>Location: Pune, Maharashtra, India</li>
            <li>Computer Engineering Student</li>
            <li>Interests: Software, Cybersecurity, AI, and Web</li>
            <li>Looking for: Internship and project opportunities</li>
          </ul>
        </div>
      </aside>
    </section>
  );
}

