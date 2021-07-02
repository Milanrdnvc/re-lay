const burger = document.querySelector(".burger");
const closeBtn = document.querySelector(".close-btn");
const nav = document.querySelector("nav");
const header = document.querySelector(".header__wrapper");
const blurBg = document.querySelector(".blur-bg");
let navOn = false;

burger.addEventListener("click", () => {
  nav.style.display = "block";
  blurBg.style.display = "block";
  navOn = true;
});

closeBtn.addEventListener("click", () => {
  nav.style.display = "none";
  blurBg.style.display = "none";
  navOn = false;
});

addEventListener("scroll", () => {
  if (navOn) return;
  if (scrollY > 100) {
    header.style.boxShadow = "1px 17px 21px -6px rgba(0,0,0,0.17)";
  } else {
    header.style.boxShadow = "";
  }
});
