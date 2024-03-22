document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const menuLinks = document.querySelector('.menu-links');
  const overlay = document.getElementById("overlay");
  const closeButton = document.querySelector('.close');

  burgerMenu.addEventListener('click', function() {
    menuLinks.classList.toggle('open');
    burgerMenu.classList.toggle('open');

    const isMenuOpen = menuLinks.classList.contains("open");
    overlay.style.opacity = isMenuOpen ? "1" : "0";
    overlay.style.visibility = isMenuOpen ? "visible" : "hidden";
    overlay.style.pointerEvents = isMenuOpen ? "auto" : "none";

    menuLinks.setAttribute("aria-expanded", isMenuOpen.toString());
    closeButton.setAttribute("aria-expanded", isMenuOpen.toString());
  });

  document.querySelector('.close').addEventListener('click', function () {
    menuLinks.classList.remove("open");
    burgerMenu.classList.remove("open");

    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";
    menuLinks.setAttribute("aria-expanded", "false");
    closeButton.setAttribute("aria-expanded", "false");
  });

  overlay.addEventListener('click', function() {
    menuLinks.classList.remove("open");
    burgerMenu.classList.remove("open");

    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
    overlay.style.pointerEvents = "none";
    menuLinks.setAttribute("aria-expanded", "false");
    closeButton.setAttribute("aria-expanded", "false");
  });
});
