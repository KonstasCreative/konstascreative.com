document.addEventListener("DOMContentLoaded", () => {
  const steps = Array.from(document.querySelectorAll(".process-step"));
  const wrapper = document.querySelector(".steps-wrapper");
  const stickyTop = 100;
  const triggerLast = 200;
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const padPx = 2 * rem; // your 2rem padding in px
  const containerH = window.innerHeight - stickyTop;
  const numSteps = steps.length;
  const maxScroll = numSteps * containerH;

  // 1) Build dynamic offsets array:
  //    offsets[0] = 0 (first card sits at top 0 when fully in);
  //    offsets[i] = offsets[i-1] + height of previous h3 + padPx
  const offsets = steps.reduce((acc, step, i) => {
    if (i === 0) {
      acc.push(0);
    } else {
      const prevH3 = steps[i - 1].querySelector("h3");
      const prevHgt = prevH3.getBoundingClientRect().height;
      acc.push(acc[i - 1] + prevHgt + padPx);
    }
    return acc;
  }, []);

  function hideAll() {
    steps.forEach((s) => {
      s.style.top = containerH + "px";
      s.style.opacity = 0;
      const icon = s.querySelector(".step-completed");
      if (icon) icon.style.display = "none";
    });
  }

  function onScroll() {
    const rect = wrapper.getBoundingClientRect();
    if (rect.top > stickyTop || rect.bottom < stickyTop) {
      hideAll();
      return;
    }

    const scrolled = Math.min(stickyTop - rect.top, maxScroll);

    steps.forEach((step, i) => {
      let enterStart, enterEnd;
      if (i < numSteps - 1) {
        enterStart = i * containerH;
        enterEnd = (i + 1) * containerH;
      } else {
        enterStart = maxScroll - triggerLast;
        enterEnd = maxScroll;
      }

      const rawProg = (scrolled - enterStart) / (enterEnd - enterStart);
      const prog = Math.max(0, Math.min(rawProg, 1));

      // lerp from off-screen bottom → dynamic offset
      const topPx = (1 - prog) * containerH + prog * offsets[i];
      step.style.top = topPx + "px";
      step.style.opacity = prog;

      // toggle icon
      const icon = step.querySelector(".step-completed");
      if (icon)
        icon.style.display = scrolled >= enterEnd ? "inline-block" : "none";
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
