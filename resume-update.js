const updatedPhone = "+8617807809326";

function updateResume() {
  const list = document.querySelector(".v2-experience-list");
  if (!list) return;

  if (!list.querySelector("#latest-experience")) {
    const latest = document.createElement("article");
    latest.id = "latest-experience";
    latest.className = "v2-experience-row v2-reveal is-in";
    latest.innerHTML = `
      <span>01</span>
      <time>2025.04—2026.08</time>
      <div>
        <h4>广州尚嘉体育传媒有限公司</h4>
        <p>设计 · APP 推广 / 赛事海报 / 公众号 / 社媒视觉</p>
      </div>`;
    list.prepend(latest);
  }

  list.querySelectorAll(":scope > .v2-experience-row").forEach((row, index) => {
    const number = row.querySelector(":scope > span");
    const expectedNumber = String(index + 1).padStart(2, "0");
    if (number && number.textContent !== expectedNumber) number.textContent = expectedNumber;
    const company = row.querySelector("h4");
    if (company?.textContent === "广西感谢圈信息科技有限公司") {
      company.textContent = "广西感谢圈信息技术有限公司";
    } else if (company?.textContent === "南宁市西乡塘食品药品安全管理服务协会") {
      company.textContent = "南宁市西乡塘区食品药品安全管理服务协会";
    }
  });

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
    const updatedIntro = "以视觉语言连接品牌、内容与传播场景。近年聚焦体育赛事与数字内容，作品覆盖赛事主视觉、公众号、社媒及直播封面；项目经验亦延伸至品牌识别、包装、电商与商业海报。将 AI 融入创意探索与制作流程，兼顾信息清晰、视觉辨识度与最终落地。";
    if (intro.textContent !== updatedIntro) intro.textContent = updatedIntro;
  }
}

const resumeObserver = new MutationObserver(updateResume);
resumeObserver.observe(document.getElementById("root"), { childList: true, subtree: true });
updateResume();
