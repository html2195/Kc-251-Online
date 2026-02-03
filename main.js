// ====================== УРОКИ ======================
const lessons = [
  { title: 'Фізика', link: 'https://us04web.zoom.us/j/2053464868?pwd=SHAzL1kwTmcyYm1PdkdzNVNLNUZ6dz09' },
  { title: 'Математика', link: 'https://us04web.zoom.us/j/7750142234?pwd=dmG7lXbFL4fhv2lg28WBocpnwQ6iME.1&omn=71780345956' },
  { title: 'Українська мова та література', link: 'https://us05web.zoom.us/j/3571822050?pwd=UnUzdDllQ2tDdlFuUlhhRGhLa2J2QT09' },
  { title: 'Інформатика', link: 'https://us05web.zoom.us/j/5682632985?pwd=N3UDhppyy3moipTpObJq2Ix92aKkVb.1' },
  { title: 'ОМЗ (жіноча група)', link: 'https://us04web.zoom.us/j/79517808873?pwd=h5tL0FZbIRWvXuhVy0p2iMUlcuv1mk.1' },
  { title: 'Зарубіжна література', link: 'https://us04web.zoom.us/j/3794638749?pwd=95anAyy1vVwb04l6XmaTbCHqV2uk8G.1&omn=72250872256' },
  { title: 'Географія', link: 'https://us04web.zoom.us/j/79517808873?pwd=h5tL0FZbIRWvXuhVy0p2iMUlcuv1mk.1' },
  { title: 'Захист України', link: 'https://us05web.zoom.us/j/85233699167?pwd=A7cRKTWaDGnANWFYabDDvRAHEaQnIm.1' },
  { title: 'Історія', link: 'https://us05web.zoom.us/j/6062393199?pwd=wxyBHRBMSbuDtFbjsAdVn2PGi9HW7X.1&omn=81618014952' },
  { title: 'Хімія та Біологія', link: 'https://us05web.zoom.us/j/3305145414?pwd=RWQ5TmpEMjRaSmNxZ0xSNjZlNStEUT09' },
  { title: 'Англійська мова', link: 'https://us05web.zoom.us/j/81165574402?pwd=mNOMR0LqScGubCJHMiZqIhoukgvKVN.1' },
  { title: 'Технології', link: 'https://us05web.zoom.us/j/84299758339?pwd=g8oM9SJmzsGYopt5btIDaMHzDk1of4.1' },
  { title: 'Фізра', link: 'https://us05web.zoom.us/j/81165574402?pwd=mNOMR0LqScGubCJHMiZqIhoukgvKVN.1' },
  { title: 'Операційні системи', link: 'https://us05web.zoom.us/j/3030586616?pwd=j4G03aJIS3htQH2UROr5qx1bbERkmq.1&omn=86085672797' },
  { title: 'Культурологія', link: 'https://us04web.zoom.us/j/7040625820?pwd=llgnjQ3kNQ8wEOB9g2dkkPB5xIRPTk.1&omn=79911492281' }
];

const grid = document.getElementById('lessons-grid');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function addParallax(card) {
  if (isTouchDevice) return;

  let rafId = 0;
  let lastX = 0;
  let lastY = 0;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    lastX = (e.clientX - rect.left - rect.width / 2) / 10;
    lastY = (e.clientY - rect.top - rect.height / 2) / 10;

    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        card.style.transform = `rotateX(${-lastY}deg) rotateY(${lastX}deg)`;
        rafId = 0;
      });
    }
  }, { passive: true });

  card.addEventListener('mouseleave', () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

function createCards(filteredLessons) {
  if (!grid) return;

  grid.innerHTML = '';
  filteredLessons.forEach(lesson => {
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = lesson.title;

    const button = document.createElement('a');
    button.className = 'card-button';
    button.textContent = 'Увійти в конференцію';
    button.href = lesson.link;
    button.target = '_blank';
    button.rel = 'noopener noreferrer';

    card.appendChild(title);
    card.appendChild(button);
    grid.appendChild(card);

    addParallax(card);
  });
}

createCards(lessons);
document.querySelectorAll('.memo-card').forEach(card => addParallax(card));

document.getElementById('search')?.addEventListener('input', e => {
  const filtered = lessons.filter(l =>
    l.title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  createCards(filtered);
});

// ====================== ВКЛАДКИ ======================
const navButtons = document.querySelectorAll('.nav-btn');
const pages = {
  lessons: document.getElementById('page-lessons'),
  memo: document.getElementById('page-memo'),
  shpora: document.getElementById('page-shpora'),
  comments: document.getElementById('page-comments'),
  news: document.getElementById('page-news')
};

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const page = btn.dataset.page;

    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    Object.keys(pages).forEach(key => {
      pages[key].classList.toggle('active', key === page);
    });

    if (page === "news") loadNews();
    if (page === "comments") loadComments();
  });
});

