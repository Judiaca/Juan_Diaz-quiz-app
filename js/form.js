document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-question-form");
  const questionInput = document.getElementById("question");
  const answerInput = document.getElementById("answer");
  const questionCharCount = document.getElementById("question-char-count");
  const answerCharCount = document.getElementById("answer-char-count");

  // Update character count display
  function updateCharCount(input, display) {
    display.textContent = `${input.value.length}/${input.maxLength}`;
  }

  questionInput.addEventListener("input", () =>
    updateCharCount(questionInput, questionCharCount)
  );
  answerInput.addEventListener("input", () =>
    updateCharCount(answerInput, answerCharCount)
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const questionText = questionInput.value.trim();
    const answerText = answerInput.value.trim();

    if (questionText && answerText) {
      // Create a new card
      const card = document.createElement("div");
      card.classList.add("card");
      const cardId = `card-${Date.now()}`; // Unique ID for the card
      card.id = cardId;

      card.innerHTML = `
                <div class="card__content">
                    <h2 class="card__question">${questionText}</h2>
                    <button class="card__bookmark">
                        <img src="./img/bookmark_inactive.png" alt="Bookmark" class="card__bookmark-icon card__bookmark-icon--inactive" />
                        <img src="./img/bookmark_active.png" alt="Bookmarked" class="card__bookmark-icon card__bookmark-icon--active" style="display: none;" />
                    </button>
                    <p class="card__answer" hidden>${answerText}</p>
                    <button class="card__show-answer">Show Answer</button>
                    <button class="card__hide-answer" style="display: none;">Hide Answer</button>
                </div>
                <div class="card__options">
                    <button class="card__option-btn">${answerText}</button>
                    <!-- Add other options here if needed -->
                </div>
            `;

      // Add the new card to the homepage
      const questionCards = document.getElementById("question-cards");
      questionCards.appendChild(card);

      // Clear the form
      form.reset();
      updateCharCount(questionInput, questionCharCount);
      updateCharCount(answerInput, answerCharCount);

      // Trigger the new card's event listeners
      initializeCardEvents(card);
    }
  });
});

// Function to initialize card events (copied from index.js)
function initializeCardEvents(card) {
  const bookmarkButton = card.querySelector(".card__bookmark");
  const showAnswerButton = card.querySelector(".card__show-answer");
  const hideAnswerButton = card.querySelector(".card__hide-answer");
  const optionButtons = card.querySelectorAll(".card__option-btn");

  // Bookmark button event
  bookmarkButton.addEventListener("click", () => {
    const cardId = card.id;
    let isBookmarked = localStorage.getItem(cardId) === "true";
    isBookmarked = !isBookmarked;
    localStorage.setItem(cardId, isBookmarked);
    updateBookmarkIcon(bookmarkButton, isBookmarked);
  });

  // Show answer button event
  showAnswerButton.addEventListener("click", () => {
    const correctAnswer = card.querySelector(".card__answer").textContent;
    optionButtons.forEach((btn) => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("card__option-btn--correct");
      } else if (btn.classList.contains("card__option-btn--selected")) {
        btn.classList.add("card__option-btn--wrong");
      }
      btn.disabled = true;
    });

    card.querySelector(".card__answer").removeAttribute("hidden");
    showAnswerButton.style.display = "none";
    hideAnswerButton.style.display = "block";
  });

  // Hide answer button event
  hideAnswerButton.addEventListener("click", () => {
    optionButtons.forEach((btn) => {
      btn.classList.remove(
        "card__option-btn--correct",
        "card__option-btn--wrong",
        "card__option-btn--selected"
      );
      btn.disabled = false;
    });

    card.querySelector(".card__answer").setAttribute("hidden", "true");
    hideAnswerButton.style.display = "none";
    showAnswerButton.style.display = "block";
  });

  // Option buttons event
  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      optionButtons.forEach((btn) => {
        btn.classList.remove("card__option-btn--selected");
      });
      button.classList.add("card__option-btn--selected");
    });
  });
}

// Function to update bookmark icon (copied from index.js)
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
