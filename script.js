const navLinks = Array.from(document.querySelectorAll(".nav a"));
const reveals = Array.from(document.querySelectorAll(".reveal"));
const counters = Array.from(document.querySelectorAll("[data-count]"));

function animateCounter(element) {
  const target = Number(element.dataset.count || 0);
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");

      if (entry.target.matches(".hero")) {
        counters.forEach(animateCounter);
      }

      const id = entry.target.getAttribute("id");
      if (id) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  },
  {
    threshold: 0.2,
  }
);

reveals.forEach((section) => observer.observe(section));
document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

window.addEventListener("load", () => {
  document.querySelector(".hero")?.classList.add("visible");
});
