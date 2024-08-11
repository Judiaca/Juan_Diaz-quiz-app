document.addEventListener("DOMContentLoaded", () => {
  const darkModeSwitch = document.getElementById("dark-mode-switch");
  const body = document.body;

  // Load dark mode state from localStorage
  const darkModeEnabled = localStorage.getItem("darkMode") === "true";
  if (darkModeEnabled) {
    body.classList.add("dark-mode");
    darkModeSwitch.checked = true;
  }

  // Toggle dark mode
  darkModeSwitch.addEventListener("change", () => {
    if (darkModeSwitch.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  });

  // Handle navbar icons based on dark mode
  const navbarLinks = document.querySelectorAll(".navbar__link");
  navbarLinks.forEach((link) => {
    const inactiveIcon = link.querySelector(".navbar__icon--inactive");
    const activeIcon = link.querySelector(".navbar__icon");

    if (link.classList.contains("navbar__link--active")) {
      inactiveIcon.style.display = "none";
      activeIcon.style.display = "block";
    } else {
      inactiveIcon.style.display = "block";
      activeIcon.style.display = "none";
    }
  });
});
