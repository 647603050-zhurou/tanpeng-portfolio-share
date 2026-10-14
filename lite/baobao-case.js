// Extend the published V2 case without changing the compiled React application.
const imageUrl = (file) => new URL(`./projects/${file}`, import.meta.url).href;

const chapters = [
  {
    number: "01",
    title: "品牌定位与标志",
    intro: "以“超级烘焙屋”为品牌表达，将醒目的黄色、厚重的字标与面包角色组合起来，建立轻松、直接的视觉识别。",
    images: [
      ["baobao-02.webp?v=20261015-lite1", "品牌核心定位", "以“超级烘焙屋 / SUPER BAKE”明确品牌定位，用大字号 SUPER 与黄色建立直接的视觉记忆。"],
      ["baobao-03.webp?v=20261015-lite1", "品牌核心广告语", "围绕“吃鲍堡，没烦恼 / EAT BAOBAO NO WORRIES”表达轻松、快乐的品牌态度，与面包角色共同形成传播语言。"],
      ["page-8.webp?v=20261015-lite1", "标志与角色组合", "中文名称、英文标识与面包角色形成不同组合，适配横向、竖向及小尺寸应用。", true],
      ["baobao-4.webp?v=20261015-lite1", "品牌设计与灵感来源", "从黄色购物篮与面包产品中提取色彩和形态线索，将“丰富”与“烘焙”的概念融入品牌识别与面包角色。", true],
    ],
  },
  {
    number: "02",
    title: "图形语言与角色延展",
    intro: "从烘焙产品和日常制作场景中提取图形，让品牌识别延展为可组合的插画、角色动作与辅助元素。",
    images: [
      ["baobao-14.webp?v=20261015-lite1", "烘焙产品插画", "牛角包、甜甜圈、蛋挞与汉堡等产品被转化为简洁的轮廓插画，与大字号 SUPER 构成主视觉。", true],
      ["baobao-15.webp?v=20261015-lite1", "角色与辅助图形", "通过面包角色、弧形标语、圆形标签与功能图标，建立适合重复组合的品牌元素。"],
      ["baobao-16.webp?v=20261015-lite1", "烘焙场景插画", "将烤面包机、打蛋器、量杯等工具与产品、角色共同编排，补充品牌的日常烘焙语境。"],
    ],
  },
  {
    number: "03",
    title: "物料与包装应用",
    intro: "将字标、角色和插画延展到胸牌、手提袋与食品包装中，针对不同载体调整图形密度和信息层级，保持统一识别。",
    images: [
      ["page-12.webp?v=20261015-lite1", "物料设计", "从基础识别延展到日常使用的品牌物料。"],
      ["page-14.webp?v=20261015-lite1", "胸牌应用", "以角色形象与 SUPER 字样形成醒目的胸牌视觉，延续黄色与黑白的对比。"],
      ["baobao-18.webp?v=20261015-lite1", "手提纸袋与餐盒", "以大字号 SUPER 和面包角色建立第一视觉焦点，让不同包装共享同一套品牌语言。", true],
      ["baobao-19.webp?v=20261015-lite1", "产品包装纸袋", "以角色版和插画版两种构图展示包装延展，在共同色彩与字标下形成不同视觉节奏。"],
      ["baobao-20.webp?v=20261015-lite1", "冻点类包装", "将产品插画、品牌标语与品类信息集中编排，展示视觉系统在带提手包装上的应用。"],
    ],
  },
  {
    number: "04",
    title: "门店空间效果图",
    intro: "通过门头、橱窗、墙面插画与产品陈列的空间效果图，展示品牌色彩、角色和辅助图形如何延展到门店场景。",
    images: [
      ["baobao-space-1.webp?v=20261015-lite1", "门头整体效果", "以黄色招牌、大字标与面包角色构成门头识别，两侧窗口延续品牌图形与色彩。", true, 2560, 1441],
      ["baobao-space-2.webp?v=20261015-lite1", "门头左侧窗口", "将功能图标、面包角色与 BAO 标识组合到窗口及立体标识中，展示平面元素的空间延展。", false, 1440, 1800],
      ["baobao-space-3.webp?v=20261015-lite1", "橱窗与角色展示", "通过面包图形、角色表情与玻璃上的品牌标语，形成面向街道的展示画面。", false, 1440, 1800],
      ["baobao-space-4.webp?v=20261015-lite1", "墙面插画与休憩区", "以横向插画串联产品、烘焙工具和角色，并将角色形象延展到座凳与桌面细节。", true, 2560, 1441],
      ["baobao-space-5.webp?v=20261015-lite1", "室内空间整体效果", "黄色灯带、顶部标语与墙面插画呼应品牌识别，展现陈列、收银和休憩区域的整体关系。", false, 2560, 1441],
      ["baobao-space-6.webp?v=20261015-lite1", "陈列区与收银台", "将包装展示、柜台字标与墙面角色共同置于空间中，呈现不同品牌触点之间的视觉联系。", false, 2560, 1441],
    ],
  },
];

function makeChapter(chapter) {
  const section = document.createElement("section");
  section.className = "baobao-chapter";
  const header = document.createElement("div");
  header.className = "baobao-chapter-heading";
  const number = document.createElement("span");
  number.textContent = `${chapter.number} / SUPER BAKE`;
  const title = document.createElement("h3");
  title.textContent = chapter.title;
  const intro = document.createElement("p");
  intro.textContent = chapter.intro;
  header.append(number, title, intro);
  section.append(header);

  const grid = document.createElement("div");
  grid.className = "baobao-grid";
  for (const [file, label, description, wide, width = 2560, height = 1440] of chapter.images) {
    const figure = document.createElement("figure");
    if (wide) figure.className = "wide";
    const link = document.createElement("a");
    link.className = "baobao-image-link";
    if (file === "page-12.webp?v=20261015-lite1") link.classList.add("baobao-image-link--trim-right");
    link.href = imageUrl(file);
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", `查看${label}大图（在新标签页打开）`);
    const image = document.createElement("img");
    image.loading = "lazy";
    image.decoding = "async";
    image.src = imageUrl(file);
    image.alt = `鲍堡芝 · ${label}`;
    image.width = width;
    image.height = height;
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

function enhanceBaobaoCase() {
  const root = document.getElementById("root");
  const modal = root?.querySelector('.v2-case[aria-labelledby="v2-case-title"]');
  if (!modal || modal.classList.contains("baobao-case")) return;
  if (!modal.querySelector("#v2-case-title small")?.textContent.includes("SUPER BAKE")) return;
  const gallery = modal.querySelector(".v2-case-gallery");
  if (!gallery) return;

  modal.classList.add("baobao-case");
  modal.querySelector(".v2-case-summary > p").textContent = "以醒目的黄色与面包角色，建立一家“贩卖快乐的烘焙屋”的品牌识别，再从图形系统延展到日常物料、食品包装与门店场景。";
  const thinking = modal.querySelectorAll(".v2-case-thinking article > p");
  thinking[0].textContent = "在烘焙品牌中建立清晰的视觉记忆，同时让标志、角色与辅助图形能够适配不同尺寸和材质的物料，保持识别的一致性。";
  thinking[1].textContent = "以黄色、黑白对比和粗体字标构成基础识别；围绕面包角色、烘焙产品与工具建立可组合的图形语言，再按不同包装的版面调整图形与文字的层级。";
  gallery.classList.add("baobao-gallery");
  gallery.replaceChildren(...chapters.map(makeChapter));
}

const root = document.getElementById("root");
if (root) {
  new MutationObserver(enhanceBaobaoCase).observe(root, { childList: true, subtree: true });
  enhanceBaobaoCase();
}
