// An editable content layer for the published V2 and Lite editions.
const imageUrl = (file) => new URL(`./projects/${file}?v=20261014-moz3`, import.meta.url).href;

const chapters = [
  {
    number: "01",
    title: "标志与色彩",
    intro: "以阿嬷形象与奶茶杯为识别线索，结合鲜茶绿、自然蓝和叶片元素，建立亲切、清新的手作奶茶品牌视觉。",
    images: [
      ["page-22.webp", "品牌概念", "围绕手作奶茶展开品牌表达，为标志、角色与应用物料建立共同的视觉基调。"],
      ["page-26.webp", "基础标志组合", "将角色图形、中英文字标与“手作奶茶”品类标识组合，呈现品牌的基础识别。"],
      ["mozuofang-logo-inspiration.webp", "标志设计与灵感来源", "将奶茶杯与阿嬷形象结合为图形标志，以人物特征传达品牌的亲近感。", true, 2560, 1388],
      ["mozuofang-colors.webp", "品牌标准色与辅助色", "以鲜茶绿与自然蓝形成主要色彩对比，辅以鲜果黄和清新绿，为不同应用提供统一的色彩依据。", true, 2560, 1417],
    ],
  },
  {
    number: "02",
    title: "辅助图形与品牌主视觉",
    intro: "围绕手作、鲜茶与“用心调制”的表达，建立标语、图标和标签等辅助元素，再将阿嬷角色与调制场景组合成品牌主视觉。",
    images: [
      ["mozuofang-supporting-graphics.webp", "品牌辅助图形", "以手作、奶茶、鲜果与日常情绪为线索，将图标、字形与短句组合成可延展的品牌元素，丰富包装和宣传物料的表达。", true, 2042, 1149],
      ["mozuofang-keyvisual.webp", "手作奶茶主视觉", "阿嬷调制饮品的动作与食材图形呼应手作主题，蓝绿配色和 Fresh Taste 标签强化整体识别。", true, 2044, 1146],
    ],
  },
  {
    number: "03",
    title: "包装与标签应用",
    intro: "把品牌字标、角色和辅助图形延展到纸杯、杯套、手提袋与小料标签中，展示同一视觉系统在不同载体上的组合方式。",
    images: [
      ["mozuofang-paper-cups.webp", "纸杯应用", "以大字号英文与阿嬷角色形成两种杯身构图，绿色底版和白色底版共享同一套品牌元素。", false, 2045, 1145],
      ["mozuofang-cup-sleeves.webp", "杯套应用", "将品牌字标与角色主视觉用于透明杯的杯套，保持图形与文字在小版面上的清晰识别。", false, 2044, 1145],
      ["page-28.webp", "手提袋应用", "以蓝绿配色、品牌字标和角色图形组织袋身视觉，延续饮品包装的识别语言。"],
      ["mozuofang-labels.webp", "半成品与小料标签", "以统一的信息结构区分布丁、西米、西柚粒等品类，并将品牌标识延展到圆形贴纸中。"],
    ],
  },
  {
    number: "04",
    title: "宣传海报",
    intro: "以开业、产品推广和招聘为不同传播主题，通过蓝绿配色、角色与食材图形保持系列海报的品牌一致性。",
    images: [
      ["mozuofang-posters.webp", "开业、产品与招聘海报", "开业海报突出活动信息与角色，产品海报聚焦饮品，招聘海报强调岗位信息；三种内容沿用共同的品牌语言。", true, 2041, 1148],
    ],
  },
  {
    number: "05",
    title: "门店空间效果图",
    intro: "通过门头、吧台、座席与品牌墙的空间效果图，展示蓝绿配色、阿嬷角色和辅助图形在门店场景中的应用。",
    images: [
      ["mozuofang-space-02.webp", "门头整体效果", "将阿嬷奶茶杯标志、中英文字标与品类标识用于门头，入口边框和窗面图形延续绿色识别。", true, 2500, 1406],
      ["mozuofang-space-07.webp", "点单区与休憩区", "以绿色点单标识和墙面图形串联吧台与座席，呈现两类区域之间的整体视觉关系。", false, 2500, 1406],
      ["mozuofang-space-09.webp", "出杯区与菜单", "将菜单、出杯标识和 KEEP OPTIMISTIC 标语融入吧台立面，展示品牌信息在服务区域中的层级。", false, 2500, 1406],
      ["mozuofang-space-06.webp", "吧台与座席全景", "从正面视角呈现菜单区、吧台与座席的组合，绿色灯带与蓝色圆点呼应品牌配色。", true, 2500, 834],
      ["mozuofang-space-04.webp", "品牌墙正面全景", "将阿嬷角色、食材图形、大字号英文与品牌短句延展为横向墙面画面。", true, 2500, 906],
      ["mozuofang-space-03.webp", "品牌墙近景", "通过近距离视角展示角色、Fresh Taste 标签与座席区域之间的关系，补充图形在空间中的应用细节。", true, 2500, 1406],
      ["mozuofang-space-05.webp", "绿色方格墙面", "以重复的绿色方格形成空间中的色彩焦点，与门侧品牌标识共同延续视觉识别。", false, 1440, 1800],
      ["mozuofang-space-08.webp", "入口与辅助图形", "将“好奶好茶”字样与奶盒线稿用于入口附近墙面，让辅助图形从平面物料延展到空间。", false, 1440, 1800],
    ],
  },
];

