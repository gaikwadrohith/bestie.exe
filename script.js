const myGif = document.getElementById("gif");
const fistHeading = document.getElementById("firstH");
const subLine = document.getElementById("myName");
const Ybtn = document.getElementById("y");
const Nbtn = document.getElementById("n");
const themeToggle = document.getElementById("themeToggle");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let isPlaying = false;

musicToggle.innerHTML = '<i class="bi bi-play-fill h3"></i>';

musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    musicToggle.innerHTML = '<i class="bi bi-play-fill h3"></i>';
  } else {
    bgMusic.play();
    musicToggle.innerHTML = '<i class="bi bi-pause-fill h3"></i>';
  }
  isPlaying = !isPlaying;
});


const scenes = {
  initial: {
    gif: "public/gif/1.gif",
    heading: "Tu mazi FRIEND bannar ki nahi?",
    sub: "~Ho ROHIT chi best FRIEND",
  },
  yes: {
    gif: "public/gif/5.gif",
    heading: "mala mahiti hot , tu mazi FRIEND bannshil.🤝💙",
    sub: "you are my best FRIEND forever..!!",
  },
  no: [
    {
      gif: "public/gif/2.gif",
      heading: "v4 krun answer de!",
      sub: "Itkya lwkr nahi nako manu na.",
    },
    {
      gif: "public/gif/3.gif",
      heading: "Parat ekda v4 kr aa !!",
      sub: "Ka as krt ahes RUSHALI.",
    },
    {
      gif: "public/gif/4.gif",
      heading: "RUSH... kiti bhaw khashil sod na",
      sub: "mahtiti ahe tu mazi FRIEND bannshil.",
    },
  ],
};

function applyScene(scene) {
  myGif.innerHTML = `<img src="${scene.gif}">`;
  fistHeading.textContent = scene.heading;
  subLine.textContent = scene.sub;
}

applyScene(scenes.initial);

function FirstYes() {
  applyScene(scenes.yes);
  Ybtn.style.display = "none";
  Nbtn.style.display = "none";
}

let noIndex = 0;
let runawayEnabled = false;
let isMoving = false;
const SAFE_DISTANCE = 100;

function FirstNo() {
  if (noIndex < scenes.no.length) {
    applyScene(scenes.no[noIndex]);
    noIndex++;

    if (noIndex === scenes.no.length) {
      runawayEnabled = true;
      Nbtn.classList.add("runaway");
    }
  }
}

document.addEventListener("mousemove", (e) => {
  if (!runawayEnabled || isMoving) return;

  const rect = Nbtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const distance = Math.hypot(
    e.clientX - centerX,
    e.clientY - centerY
  );

  if (distance < SAFE_DISTANCE) {
    moveButtonSmooth();
  }
});

function moveButtonSmooth() {
  isMoving = true;

  const padding = 20;
  const maxX = window.innerWidth - Nbtn.offsetWidth - padding;
  const maxY = window.innerHeight - Nbtn.offsetHeight - padding;

  Nbtn.style.left = Math.random() * maxX + "px";
  Nbtn.style.top = Math.random() * maxY + "px";

  setTimeout(() => {
    isMoving = false;
  }, 400);
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}

document.body.classList.add("theme-ready");

themeToggle.innerHTML = document.body.classList.contains("dark-theme")
  ? '<i class="bi bi-sun-fill"></i>'
  : '<i class="bi bi-moon-fill"></i>';

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.innerHTML = isDark
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-fill"></i>';
});

window.addEventListener("load", () => {

  const emojis = 
  [ "🤝","🫂","💙","👯‍♂️","👯‍♀️","🫶","😎","😂","🥂","🔥",
  "🧠","✨","🐐","💪","💫","🎉","😄","😁","🙌","🤗",
  "🧡","💛","💚","💜","🩵","🩷","🤍","💖","💞","💓",
  "🧸","🎈","🧩","🎮","🍕","☕","📸","🎶","🌈","⭐",
  "😌","😜","😏","🤪","🥹","🫠","🫡","🫰","🫶"];

  const emojiCount = 18;
  const elements = [];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createEmoji() {
    const el = document.createElement("div");
    el.className = "floating-emoji";
    el.textContent = emojis[Math.ceil(Math.random() * emojis.length)];

    el.style.position = "fixed";
    el.style.left = "0";
    el.style.top = "0";
    el.style.opacity = "0.35";
    el.style.pointerEvents = "none";
    el.style.fontSize = rand(24, 56) + "px";
    el.style.willChange = "transform, filter, opacity";

    el.style.filter =
      "drop-shadow(0 0 10px rgba(255, 105, 180, 0.82))";

    el.style.transition =
      "transform 7s cubic-bezier(0.22, 1, 0.36, 1), " +
      "font-size 7s ease, opacity 4s ease";

    document.body.appendChild(el);
    elements.push(el);

    moveEmoji(el);
  }

  function moveEmoji(el) {
    const x = rand(0, window.innerWidth);
    const y = rand(0, window.innerHeight);
    const r = rand(-18, 18);
    const s = rand(0.9, 1.15);

    el.style.opacity = rand(0.25, 0.45);
    el.style.fontSize = rand(22, 60) + "px";

    el.style.transform =
      `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${s})`;
  }

  for (let i = 0; i < emojiCount; i++) {
    setTimeout(createEmoji, i * 120);
  }

  setInterval(() => {
    elements.forEach(moveEmoji);
  }, 5000);

});
