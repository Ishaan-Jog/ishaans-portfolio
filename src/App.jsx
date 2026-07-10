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

const socialLinks = [
  {
    label: "Email",
    href: "mailto:ishaanjog17@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11A2.5 2.5 0 0 1 17.5 20h-11A2.5 2.5 0 0 1 4 17.5v-11Zm2.2-.5 5.8 4.2 5.8-4.2H6.2Zm11.8 2.1-6 4.4a1 1 0 0 1-1.16 0l-6-4.4V17.5c0 .28.22.5.5.5h11a.5.5 0 0 0 .5-.5V8.1Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ishaan-jog-8531252b8/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 6.5a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88ZM5.5 8.5h2.88V20H5.5V8.5Zm4.8 0h2.75v1.57h.04c.38-.72 1.32-1.48 2.72-1.48 2.91 0 3.44 1.92 3.44 4.42V20h-2.88v-5.43c0-1.29-.03-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.86V20H10.3V8.5Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.77.6-3.35-1.18-3.35-1.18-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.52 1.02 1.52 1.02.88 1.51 2.3 1.07 2.86.82.09-.65.35-1.07.63-1.32-2.21-.25-4.54-1.11-4.54-4.95 0-1.1.39-2 .99-2.71-.1-.25-.43-1.26.1-2.62 0 0 .82-.26 2.7 1.03a9.4 9.4 0 0 1 4.92 0c1.88-1.29 2.7-1.03 2.7-1.03.53 1.36.2 2.37.1 2.62.61.71.99 1.61.99 2.71 0 3.85-2.34 4.7-4.56 4.94.36.31.68.93.68 1.88v2.78c0 .27.18.59.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
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
                    <span className="social-icon">{item.icon}</span>
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
