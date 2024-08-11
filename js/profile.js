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

  // Update counters dynamically (example logic, replace with actual data)
  document.getElementById("created-questions-count").textContent = 12; // Example count
  document.getElementById("bookmarks-count").textContent = 5; // Example count
});
