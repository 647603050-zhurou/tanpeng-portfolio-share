// Standalone case added to the existing, compiled V2 and Lite portfolios.
const asset = (file) => new URL(`./luoxiaofen/${file}?v=20261014-luo1`, import.meta.url).href;
const chapters = [
  {
    number: "01",
    title: "标志与图形系统",
    intro: "以“螺蛳粉生产队”为品牌表达，结合人物角色、螺蛳粉与卤味图形，用深蓝、红色和米色建立具有烟火气的视觉识别。",
    images: [
      ["luoxiaofen-13.webp", "标志组合规范", "角色与品牌字标形成横向和竖向组合，适配不同版面的识别需求。", true],
      ["luoxiaofen-14.webp", "制作场景辅助图形", "围绕选料、熬制、浇汤与卤味处理建立角色场景，让制作主题转化为可延展的图形。", true],
      ["luoxiaofen-15.webp", "辅助图形组合", "将产品插画、店铺线稿、标语和文字标签组合为图形系统，丰富品牌在不同触点中的表达。", true],
      ["luoxiaofen-16.webp", "品牌主视觉", "以人物互动、螺蛳粉和卤味插画构成主画面，放射形背景强化香辣、热闹的视觉氛围。", true],
    ],
  },
  {
    number: "02",
    title: "餐饮物料与包装",
    intro: "把标志、角色和产品图形延展到点餐、用餐及外带物料中，以统一的色彩和版式语言串联日常品牌触点。",
    images: [
      ["luoxiaofen-18.webp", "单页点餐菜单", "以套餐、单品与加料信息组织菜单，产品照片和品牌标识共同建立清晰的阅读层级。", true],
      ["luoxiaofen-19.webp", "扫码点餐桌贴", "将角色、桌号和二维码组合，展示点餐信息与品牌识别在小尺寸桌贴上的应用。"],
      ["luoxiaofen-20.webp", "产品推广台卡", "以大骨螺蛳粉照片、产品名称和推荐信息形成桌面宣传画面。"],
      ["luoxiaofen-21.webp", "餐垫纸", "把产品图形、制作场景和标语延展到餐垫纸，沿用深蓝、红色与米色的视觉关系。", true],
      ["luoxiaofen-24.webp", "饮品纸杯", "角色主视觉与放射图形环绕杯身，展示品牌图形在立体包装上的延展。"],
      ["luoxiaofen-31.webp", "外带手提纸袋", "以标志版和产品插画版两种构图呈现袋身设计，侧面标语延续品牌表达。"],
      ["luoxiaofen-32.webp", "店铺名片", "以角色插画、品牌字标和二维码组合，展示正反两面的视觉与信息组织。"],
      ["luoxiaofen-33.webp", "餐具自取立牌", "用大字号文字和框线结构突出提示信息，让服务指引保持品牌识别。"],
    ],
  },
  {
    number: "03",
    title: "宣传与推广",
    intro: "针对优惠、产品介绍与开业预告等传播场景，将品牌图形与具体信息结合，保持系列物料的视觉联系。",
    images: [
      ["luoxiaofen-34.webp", "优惠券", "以店铺线稿、品牌字标和面值信息组成票券式版面，延续统一的色彩和图形元素。"],
      ["luoxiaofen-56.webp", "产品海报", "以螺蛳粉产品照片形成视觉焦点，结合大字标题、品牌色和辅助纹理呈现宣传效果。"],
      ["luoxiaofen-57.webp", "开业预告围挡", "人物与产品插画构成开业预告主画面，放射形背景和品牌标语呼应主视觉。", true],
    ],
  },
  {
    number: "04",
    title: "门店空间效果图",
    intro: "通过门头、入口、座席与品牌墙的空间效果图，展示标志、色彩与角色图形如何延展到门店场景。",
    images: [
      ["luoxiaofen-67.webp", "门头整体效果", "以红色招牌、品牌字标和人物标志建立门头识别，侧招与窗面图形延续品牌语言。", true],
      ["luoxiaofen-68.webp", "入口与窗面细节", "将产品海报、品牌标语与辅助图形置于入口周边，补充面向街道的展示细节。"],
      ["luoxiaofen-69.webp", "入口隔断与座席", "圆形隔断中的品牌标识与室内产品图形相互呼应，蓝色座席延续整体色彩关系。"],
      ["luoxiaofen-70.webp", "产品图形与用餐区域", "产品插画与调料区文字成为墙面识别元素，木色背景和蓝色座席共同构成用餐场景。"],
      ["luoxiaofen-71.webp", "品牌墙与角色主视觉", "把双人角色、产品插画和标语组合到墙面，展示平面主视觉在门店空间中的延展。"],
    ],
  },
];

function makeChapter(chapter) {
  const section = document.createElement("section");
  section.className = "luoxiaofen-chapter";
  const heading = document.createElement("div");
  heading.className = "luoxiaofen-chapter-heading";
  const number = document.createElement("span");
  number.textContent = `${chapter.number} / LUOXIAOFEN`;
  const title = document.createElement("h3");
  title.textContent = chapter.title;
  const intro = document.createElement("p");
  intro.textContent = chapter.intro;
  heading.append(number, title, intro);
  section.append(heading);

  const grid = document.createElement("div");
  grid.className = "luoxiaofen-grid";
  for (const [file, label, description, wide] of chapter.images) {
    const figure = document.createElement("figure");
    if (wide) figure.className = "wide";
    const link = document.createElement("a");
    link.className = "luoxiaofen-image-link";
    link.href = asset(file);
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", `查看${label}大图（在新标签页打开）`);
    const image = document.createElement("img");
    image.src = asset(file);
    image.alt = `螺小粉 · ${label}`;
    image.width = 2560;
    image.height = 1440;
    image.loading = "lazy";
    image.decoding = "async";
    link.append(image);
    const caption = document.createElement("figcaption");
    const captionTitle = document.createElement("strong");
    captionTitle.textContent = label;
    const captionDescription = document.createElement("p");
    captionDescription.textContent = description;
    caption.append(captionTitle, captionDescription);
    figure.append(link, caption);
    grid.append(figure);
  }
  section.append(grid);
  return section;
}

