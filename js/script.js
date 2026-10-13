// ==========================================================
// Pasji salon Pudl, demo
// Telefonsko številko vpišeš SAMO TUKAJ, posodobi se povsod.
// ==========================================================
const TELEFON = {
  prikaz: "041 313 011",      // kako se številka izpiše
  mednarodno: "+38641313011", // ista številka brez presledkov, s +386
  // Besedilo, ki se ob kliku na "Pošlji SMS" samo vpiše v sporočilo (stranka dopolni podatke)
  smsBesedilo:
    "Pozdravljeni, rad/a bi naročil/a termin za nego psa.\n" +
    "Ime in priimek: \n" +
    "Ime in pasma psa: \n" +
    "Želena storitev: \n" +
    "Želeni dan: "
};

document.querySelectorAll(".js-tel").forEach(a => a.href = "tel:" + TELEFON.mednarodno);
document.querySelectorAll(".js-sms").forEach(a => {
  a.href = "sms:" + TELEFON.mednarodno + "?&body=" + encodeURIComponent(TELEFON.smsBesedilo);
});
document.querySelectorAll(".js-tel-text").forEach(el => el.textContent = TELEFON.prikaz);

// ---------- Demo oznake (rumeno označena polja) ----------
const demoBtn = document.getElementById("toggle-demo");
if (demoBtn) {
  demoBtn.addEventListener("click", () => {
    const on = document.body.classList.toggle("demo-mode");
    demoBtn.textContent = on ? "Skrij oznake" : "Pokaži oznake";
  });
}

// ---------- Mobilni meni ----------
const nav = document.querySelector(".main-nav");
const navBtn = document.querySelector(".nav-toggle");
navBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navBtn.setAttribute("aria-expanded", open);
});
const zapriMeni = () => {
  nav.classList.remove("open");
  navBtn.setAttribute("aria-expanded", "false");
};
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", zapriMeni));
document.addEventListener("keydown", e => { if (e.key === "Escape") zapriMeni(); });

// ---------- Galerija: povečava slike z listanjem ----------
// Puščice na zaslonu, tipki levo/desno, poteg s prstom; Esc zapre.
const lb = document.getElementById("lightbox");
const lbBody = lb.querySelector(".lb-body");
const lbCap = lb.querySelector(".lb-caption");
const lbCount = lb.querySelector(".lb-count");
const galerija = [...document.querySelectorAll(".g-open")];
let trenutna = 0;

const pokazi = i => {
  trenutna = (i + galerija.length) % galerija.length;
  const btn = galerija[trenutna];
  const img = btn.querySelector("img");
  const slika = document.createElement("img");
  slika.src = img.currentSrc || img.src;
  slika.alt = img.alt;
  lbBody.replaceChildren(slika);
  lbCap.textContent = btn.dataset.caption || "";
  lbCount.textContent = `${trenutna + 1} / ${galerija.length}`;
};

galerija.forEach((btn, i) => btn.addEventListener("click", () => { pokazi(i); lb.showModal(); }));
lb.querySelector(".lb-close").addEventListener("click", () => lb.close());
lb.querySelector(".lb-prev").addEventListener("click", () => pokazi(trenutna - 1));
lb.querySelector(".lb-next").addEventListener("click", () => pokazi(trenutna + 1));
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
lb.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") pokazi(trenutna - 1);
  if (e.key === "ArrowRight") pokazi(trenutna + 1);
});
let zacetekX = null;
lbBody.addEventListener("pointerdown", e => { zacetekX = e.clientX; });
lbBody.addEventListener("pointerup", e => {
  if (zacetekX === null) return;
  const dx = e.clientX - zacetekX;
  if (Math.abs(dx) > 40) pokazi(trenutna + (dx < 0 ? 1 : -1));
  zacetekX = null;
});

