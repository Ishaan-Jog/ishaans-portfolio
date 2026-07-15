export default function Hero({ assets, counters, stats, onNavigate }) {
  return (
    <section className="hero section reveal visible" id="home" data-section="home">
      <div className="hero-copy" data-cursor-trail>
        <p className="eyebrow">Computer Engineering Student</p>
        <h1>Designing. Building. Solving.</h1>
        <p className="lead">
          I'm <span class="highlight-name">Ishaan Jog</span>, a Computer Engineering student passionate about software development, problem solving, and building impactful projects. I enjoy transforming ideas into practical applications while continuously learning through real-world experiences and hands-on development.
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

