document.addEventListener("DOMContentLoaded", () => {
    // Animate lazy sections with GSAP as they scroll into view
    gsap.utils.toArray(".lazy-section").forEach(section => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
    });
  
    // IntersectionObserver for lazy-loading sections
    const lazySections = document.querySelectorAll(".lazy-section");
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded");
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px 200px 0px" });
  
    lazySections.forEach(section => observer.observe(section));
  });
  