// ---------- Video v krogu ----------
// Gumb za ustavitev se pokaže šele, ko se video res naloži.
const video = document.getElementById("hero-video");
const vBtn = document.getElementById("video-toggle");
if (video && vBtn) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.removeAttribute("autoplay");
  video.addEventListener("loadeddata", () => { vBtn.hidden = false; });
  vBtn.addEventListener("click", () => {
    if (video.paused) { video.play(); vBtn.classList.remove("paused"); vBtn.setAttribute("aria-label", "Ustavi video"); }
    else { video.pause(); vBtn.classList.add("paused"); vBtn.setAttribute("aria-label", "Predvajaj video"); }
  });
}

// ---------- Senca pod glavo, ko stran ni več na vrhu ----------
// IntersectionObserver namesto poslušanja drsenja (ne obremenjuje brskalnika).
const glava = document.querySelector(".site-header");
const vrh = document.querySelector(".top-sentinel");
if (glava && vrh && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => glava.classList.toggle("scrolled", !e.isIntersecting)).observe(vrh);
}

// ---------- Meni označi sekcijo, v kateri je obiskovalec ----------
const povezave = [...document.querySelectorAll(".main-nav a[href^='#']")];
const sekcije = povezave.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
if (sekcije.length && "IntersectionObserver" in window) {
  const oznaci = id => povezave.forEach(a => {
    if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  });
  const io = new IntersectionObserver(vnosi => {
    vnosi.forEach(v => { if (v.isIntersecting) oznaci(v.target.id); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sekcije.forEach(s => io.observe(s));
  // Na vrhu strani ni označena nobena povezava
  if (vrh) new IntersectionObserver(([e]) => { if (e.isIntersecting) oznaci(""); }).observe(vrh);
}

// ---------- Zemljevid: naloži se šele po kliku ----------
const mapBtn = document.getElementById("map-load");
if (mapBtn) {
  mapBtn.addEventListener("click", () => {
    const okvir = document.getElementById("zemljevid");
    const iframe = document.createElement("iframe");
    iframe.title = "Zemljevid: Pasji salon Pudl, Pot v toplice 9, Ptuj";
    iframe.src = "https://www.google.com/maps?q=Pot+v+toplice+9,+2250+Ptuj&output=embed";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    okvir.replaceChildren(iframe);
  });
}

// ---------- Telefon: spodnja vrstica se pokaže, ko gumbi na strani niso vidni ----------
const gumbi = [...document.querySelectorAll(".hero-actions")];
if (gumbi.length && "IntersectionObserver" in window) {
  const vidni = new Set();
  const io = new IntersectionObserver(vnosi => {
    vnosi.forEach(v => v.isIntersecting ? vidni.add(v.target) : vidni.delete(v.target));
    document.body.classList.toggle("cta-vidna", vidni.size === 0);
  });
  gumbi.forEach(g => io.observe(g));
} else {
  document.body.classList.add("cta-vidna");
}

// ---------- Tekoče leto v nogi ----------
const leto = document.getElementById("leto");
if (leto) leto.textContent = new Date().getFullYear();

// ---------- Ocene na telefonu: pikice pod karticami ----------
const ocene = document.querySelector(".reviews");
if (ocene && "IntersectionObserver" in window) {
  const kartice = [...ocene.children];
  const pike = document.createElement("div");
  pike.className = "reviews-dots";
  const gumbi = kartice.map((k, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", "Ocena " + (i + 1) + " od " + kartice.length);
    b.addEventListener("click", () => ocene.scrollTo({ left: k.offsetLeft - kartice[0].offsetLeft, behavior: "smooth" }));
    pike.appendChild(b);
    return b;
  });
  ocene.after(pike);
  const io = new IntersectionObserver(vnosi => {
    vnosi.forEach(v => {
      if (v.isIntersecting) gumbi.forEach((b, i) => b.setAttribute("aria-current", kartice[i] === v.target));
    });
  }, { root: ocene, threshold: 0.6 });
  kartice.forEach(k => io.observe(k));
}
