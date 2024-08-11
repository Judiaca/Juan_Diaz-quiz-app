document.addEventListener("DOMContentLoaded", () => {
  const bookmarkButtons = document.querySelectorAll(".card__bookmark");

  // Load initial bookmark states from localStorage
  bookmarkButtons.forEach((button) => {
    const cardId = button.closest(".card").parentElement.id;
    const isBookmarked = localStorage.getItem(cardId) === "true";
    updateBookmarkIcon(button, isBookmarked);
  });

  bookmarkButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const cardId = button.closest(".card").parentElement.id;
      let isBookmarked = localStorage.getItem(cardId) === "true";
      isBookmarked = !isBookmarked;
      localStorage.setItem(cardId, isBookmarked);
      updateBookmarkIcon(button, isBookmarked);

      // Update bookmark page dynamically
      if (document.body.classList.contains("bookmarks-page")) {
        toggleCardVisibility(cardId, isBookmarked);
      }
    });
  });
  function updateBookmarkIcon(button, isBookmarked) {
    const inactiveIcon = button.querySelector(".card__bookmark-icon--inactive");
    const activeIcon = button.querySelector(".card__bookmark-icon--active");
    if (isBookmarked) {
      inactiveIcon.style.display = "none";
      activeIcon.style.display = "block";
    } else {
      inactiveIcon.style.display = "block";
      activeIcon.style.display = "none";
    }
  }

  function toggleCardVisibility(cardId, isVisible) {
    const card = document.getElementById(cardId);
    if (isVisible) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  }
  const showAnswerButtons = document.querySelectorAll(".card__show-answer");
  const hideAnswerButtons = document.querySelectorAll(".card__hide-answer");
  const optionButtons = document.querySelectorAll(".card__option-btn");

  showAnswerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const correctAnswer = card.querySelector(".card__answer").textContent;
      const optionButtons = card.querySelectorAll(".card__option-btn");

      optionButtons.forEach((btn) => {
        if (btn.textContent === correctAnswer) {
          btn.classList.add("card__option-btn--correct");
        } else if (btn.classList.contains("card__option-btn--selected")) {
          btn.classList.add("card__option-btn--wrong");
        }
        btn.disabled = true; // Disable all buttons after showing the answer
      });

      card.querySelector(".card__answer").removeAttribute("hidden");
      button.style.display = "none";
      card.querySelector(".card__hide-answer").style.display = "block";
    });
  });

  hideAnswerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const optionButtons = card.querySelectorAll(".card__option-btn");

      optionButtons.forEach((btn) => {
        btn.classList.remove(
          "card__option-btn--correct",
          "card__option-btn--wrong",
          "card__option-btn--selected"
        );
        btn.disabled = false; // Re-enable buttons
      });

      card.querySelector(".card__answer").setAttribute("hidden", "true");
      button.style.display = "none";
      card.querySelector(".card__show-answer").style.display = "block";
    });
  });

  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const optionButtons = card.querySelectorAll(".card__option-btn");

      optionButtons.forEach((btn) => {
        btn.classList.remove("card__option-btn--selected");
      });

      button.classList.add("card__option-btn--selected");
    });
  });

  // Update footer icons based on the current page
  updateFooterIcons();
});

function updateBookmarkIcon(button, isBookmarked) {
  const inactiveIcon = button.querySelector(".card__bookmark-icon--inactive");
  const activeIcon = button.querySelector(".card__bookmark-icon--active");
  if (isBookmarked) {
    inactiveIcon.style.display = "none";
    activeIcon.style.display = "block";
  } else {
    inactiveIcon.style.display = "block";
    activeIcon.style.display = "none";
  }
}

// Function to update the footer icons based on the current page
function updateFooterIcons() {
  const currentPage = window.location.pathname.split("/").pop(); // Get the current page name

  const footerLinks = document.querySelectorAll(".navbar__link");

  footerLinks.forEach((link) => {
    const iconActive = link.querySelector("img:not(.navbar__icon--inactive)");
    const iconInactive = link.querySelector("img.navbar__icon--inactive");

    if (link.getAttribute("href").includes(currentPage)) {
      iconActive.style.display = "block";
      iconInactive.style.display = "none";
    } else {
      iconActive.style.display = "none";
      iconInactive.style.display = "block";
    }
  });
}

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
