const menuButton = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    mobileNav.classList.toggle("is-open");
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
    const duration = mode === "yearly" ? "year" : "seat";

    prices.forEach((price) => {
      const amount = mode === "yearly" ? price.dataset.yearly : price.dataset.monthly;
      const span = price.querySelector("span");
      if (!span || !amount) {
        return;
      }

      span.textContent = "$" + amount;
      price.lastChild.textContent = "/" + duration;
    });
  });
});