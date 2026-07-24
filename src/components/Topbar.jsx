export default function Topbar({ activeSection, onNavigate, theme, onToggleTheme, assets }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => onNavigate("home")} aria-label="Go to home">
        IJ
      </button>
      <nav className="nav" aria-label="Primary">
        {["about", "projects", "experience", "education", "achievements", "skills", "contact"].map((item) => (
          <button
            key={item}
            className={activeSection === item ? "active" : ""}
            onClick={() => onNavigate(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </nav>
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        title={theme === "light" ? "Dark mode" : "Light mode"}
      >
        <img
          className={theme === "light" ? "theme-icon moon" : "theme-icon sun"}
          src={theme === "light" ? assets.moonIcon : assets.sunIcon}
          alt=""
          aria-hidden="true"
        />
      </button>
    </header>
  );
}
