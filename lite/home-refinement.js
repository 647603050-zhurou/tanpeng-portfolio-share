// Match the requested homepage reference while retaining the existing anchors.
function refineHome() {
  const hero = document.querySelector(".v2-hero");
  if (!hero || hero.classList.contains("is-reference-home")) return;
  const title = hero.querySelector(".v2-hero-title");
  const nav = document.querySelector(".v2-nav");
  if (!title || !nav) return;
  hero.classList.add("is-reference-home");

  const labels = { "#profile": "关于我", "#projects": "精选项目", "#capabilities": "个人优势" };
  nav.querySelectorAll(".v2-navlinks a").forEach((link) => {
    const label = labels[link.getAttribute("href")];
    if (label) link.textContent = label;
  });
  const contact = nav.querySelector(".v2-contact-button");
  if (contact) contact.innerHTML = `LET’S TALK <span aria-hidden="true">↗</span>`;
  const logoMark = nav.querySelector(".v2-logo span");
  if (logoMark) {
    logoMark.textContent = "©";
    logoMark.setAttribute("aria-hidden", "true");
  }

  title.innerHTML = `
    <p class="home-kicker">VISUAL × AI × BRAND DESIGN</p>
    <div class="home-wordmark">
      <p class="home-name">谭鹏</p>
      <h1><span>VISUAL</span><span>DESIGNER</span></h1>
    </div>`;
  const bottom = hero.querySelector(".v2-hero-bottom p");
  if (bottom) bottom.innerHTML = `视觉设计师 · AI 设计师 · 品牌设计师<small>BASED IN GUANGXI · OPEN TO GUANGZHOU</small>`;
  const explore = hero.querySelector(".v2-hero-bottom a");
  if (explore) {
    explore.setAttribute("aria-label", "浏览精选项目");
    explore.innerHTML = `EXPLORE WORK <b aria-hidden="true">↓</b>`;
  }
  const index = hero.querySelector(".v2-hero-index");
  if (index) index.textContent = "PORTFOLIO / 2020—2026";
}

const homeObserver = new MutationObserver(refineHome);
homeObserver.observe(document.getElementById("root"), { childList: true, subtree: true });
refineHome();
