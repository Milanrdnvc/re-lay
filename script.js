const burger = document.querySelector(".burger");
const closeBtn = document.querySelector(".close-btn");
const nav = document.querySelector("nav");
const header = document.querySelector(".header");
const blurBg = document.querySelector(".blur-bg");

function parallax(e) {
  if (document.body.offsetWidth < 950) return;
  document.querySelectorAll("[data-speed]").forEach(layer => {
    const speed = layer.getAttribute("data-speed");
    const x = (window.innerWidth - e.pageX * speed) / 1000;
    const y = (window.innerHeight - e.pageY * speed) / 1000;
    layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}

// toggle navbar
burger.addEventListener("click", () => {
  nav.style.display = "block";
  blurBg.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  nav.style.display = "none";
  blurBg.style.display = "none";
});

// add parallax effect
addEventListener("mousemove", parallax);

// remove parallax effect for smaller devices
addEventListener("resize", () => {
  if (document.body.offsetWidth < 950) {
    removeEventListener("mousemove", parallax);
    document.querySelectorAll("[data-speed]").forEach(layer => {
      layer.style.transform = "";
    });
  } else {
    addEventListener("mousemove", parallax);
  }
});

// display navbar normally when on bigger screens and remove blurred background; else don't display it
addEventListener("resize", () => {
  if (document.body.offsetWidth >= 950) {
    nav.style.display = "block";
    blurBg.style.display = "none";
  } else {
    nav.style.display = "none";
  }
});

// add shadow to the bottom of the header if we scroll
addEventListener("scroll", () => {
  if (scrollY > 100) {
    header.style.boxShadow = "1px 17px 21px -6px rgba(0,0,0,0.17)";
  } else {
    header.style.boxShadow = "";
  }
});