let modal = null;
let lastFocused = null;
let previousOverflow = "";

function closeCase() {
  if (!modal) return;
  modal.remove();
  modal = null;
  document.body.style.overflow = previousOverflow;
  document.removeEventListener("keydown", onCaseKeydown);
  if (lastFocused?.isConnected) lastFocused.focus();
}

function onCaseKeydown(event) {
  if (event.key === "Escape") {
    event.preventDefault();
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
  if (modal) return;
  lastFocused = document.activeElement;
  previousOverflow = document.body.style.overflow;
  modal = document.createElement("div");
  modal.className = "v2-case luoxiaofen-case";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "luoxiaofen-case-title");
  modal.innerHTML = `
    <header><span>CASE / 03</span><button type="button" class="luoxiaofen-close" aria-label="关闭螺小粉项目详情">CLOSE <b aria-hidden="true">×</b></button></header>
    <div class="v2-case-shell">
      <div class="v2-case-title" style="--case-accent:#c6a06b">
        <p>BRAND IDENTITY · IP · APPLICATION · 2020</p>
        <h2 id="luoxiaofen-case-title">螺小粉<small>LUOXIAOFEN</small></h2>
      </div>
      <figure class="v2-case-hero"><img src="${asset("luoxiaofen-01.webp")}" alt="螺小粉视觉识别系统" width="2560" height="1440" decoding="async"></figure>
      <section class="v2-case-summary">
        <p>围绕“螺蛳粉生产队”，用人物角色、产品图形与蓝红配色建立品牌识别，再延展到餐饮物料、宣传推广和门店场景。</p>
        <span>品牌视觉 / 标志组合 · 角色与辅助图形<br>应用展示 / 点餐物料 · 包装 · 门店效果图</span>
      </section>
      <section class="v2-case-thinking">
        <article><span>01 / CHALLENGE</span><h3>项目挑战</h3><p>在螺蛳粉与卤味的餐饮场景中建立具有烟火气的视觉识别，同时让角色与图形能够适配从小尺寸桌贴到门头、墙面等不同触点。</p></article>
        <article><span>02 / APPROACH</span><h3>设计方法</h3><p>以“生产队”的人物角色与制作场景形成叙事线索，用深蓝、红色、米色和点状纹理构建图形语言，再根据点餐、包装、推广与空间的不同信息需求调整组合方式。</p></article>
      </section>
      <section class="v2-case-gallery luoxiaofen-gallery"></section>
    </div>`;
  modal.querySelector(".luoxiaofen-close").addEventListener("click", closeCase);
  modal.querySelector(".luoxiaofen-gallery").append(...chapters.map(makeChapter));
  document.body.append(modal);
  document.body.style.overflow = "hidden";
  document.addEventListener("keydown", onCaseKeydown);
  modal.querySelector(".luoxiaofen-close").focus();
}

function addProject() {
  const list = document.querySelector(".v2-project-list");
  if (!list) return;
  if (!list.querySelector("#luoxiaofen-project-card")) {
    const anchor = list.querySelector('button[aria-label="打开嬷作坊项目详情"]')?.closest("article");
    if (!anchor) return;
    const card = document.createElement("article");
    card.id = "luoxiaofen-project-card";
    card.className = "v2-project-card luoxiaofen-project-card";
    card.style.setProperty("--project-accent", "#c6a06b");
    card.innerHTML = `
      <button type="button" aria-label="打开螺小粉项目详情">
        <div class="v2-project-meta"><span>03</span><p>BRAND IDENTITY · IP · APPLICATION</p><time>2020</time></div>
        <div class="v2-project-image"><img src="${asset("luoxiaofen-67.webp")}" alt="螺小粉品牌与门店设计展示" width="2560" height="1440" loading="lazy" decoding="async"><span>OPEN CASE ↗</span></div>
        <div class="v2-project-name"><h3>螺小粉</h3><p>LUOXIAOFEN</p></div>
      </button>`;
    card.querySelector("button").addEventListener("click", openCase);
    anchor.after(card);
  }
  [...list.children].forEach((card, index) => {
    const number = card.querySelector(".v2-project-meta > span");
    const expected = String(index + 1).padStart(2, "0");
    if (number && number.textContent !== expected) number.textContent = expected;
  });
  const year = document.querySelector(".v2-hero-topline span");
  if (year?.textContent.startsWith("PORTFOLIO /") && year.textContent !== "PORTFOLIO / 2020—2026") {
    year.textContent = "PORTFOLIO / 2020—2026";
  }
  const originalCase = document.querySelector('#root .v2-case[aria-labelledby="v2-case-title"]');
  if (originalCase?.querySelector("#v2-case-title small")?.textContent === "CAMPAIGN VISUALS") {
    const number = originalCase.querySelector("header > span");
    if (number && number.textContent !== "CASE / 04") number.textContent = "CASE / 04";
  }
}

const root = document.getElementById("root");
if (root) {
  new MutationObserver(addProject).observe(root, { childList: true, subtree: true });
  addProject();
}
