// Warm only the opening images of nearby cases; touch devices do not need hover.
const profiles = {
  "打开鲍堡芝项目详情": ["./projects/baobao-01.webp?v=20261015-bao5", "./projects/baobao-02.webp?v=20261015-bao5", "./projects/baobao-03.webp?v=20261015-bao5", "./projects/page-8.webp?v=20261015-bao5"],
  "打开嬷作坊项目详情": ["./projects/page-28.webp?v=20261014-moz3", "./projects/page-22.webp?v=20261014-moz3", "./projects/page-26.webp?v=20261014-moz3", "./projects/mozuofang-logo-inspiration.webp?v=20261014-moz3"],
  "打开螺小粉项目详情": ["./luoxiaofen/luoxiaofen-01.webp?v=20261014-luo1", "./luoxiaofen/luoxiaofen-13.webp?v=20261014-luo1", "./luoxiaofen/luoxiaofen-14.webp?v=20261014-luo1"],
  "打开商业视觉合集项目详情": ["./projects/page-38.webp", "./projects/page-36.webp", "./projects/page-40.webp"],
  "打开体育赛事与直播视觉项目详情": [window.matchMedia("(max-width: 620px)").matches ? "./sports/cover-mobile.webp" : "./sports/cover-display.webp", "./sports/fast-preview.webp", "./sports/euroleague-banner.webp"]
};
const dimensions = {"baobao-01":[2560,1440],"baobao-02":[2560,1440],"baobao-03":[2560,1440],"hero-poster":[1280,720],"luoxiaofen-01":[2559,1440],"luoxiaofen-13":[2559,1440],"luoxiaofen-14":[2559,1440],"luoxiaofen-15":[2559,1440],"luoxiaofen-16":[2559,1440],"luoxiaofen-18":[2559,1440],"luoxiaofen-19":[2559,1440],"luoxiaofen-20":[2559,1440],"luoxiaofen-21":[2559,1440],"luoxiaofen-24":[2559,1440],"luoxiaofen-31":[2559,1440],"luoxiaofen-32":[2559,1440],"luoxiaofen-33":[2559,1440],"luoxiaofen-34":[2559,1440],"luoxiaofen-56":[2559,1440],"luoxiaofen-57":[2559,1440],"luoxiaofen-67":[2559,1440],"luoxiaofen-68":[2559,1440],"luoxiaofen-69":[2559,1440],"luoxiaofen-70":[2559,1440],"luoxiaofen-71":[2559,1440],"portrait":[900,900],"baobao-14":[2560,1440],"baobao-15":[2560,1440],"baobao-16":[2560,1440],"baobao-18":[2560,1440],"baobao-19":[2560,1440],"baobao-20":[2560,1440],"baobao-4":[2560,1440],"baobao-space-1":[2560,1441],"baobao-space-2":[1440,1800],"baobao-space-3":[1440,1800],"baobao-space-4":[2560,1441],"baobao-space-5":[2560,1441],"baobao-space-6":[2560,1441],"mozuofang-colors":[2560,1417],"mozuofang-cup-sleeves":[2044,1145],"mozuofang-keyvisual":[2044,1146],"mozuofang-labels":[2560,1440],"mozuofang-logo-inspiration":[2560,1388],"mozuofang-paper-cups":[2045,1145],"mozuofang-posters":[2041,1148],"mozuofang-space-02":[2500,1406],"mozuofang-space-03":[2500,1406],"mozuofang-space-04":[2500,906],"mozuofang-space-05":[1440,1800],"mozuofang-space-06":[2500,834],"mozuofang-space-07":[2500,1406],"mozuofang-space-08":[1440,1800],"mozuofang-space-09":[2500,1406],"mozuofang-supporting-graphics":[2042,1149],"page-12":[1600,900],"page-14":[1600,900],"page-22":[1600,900],"page-26":[1600,900],"page-28":[1600,900],"page-36":[1600,900],"page-38":[1600,900],"page-4":[1600,900],"page-40":[1600,900],"page-42":[1600,900],"page-44":[1600,900],"page-8":[1600,900],"champion-spain":[1625,2400],"cover":[1800,1013],"euroleague-banner":[1053,408],"fast-preview":[960,540],"final-day":[1080,1920],"host-dongni":[960,540],"host-xiaoyu":[960,540],"host-xiatian":[960,540],"league-keyvisual":[1000,1000],"live-medusa":[960,540],"mls-keyvisual":[1000,1000],"new-season":[1800,2400],"schedule-bundesliga":[1800,2400],"schedule-laliga":[1800,2400],"schedule-premier":[1800,2400],"season-finale":[900,1200]};
const cache = new Map();
const jobs = [];
let active = 0;

