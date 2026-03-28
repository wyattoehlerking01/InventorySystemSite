const menuButton = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    mobileNav.classList.toggle("is-open");
  });

  // Close menu when a link is clicked
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("is-open");
    });
  });
}

const counters = document.querySelectorAll("[data-counter]");

const animateCounter = (el) => {
  const raw = Number(el.dataset.counter);

  if (!Number.isFinite(raw)) {
    return;
  }

  const duration = 1300;
  const startTime = performance.now();
  const decimals = Number.isInteger(raw) ? 0 : 1;

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = raw * eased;

    el.textContent = value.toFixed(decimals);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      animateCounter(entry.target);
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.45 }
);

counters.forEach((counter) => observer.observe(counter));

const billingButtons = document.querySelectorAll(".billing-toggle button");
const prices = document.querySelectorAll(".price");

billingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    billingButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");

    const mode = button.dataset.plan;
    const duration = mode === "yearly" ? "year" : "month";

    prices.forEach((price) => {
      const amount = mode === "yearly" ? price.dataset.yearly : price.dataset.monthly;
      if (!amount) {
        return;
      }

      // Convert yearly to monthly for display
      const displayAmount = mode === "yearly" ? Math.round(Number(amount) / 12) : amount;
      const span = price.querySelector("span");
      if (span) {
        span.textContent = "$" + displayAmount;
      }

      // Update period text
      const periodText = mode === "yearly" ? "/year" : "/month";
      price.lastChild.textContent = periodText;
    });
  });
});

// Waitlist form handling
const waitlistForm = document.getElementById("waitlistForm");
if (waitlistForm) {
  waitlistForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    // Store to localStorage (for demo purposes)
    const waitlist = JSON.parse(localStorage.getItem("tbd-waitlist") || "[]");
    if (!waitlist.includes(email)) {
      waitlist.push(email);
      localStorage.setItem("tbd-waitlist", JSON.stringify(waitlist));
    }

    // Show confirmation
    alert(
      "Thanks for joining the waitlist! Check your email for next steps. (Demo: saved to browser storage)"
    );
    emailInput.value = "";
  });
}

// Demo form handling
const demoForm = document.getElementById("demoForm");
if (demoForm) {
  demoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("demo-name").value.trim();
    const school = document.getElementById("demo-school").value.trim();
    const email = document.getElementById("demo-email").value.trim();

    if (!name || !school || !email) {
      alert("Please fill in all required fields.");
      return;
    }

    // Store demo request to localStorage (for demo purposes)
    const demoRequests = JSON.parse(localStorage.getItem("tbd-demos") || "[]");
    demoRequests.push({
      name,
      school,
      email,
      role: document.getElementById("demo-role").value,
      district: document.getElementById("demo-district").value,
      date: document.getElementById("demo-date").value,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("tbd-demos", JSON.stringify(demoRequests));

    alert(
      "Demo request submitted! We'll contact you soon to schedule. (Demo: saved to browser storage)"
    );
    demoForm.reset();
  });
}

// Newsletter form handling
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = newsletterForm.querySelector("input[type='email']");
    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    // Store to localStorage (for demo purposes)
    const newsletter = JSON.parse(localStorage.getItem("tbd-newsletter") || "[]");
    if (!newsletter.includes(email)) {
      newsletter.push(email);
      localStorage.setItem("tbd-newsletter", JSON.stringify(newsletter));
    }

    alert(
      "Thanks for subscribing! Check your email to confirm. (Demo: saved to browser storage)"
    );
    emailInput.value = "";
  });
}