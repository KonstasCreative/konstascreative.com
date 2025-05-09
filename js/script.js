const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const dropdownMenu = document.querySelector(".dropdown-menu");
const dropdownLinks = document.querySelectorAll(".dropdown-menu ul a");
let isMobileSetup = false;
let lastScrollY = window.scrollY;
let lastWidthMode = window.innerWidth <= 768;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const isMobile = window.innerWidth <= 768;

  // If we’ve just crossed the 768px threshold, clear any leftover styles
  if (isMobile !== lastWidthMode) {
    navbar.style.transform = "";
    lastWidthMode = isMobile;
  }

  if (isMobile) {
    // Always show at the very top
    if (currentScrollY === 0) {
      navbar.style.transform = "translateY(0)";
      navbar.classList.remove("navbar-scroll");
    } else {
      // Scrolling down? hide. Scrolling up? show.
      if (currentScrollY > lastScrollY) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
        navbar.classList.add("navbar-scroll");
      }
    }
  } else {
    // On desktop: keep your existing “navbar-scroll” logic
    if (currentScrollY > 100) {
      navbar.classList.add("navbar-scroll");
    } else {
      navbar.classList.remove("navbar-scroll");
    }
  }

  lastScrollY = currentScrollY;
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
