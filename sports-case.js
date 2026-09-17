const asset = (name) => new URL(`./sports/${name}.webp`, import.meta.url).href;

const groups = [
  {
    number: "01",
    title: "赛事主视觉",
    description: "新赛季、专题预热与赛事入口，面向站内及社交传播的不同画幅。",
    layout: "mixed",
    images: [
      ["fast-preview", "多联赛极速前瞻"],
      ["euroleague-banner", "欧篮联站内宣传横幅"],
      ["mls-keyvisual", "美职联赛事头图"],
      ["league-keyvisual", "德甲赛事头图"],
    ],
  },
  {
    number: "02",
    title: "赛事节点海报",
    description: "从新赛季到决赛、夺冠与赛季收官，以人物和比赛情绪形成视觉焦点。",
    layout: "portrait",
    images: [
      ["new-season", "西甲新赛季主题海报"],
      ["final-day", "欧冠决赛海报"],
      ["champion-spain", "西班牙夺冠海报"],
      ["season-finale", "赛季结束海报"],
    ],
  },
  {
    number: "03",
    title: "赛程信息设计",
    description: "同一信息结构适配不同联赛，用颜色与版式帮助读者快速定位赛程。",
    layout: "schedule",
    images: [
      ["schedule-premier", "英超第 1—3 轮赛程"],
      ["schedule-bundesliga", "德甲第 1—3 轮赛程"],
      ["schedule-laliga", "西甲第 1—3 轮赛程"],
    ],
  },
  {
    number: "04",
    title: "直播与解说内容",
    description: "站内直播与解说员栏目封面，兼顾人物识别与栏目辨识度。",
    layout: "landscape",
    images: [
      ["host-dongni", "解说员东尼栏目封面"],
      ["host-xiaoyu", "解说员小羽直播封面"],
      ["live-medusa", "美杜莎站内直播封面"],
      ["host-xiatian", "解说员夏天栏目封面"],
    ],
  },
];

function makeGallery(group) {
  const section = document.createElement("section");
  section.className = `sports-group sports-group--${group.layout}`;
  const heading = document.createElement("div");
  heading.className = "sports-group-heading";
  heading.innerHTML = `<span>${group.number} / SELECTED VISUALS</span><h3>${group.title}</h3><p>${group.description}</p>`;
  section.append(heading);

  const grid = document.createElement("div");
  grid.className = "sports-grid";
  group.images.forEach(([name, caption]) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = asset(name);
    image.alt = caption;
    image.loading = "eager";
    image.decoding = "sync";
    const media = document.createElement("div");
    media.className = "sports-media";
    media.append(image);
    const label = document.createElement("figcaption");
    label.textContent = caption;
    const link = document.createElement("a");
    link.href = asset(name);
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "查看大图 ↗";
    link.setAttribute("aria-label", `查看${caption}大图`);
    label.append(link);
    figure.append(media, label);
    grid.append(figure);
  });
  section.append(grid);
  return section;
}

let modal;
let lastFocused;
let previousOverflow;

function closeCase() {
  if (!modal) return;
  modal.remove();
  modal = null;
  document.body.style.overflow = previousOverflow;
  document.removeEventListener("keydown", onCaseKeydown);
  lastFocused?.focus();
}

function onCaseKeydown(event) {
  if (event.key === "Escape") {
    closeCase();
  } else if (event.key === "Tab" && modal) {
    const focusables = [...modal.querySelectorAll("button, a[href]")];
    const first = focusables[0];
    const last = focusables.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}

function openCase() {
  lastFocused = document.activeElement;
  previousOverflow = document.body.style.overflow;
  modal = document.createElement("div");
  modal.className = "v2-case sports-case-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "sports-case-title");
  modal.innerHTML = `
    <header><span>CASE / 04</span><button type="button" class="sports-close">CLOSE <b aria-hidden="true">×</b></button></header>
    <div class="v2-case-shell">
      <div class="v2-case-title" style="--case-accent:#e84930">
        <p>SPORTS CAMPAIGN · LIVE CONTENT · 2025—2026</p>
        <h2 id="sports-case-title">体育赛事<br>与直播视觉<small>SPORTS & LIVE VISUALS</small></h2>
      </div>
      <figure class="v2-case-hero"><img src="${asset("cover")}" alt="极速播报足球赛事主视觉"></figure>
      <section class="v2-case-summary sports-summary">
        <p>让赛事信息更快被看见，让每一个比赛节点都有自己的视觉记忆。</p>
        <span>足球 · 篮球 / 赛事主视觉 · 赛程信息 · 直播内容<br>作品精选 / 2025—2026</span>
      </section>
      <div class="sports-case-intro">围绕足球、篮球赛事及直播内容，作品覆盖赛季开幕、赛前预告、比赛结果、赛程整理与解说栏目。以下按传播场景选录，展示从主题海报到高频信息图与直播封面的不同表达。</div>
      <div class="sports-case-groups"></div>
      <p class="sports-endnote">END OF CASE / 04</p>
    </div>`;
  modal.querySelector(".sports-close").addEventListener("click", closeCase);
  const container = modal.querySelector(".sports-case-groups");
  groups.forEach((group) => container.append(makeGallery(group)));
  document.body.append(modal);
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", onCaseKeydown);
  modal.querySelector(".sports-close").focus();
}

function addCard() {
  const list = document.querySelector(".v2-project-list");
  if (!list || list.querySelector("#sports-project-card")) return;
  const card = document.createElement("article");
  card.id = "sports-project-card";
  card.className = "v2-project-card sports-project-card";
  card.style.setProperty("--project-accent", "#e84930");
  card.innerHTML = `
    <button type="button" aria-label="打开体育赛事与直播视觉项目详情">
      <div class="v2-project-meta"><span>04</span><p>SPORTS CAMPAIGN · LIVE CONTENT</p><time>2025—2026</time></div>
      <div class="v2-project-image"><img src="${asset("cover")}" alt="体育赛事与直播视觉项目展示" loading="lazy" decoding="async"><span>OPEN CASE ↗</span></div>
      <div class="v2-project-name"><h3>体育赛事与直播视觉</h3><p>SPORTS & LIVE VISUALS</p></div>
    </button>`;
  card.querySelector("button").addEventListener("click", openCase);
  list.append(card);
  const year = document.querySelector(".v2-hero-topline span");
  if (year?.textContent?.includes("2022—2025")) year.textContent = "PORTFOLIO / 2022—2026";
  const logoYear = document.querySelector(".v2-logo span");
  if (logoYear?.textContent === "25") logoYear.textContent = "26";
}

const observer = new MutationObserver(addCard);
observer.observe(document.getElementById("root"), { childList: true, subtree: true });
addCard();
