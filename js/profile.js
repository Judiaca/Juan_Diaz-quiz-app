document.addEventListener("DOMContentLoaded", () => {
  const darkModeSwitch = document.getElementById("dark-mode-switch");
  const body = document.body;
  // Function to update the number of questions created
  function updateQuestionsCreatedCount() {
    // For demonstration, assume this is a static number or retrieved from a data source
    // In a real application, you would fetch this data from a server or local storage
    const questionsCreatedCount =
      localStorage.getItem("questionsCreatedCount") || 0;
    document.getElementById("questions-created-count").textContent =
      questionsCreatedCount;
  }

  // Function to update the number of bookmarks
  function updateBookmarksCount() {
    let bookmarksCount = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith("bookmark_")) {
        bookmarksCount += localStorage.getItem(key) === "true" ? 1 : 0;
      }
    }
    document.getElementById("bookmarks-count").textContent = bookmarksCount;
  }

  // Initialize the counters when the page loads
  updateQuestionsCreatedCount();
  updateBookmarksCount();

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