function pump() {
  if (document.querySelector(".v2-case")) return;
  while (active < 2 && jobs.length) {
    const job = jobs.shift();
    active++;
    const preview = new Image();
    preview.loading = "eager";
    preview.decoding = "async";
    preview.fetchPriority = job.urgent ? "high" : "low";
    const finish = (success) => {
      preview.onload = preview.onerror = null;
      active--;
      if (!success) cache.delete(job.url);
      job.resolve(success);
      pump();
    };
    preview.onload = () => finish(true);
    preview.onerror = () => finish(false);
    preview.src = job.url;
  }
}

function warm(path, urgent) {
  const url = new URL(path, import.meta.url).href;
  if (cache.has(url)) {
    if (urgent) {
      const index = jobs.findIndex((job) => job.url === url);
      if (index >= 0) {
        const [job] = jobs.splice(index, 1);
        job.urgent = true;
        jobs.unshift(job);
      }
    }
    return cache.get(url);
  }
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  cache.set(url, promise);
  const job = { url, urgent, resolve };
  if (urgent) jobs.unshift(job);
  else jobs.push(job);
  pump();
  return promise;
}

const registeredCards = new WeakSet();
const intentCards = new WeakSet();
function warmCard(button, urgent = false) {
  // Touch browsers synthesize hover/focus while tapping: never start speculative
  // downloads there, or behind an open case, ahead of the requested hero.
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches || document.querySelector(".v2-case")) return;
  const assets = profiles[button?.getAttribute("aria-label")];
  if (!assets) return;
  if (urgent && intentCards.has(button)) return;
  if (urgent) intentCards.add(button);
  const generation = Number(button.dataset.caseWarmGeneration || 0) + 1;
  button.dataset.caseWarmGeneration = String(generation);
  button.dataset.casePrefetch = "pending";
  Promise.all(assets.slice(0, urgent ? 4 : 2).map((path) => warm(path, urgent))).then((ready) => {
    if (button.isConnected && Number(button.dataset.caseWarmGeneration) === generation) {
      button.dataset.casePrefetch = ready.every(Boolean) ? "ready" : "partial";
    }
  });
}

const cardObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    cardObserver.unobserve(entry.target);
    warmCard(entry.target.querySelector("button"));
  }
}, { rootMargin: "220px 0px", threshold: 0.01 });

for (const event of ["pointerover", "pointerdown", "focusin", "click"]) {
  document.addEventListener(event, (e) => {
    if (!(e.target instanceof Element)) return;
    const button = e.target.closest(".v2-project-card button");
    if (button) warmCard(button, true);
  }, { capture: true, passive: true });
}

const mobileAssetRoot = new URL("./mobile/", import.meta.url);
function mobileImageUrl(raw) {
  if (!raw || !window.matchMedia("(max-width: 700px)").matches) return raw;
  const url = new URL(raw, document.baseURI);
  if (url.origin !== location.origin || url.pathname.includes("/mobile/")) return raw;
  const match = url.pathname.match(/\/(projects|luoxiaofen)\/([^/]+\.webp)$/);
  return match ? new URL(match[1] + "/" + match[2], mobileAssetRoot).href : raw;
}

const trackedImages = new Map();
const galleries = new Map();
let pausedHero = null;

