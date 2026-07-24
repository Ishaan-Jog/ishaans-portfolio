import { useEffect, useMemo, useState } from "react";
import Topbar from "./components/Topbar";
import Hero from "./components/Hero";
import {
  AboutSection,
  AchievementsSection,
  ContactSection,
  ExperienceSection,
  EducationSection,
  ProjectsSection,
  SkillsSection,
} from "./components/PortfolioSections";
import { achievementData, assets, projectData, skills, socialLinks, timelineData, educationData } from "./data/portfolioData";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [counters, setCounters] = useState({ projects: 0, areas: 0, roles: 0 });
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem("theme") || "dark";
  });
  const [revealed, setRevealed] = useState({
    home: true,
    about: false,
    projects: false,
    experience: false,
    education: false,
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
    const updateCursor = (event) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      document.documentElement.style.setProperty("--cursor-opacity", "1");

      const card = event.target.closest?.("[data-cursor-trail]");
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty("--trail-x", `${x}px`);
        card.style.setProperty("--trail-y", `${y}px`);
        card.style.setProperty("--trail-opacity", "1");
      }
    };

    const hideCursorGlow = () => {
      document.documentElement.style.setProperty("--cursor-opacity", "0");
    };

    const clearCardTrail = (event) => {
      const card = event.target.closest?.("[data-cursor-trail]");
      if (card) {
        card.style.setProperty("--trail-opacity", "0");
      }
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mouseleave", hideCursorGlow);
    window.addEventListener("blur", hideCursorGlow);
    document.addEventListener("mouseout", clearCardTrail);

    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mouseleave", hideCursorGlow);
      window.removeEventListener("blur", hideCursorGlow);
      document.removeEventListener("mouseout", clearCardTrail);
    };
  }, [theme]);

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
        education: true,
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

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  const bgOrbs = [
    { className: "bg-orb bg-orb-a" },
    { className: "bg-orb bg-orb-b" },
  ];

  return (
    <>
      <div className="cursor-glow" aria-hidden="true" />
      {bgOrbs.map((orb) => (
        <div key={orb.className} className={orb.className} />
      ))}

      <div className="page-shell">
        <Topbar
          activeSection={activeSection}
          onNavigate={scrollToSection}
          theme={theme}
          onToggleTheme={toggleTheme}
          assets={assets}
        />

        <main>
          <Hero assets={assets} counters={counters} stats={stats} onNavigate={scrollToSection} />
          <AboutSection visible={revealed.about} assets={assets} />
          <ProjectsSection visible={revealed.projects} projectData={projectData} />
          <ExperienceSection visible={revealed.experience} timelineData={timelineData} />
          <EducationSection visible={revealed.education} educationData={educationData} />
          <AchievementsSection visible={revealed.achievements} achievementData={achievementData} />
          <SkillsSection visible={revealed.skills} skills={skills} />
          <ContactSection visible={revealed.contact} socialLinks={socialLinks} />
        </main>
      </div>
    </>
  );
}

export default App;
