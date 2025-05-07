const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const dropdownMenu = document.querySelector(".dropdown-menu");
const dropdownLinks = document.querySelectorAll(".dropdown-menu ul a");
let isMobileSetup = false;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  scrollY > 100
    ? navbar.classList.add("navbar-scroll")
    : navbar.classList.remove("navbar-scroll");
});

function toggleDropdown() {
  const isOpen = navbar.classList.toggle("dropdown-active");
  dropdownMenu.style.display = isOpen ? "flex" : "none";
  document.body.style.overflow = isOpen ? "hidden" : "auto";
}

function resetDropdown() {
  navbar.classList.remove("dropdown-active");
  dropdownMenu.style.display = "none";
  document.body.style.overflow = "auto";
}

// Set up mobile behavior: click on hamburger + links
function setupMobile() {
  if (isMobileSetup) return;
  hamburger.addEventListener("click", toggleDropdown);
  dropdownLinks.forEach((link) =>
    link.addEventListener("click", resetDropdown)
  );
  isMobileSetup = true;
}

// Tear down mobile behavior: remove listeners + reset
function teardownMobile() {
  if (!isMobileSetup) return;
  hamburger.removeEventListener("click", toggleDropdown);
  dropdownLinks.forEach((link) =>
    link.removeEventListener("click", resetDropdown)
  );
  resetDropdown();
  isMobileSetup = false;
}

// Called on load and resize
function handleResize() {
  if (window.innerWidth < 1400) {
    setupMobile();
  } else {
    teardownMobile();
  }
}

// Initial check
handleResize();
// Re-check on every resize
window.addEventListener("resize", handleResize);
