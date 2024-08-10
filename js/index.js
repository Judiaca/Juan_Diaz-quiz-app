// Toggle bookmark state
function toggleBookmark(button) {
  const inactiveIcon = button.querySelector(".card__bookmark-icon--inactive");
  const activeIcon = button.querySelector(".card__bookmark-icon--active");

  if (inactiveIcon.style.display === "none") {
    inactiveIcon.style.display = "block";
    activeIcon.style.display = "none";
  } else {
    inactiveIcon.style.display = "none";
    activeIcon.style.display = "block";
  }
}

// Show the answer when the button is clicked
function selectAnswer(button) {
  const card = button.closest(".card");
  const answer = card.querySelector(".card__answer");
  const showButton = card.querySelector(".card__show-answer");
  const hideButton = card.querySelector(".card__hide-answer");

  answer.hidden = false;
  showButton.style.display = "none";
  hideButton.style.display = "block";
}

// Hide the answer when the button is clicked
function hideAnswer(button) {
  const card = button.closest(".card");
  const answer = card.querySelector(".card__answer");
  const showButton = card.querySelector(".card__show-answer");
  const hideButton = card.querySelector(".card__hide-answer");

  answer.hidden = true;
  showButton.style.display = "block";
  hideButton.style.display = "none";
}

// Set active state on navigation links
function setActiveLink() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar__link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (path.includes(href)) {
      link.classList.add("navbar__link--active");
    } else {
      link.classList.remove("navbar__link--active");
    }
  });
}

// Initialize the script
document.addEventListener("DOMContentLoaded", function () {
  setActiveLink();

  // Add event listeners for show/hide answer buttons
  document.querySelectorAll(".card__show-answer").forEach((button) => {
    button.addEventListener("click", function () {
      selectAnswer(button);
    });
  });

  document.querySelectorAll(".card__hide-answer").forEach((button) => {
    button.addEventListener("click", function () {
      hideAnswer(button);
    });
  });

  // Add event listeners for bookmark buttons
  document.querySelectorAll(".card__bookmark").forEach((button) => {
    button.addEventListener("click", function () {
      toggleBookmark(button);
    });
  });
});
