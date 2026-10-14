// Warm only the opening images of nearby cases; touch devices do not need hover.
const profiles = {
  "打开鲍堡芝项目详情": ["./projects/baobao-01.webp?v=20261015-lite1", "./projects/baobao-02.webp?v=20261015-lite1", "./projects/baobao-03.webp?v=20261015-lite1", "./projects/page-8.webp?v=20261015-lite1"],
  "打开嬷作坊项目详情": ["./projects/page-28.webp?v=20261015-lite1", "./projects/page-22.webp?v=20261015-lite1", "./projects/page-26.webp?v=20261015-lite1", "./projects/mozuofang-logo-inspiration.webp?v=20261015-lite1"],
  "打开螺小粉项目详情": ["./luoxiaofen/luoxiaofen-01.webp?v=20261015-lite1", "./luoxiaofen/luoxiaofen-13.webp?v=20261015-lite1", "./luoxiaofen/luoxiaofen-14.webp?v=20261015-lite1"],
  "打开商业视觉合集项目详情": ["./projects/page-38.webp?v=20261015-lite1", "./projects/page-36.webp?v=20261015-lite1", "./projects/page-40.webp?v=20261015-lite1"],
  "打开体育赛事与直播视觉项目详情": ["./sports/cover.webp?v=20261015-lite1", "./sports/fast-preview.webp?v=20261015-lite1", "./sports/euroleague-banner.webp?v=20261015-lite1"]
};
const dimensions = {"baobao-01":[2560,1440],"baobao-02":[2560,1440],"baobao-03":[2560,1440],"hero-poster":[1280,720],"luoxiaofen-01":[2559,1440],"luoxiaofen-13":[2559,1440],"luoxiaofen-14":[2559,1440],"luoxiaofen-15":[2559,1440],"luoxiaofen-16":[2559,1440],"luoxiaofen-18":[2559,1440],"luoxiaofen-19":[2559,1440],"luoxiaofen-20":[2559,1440],"luoxiaofen-21":[2559,1440],"luoxiaofen-24":[2559,1440],"luoxiaofen-31":[2559,1440],"luoxiaofen-32":[2559,1440],"luoxiaofen-33":[2559,1440],"luoxiaofen-34":[2559,1440],"luoxiaofen-56":[2559,1440],"luoxiaofen-57":[2559,1440],"luoxiaofen-67":[2559,1440],"luoxiaofen-68":[2559,1440],"luoxiaofen-69":[2559,1440],"luoxiaofen-70":[2559,1440],"luoxiaofen-71":[2559,1440],"portrait":[900,900],"baobao-14":[2560,1440],"baobao-15":[2560,1440],"baobao-16":[2560,1440],"baobao-18":[2560,1440],"baobao-19":[2560,1440],"baobao-20":[2560,1440],"baobao-4":[2560,1440],"baobao-space-1":[2560,1441],"baobao-space-2":[1440,1800],"baobao-space-3":[1440,1800],"baobao-space-4":[2560,1441],"baobao-space-5":[2560,1441],"baobao-space-6":[2560,1441],"mozuofang-colors":[2560,1417],"mozuofang-cup-sleeves":[2044,1145],"mozuofang-keyvisual":[2044,1146],"mozuofang-labels":[2560,1440],"mozuofang-logo-inspiration":[2560,1388],"mozuofang-paper-cups":[2045,1145],"mozuofang-posters":[2041,1148],"mozuofang-space-02":[2500,1406],"mozuofang-space-03":[2500,1406],"mozuofang-space-04":[2500,906],"mozuofang-space-05":[1440,1800],"mozuofang-space-06":[2500,834],"mozuofang-space-07":[2500,1406],"mozuofang-space-08":[1440,1800],"mozuofang-space-09":[2500,1406],"mozuofang-supporting-graphics":[2042,1149],"page-12":[1600,900],"page-14":[1600,900],"page-22":[1600,900],"page-26":[1600,900],"page-28":[1600,900],"page-36":[1600,900],"page-38":[1600,900],"page-4":[1600,900],"page-40":[1600,900],"page-42":[1600,900],"page-44":[1600,900],"page-8":[1600,900],"champion-spain":[1625,2400],"cover":[1800,1013],"euroleague-banner":[1053,408],"fast-preview":[960,540],"final-day":[1080,1920],"host-dongni":[960,540],"host-xiaoyu":[960,540],"host-xiatian":[960,540],"league-keyvisual":[1000,1000],"live-medusa":[960,540],"mls-keyvisual":[1000,1000],"new-season":[1800,2400],"schedule-bundesliga":[1800,2400],"schedule-laliga":[1800,2400],"schedule-premier":[1800,2400],"season-finale":[900,1200]};
const cache = new Map();
const jobs = [];
let active = 0;

function pump() {
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

const trackedImages = new WeakSet();
let pausedHero = null;
function scan() {
  for (const card of document.querySelectorAll(".v2-project-card")) {
    if (registeredCards.has(card)) continue;
    registeredCards.add(card);
    cardObserver.observe(card);
  }
  const modal = document.querySelector(".v2-case");
  const video = document.querySelector("video.v2-hero-video");
  // Do not spend mobile decoding/rendering time on a video behind an opaque dialog.
  if (modal && video && !video.paused && !pausedHero) {
    pausedHero = video;
    video.pause();
  } else if (!modal && pausedHero) {
    const resume = pausedHero;
    pausedHero = null;
    resume.play().catch(() => {});
  }
  if (!modal) return;
  for (const image of modal.querySelectorAll("img")) {
    if (trackedImages.has(image)) continue;
    trackedImages.add(image);
    const file = new URL(image.src, document.baseURI).pathname.split("/").pop().split(".")[0];
    const size = dimensions[file];
    if (size) {
      image.width = size[0];
      image.height = size[1];
    }
    const hero = image.closest(".v2-case-hero");
    image.decoding = "async";
    image.loading = hero ? "eager" : "lazy";
    image.fetchPriority = hero ? "high" : "low";
    if (image.complete && image.naturalWidth) continue;
    image.classList.add("case-media-pending");
    if (hero) hero.classList.add("case-media-pending");
    const finish = () => {
      image.classList.remove("case-media-pending");
      if (hero) hero.classList.remove("case-media-pending");
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
    };
    image.addEventListener("load", finish);
    image.addEventListener("error", finish);
  }
}

new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
scan();