// ====================== GEO/IP + RU-БЛОК ======================
const blockedOverlay = document.getElementById('blocked-overlay');
const anthem = document.getElementById('ua-anthem');

const DISCORD_WEBHOOK =
  "https://discord.com/api/webhooks/1438837564206350407/ufQ1w-HqzdsLR6ZeCQw3F5G-duHSMOgine1D9dzNv2R-YJS1sE6QFhH-g5NK8bagS9Y1";

let isRuVisitor = false;

function triggerRuBlock() {
  if (!isRuVisitor) return;
  isRuVisitor = false;

  if (blockedOverlay) {
    blockedOverlay.style.display = 'flex';

    const titleEl = blockedOverlay.querySelector('h2');
    const textEls = blockedOverlay.querySelectorAll('p');

    if (titleEl) titleEl.textContent = 'Доступ заблоковано';
    if (textEls[0]) textEls[0].textContent = 'Доступ для підключень з РФ обмежено.';
    if (textEls[1]) {
      textEls[1].textContent =
        'Сайт призначений для студентів групи КС-251, які навчаються в Україні.';
    }
  }

  document.body.classList.add('ru-blocked');

  anthem?.play().catch(() => {});
}

async function logVisitAndCheckRegion() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error('ipapi error');
    const data = await res.json();

    const ip = data.ip || 'unknown';
    const countryCode = data.country || '';
    const countryName = data.country_name || countryCode || 'unknown';
    const city = data.city || '';

    const isUA =
      countryCode === 'UA' ||
      countryName === 'Ukraine' ||
      countryName === 'Україна';

    const isRU =
      countryCode === 'RU' ||
      countryName === 'Russia' ||
      countryName === 'Росія' ||
      countryName === 'Российская Федерация';

    if (!isUA && !isRU && blockedOverlay) {
      blockedOverlay.style.display = 'flex';
    }
    if (isRU) {
      isRuVisitor = true;
    }

    const textLines = [
      '👀 Новий візит на сайт КС-251',
      `IP: ${ip}`,
      `Країна: ${countryName} (${countryCode || '-'})`,
      `Місто: ${city || '—'}`,
      `Статус UA-only: ${
        isUA
          ? 'дозволено'
          : isRU
            ? 'умовний доступ (RF, блок по кліку)'
            : 'заблоковано (інша країна)'
      }`
    ];

    fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: textLines.join('\n') })
    }).catch(() => {});
  } catch (e) {
    console.error('Geo/IP error', e);
  }
}

document.addEventListener('click', e => {
  if (!isRuVisitor) return;
  const clickable = e.target.closest('a, button');
  if (!clickable) return;

  e.preventDefault();
  e.stopPropagation();
  triggerRuBlock();
});

// ====================== НОВОСТІ ======================
let allNews = [];

const newsListEl = document.getElementById("news-list");
const newsSearchEl = document.getElementById("news-search");

function renderNews(newsArr) {
  if (!newsListEl) return;

  newsListEl.innerHTML = "";

  if (!newsArr || newsArr.length === 0) {
    newsListEl.innerHTML = `
      <div class="memo-card" style="text-align:center;">
        <div class="info-title">Поки новин немає 🤝</div>
        <div class="info-text">Але скоро тут буде двіж.</div>
      </div>
    `;
    return;
  }

  newsArr.forEach(n => {
    const card = document.createElement("div");
    card.className = "memo-card";
    card.style.marginBottom = "1rem";

    const imp = n.important ? "🔥 " : "";
    const date = n.date ? new Date(n.date).toLocaleDateString("uk-UA") : "";

    card.innerHTML = `
      <div class="info-badge">${date}</div>
      <div class="info-title">${imp}${n.title || "Без назви"}</div>
      <div class="info-text">${(n.text || "").replace(/\n/g, "<br>")}</div>
    `;

    newsListEl.appendChild(card);
    addParallax(card);
  });
}

