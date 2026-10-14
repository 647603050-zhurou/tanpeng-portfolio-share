// Delegation also covers dialogs inserted later by React or the case modules.
const pointerRegions = ".v2-case-summary, .sports-case-intro";
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let pending = null;
let frame = 0;

document.addEventListener("pointermove", (event) => {
  if (!finePointer.matches || reducedMotion.matches || event.pointerType === "touch") return;
  const region = event.target instanceof Element ? event.target.closest(pointerRegions) : null;
  if (!region) return;
  pending = { region, x: event.clientX, y: event.clientY };
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    const { region, x, y } = pending;
    pending = null;
    if (!region.isConnected) return;
    const bounds = region.getBoundingClientRect();
    region.style.setProperty("--case-pointer-x", `${x - bounds.left}px`);
    region.style.setProperty("--case-pointer-y", `${y - bounds.top}px`);
  });
}, { passive: true });
