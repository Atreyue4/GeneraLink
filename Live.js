// ===========================
//   DETECCIÓN DE SCROLL (CON DEBOUNCE)
// ===========================
let autoScrollEnabled = true;
let scrollTimeout;

function detectScroll() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const box = document.getElementById("chatMessages");
    if (!box) return;
    const isNearBottom =
      box.scrollTop + box.clientHeight >= box.scrollHeight - 50; // Más tolerancia
    autoScrollEnabled = isNearBottom;
  }, 100);
}

const chatBox = document.getElementById("chatMessages");
if (chatBox) {
  chatBox.addEventListener("scroll", detectScroll);
}

// ===========================
//   ENVIAR MENSAJE DEL USUARIO
// ===========================
function sendMsg() {
  const input = document.getElementById("chatInput");
  if (!input) return;
  const text = input.value.trim();
  if (text === "" || text.length > 200) return; // Validación básica

  addMessage("Tú", text, "user-self");
  input.value = "";
  input.focus(); // Mantén foco para accesibilidad
}

// ===========================
//   AGREGAR MENSAJE AL CHAT
// ===========================
function addMessage(user, text, userClass = "") {
  const box = document.getElementById("chatMessages");
  if (!box) return;

  const div = document.createElement("div");
  div.classList.add("msg");
  if (userClass) div.classList.add(userClass);

  // Agregar timestamp
  const now = new Date();
  const timeString = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  div.innerHTML = `<span class="username">${user}:</span> ${text} <span class="timestamp">${timeString}</span>`;

  box.appendChild(div);

  // Hacer scroll SOLO si el usuario ya está cerca del final
  if (autoScrollEnabled) {
    setTimeout(() => {
      box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
    }, 100);
  }
}

// ===========================
//   USUARIOS ALEATORIOS
// ===========================
const fakeUsers = [
  { name: "Carlos", class: "user-1" },
  { name: "María", class: "user-2" },
  { name: "Elena", class: "user-3" },
  { name: "Jorge", class: "user-4" },
  { name: "Ana", class: "user-5" },
];

// ===========================
//   MENSAJES ALEATORIOS
// ===========================
const fakeMessages = [
  "¡Qué buen live!",
  "Esto está interesante 😄",
  "Saludos desde Trujillo",
  "Me encanta este contenido ❤️",
  "¿Habrá otro live más tarde?",
  "Excelente explicación 👏",
  "Hola a todos 👋",
  "Muy útil, gracias",
  "¡Sigue así!",
  "Pregunta: ¿Cómo aprendiste eso?",
];

// ===========================
//   MENSAJES AUTOMÁTICOS (MEJORADOS)
// ===========================
let lastUserIndex = -1; // Evitar repeticiones consecutivas

function autoMessage() {
  let userIndex;
  do {
    userIndex = Math.floor(Math.random() * fakeUsers.length);
  } while (userIndex === lastUserIndex);
  lastUserIndex = userIndex;

  const user = fakeUsers[userIndex];
  const text = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];

  addMessage(user.name, text, user.class);

  const nextTime = Math.floor(Math.random() * 5000) + 2000; // Más variado
  setTimeout(autoMessage, nextTime);
}

// Iniciar mensajes automáticos después de un retraso inicial
setTimeout(autoMessage, 3000);
