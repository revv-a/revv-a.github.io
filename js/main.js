(() => {
  // ─── Starfield ───
  const canvas = document.getElementById("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, stars = [], mouse = { x: 0.5, y: 0.5 };

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    const count = Math.min(140, Math.floor((w * h) / 12000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random() * 0.5 + 0.15,
      s: Math.random() * 0.15 + 0.02,
      tw: Math.random() * Math.PI * 2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const ox = (mouse.x - 0.5) * 18;
    const oy = (mouse.y - 0.5) * 12;

    for (const s of stars) {
      s.tw += 0.015;
      const alpha = s.a + Math.sin(s.tw) * 0.12;
      ctx.beginPath();
      ctx.arc(s.x + ox * s.s * 8, s.y + oy * s.s * 8, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 160, 255, ${Math.max(0.05, alpha)})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX / w;
    mouse.y = e.clientY / h;
  });

  resize();
  draw();

  // ─── Hero fade-in ───
  requestAnimationFrame(() => {
    document.querySelectorAll(".hero .fade-up").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), 120 + i * 140);
    });
  });

  // ─── Section reveal ───
  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  sections.forEach((s) => observer.observe(s));

  // ─── Nav scroll state ───
  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  // ─── Mobile nav ───
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => links.classList.remove("open"))
    );
  }
})();
