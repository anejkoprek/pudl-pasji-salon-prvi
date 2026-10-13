// ==========================================================
// Pasji salon Pudl, animacije
// GSAP (ScrollTrigger, SplitText) + Lenis za gladko drsenje.
// Efekti so po vzoru React Bits komponent (SplitText, ScrollReveal,
// CircularText, Magnet), prepisani v navaden JavaScript.
// ==========================================================
(function () {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Če knjižnice niso naložene ali obiskovalec ne želi gibanja: vse pokaži in končaj.
  if (reduce || !window.gsap || !window.ScrollTrigger || !window.SplitText) {
    root.classList.remove("anim");
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);
  const desktop = window.matchMedia("(min-width: 761px) and (pointer: fine)").matches;
  const HEADER = 96; // višina glave, da sidra ne skrijejo naslova

  // ---------- Lenis: gladko drsenje ----------
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    // Povezave v meniju (#storitve, #cenik ...) drsijo gladko
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        const target = id === "#top" ? 0 : document.querySelector(id);
        if (target === null) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: id === "#top" ? 0 : -HEADER, duration: 1.2 });
      });
    });

    // Med odprto galerijo se stran ne sme premikati
    const lb = document.getElementById("lightbox");
    if (lb) {
      new MutationObserver(() => (lb.open ? lenis.stop() : lenis.start()))
        .observe(lb, { attributes: true, attributeFilter: ["open"] });
    }
  }

  // ---------- HERO: uvodna sekvenca ----------
  document.fonts.ready.then(() => {
    gsap.set("[data-hero]", { autoAlpha: 1 });

    // SplitText: naslov se dvigne po besedah, vsaka iz svoje "maske"
    const naslov = SplitText.create(".hero h1", {
      type: "lines,words",
      linesClass: "split-line",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.words, {
          yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.06, delay: 0.15,
        }),
    });

    gsap.timeline({ defaults: { ease: "power3.out" } })
      .from(".hero-kicker", { y: 14, autoAlpha: 0, duration: 0.6 }, 0)
      .from(".video-ring", { scale: 0.82, rotate: -12, autoAlpha: 0, duration: 1.2, ease: "back.out(1.4)" }, 0.1)
      .from(".hero-lead", { y: 20, autoAlpha: 0, duration: 0.7 }, 0.55)
      .from(".hero .hero-actions .btn", { y: 20, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, 0.7)
      .from(".hero-card", { y: 40, rotate: -12, autoAlpha: 0, duration: 1, ease: "back.out(1.6)" }, 0.6)
      .from(".facts-list li", { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.08 }, 0.9);

    return naslov;
  });

  // ---------- CircularText: napis okoli videa ----------
  // Vrti se počasi; ko obiskovalec drsi, se zavrti hitreje.
  const ring = document.querySelector(".ring-text");
  if (ring) {
    const vrtenje = gsap.to(ring, { rotation: 360, duration: 40, ease: "none", repeat: -1 });
    if (lenis) {
      lenis.on("scroll", ({ velocity }) => {
        const hitrost = 1 + Math.min(Math.abs(velocity) / 4, 8);
        gsap.to(vrtenje, { timeScale: hitrost, duration: 0.3, overwrite: true });
        gsap.to(vrtenje, { timeScale: 1, duration: 1.2, delay: 0.3 });
      });
    }
    // Video krog se pri drsenju rahlo zamakne (parallax)
    gsap.to(".video-circle", {
      yPercent: 8, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
  }

  // ---------- ScrollReveal: naslovi sekcij ----------
  document.querySelectorAll(".section h2, .contact h2").forEach((h2) => {
    SplitText.create(h2, {
      type: "words",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.words, {
          autoAlpha: 0, y: 14, filter: "blur(6px)", stagger: 0.06, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: h2, start: "top 90%", once: true },
        }),
    });
  });

  // Uvodni odstavki pod naslovi
  gsap.utils.toArray(".section-head p, .about-text p, .contact-text > p").forEach((p) => {
    gsap.from(p, {
      y: 18, autoAlpha: 0, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: p, start: "top 90%" },
    });
  });

  // ---------- Storitve: kartice ena za drugo ----------
  ScrollTrigger.batch(".service", {
    start: "top 88%",
    once: true,
    onEnter: (els) =>
      gsap.from(els, { y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }),
  });
  gsap.utils.toArray(".service svg").forEach((ikona) => {
    gsap.from(ikona, {
      scale: 0, rotate: -30, duration: 0.6, ease: "back.out(2)",
      scrollTrigger: { trigger: ikona, start: "top 90%" },
    });
  });

  // ---------- Cenik: vrstice ----------
  gsap.from(".prices tbody tr", {
    x: -20, autoAlpha: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
    scrollTrigger: { trigger: ".prices", start: "top 85%" },
  });

  // ---------- Koraki: številke in črta med njimi ----------
  const steps = gsap.utils.toArray(".steps li");
  if (steps.length) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".steps", start: "top 80%" } });
    steps.forEach((li, i) => {
      tl.from(li, { y: 24, autoAlpha: 0, duration: 0.55, ease: "power3.out" }, i * 0.18);
    });
  }

  // ---------- Galerija: vrsti prideta od strani (trak se nato vrti s CSS) ----------
  gsap.utils.toArray(".g-row").forEach((vrsta, i) => {
    gsap.from(vrsta, {
      x: i % 2 ? -60 : 60, autoAlpha: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: vrsta, start: "top 90%", once: true },
    });
  });

  // ---------- Ocene: kartice se dvignejo ena za drugo ----------
  ScrollTrigger.batch(".review", {
    start: "top 88%",
    once: true,
    onEnter: (els) =>
      gsap.from(els, { y: 40, rotate: (i) => [-1.5, 1.5, -1][i % 3], autoAlpha: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }),
  });

  // ---------- O meni: slika se odkrije od spodaj ----------
  gsap.from(".about-photo", {
    clipPath: "inset(100% 0 0 0 round 200px 200px 16px 16px)",
    duration: 1.2, ease: "power3.inOut",
    scrollTrigger: { trigger: ".about", start: "top 75%" },
  });

  // ---------- Kontakt ----------
  gsap.from(".contact-list > div", {
    y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.1, ease: "power2.out",
    scrollTrigger: { trigger: ".contact-list", start: "top 85%" },
  });
  gsap.from(".map-bezel", {
    scale: 0.96, autoAlpha: 0, duration: 0.9, ease: "power3.out",
    scrollTrigger: { trigger: ".map-bezel", start: "top 85%" },
  });

  // ---------- Magnet: glavni gumb sledi miški ----------
  if (desktop) {
    document.querySelectorAll(".magnet").forEach((btn) => {
      const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
      });
      btn.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
    });
  }

  // Ko se naložijo slike, preračunaj pozicije sprožilcev
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
