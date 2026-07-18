const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");
const revealElements = document.querySelectorAll(".reveal");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTab = button.dataset.tab;

    tabButtons.forEach((item) => {
      const isSelected = item === button;
      item.classList.toggle("active", isSelected);
      item.setAttribute("aria-selected", String(isSelected));
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === selectedTab);
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => observer.observe(element));
year.textContent = new Date().getFullYear();
