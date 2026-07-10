import { useEffect, useMemo, useState } from "react";
import photo from "../static/ishaan_photo.jpeg";
import emailIcon from "../static/email.svg";
import linkedinIcon from "../static/linkedin.svg";
import githubIcon from "../static/github.svg";

const projectData = [
  {
    tag: "AI/ML",
    title: "PreSense",
    description:
      "Real-Time ML Disaster Predictor and AI-based Civil Defense Orchestration System.",
    stack: ["Python", "Streamlit", "AI/ML"],
    link: "https://github.com/Ishaan-Jog/presense",
  },
  {
    tag: "Mobile App",
    title: "Aharix",
    description:
      "A handy mobile app that alerts the user about unhealthy food items by fetching their nutritional facts from barcodes.",
    stack: ["Android", "Kotlin"],
  },
  {
    tag: "Photography",
    title: "PhotoPix",
    description:
      "A photography website where you can upload and view photos clicked by the developers Ishaan and Sarang using their exclusive visions!",
    stack: ["Django", "HTML/CSS", "Web"],
    link: "https://github.com/Ishaan-Jog/photopix-v2",
  },
];

const timelineData = [
  {
    year: "2025",
    title: "Software Developer Intern",
    text: "Sub Fibo Technology Pvt. Ltd., Computer Graphics & CAD Customization",
  },
  {
    year: "2023",
    title: "Project Contributor",
    text: "Worked on coursework and personal projects focused on programming fundamentals and practical design.",
  },
];

const achievementData = [
  {
    year: "2024-2026",
    title: "Competition Winner",
    text: "Won prizes in multiple inter-collegite tech-fests.",
    category: "Competition",
  },
  {
    year: "2023",
    title: "JLPT N4",
    text: "Cleared Japanese Language Proficiency Test level N4 with distinction.",
    category: "Exam",
  },
  {
    year: "2022",
    title: "JLPT N5",
    text: "Cleared Japanese Language Proficiency Test level N5 with distinction.",
    category: "Exam",
  },
];

const skills = [
  "Python",
  "Java",
  "Kotlin",
  "JavaScript",
  "HTML/CSS",
  "React",
  "SQL",
  "C/C++",
  "Git",
  "Problem Solving",
];

