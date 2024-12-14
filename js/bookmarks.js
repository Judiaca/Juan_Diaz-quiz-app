document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".quiz-app__question-card");

  cards.forEach((card) => {
    const cardId = card.id;
    const isBookmarked = localStorage.getItem(cardId) === "true";
    if (!isBookmarked) {
      card.style.display = "none";
    }
  });
});
