const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");
const header = document.querySelector(".header");
const blurBg = document.querySelector(".blur-bg");
const closeBtn = document.querySelector(".close-btn");
const contactForm = document.querySelector(".contact__form");

function parallax(e) {
  if (document.body.offsetWidth < 950) return;
  document.querySelectorAll("[data-speed]").forEach(layer => {
    const speed = layer.getAttribute("data-speed");
    const x = (window.innerWidth - e.pageX * speed) / 1000;
    const y = (window.innerHeight - e.pageY * speed) / 1000;
    layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}

// contact form submission
contactForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log("test...");
});

// toggle navbar
burger.addEventListener("click", () => {
  nav.classList.add("active");
  blurBg.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  nav.classList.remove("active");
  blurBg.classList.remove("active");
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

// when on bigger screens, remove active classes from navbar and blurred background
addEventListener("resize", () => {
  if (!document.body.offsetWidth >= 950) return;
  nav.classList.remove("active");
  blurBg.classList.remove("active");
});

// add shadow to the bottom of the header if we scroll
addEventListener("scroll", () => {
  if (scrollY > 100) {
    header.style.boxShadow = "1px 17px 21px -6px rgba(0,0,0,0.17)";
  } else {
    header.style.boxShadow = "";
  }
});
