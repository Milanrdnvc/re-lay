const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");
const header = document.querySelector(".header");
const blurBg = document.querySelector(".blur-bg");
const closeBtn = document.querySelector(".close-btn");
const contactForm = document.querySelector(".contact__form");
const navItems = document.querySelectorAll("header nav ul li");
const lang = document.querySelector("html").getAttribute("lang");
const formStatus = document.querySelector(".contact__status");

function parallax(e) {
  if (document.body.offsetWidth < 932) return;
  document.querySelectorAll("[data-speed]").forEach(layer => {
    const speed = layer.getAttribute("data-speed");
    const x = (window.innerWidth - e.pageX * speed) / 1000;
    const y = (window.innerHeight - e.pageY * speed) / 1000;
    layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}

function validateForm({ name, surname, email, company, message, captcha }) {
  let status = "";
  const mailRegEx =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (!name)
    status +=
      lang === "sr"
        ? "Molimo Vas unesite pravilno ime="
        : "Please enter a valid name=";
  if (!surname)
    status +=
      lang === "sr"
        ? "Molimo Vas unesite pravilno prezime="
        : "Please enter a valid surname=";
  if (!email || !email.match(mailRegEx))
    status +=
      lang === "sr"
        ? "Molimo Vas unesite pravilan e-mail="
        : "Please enter a valid e-mail=";
  if (!company)
    status +=
      lang === "sr"
        ? "Molimo Vas unesite pravilan naziv kompanije="
        : "Please enter a valid company name=";
  if (!message)
    status +=
      lang === "sr"
        ? "Molimo Vas unesite pravilnu poruku="
        : "Please enter a valid message=";
  if (captcha.answer !== captcha.userAnswer)
    status +=
      lang === "sr"
        ? "Molimo Vas ispravno odgovorite na zadato pitanje="
        : "Please answer the question correctly=";
  return status || true;
}

// contact form submission
contactForm.addEventListener("submit", async e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const endpoint = "https://formspree.io/f/mnqlbqgp";
  const captchaQuestion = document
    .querySelector(".contact__captcha label")
    .innerText.split(":")[1]
    .trim()
    .split("+");
  const firstNum = Number(captchaQuestion[0]);
  const secondNum = Number(captchaQuestion[1]);
  const captcha = firstNum + secondNum;
  const userCaptchaAnswer = Number(
    document.querySelector(".contact__captcha input").value
  );
  const body = {
    name: data.get("name"),
    surname: data.get("surname"),
    email: data.get("email"),
    company: data.get("company"),
    message: data.get("message"),
    captcha: { answer: captcha, userAnswer: userCaptchaAnswer },
  };
  const status = validateForm(body);
  formStatus.innerHTML = "";
  if (typeof status === "string") {
    const statusMessagesArray = status.split("=");
    statusMessagesArray.forEach(statusMsg => {
      const spanMsg = document.createElement("span");
      spanMsg.innerText = statusMsg;
      spanMsg.style.display = "block";
      formStatus.appendChild(spanMsg);
    });
    return;
  }
  const captchaQuestionSpan = document.querySelector(
    ".contact__captcha label span"
  );
  const firstRandomNum = Math.round(Math.random() * 10);
  const secondRandomNum = Math.round(Math.random() * 10);
  captchaQuestionSpan.innerText = `${firstRandomNum} + ${secondRandomNum}`;
  fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json",
    },
  })
    .then(res => {
      console.log(res);
      contactForm.reset();
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
});

// toggle navbar
burger.addEventListener("click", () => {
  nav.classList.add("active");
  blurBg.classList.add("active");
  navItems.forEach((link, idx) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 250ms ease-in-out forwards ${
        idx / 7
      }s`;
    }
  });
});

closeBtn.addEventListener("click", () => {
  nav.classList.remove("active");
  blurBg.classList.remove("active");
  navItems.forEach(link => (link.style.animation = ""));
});

// add parallax effect
addEventListener("mousemove", parallax);

// remove parallax effect for smaller devices
addEventListener("resize", () => {
  if (document.body.offsetWidth < 932) {
    removeEventListener("mousemove", parallax);
    document.querySelectorAll("[data-speed]").forEach((layer, idx) => {
      layer.style.transform = "";
    });
  } else {
    addEventListener("mousemove", parallax);
  }
});

// when on bigger screens, remove active classes from navbar, blurred background, and remove nav links animtaion styles
addEventListener("resize", () => {
  if (!(document.body.offsetWidth >= 950)) return;
  nav.classList.remove("active");
  blurBg.classList.remove("active");
  navItems.forEach(link => (link.style.animation = ""));
});

// add shadow to the bottom of the header if we scroll
addEventListener("scroll", () => {
  if (scrollY > 100) {
    header.style.boxShadow = "1px 17px 21px -6px rgba(0,0,0,0.17)";
  } else {
    header.style.boxShadow = "";
  }
});
