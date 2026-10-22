const updatedPhone = "+8617807809326";
const updatedExperience = [
  {
    date: "2024.04—2026.08",
    company: "广州尚嘉体育传媒有限公司",
    role: "设计 · APP 推广 / 赛事海报 / 公众号 / 社媒视觉",
  },
  {
    date: "2023.12—2024.03",
    company: "广西感谢圈信息技术有限公司",
    role: "平面设计师 · 电商详情页 / 包装 / 活动视觉",
  },
  {
    date: "2022.09—2023.12",
    company: "南宁市西乡塘区食品药品安全管理服务协会",
    role: "平面设计师 · 文化建设 / 宣传系统",
  },
  {
    date: "2022.02—2022.09",
    company: "南宁市壹号品牌管理有限公司",
    role: "平面设计师 · 品牌管理 / 门店活动 / 运营策划",
  },
  {
    date: "2019.05—2021.12",
    company: "广西盛凌信息科技有限公司",
    role: "市场推广 / 地推 · 线上线下销售 / 台式机组装 / 校园宽带推广与安装",
  },
];

function updateResume() {
  const list = document.querySelector(".v2-experience-list");
  if (!list) return;

  const currentSignature = [...list.querySelectorAll(":scope > .v2-experience-row")]
    .map((row) => `${row.querySelector("time")?.textContent}|${row.querySelector("h4")?.textContent}`)
    .join("\n");
  const expectedSignature = updatedExperience.map((item) => `${item.date}|${item.company}`).join("\n");

  if (currentSignature !== expectedSignature) {
    list.innerHTML = updatedExperience
      .map(
        (item, index) => `
          <article class="v2-experience-row v2-reveal is-in">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <time>${item.date}</time>
            <div>
              <h4>${item.company}</h4>
              <p>${item.role}</p>
            </div>
          </article>`,
      )
      .join("");
  }

  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach((link) => {
    if (link.getAttribute("href") !== `tel:${updatedPhone}`) link.href = `tel:${updatedPhone}`;
    const strong = link.querySelector("strong");
    if (strong) {
      if (strong.textContent !== "178 0780 9326") strong.textContent = "178 0780 9326";
    } else {
      const textNode = [...link.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
      if (textNode && textNode.textContent !== "+86 178 0780 9326 ") {
        textNode.textContent = "+86 178 0780 9326 ";
      }
    }
  });

  const intro = document.querySelector(".v2-intro");
  if (intro) {
    const updatedIntro = "拥有行业实践经验的视觉与品牌设计师，近年聚焦体育赛事与数字内容，也参与过品牌识别、包装、电商及商业海报项目。熟悉从主题视觉到公众号、社媒和直播封面的多场景设计，持续将AI纳入创作流程，并保持对细节与落地质量的判断。";
    if (intro.textContent !== updatedIntro) intro.textContent = updatedIntro;
  }
}

const resumeObserver = new MutationObserver(updateResume);
resumeObserver.observe(document.getElementById("root"), { childList: true, subtree: true });
updateResume();