function trackImage(image, modal, observer) {
  const hero = image.closest(".v2-case-hero");
  const host = hero || image.closest("a, .sports-media") || image.parentElement;
  const deferred = image.dataset.caseSrc;
  const displayUrl = mobileImageUrl(deferred || image.src);
  const file = new URL(deferred || image.src, document.baseURI).pathname.split("/").pop().split(".")[0];
  const size = dimensions[file];
  if (size) { image.width = size[0]; image.height = size[1]; }
  image.decoding = "async";
  image.fetchPriority = hero ? "high" : "low";
  let timer = null;
  let retryButton = null;
  let started = false;

  function clearPending() {
    clearTimeout(timer);
    image.classList.remove("case-media-pending");
    if (hero) hero.classList.remove("case-media-pending");
  }
  function loaded() {
    if (!image.naturalWidth) return;
    clearPending();
    retryButton?.remove();
    retryButton = null;
    image.dataset.caseLoadState = "loaded";
  }
  function failed() {
    clearPending();
    image.dataset.caseLoadState = "retry";
    if (retryButton || !image.isConnected) return;
    retryButton = document.createElement("button");
    retryButton.type = "button";
    retryButton.className = "case-media-retry";
    retryButton.textContent = "图片暂未载入，点击重试";
    retryButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      retryButton.remove();
      retryButton = null;
      const url = new URL(image.currentSrc || image.src || deferred, document.baseURI);
      url.searchParams.set("retry", String(Date.now()));
      begin();
      // A picture source takes precedence over img.src.
      const picture = image.closest("picture");
      if (picture) {
        for (const source of picture.querySelectorAll("source")) {
          const sourceUrl = new URL(source.srcset, document.baseURI);
          sourceUrl.searchParams.set("retry", String(Date.now()));
          source.srcset = sourceUrl.href;
        }
      }
      image.src = url.href;
    });
    host.classList.add("case-media-host");
    host.append(retryButton);
  }
  function begin() {
    started = true;
    clearTimeout(timer);
    image.dataset.caseLoadState = "loading";
    image.classList.add("case-media-pending");
    if (hero) hero.classList.add("case-media-pending");
    timer = setTimeout(failed, 12000);
  }
  image.addEventListener("load", loaded);
  image.addEventListener("error", failed);
  trackedImages.set(image, {
    start() {
      if (started) return;
      begin();
      image.loading = "eager";
      if (deferred || displayUrl !== image.src) image.src = displayUrl;
      // Handle a cached completion/error that happened before listeners attached.
      if (image.complete) {
        if (image.naturalWidth) loaded();
        else if (image.getAttribute("src")) failed();
      }
    },
    cleanup() {
      clearTimeout(timer);
      image.removeEventListener("load", loaded);
      image.removeEventListener("error", failed);
    },
  });
  if (deferred && !hero) observer.observe(image);
  else trackedImages.get(image).start();
}

function scan() {
  for (const [image, state] of trackedImages) {
    if (image.isConnected) continue;
    state.cleanup();
    trackedImages.delete(image);
  }
  for (const [modal, observer] of galleries) {
    if (modal.isConnected) continue;
    observer.disconnect();
    galleries.delete(modal);
  }
  for (const card of document.querySelectorAll(".v2-project-card")) {
    for (const image of card.querySelectorAll("img")) {
      const displayUrl = mobileImageUrl(image.src);
      if (displayUrl && displayUrl !== image.src) image.src = displayUrl;
    }
    if (registeredCards.has(card)) continue;
    registeredCards.add(card);
    cardObserver.observe(card);
  }
  const modals = [...document.querySelectorAll(".v2-case")];
  const video = document.querySelector("video.v2-hero-video");
  if (modals.length && video && !video.paused && !pausedHero) {
    pausedHero = video;
    video.pause();
  } else if (!modals.length && pausedHero) {
    const resume = pausedHero;
    pausedHero = null;
    resume.play().catch(() => {});
  }
  for (const modal of modals) {
    if (!galleries.has(modal)) {
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          trackedImages.get(entry.target)?.start();
        }
      }, { root: modal, rootMargin: "180px 0px", threshold: 0.01 });
      galleries.set(modal, observer);
    }
    for (const image of modal.querySelectorAll("img")) {
      if (!trackedImages.has(image)) trackImage(image, modal, galleries.get(modal));
    }
  }
  if (!modals.length) pump();
}

new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
scan();
