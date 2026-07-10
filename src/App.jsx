import { useEffect, useMemo, useState } from "react";

const projectData = [
  {
    tag: "Web App",
    title: "Campus Connect",
    description:
      "A student portal for notices, schedules, event updates, and document access. Built to make academic information easier to find in one place.",
    stack: ["React", "Node.js", "MongoDB"],
    link: "https://github.com",
  },
  {
    tag: "Automation",
    title: "Attendance Tracker",
    description:
      "A desktop-style tool that records attendance, calculates totals, and generates simple reports for classes or clubs.",
    stack: ["Python", "SQLite", "Data Export"],
    link: "https://github.com",
  },
  {
    tag: "IoT",
    title: "Smart Energy Monitor",
    description:
      "A prototype that captures energy usage from a device and displays readings in a simple dashboard for better awareness.",
    stack: ["ESP32", "Sensors", "Dashboard UI"],
    link: "https://github.com",
  },
  {
    tag: "Software",
    title: "Task Planner",
    description:
      "A lightweight productivity app for organizing assignments, deadlines, and weekly priorities without unnecessary clutter.",
    stack: ["JavaScript", "Local Storage", "Responsive Design"],
    link: "https://github.com",
  },
];

const timelineData = [
  {
    year: "2026",
    title: "Software Engineering Intern",
    text: "Sample Company Name, building internal tools and learning collaborative development workflows.",
  },
  {
    year: "2025",
    title: "Technical Lead, Student Club",
    text: "Led event demos, project planning, and coordination across a small student team.",
  },
  {
    year: "2024",
    title: "Project Contributor",
    text: "Worked on coursework and personal projects focused on programming fundamentals and practical design.",
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

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [counters, setCounters] = useState({ projects: 0, areas: 0, roles: 0 });
  const [revealed, setRevealed] = useState({
    home: true,
    about: false,
    projects: false,
    experience: false,
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
            IK
          </button>
          <nav className="nav" aria-label="Primary">
            {["about", "projects", "experience", "skills", "contact"].map((item) => (
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
                I’m Ishaan Jog, a computer engineering student focused on software
                development, problem solving, and building projects that feel
                practical in internships, academic work, and real-world use.
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
                <span>IK</span>
              </div>
              <div className="card-content">
                <p className="card-label">Quick profile</p>
                <ul>
                  <li>Location: India</li>
                  <li>Interests: Web, software, and embedded systems</li>
                  <li>Seeking: Internship and project opportunities</li>
                  <li>Style: Minimal, practical, and detail-oriented</li>
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
              <h2>Sample projects that reflect the kind of work I like to do.</h2>
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

          <section className={`section grid-two reveal ${revealed.skills ? "visible" : ""}`} id="skills" data-section="skills">
            <div className="section-title">
              <p className="eyebrow">Skills</p>
              <h2>Technical tools I use and continue to improve.</h2>
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
              <p>
                Email:
                <a href="mailto:ishan.kumar@example.com">ishan.kumar@example.com</a>
              </p>
              <p>
                LinkedIn:
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                  linkedin.com/in/ishankumar
                </a>
              </p>
              <p>
                GitHub:
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  github.com/ishankumar
                </a>
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
