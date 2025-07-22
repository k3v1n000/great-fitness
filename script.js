// Siempre quitar el hash al cargar para ir al inicio (top)
window.addEventListener("DOMContentLoaded", function () {
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname);
    window.scrollTo({ top: 0, behavior: "auto" });
  }
});

// Smooth scroll para #top (volver al inicio)
document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// Smooth scroll para otros links internos
document.querySelectorAll('a[href^="#"]:not([href="#top"])').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Tomar en cuenta el scroll-margin-top del target
      const style = window.getComputedStyle(targetElement);
      const scrollMarginTop =
        parseInt(style.getPropertyValue("scroll-margin-top")) || 0;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - 70; // altura del header fijo
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Animación/revelar módulos al entrar al viewport
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("show")) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".module, .hero-content").forEach((sec) => {
  revealObserver.observe(sec);
});
