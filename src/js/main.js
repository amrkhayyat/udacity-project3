window.addEventListener("scroll", function() {
  const header = document.querySelector(".header");
  header.classList.toggle("header--small", window.scrollY > 50);
});