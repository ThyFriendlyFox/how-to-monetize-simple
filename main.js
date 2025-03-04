document.addEventListener("DOMContentLoaded", () => {
    let revenue = 0;
    const revenueAmountEl = document.getElementById("revenue-amount");
    const finalRevenueEl = document.getElementById("final-revenue");
  
    // Function to update revenue display
    function updateRevenue(amount) {
      revenue += amount;
      revenueAmountEl.textContent = revenue.toFixed(2);
      if (finalRevenueEl) {
        finalRevenueEl.textContent = revenue.toFixed(2);
      }
    }
  
    // Attach event listeners to simulation buttons
    document.querySelectorAll("button.simulate-btn").forEach(button => {
      button.addEventListener("click", function() {
        const method = this.dataset.method;
        let amount = 0;
        switch (method) {
          case "display-ads":
            amount = 0.10;
            break;
          case "affiliate-marketing":
            amount = 5.00;
            break;
          case "sponsored-content":
            amount = 50.00;
            break;
          case "digital-products":
            amount = 9.99;
            break;
          case "memberships":
            amount = 10.00;
            break;
          case "donations":
            amount = 3.00;
            break;
          default:
            amount = 0;
        }
        updateRevenue(amount);
        alert(`You earned $${amount.toFixed(2)}!`);
      });
    });
  
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
  