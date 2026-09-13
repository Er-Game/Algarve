// ============================================================
// Fuengirola ⇆ Algarve — lógica de la app
// ============================================================

const ICON = {
  waze: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-5.5-7-11a7 7 0 0114 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>`,
  call: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.68 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0122 16.92z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07l-1.5 1.5"/><path d="M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07l1.5-1.5"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
};

function wazeBtn(lat, lng, label = "Waze") {
  return `<a class="chip-btn chip-btn--sun" href="${wazeUrl(lat, lng)}">${ICON.waze} ${label}</a>`;
}
function callBtn(phone) {
  return `<a class="chip-btn" href="tel:${phone.replace(/\s+/g, "")}">${ICON.call} Llamar</a>`;
}

// ---------------- RUTA ----------------
function renderDayTabs(activeId) {
  const el = document.getElementById("day-tabs");
  el.innerHTML = ROUTE.map(day => `
    <button class="day-tab ${day.id === activeId ? "is-active" : ""}" data-day="${day.id}">
      ${day.dayShort}<small>${day.dayLabel.split(" ")[1]} sept</small>
    </button>
  `).join("");
  el.querySelectorAll(".day-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      renderDayTabs(btn.dataset.day);
      renderRouteList(btn.dataset.day);
    });
  });
}

function poiGroup(poiKey) {
  if (!poiKey || !POIS[poiKey]) return "";
  const items = POIS[poiKey];
  const comer = items.filter(p => p.type === "comer");
  const ver = items.filter(p => p.type === "ver");

  const renderItems = (list) => list.map(p => `
    <div class="poi-item">
      <div class="poi-item__main">
        <p class="poi-item__name">${p.name} ${p.rating ? `<span class="poi-item__rating">★ ${p.rating}</span>` : ""}</p>
        <p class="poi-item__note">${p.note}</p>
      </div>
      <div class="poi-item__actions">
        ${p.phone ? `<a class="icon-btn" href="tel:${p.phone}">${ICON.call}</a>` : ""}
        <a class="icon-btn" href="${wazeUrl(p.lat, p.lng)}">${ICON.waze}</a>
      </div>
    </div>
  `).join("");

  let html = "";
  if (comer.length) {
    html += `<div class="poi-group"><p class="poi-group__label">🍽 Para comer</p>${renderItems(comer)}</div>`;
  }
  if (ver.length) {
    html += `<div class="poi-group"><p class="poi-group__label">📍 Para ver</p>${renderItems(ver)}</div>`;
  }
  return html;
}

function renderRouteList(dayId) {
  const day = ROUTE.find(d => d.id === dayId);
  const el = document.getElementById("route-list");
  el.innerHTML = day.stops.map(stop => `
    <div class="route-stop">
      <div class="route-stop__card">
        <span class="route-stop__time">${stop.time}</span>
        <h3 class="route-stop__name">${stop.name}</h3>
        <p class="route-stop__note">${stop.note}</p>
        <div class="route-stop__actions">
          ${wazeBtn(stop.lat, stop.lng)}
        </div>
        ${poiGroup(stop.poiKey)}
      </div>
    </div>
  `).join("");
}

// ---------------- DORMIR ----------------
function renderHotels() {
  const el = document.getElementById("hotels-panel");
  el.innerHTML = HOTELS.map(h => `
    <div class="hotel-card">
      <div class="hotel-card__top">
        <span class="hotel-card__name">${h.name}</span>
        <span class="hotel-card__price">${h.price}</span>
      </div>
      <p class="hotel-card__meta">${h.location} · ${h.dates}</p>
      ${h.note ? `<p class="hotel-card__note">${h.note}</p>` : ""}
      <div class="hotel-card__actions">
        <a class="btn btn--primary" href="tel:${h.phone}">${ICON.call} Llamar</a>
        <a class="btn btn--sun" href="${wazeUrl(h.lat, h.lng)}">${ICON.waze} Waze</a>
      </div>
    </div>
  `).join("");
}

function renderVans() {
  const el = document.getElementById("vans-panel");
  el.innerHTML = VANS.map(v => `
    <div class="van-card">
      <img class="van-card__image" src="${v.image}" alt="${v.name}" loading="lazy">
      <div class="van-card__body">
        <div class="van-card__top">
          <span class="van-card__name">${v.name}</span>
          <span class="van-card__price">${v.price}</span>
        </div>
        <p class="van-card__location">${v.location} · Contacto: ${v.contact}</p>
        <p class="van-card__desc">${v.description}</p>
        <div class="van-card__actions">
          <a class="btn btn--primary" href="tel:${v.phone}">${ICON.call} Llamar</a>
          <a class="btn btn--ghost" href="${v.url}" target="_blank" rel="noopener">${ICON.link} Anuncio</a>
        </div>
      </div>
    </div>
  `).join("");
}

function setupLodgingToggle() {
  const toggle = document.getElementById("lodging-toggle");
  const hotelsPanel = document.getElementById("hotels-panel");
  const vansPanel = document.getElementById("vans-panel");

  toggle.querySelectorAll(".segmented__btn").forEach(btn => {
    btn.addEventListener("click", () => {
      toggle.querySelectorAll(".segmented__btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const mode = btn.dataset.mode;
      hotelsPanel.hidden = mode !== "hotels";
      vansPanel.hidden = mode !== "vans";
    });
  });
}

// ---------------- CHECKLIST ----------------
const CHECKLIST_KEY = "algarve-trip-checklist";

function getChecklistState() {
  try {
    return JSON.parse(localStorage.getItem(CHECKLIST_KEY)) || {};
  } catch {
    return {};
  }
}
function saveChecklistState(state) {
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(state));
}

function renderChecklist() {
  const state = getChecklistState();
  const el = document.getElementById("checklist");
  el.innerHTML = CHECKLIST_ITEMS.map(item => `
    <div class="checklist-item ${state[item.id] ? "is-done" : ""}" data-id="${item.id}">
      <span class="checklist-item__box">${ICON.check}</span>
      <span class="checklist-item__text">${item.text}</span>
    </div>
  `).join("");

  el.querySelectorAll(".checklist-item").forEach(row => {
    row.addEventListener("click", () => {
      const id = row.dataset.id;
      const s = getChecklistState();
      s[id] = !s[id];
      saveChecklistState(s);
      row.classList.toggle("is-done", s[id]);
    });
  });
}

// ---------------- TAB NAVIGATION ----------------
function setupTabs() {
  const tabs = document.querySelectorAll(".tabbar__item");
  const screens = document.querySelectorAll(".screen");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      screens.forEach(s => s.hidden = s.dataset.screen !== tab.dataset.target);
    });
  });
}

// ---------------- COUNTDOWN ----------------
function setupCountdown() {
  const el = document.getElementById("countdown");
  function update() {
    const now = new Date();
    const start = new Date(TRIP.startDate);
    const diff = start - now;
    if (diff > 0) {
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      if (days > 0) el.textContent = `Salís en ${days}d ${hours}h`;
      else el.textContent = `Salís en ${hours}h`;
    } else {
      el.textContent = "¡Buen viaje!";
    }
  }
  update();
  setInterval(update, 60000);
}

// ---------------- INIT ----------------
document.addEventListener("DOMContentLoaded", () => {
  renderDayTabs(ROUTE[0].id);
  renderRouteList(ROUTE[0].id);
  renderHotels();
  renderVans();
  setupLodgingToggle();
  renderChecklist();
  setupTabs();
  setupCountdown();
});
