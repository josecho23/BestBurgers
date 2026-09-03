const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const backToTop = document.getElementById("backToTop");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll(".menu-section")];

function hideLoader() {
  setTimeout(() => loader.classList.add("is-hidden"), 350);
}

if (document.readyState === "complete") {
  hideLoader();
} else {
  window.addEventListener("load", hideLoader, { once: true });
}

function setTheme(dark) {
  document.documentElement.classList.toggle("dark", dark);
  themeIcon.textContent = dark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  localStorage.setItem("best-burgers-theme", dark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("best-burgers-theme");
setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", () => {
  setTheme(!document.documentElement.classList.contains("dark"));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;

  const id = visible.target.id;
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}, {
  rootMargin: "-30% 0px -55% 0px",
  threshold: [0, .2, .5, .8]
});

sections.forEach(section => observer.observe(section));

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 600);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
