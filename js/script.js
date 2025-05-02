const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  scrollY > 100
    ? navbar.classList.add("navbar-scroll")
    : navbar.classList.remove("navbar-scroll");
});
