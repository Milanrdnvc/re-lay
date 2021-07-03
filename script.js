const burger = document.querySelector(".burger");
const closeBtn = document.querySelector(".close-btn");
const nav = document.querySelector("nav");
const header = document.querySelector(".header");
const blurBg = document.querySelector(".blur-bg");

burger.addEventListener("click", () => {
  nav.style.display = "block";
  blurBg.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  nav.style.display = "none";
  blurBg.style.display = "none";
});

addEventListener("resize", () => {
  if (document.body.offsetWidth >= 950) {
    nav.style.display = "block";
    blurBg.style.display = "none";
  } else {
    nav.style.display = "none";
  }
});

addEventListener("scroll", () => {
  if (scrollY > 100) {
    header.style.boxShadow = "1px 17px 21px -6px rgba(0,0,0,0.17)";
  } else {
    header.style.boxShadow = "";
  }
});
