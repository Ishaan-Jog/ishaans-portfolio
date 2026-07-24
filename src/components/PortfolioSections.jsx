import SectionTitle from "./SectionTitle";

export function AboutSection({ visible, assets }) {
  return (
    <section className={`section grid-two reveal ${visible ? "visible" : ""}`} id="about" data-section="about">
      <SectionTitle eyebrow="About" title="Focused on learning, building, and improving consistently." />
      <div className="panel" data-cursor-trail>
        <div className="about-header">
          <div className="about-portrait">
            <img src={assets.photo} alt="Ishaan Jog portrait" />
          </div>
          <div className="about-name-block">
            <p className="about-name">Ishaan Jog</p>
            <p className="about-role">Computer Engineering Student</p>
          </div>
        </div>
        <p>
          I’m currently pursuing computer engineering and enjoy working on projects that combine logic, structure,
          and user experience. I like work that is clear, reliable, and easy to explain.
        </p>
        <p>
          My strengths are in breaking down problems, learning new tools quickly, and turning class concepts into
          small but meaningful implementations. I’m especially interested in roles where I can contribute, learn from a
          team, and keep improving my craft.
        </p>
      </div>
    </section>
  );
}

export function ProjectsSection({ visible, projectData }) {
  return (
    <section className={`section reveal ${visible ? "visible" : ""}`} id="projects" data-section="projects">
      <SectionTitle eyebrow="Selected Projects" title="Projects that reflect me." />
      <div className="cards">
        {projectData.map((project) => (
          <article className="project-card" key={project.title} data-cursor-trail>
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
  );
}

export function ExperienceSection({ visible, timelineData }) {
  return (
    <section className={`section grid-two reveal ${visible ? "visible" : ""}`} id="experience" data-section="experience">
      <SectionTitle eyebrow="Experience" title="Academic, technical, and leadership experiences." />
      <div className="timeline panel" data-cursor-trail>
        {timelineData.map((entry) => (
          <div className="timeline-item" key={entry.year + entry.title}>
            <span>{entry.year}</span>
            <div>
              <div className="timeline-title-row">
                <h3>{entry.title}</h3>
                <p className="timeline-org">{entry.organization}</p>
              </div>
              <p>{entry.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const educationData = [
  {
    year: "2022-2026",
    title: "B.Tech in Computer Engineering",
    organization: "University / Institute Name",
    text: "Focused on programming fundamentals, software development, data structures, computer networks, and systems-level thinking.",
  },
  {
    year: "2020-2022",
    title: "Higher Secondary Education",
    organization: "School / Junior College Name",
    text: "Built a foundation in mathematics, science, and problem solving that led into engineering studies.",
  },
];

export function EducationSection({ visible }) {
  return (
    <section className={`section grid-two reveal ${visible ? "visible" : ""}`} id="education" data-section="education">
      <SectionTitle eyebrow="Education" title="Where I built my academic foundation." />
      <div className="timeline panel" data-cursor-trail>
        {educationData.map((entry) => (
          <div className="timeline-item" key={entry.year + entry.title}>
            <span>{entry.year}</span>
            <div>
              <div className="timeline-title-row">
                <h3>{entry.title}</h3>
                <p className="timeline-org">{entry.organization}</p>
              </div>
              <p>{entry.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AchievementsSection({ visible, achievementData }) {
  return (
    <section className={`section reveal ${visible ? "visible" : ""}`} id="achievements" data-section="achievements">
      <SectionTitle eyebrow="Achievements" title="Milestones worth showcasing." />
      <div className="cards achievements-cards">
        {achievementData.map((achievement) => (
          <article className="project-card achievement-card" key={achievement.year + achievement.title} data-cursor-trail>
            <p className="project-tag">{achievement.category}</p>
            <h3>{achievement.title}</h3>
            <p>{achievement.text}</p>
            <div className="achievement-year">{achievement.year}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SkillsSection({ visible, skills }) {
  return (
    <section className={`section grid-two reveal ${visible ? "visible" : ""}`} id="skills" data-section="skills">
      <SectionTitle eyebrow="Skills" title="Technologies I work with" />
      <div className="panel skills" data-cursor-trail>
        {skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>
    </section>
  );
}

export function ContactSection({ visible, socialLinks }) {
  return (
    <section className={`section grid-two reveal ${visible ? "visible" : ""}`} id="contact" data-section="contact">
      <SectionTitle eyebrow="Contact" title="Open to internships, collaboration, and project work." />
      <div className="contact panel" data-cursor-trail>
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
  );
}
