const cardsContainer = document.querySelector(".cards-container");

cardsContainer.addEventListener("mousemove", (e) => {
  const rect = cardsContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  cardsContainer.style.setProperty("--x", `${x}px`);
  cardsContainer.style.setProperty("--y", `${y}px`);
});
