const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  scrollY > 100
    ? navbar.classList.add("navbar-scroll")
    : navbar.classList.remove("navbar-scroll");
});

// Glow effect on button
document.querySelectorAll(".secondaryBtn").forEach((button) => {
  // Set default glow position to the right end
  button.style.setProperty("--x", "100%");

  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty("--x", `${x}px`);
  });

  button.addEventListener("mouseleave", () => {
    // Reset to default position when mouse leaves
    button.style.setProperty("--x", "90%");
  });
});