function makeChapter(chapter) {
  const section = document.createElement("section");
  section.className = "mozuofang-chapter";
  const heading = document.createElement("div");
  heading.className = "mozuofang-chapter-heading";
  const number = document.createElement("span");
  number.textContent = `${chapter.number} / MOZUOFANG`;
  const title = document.createElement("h3");
  title.textContent = chapter.title;
  const intro = document.createElement("p");
  intro.textContent = chapter.intro;
  heading.append(number, title, intro);
  section.append(heading);

  const grid = document.createElement("div");
  grid.className = "mozuofang-grid";
  for (const [file, label, description, wide, width = 2560, height = 1440] of chapter.images) {
    const figure = document.createElement("figure");
    if (wide) figure.className = "wide";
    const link = document.createElement("a");
    link.className = "mozuofang-image-link";
    link.href = imageUrl(file);
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", `查看${label}大图（在新标签页打开）`);
    const image = document.createElement("img");
    image.loading = "lazy";
    image.decoding = "async";
    image.dataset.caseSrc = imageUrl(file);
    image.alt = `嬷作坊 · ${label}`;
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

function enhanceMozuofangCase() {
  const root = document.getElementById("root");
  const modal = root?.querySelector('.v2-case[aria-labelledby="v2-case-title"]');
  if (!modal || modal.classList.contains("mozuofang-case")) return;
  if (modal.querySelector("#v2-case-title small")?.textContent !== "MOZUOFANG") return;
  const gallery = modal.querySelector(".v2-case-gallery");
  if (!gallery) return;

  modal.classList.add("mozuofang-case");
  modal.querySelector(".v2-case-summary > p").textContent = "以阿嬷形象与奶茶杯为识别线索，用蓝绿配色建立亲切、清新的手作奶茶品牌视觉，并延展到包装、标签、宣传海报与门店场景。";
  const thinking = modal.querySelectorAll(".v2-case-thinking article > p");
  thinking[0].textContent = "在茶饮品牌中建立具有亲近感的视觉识别，同时让标志、角色与色彩在杯身、标签及宣传物料中保持清晰、一致。";
  thinking[1].textContent = "从阿嬷形象、奶茶杯与茶叶中提取图形线索，以鲜茶绿和自然蓝构建色彩系统；再通过角色、英文排版与辅助图形的不同组合，适配包装和海报的信息层级。";
  gallery.classList.add("mozuofang-gallery");
  gallery.replaceChildren(...chapters.map(makeChapter));
}

const root = document.getElementById("root");
if (root) {
  new MutationObserver(enhanceMozuofangCase).observe(root, { childList: true, subtree: true });
  enhanceMozuofangCase();
}
