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
  { title: 'Технології', link: 'https://us05web.zoom.us/j/81896758014?pwd=Wrp8FRREaKwb6apGmvnabdK8kse9ii.1' },
  { title: 'Фізра', link: 'https://us05web.zoom.us/j/81165574402?pwd=mNOMR0LqScGubCJHMiZqIhoukgvKVN.1' }
];

const grid = document.getElementById('lessons-grid');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

function addParallax(card) {
  if (isTouchDevice) return;

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = (e.clientY - rect.top - rect.height / 2) / 10;
    card.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

function createCards(filteredLessons) {
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
  });
});

// ====================== БАННЕР ПРИВАТНОСТІ ======================
const privacyBanner = document.getElementById('privacy-banner');
const privacyBtn = document.getElementById('privacy-accept');

if (localStorage.getItem('privacyAccepted') === '1') {
  privacyBanner.style.display = 'none';
}
privacyBtn?.addEventListener('click', () => {
  privacyBanner.style.display = 'none';
  localStorage.setItem('privacyAccepted', '1');
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

  blockedOverlay.style.display = 'flex';

  const titleEl = blockedOverlay.querySelector('h2');
  const textEls = blockedOverlay.querySelectorAll('p');

  if (titleEl) titleEl.textContent = 'Доступ заблоковано';
  if (textEls[0]) textEls[0].textContent = 'Доступ для підключень з РФ обмежено.';
  if (textEls[1]) {
    textEls[1].textContent =
      'Сайт призначений для студентів групи КС-251, які навчаються в Україні.';
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

    if (!isUA && !isRU) {
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

logVisitAndCheckRegion();

// ====================== НОВОСТИ ======================
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

// грузим один раз при старте (на всякий)
loadNews();
