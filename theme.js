const themeToggle = document.querySelector("#theme-toggle");
const THEME_KEY = "finalDetailTheme";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "Light" : "Dark";
  }
}

let saved = "light";
try {
  saved = localStorage.getItem(THEME_KEY) || "light";
} catch (e) {}

applyTheme(saved);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
  });
}