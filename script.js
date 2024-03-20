document.addEventListener('DOMContentLoaded', function() {
  const burgerMenu = document.querySelector('.burger-menu');
  const menuLinks = document.querySelector('.menu-links');

  burgerMenu.addEventListener('click', function() {
    menuLinks.classList.toggle('open');
    burgerMenu.classList.toggle('open');
  });
});

function closeMenu() {
  let menu = document.querySelector(".menu-links");
  let overlay = document.getElementById("overlay");
  let burgerMenu = document.querySelector(".burger-menu");
  let isMenuOpen = menu.classList.contains("open");

  menu.classList.toggle("open"); // Toggle the 'open' class
  burgerMenu.classList.toggle("open"); // Toggle the 'open' class
  overlay.style.display = isMenuOpen ? "block" : "none";
  // Add transition to the left property
  menu.style.transition = "left 0.8s";
}