document.addEventListener("DOMContentLoaded", () => {
    let revenue = 0;
    const revenueAmountEl = document.getElementById("revenue-amount");
    const finalRevenueEl = document.getElementById("final-revenue");
  
    // Update revenue counter
    function updateRevenue(amount) {
      revenue += amount;
      revenueAmountEl.textContent = revenue.toFixed(2);
      finalRevenueEl.textContent = revenue.toFixed(2);
    }
  
    // GSAP Animations for sections
    gsap.utils.toArray(".monetization-section").forEach(section => {
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
  
    // Click handlers for monetization reveals
    document.querySelectorAll(".reveal-btn").forEach(button => {
      button.addEventListener("click", function () {
        const method = this.dataset.method;
        const section = this.closest(".monetization-section");
        const revealedContent = section.querySelector(".revealed-content");
  
        if (revealedContent.dataset.loaded === "true") return;
        revealedContent.dataset.loaded = "true";
  
        switch (method) {
          case "display-ads":
            revealedContent.innerHTML = `<p><strong>Earned $5!</strong> Display ads (e.g., Google AdSense) show banners or videos. <em>Do:</em> Place strategically. <em>Don’t:</em> Overload the page.</p>`;
            updateRevenue(5);
            break;
          case "affiliate-marketing":
            fetch("affiliate.json")
              .then(response => response.json())
              .then(data => {
                let content = "<p><strong>Earned $10!</strong> Promote products for commissions. <em>Do:</em> Choose relevant products. <em>Don’t:</em> Spam links.</p><ul>";
                data.forEach(product => {
                  content += `<li><a href="${product.link}" target="_blank">${product.name}</a></li>`;
                });
                content += "</ul>";
                revealedContent.innerHTML = content;
                updateRevenue(10);
              })
              .catch(() => {
                revealedContent.innerHTML = "<p>Error loading affiliates. Try again!</p>";
              });
            break;
          case "sponsored-content":
            revealedContent.innerHTML = `<p><strong>Earned $15!</strong> Brands pay for posts. <em>Do:</em> Disclose sponsorships. <em>Don’t:</em> Mislead readers.</p><p>[Sponsor: CoolBrand™]</p>`;
            updateRevenue(15);
            break;
          case "digital-products":
            revealedContent.innerHTML = `<p><strong>Earned $20!</strong> Sell eBooks or courses (e.g., via Gumroad). <em>Do:</em> Offer value. <em>Don’t:</em> Overpromise.</p><a href="https://gumroad.com" target="_blank">Buy Now</a>`;
            updateRevenue(20);
            break;
          case "paywalls":
            revealedContent.innerHTML = `<p><strong>Earned $25!</strong> Lock premium content. <em>Do:</em> Provide teasers. <em>Don’t:</em> Hide too much.</p><p>[Premium Locked]</p>`;
            updateRevenue(25);
            break;
          case "dropshipping":
            revealedContent.innerHTML = `<p><strong>Earned $30!</strong> Sell products without inventory. <em>Do:</em> Research suppliers. <em>Don’t:</em> Ignore shipping delays.</p><p>[Mock Store]</p>`;
            updateRevenue(30);
            break;
          case "donations":
            revealedContent.innerHTML = `<p><strong>Earned $5!</strong> Ask for support (e.g., Buy Me a Coffee). <em>Do:</em> Be grateful. <em>Don’t:</em> Beg excessively.</p><a href="https://www.buymeacoffee.com" target="_blank">Donate</a>`;
            updateRevenue(5);
            break;
        }
  
        revealedContent.style.display = "block";
        gsap.from(revealedContent, { opacity: 0, duration: 0.5 });
      });
    });
  });