// A blocked autoplay should keep its poster and offer a real user-gesture retry.
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let player = null;
let playButton = null;
let pendingPlay = null;
let policyBlocked = false;
let modalWasOpen = false;

function canPlay() {
  if (!player || !player.isConnected || document.hidden || motionPreference.matches) return false;
  if (document.querySelector(".v2-case")) return false;
  const bounds = player.closest(".v2-hero").getBoundingClientRect();
  return bounds.bottom > 0 && bounds.top < window.innerHeight;
}

function updateButton() {
  if (playButton) playButton.hidden = !policyBlocked || !canPlay();
}

function playbackStarted() {
  policyBlocked = false;
  if (player) player.dataset.playbackState = "playing";
  updateButton();
}

function attemptPlayback(fromGesture = false) {
  if (!canPlay()) { updateButton(); return; }
  if (!player.paused) { playbackStarted(); return; }
  // A gesture must call play synchronously, even if an earlier attempt is pending.
  if (pendingPlay && !fromGesture) return;
  const video = player;
  const token = {};
  pendingPlay = token;
  const rejected = (error) => {
    if (player !== video || pendingPlay !== token) return;
    pendingPlay = null;
    if (error && error.name === "NotAllowedError") {
      policyBlocked = true;
      video.dataset.playbackState = "blocked";
    }
    // AbortError during a modal pause is expected; do not advertise a broken video.
    updateButton();
  };
  try {
    const result = video.play();
    if (result && typeof result.then === "function") {
      result.then(() => {
        if (player !== video || pendingPlay !== token) return;
        pendingPlay = null;
        if (!video.paused) playbackStarted();
      }).catch(rejected);
    } else {
      pendingPlay = null;
    }
  } catch (error) { rejected(error); }
}

function attachPlayer(video) {
  player = video;
  pendingPlay = null;
  policyBlocked = false;
  // Set both DOM properties and legacy inline flags for embedded mobile browsers.
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("x5-playsinline", "true");
  video.setAttribute("aria-hidden", "true");
  video.tabIndex = -1;

  playButton = document.createElement("button");
  playButton.type = "button";
  playButton.className = "hero-playback-button";
  playButton.textContent = "播放首页动效";
  playButton.setAttribute("aria-label", "播放首页动效");
  playButton.hidden = true;
  playButton.addEventListener("click", () => attemptPlayback(true));
  video.closest(".v2-hero").append(playButton);

  video.addEventListener("playing", playbackStarted);
  video.addEventListener("loadeddata", () => attemptPlayback());
  video.addEventListener("canplay", () => attemptPlayback());
  video.addEventListener("pause", () => {
    if (player !== video) return;
    video.dataset.playbackState = "paused";
    updateButton();
  });
  // No load(), source replacement or time reset: preserve the continuous animation.
  attemptPlayback();
}

function scanPlayer() {
  const video = document.querySelector("video.v2-hero-video");
  if (video && video !== player) {
    if (playButton) playButton.remove();
    attachPlayer(video);
  }
  const modalOpen = Boolean(document.querySelector(".v2-case"));
  if (modalOpen !== modalWasOpen) {
    modalWasOpen = modalOpen;
    if (modalOpen) updateButton();
    else attemptPlayback();
  }
}

// WeChat may initialize its bridge either before or after React mounts the video.
document.addEventListener("WeixinJSBridgeReady", () => {
  scanPlayer();
  attemptPlayback();
});
// The first tap also works when WeChat or iOS still requires user interaction.
for (const event of ["touchstart", "touchend", "pointerdown", "click", "keydown"]) {
  document.addEventListener(event, () => attemptPlayback(true), { capture: true, passive: true });
}
document.addEventListener("visibilitychange", () => attemptPlayback());
window.addEventListener("pageshow", () => attemptPlayback());
window.addEventListener("scroll", () => {
  if (player && player.paused && !policyBlocked) attemptPlayback();
}, { passive: true });
const motionChanged = () => {
  if (motionPreference.matches && player) player.pause();
  else attemptPlayback();
  updateButton();
};
if (motionPreference.addEventListener) motionPreference.addEventListener("change", motionChanged);
else motionPreference.addListener(motionChanged);

const playbackObserver = new MutationObserver(scanPlayer);
playbackObserver.observe(document.getElementById("root"), { childList: true, subtree: true });
scanPlayer();
