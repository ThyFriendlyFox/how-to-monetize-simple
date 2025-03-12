document.addEventListener("DOMContentLoaded", () => {
  // Initialize GSAP ScrollTrigger
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)

    // Animate sections as they come into view
    gsap.utils.toArray(".lazy-section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    })

    // Animate header elements on page load
    gsap.from(".site-title", { opacity: 0, y: -20, duration: 1, delay: 0.2 })
    gsap.from(".site-description", { opacity: 0, y: -15, duration: 1, delay: 0.4 })
    gsap.from(".header-cta", { opacity: 0, y: -10, duration: 1, delay: 0.6 })
    gsap.from("#revenue-counter", { opacity: 0, y: -5, duration: 1, delay: 0.8 })
  }

  // IntersectionObserver for lazy-loading sections
  const lazySections = document.querySelectorAll(".lazy-section")
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded")
          obs.unobserve(entry.target)
        }
      })
    },
    { rootMargin: "0px 0px 200px 0px" },
  )

  lazySections.forEach((section) => observer.observe(section))

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        })
      }
    })
  })

  // Simple revenue counter animation
  const revenueCounter = document.getElementById("revenue-counter")
  if (revenueCounter) {
    const updateCounter = () => {
      const now = new Date()
      const startOfYear = new Date(now.getFullYear(), 0, 1)
      const daysPassed = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000))

      // Simulate revenue growth based on days passed in the year
      const baseRevenue = 50000 // Base annual revenue
      const currentRevenue = Math.floor(baseRevenue * (daysPassed / 365))

      revenueCounter.innerHTML = `<i class="fas fa-chart-line"></i> Helping creators earn $${currentRevenue.toLocaleString()} this year`
    }

    updateCounter()
    setInterval(updateCounter, 60000) // Update every minute
  }

  // Handle fixed navigation on scroll
  const nav = document.querySelector(".site-nav")
  let lastScrollY = window.scrollY

  window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) {
      nav.classList.add("nav-hidden")
    } else {
      nav.classList.remove("nav-hidden")
    }

    lastScrollY = window.scrollY
  })
})

// Add mobile menu functionality
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuButton) {
  mobileMenuButton.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    mobileMenuButton.setAttribute(
      'aria-expanded', 
      navLinks.classList.contains('show').toString()
    );
  });
}

// Fix the GSAP animation to handle cases where GSAP isn't loaded yet
window.addEventListener('load', () => {
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)

    // Animate sections as they come into view
    gsap.utils.toArray(".lazy-section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    })

    // Animate header elements on page load
    gsap.from(".site-title", { opacity: 0, y: -20, duration: 1, delay: 0.2 })
    gsap.from(".site-description", { opacity: 0, y: -15, duration: 1, delay: 0.4 })
    gsap.from(".header-cta", { opacity: 0, y: -10, duration: 1, delay: 0.6 })
    gsap.from("#revenue-counter", { opacity: 0, y: -5, duration: 1, delay: 0.8 })
  } else {
    // Fallback for when GSAP isn't loaded
    document.querySelectorAll(".lazy-section").forEach(section => {
      section.classList.add("loaded");
    });
  }
});
