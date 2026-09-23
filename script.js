const acceptButton = document.querySelector("#acceptButton");
const responseModal = document.querySelector("#responseModal");
const closeButton = document.querySelector("#closeButton");
const confettiContainer = document.querySelector("#confetti");
const heartRain = document.querySelector("#heartRain");

function dropHeart(initial = false) {
  const heart = document.createElement("span");
  const duration = 7 + Math.random() * 6;

  heart.className = "falling-heart";
  heart.textContent = "♥";
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.fontSize = `${7 + Math.random() * 8}px`;
  heart.style.opacity = `${0.15 + Math.random() * 0.35}`;
  heart.style.setProperty("--heart-duration", `${duration}s`);
  heart.style.setProperty("--heart-drift", `${-45 + Math.random() * 90}px`);
  heart.style.animationDelay = initial ? `${-Math.random() * duration}s` : "0s";
  heartRain.appendChild(heart);

  heart.addEventListener("animationend", () => heart.remove());
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  for (let index = 0; index < 14; index += 1) dropHeart(true);
  window.setInterval(dropHeart, 650);
}

function celebrate() {
  const colors = ["#f7eee6", "#e9b8bd", "#b76078", "#8d2e4a"];
  for (let index = 0; index < 42; index += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.setProperty("--duration", `${2.1 + Math.random() * 1.8}s`);
    piece.style.setProperty("--drift", `${-100 + Math.random() * 200}px`);
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    confettiContainer.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

acceptButton.addEventListener("click", () => {
  celebrate();
  responseModal.showModal();
});

closeButton.addEventListener("click", () => responseModal.close());

responseModal.addEventListener("click", (event) => {
  const bounds = responseModal.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) responseModal.close();
});