const socialLinks = [
  {
    label: "Email",
    href: "mailto:ishaanjog17@gmail.com",
    icon: emailIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ishaan-jog-8531252b8/",
    icon: linkedinIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/Ishaan-Jog/",
    icon: githubIcon,
  },
];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [counters, setCounters] = useState({ projects: 0, areas: 0, roles: 0 });
  const [revealed, setRevealed] = useState({
    home: true,
    about: false,
    projects: false,
    experience: false,
    achievements: false,
    skills: false,
    contact: false,
  });

  const stats = useMemo(
    () => [
      { key: "projects", value: 12, label: "academic and personal builds" },
      { key: "areas", value: 4, label: "major tech areas explored" },
      { key: "roles", value: 3, label: "team and leadership roles" },
    ],
    []
  );

  useEffect(() => {
    const animateCounters = () => {
      const duration = 1200;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setCounters({
          projects: Math.floor(eased * 12),
          areas: Math.floor(eased * 4),
          roles: Math.floor(eased * 3),
        });

        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
        setRevealed({
          home: true,
          about: true,
          projects: true,
          experience: true,
          achievements: true,
          skills: true,
          contact: true,
        });
      animateCounters();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveSection(entry.target.id);
          setRevealed((current) => ({ ...current, [entry.target.id]: true }));
          if (entry.target.id === "home") animateCounters();
        });
      },
      { threshold: 0.25 }
    );

    document.querySelectorAll("section[data-section]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const bgOrbs = [
    { className: "bg-orb bg-orb-a" },
    { className: "bg-orb bg-orb-b" },
  ];

  return (
    <>
      {bgOrbs.map((orb) => (
        <div key={orb.className} className={orb.className} />
      ))}

      <div className="page-shell">
        <header className="topbar">
          <button className="brand" onClick={() => scrollToSection("home")} aria-label="Go to home">
            IJ
          </button>
          <nav className="nav" aria-label="Primary">
            {["about", "projects", "experience", "achievements", "skills", "contact"].map((item) => (
              <button
                key={item}
                className={activeSection === item ? "active" : ""}
                onClick={() => scrollToSection(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </nav>
        </header>

        <main>
          <section className={`hero section reveal ${revealed.home ? "visible" : ""}`} id="home" data-section="home">
            <div className="hero-copy">
              <p className="eyebrow">Computer Engineering Student</p>
              <h1>Designing. Building. Solving.</h1>
              <p className="lead">
                I’m <span className="highlight-name">Ishaan Jog</span>, a computer
                engineering student focused on software development, problem solving,
                and building projects that feel practical in internships, academic
                work, and real-world use.
              </p>

              <div className="hero-actions">
                <button className="button primary" onClick={() => scrollToSection("projects")}>
                  Explore Projects
                </button>
                <button className="button secondary" onClick={() => scrollToSection("contact")}>
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

          <aside className="hero-card">
              <div className="portrait">
                <img src={photo} alt="Ishaan Jog portrait" />
              </div>
              <div className="card-content">
                <p className="card-label">Quick profile</p>
                <ul>
                  <li>Location: Pune, Maharashtra, India</li>
                  <li>Interests: Software, Cybersecurity, AI, and Web</li>
                  <li>Looking for: Internship and project opportunities</li>
                </ul>
              </div>
            </aside>
          </section>

          <section className={`section grid-two reveal ${revealed.about ? "visible" : ""}`} id="about" data-section="about">
            <div className="section-title">
              <p className="eyebrow">About</p>
              <h2>Focused on learning, building, and improving consistently.</h2>
            </div>
            <div className="panel">
              <div className="about-header">
                <div className="about-portrait">
                  <img src={photo} alt="Ishaan Jog portrait" />
                </div>
                <div className="about-name-block">
                  <p className="about-name">Ishaan Jog</p>
                  <p className="about-role">Computer Engineering Student</p>
                </div>
              </div>
              <p>
                I’m currently pursuing computer engineering and enjoy working on
                projects that combine logic, structure, and user experience. I like
                work that is clear, reliable, and easy to explain.
              </p>
              <p>
                My strengths are in breaking down problems, learning new tools quickly,
                and turning class concepts into small but meaningful implementations.
                I’m especially interested in roles where I can contribute, learn from a
                team, and keep improving my craft.
              </p>
            </div>
          </section>

          <section className={`section reveal ${revealed.projects ? "visible" : ""}`} id="projects" data-section="projects">
            <div className="section-title">
              <p className="eyebrow">Selected Projects</p>
              <h2>Projects that reflect me.</h2>
            </div>
            <div className="cards">
              {projectData.map((project) => (
                <article className="project-card" key={project.title}>
                  <p className="project-tag">{project.tag}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul>
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    className="project-link"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View project ${project.title} in a new tab`}
                  >
                    <span>View Project</span>
                    <span aria-hidden="true" className="project-link-arrow">
                      ↗
                    </span>
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className={`section grid-two reveal ${revealed.experience ? "visible" : ""}`} id="experience" data-section="experience">
            <div className="section-title">
              <p className="eyebrow">Experience</p>
              <h2>Academic, technical, and leadership experiences.</h2>
            </div>
            <div className="timeline panel">
              {timelineData.map((entry) => (
                <div className="timeline-item" key={entry.year + entry.title}>
                  <span>{entry.year}</span>
                  <div>
                    <h3>{entry.title}</h3>
                    <p>{entry.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={`section reveal ${revealed.achievements ? "visible" : ""}`} id="achievements" data-section="achievements">
            <div className="section-title">
              <p className="eyebrow">Achievements</p>
              <h2>Milestones worth showcasing.</h2>
            </div>
            <div className="cards achievements-cards">
              {achievementData.map((achievement) => (
                <article className="project-card achievement-card" key={achievement.year + achievement.title}>
                  <p className="project-tag">{achievement.category}</p>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.text}</p>
                  <div className="achievement-year">{achievement.year}</div>
                </article>
              ))}
            </div>
          </section>

          <section className={`section grid-two reveal ${revealed.skills ? "visible" : ""}`} id="skills" data-section="skills">
            <div className="section-title">
              <p className="eyebrow">Skills</p>
              <h2>Technical tools I use to learn and develop.</h2>
            </div>
            <div className="panel skills">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </section>

          <section className={`section grid-two reveal ${revealed.contact ? "visible" : ""}`} id="contact" data-section="contact">
            <div className="section-title">
              <p className="eyebrow">Contact</p>
              <h2>Open to internships, collaboration, and project work.</h2>
            </div>
            <div className="contact panel">
              <div className="social-buttons">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    className="social-button"
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    aria-label={item.label}
                    title={item.label}
                  >
                    <span className="social-icon">
                      <img src={item.icon} alt="" aria-hidden="true" />
                    </span>
                    <span className="social-label">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
