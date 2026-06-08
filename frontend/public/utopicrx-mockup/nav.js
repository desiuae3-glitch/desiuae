(function () {
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");
  const mobNav = document.getElementById("mobNav");

  if (nav) {
    window.addEventListener(
      "scroll",
      () => nav.classList.toggle("on", window.scrollY > 40),
      { passive: true }
    );
  }

  if (menuBtn && mobNav) {
    menuBtn.addEventListener("click", () => {
      const open = mobNav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    mobNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobNav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }
})();