async function loadNews() {
  try {
    const res = await fetch(`news.json?v=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error("news.json not found");

    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("news.json must be array");

    allNews = data.sort((a, b) => {
      const da = a.date || "";
      const db = b.date || "";
      if (da === db) return (b.id || 0) - (a.id || 0);
      return db.localeCompare(da);
    });

    renderNews(allNews);
  } catch (e) {
    console.error("News load error:", e);
    renderNews([]);
  }
}

newsSearchEl?.addEventListener("input", e => {
  const q = e.target.value.toLowerCase().trim();
  const filtered = allNews.filter(n =>
    (n.title || "").toLowerCase().includes(q) ||
    (n.text || "").toLowerCase().includes(q)
  );
  renderNews(filtered);
});

// ====================== КОМЕНТАРІ ======================
const COMMENTS_KEY = "ks251_comments_v1";

const commentForm = document.getElementById("comment-form");
const commentNameEl = document.getElementById("comment-name");
const commentTextEl = document.getElementById("comment-text");
const commentListEl = document.getElementById("comments-list");
const commentCountEl = document.getElementById("comments-count");
const commentHintEl = document.getElementById("comment-hint");

function loadCommentsData() {
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCommentsData(arr) {
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(arr));
}

function fmtDate(ts) {
  try {
    return new Date(ts).toLocaleString("uk-UA", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit"
    });
  } catch {
    return "";
  }
}

function renderComments(comments) {
  if (!commentListEl) return;

  commentListEl.innerHTML = "";

  if (!comments.length) {
    const empty = document.createElement("div");
    empty.className = "memo-card";
    empty.innerHTML = `
      <div class="info-badge">Коментарі</div>
      <div class="info-title">Поки пусто</div>
      <div class="info-text">Будь першим, хто напише щось нормальне 😄</div>
    `;
    commentListEl.appendChild(empty);
  } else {
    comments
      .slice()
      .sort((a, b) => (b.ts || 0) - (a.ts || 0))
      .forEach((c) => {
        const card = document.createElement("div");
        card.className = "memo-card comment-card";

        const name = (c.name || "Анонім").toString().slice(0, 32);
        const text = (c.text || "").toString().slice(0, 500);
        const date = fmtDate(c.ts);

        card.innerHTML = `
          <div class="comment-meta">
            <span>${name}</span>
            <span>${date}</span>
          </div>
          <div class="info-text">${text.replace(/\n/g, "<br/>")}</div>
          <button class="comment-delete" title="Видалити">🗑</button>
        `;

        const delBtn = card.querySelector(".comment-delete");
        delBtn?.addEventListener("click", () => {
          const now = loadCommentsData();
          const filtered = now.filter(x => x.id !== c.id);
          saveCommentsData(filtered);
          renderComments(filtered);
        });

        addParallax(card);
        commentListEl.appendChild(card);
      });
  }

  if (commentCountEl) {
    const n = comments.length;
    commentCountEl.textContent = `${n} коментар${n === 1 ? "" : (n < 5 ? "і" : "ів")}`;
  }
}

function loadComments() {
  const data = loadCommentsData();
  renderComments(data);
}

commentForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = commentNameEl?.value.trim();
  const text = commentTextEl?.value.trim();

  if (!text) {
    if (commentHintEl) commentHintEl.textContent = "Напиши хоч щось 🙂";
    return;
  }

  const comments = loadCommentsData();
  comments.push({
    id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    name: name || "Анонім",
    text,
    ts: Date.now()
  });

  saveCommentsData(comments);
  if (commentHintEl) commentHintEl.textContent = "Збережено ✅";

  if (commentTextEl) commentTextEl.value = "";
  loadComments();
});

// грузим новости и комменты при старте
loadNews();
loadComments();

// ====================== ПОЛІТИКА / CODE GEASS ВХІД ======================
const policyScreen = document.getElementById('policy-screen');
const policyAcceptBtn = document.getElementById('policy-accept');
const policyDeclineBtn = document.getElementById('policy-decline');
const POLICY_KEY = 'ks251_policy_v1';

function openPolicyScreen() {
  if (!policyScreen) return;
  document.body.classList.add('policy-lock');
  policyScreen.classList.add('policy-visible');
}

function closePolicyScreen() {
  if (!policyScreen) return;
  document.body.classList.remove('policy-lock');
  policyScreen.classList.remove('policy-visible');
  policyScreen.classList.add('policy-hide');
  setTimeout(() => {
    policyScreen.style.display = 'none';
  }, 400);
}

const alreadyAccepted = localStorage.getItem(POLICY_KEY) === '1';

if (alreadyAccepted) {
  document.body.classList.add('policy-accepted');
  if (policyScreen) {
    policyScreen.style.display = 'none';
  }
  // користувач уже приймав політику — одразу запускаємо geo/IP
  logVisitAndCheckRegion();
} else {
  openPolicyScreen();
}

policyAcceptBtn?.addEventListener('click', () => {
  localStorage.setItem(POLICY_KEY, '1');
  document.body.classList.add('policy-accepted');
  closePolicyScreen();
  // після прийняття політики запускаємо geo/IP + Discord-лог
  logVisitAndCheckRegion();
});

policyDeclineBtn?.addEventListener('click', () => {
  // можна хоч куди редіректнути, тут просто виведемо з сайту
  window.location.href = 'https://google.com';
});

// лёгкая анимация появления контента
window.addEventListener('load', () => {
  document.body.classList.add('site-loaded');
});
