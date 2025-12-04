/* ============================================================
   MODAL CREAR POST
============================================================ */
function openPost() {
  document.getElementById("postModal").classList.remove("hidden");
}

function closePost() {
  document.getElementById("postModal").classList.add("hidden");
}

function post() {
  const text = document.getElementById("postText").value.trim();
  const file = document.getElementById("postImage").files[0];

  if (!text && !file) {
    alert("Escribe algo o agrega una imagen/video.");
    return;
  }

  alert("¡Tu post ha sido publicado!");

  // Limpiar
  document.getElementById("postText").value = "";
  document.getElementById("postImage").value = "";
  document.getElementById("imagePreview").innerHTML = "";
  document.getElementById("imagePreview").classList.add("hidden");

  closePost();
}

/* ============================================================
       POST ACTIONS (Like, Traducir)
    ============================================================ */
function likePost(el) {
  el.src = el.src.includes("like-empty")
    ? "images/like-full.png"
    : "images/like-empty.png";
}

function translatePost(el) {
  const titleBar = el.closest(".post").querySelector(".post-title-bar span");
  if (titleBar) titleBar.textContent += " (EN)";
}

/* ============================================================
       NAVEGACIÓN
    ============================================================ */
function openNotifications() {
  window.open("notificaciones.html", "_blank");
}

function openSchool() {
  window.open("colegio.html", "_blank");
}

function openArrow() {
  window.history.back();
}

/* ============================================================
       CHAT PANEL
    ============================================================ */
function openChat() {
  const panel = document.getElementById("chatPanel");
  panel.style.bottom = "20px";

  document.getElementById("chatTitle").textContent = "Chats";
  document.getElementById("chatListPanel").style.display = "block";
  document.getElementById("chatConversation").style.display = "none";
}

function closeChat() {
  document.getElementById("chatPanel").style.bottom = "-520px";
  document.getElementById("chatBox").innerHTML = "";
}

/* ABRIR CONVERSACIÓN */
function openChatConversation(name) {
  document.getElementById("chatTitle").textContent = name;
  document.getElementById("chatListPanel").style.display = "none";
  document.getElementById("chatConversation").style.display = "flex";

  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = "";

  pushMessage("them", "Hola, soy " + name + ". ¿En qué puedo ayudarte?");
  pushMessage("me", "Hola, tengo una consulta...");

  scrollChatToBottom();

  document.getElementById("chatMessage").focus();
}

/* ENVIAR MENSAJES */
function pushMessage(who, text) {
  const box = document.getElementById("chatBox");
  const div = document.createElement("div");
  div.className = "bubble " + who;
  div.textContent = text;
  box.appendChild(div);
  scrollChatToBottom();
}

function sendMessage() {
  const input = document.getElementById("chatMessage");
  const text = input.value.trim();

  if (!text || text.length > 500) {
    alert("Mensaje vacío o demasiado largo.");
    return;
  }

  pushMessage("me", text);
  input.value = "";

  simulateTyping();
}

/* "ESCRIBIENDO..." */
function simulateTyping() {
  const contact = document.getElementById("chatTitle").textContent;
  const statusId =
    contact === "Abril Torres" ? "status-abril" : "status-alejandro";

  const statusEl = document.getElementById(statusId);
  statusEl.textContent = "Escribiendo...";

  setTimeout(() => {
    pushMessage("them", "¡Gracias por tu mensaje!");
    statusEl.textContent = "En línea";
  }, 1500);
}

/* IR ABAJO DE TODO */
function scrollChatToBottom() {
  const box = document.getElementById("chatBox");
  box.scrollTop = box.scrollHeight;
}

/* BOTÓN VOLVER EN CHAT */
function backToChatList() {
  document.getElementById("chatListPanel").style.display = "block";
  document.getElementById("chatConversation").style.display = "none";
  document.getElementById("chatTitle").textContent = "Chats";
  document.getElementById("chatBox").innerHTML = "";
}

/* CLIC EN EL TÍTULO PARA VOLVER */
document.getElementById("chatHeader").addEventListener("click", function (e) {
  if (e.target.id === "chatTitle") {
    backToChatList();
  }
});

/* ============================================================
       RESPUESTAS A POSTS
    ============================================================ */
function toggleReply(button) {
  const replyArea = button.closest(".post").querySelector(".reply-area");
  replyArea.classList.toggle("hidden");
}

function cancelReply(button) {
  const replyArea = button.closest(".reply-area");
  replyArea.querySelector("textarea").value = "";
  replyArea.classList.add("hidden");
}

function submitReply(button) {
  const replyArea = button.closest(".reply-area");
  const text = replyArea.querySelector("textarea").value.trim();

  if (!text) return;

  const comments = button.closest(".post").querySelector(".comments");
  const comment = document.createElement("div");
  comment.className = "comment";
  comment.innerHTML = `<strong>Tú:</strong> ${text}`;

  comments.appendChild(comment);

  replyArea.querySelector("textarea").value = "";
  replyArea.classList.add("hidden");
}

/* ============================================================
       BÚSQUEDA (placeholder)
    ============================================================ */
function search() {
  // vacío para evitar errores
}

/* ============================================================
       PREVIEW DE IMAGEN
    ============================================================ */
function previewImage() {
  const file = document.getElementById("postImage").files[0];
  const preview = document.getElementById("imagePreview");

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
      preview.classList.remove("hidden");
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = "";
    preview.classList.add("hidden");
  }
}

/* ============================================================
       MENÚ DEL PERFIL (Escritorio)
    ============================================================ */
function toggleProfileMenu() {
  const menu = document.getElementById("profileMenu");
  menu.classList.toggle("hidden");
}

document.addEventListener("click", function (e) {
  const menu = document.getElementById("profileMenu");
  const profile = document.querySelector(".profile-icon");

  if (!menu.contains(e.target) && !profile.contains(e.target)) {
    menu.classList.add("hidden");
  }
});

/* ============================================================
       MENÚ HAMBURGUESA (MÓVIL)
    ============================================================ */
/* ============================================================
       MENÚ HAMBURGUESA (MÓVIL) LIMPIO Y FUNCIONAL
    ============================================================ */
const mobileMenu = document.getElementById("mobileMenu");
const burgerBtn = document.getElementById("menuHamburger");
const menuBackBtn = document.querySelector("#mobileMenu .menu-back");

// Abrir menú
function openMobileMenu() {
  mobileMenu.classList.remove("hidden");
  setTimeout(() => mobileMenu.classList.add("active"), 10); // animación suave
}

// Cerrar menú
function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  setTimeout(() => mobileMenu.classList.add("hidden"), 300); // coincide con la transición CSS
}

// Botón "Volver" dentro del menú
if (menuBackBtn) {
  menuBackBtn.addEventListener("click", closeMobileMenu);
}

// Cerrar al hacer clic fuera
document.addEventListener("click", function (e) {
  if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
    closeMobileMenu();
  }
});

// Evitar que clics dentro del menú cierren el menú
mobileMenu.addEventListener("click", function (e) {
  e.stopPropagation();
});

/* ============================================================
       NAVEGAR A OTRA PÁGINA
    ============================================================ */
function openPage(url) {
  window.location.href = url;
}
// =======================
// MODAL REPORT
// =======================

// Abrir modal de reporte
function openReport() {
  document.getElementById("reportModal").classList.remove("hidden");
}

// Cerrar modal de reporte
function closeReport() {
  document.getElementById("reportModal").classList.add("hidden");
  document.getElementById("reportText").value = ""; // limpiar textarea
}

// Enviar reporte
function submitReport() {
  const reason = document.getElementById("reportText").value.trim();
  if (reason === "") {
    alert("Por favor, indica el motivo del reporte.");
    return;
  }

  // Aquí puedes agregar la lógica para enviar el reporte al servidor
  console.log("Reporte enviado:", reason);

  alert("Reporte enviado correctamente.");
  closeReport();
}

// =======================
// MODAL ALERT ICON EN POSTS
// =======================

// Seleccionamos todos los iconos de alerta
const alertIcons = document.querySelectorAll(
  ".post-header .icon[src*='alert.png']"
);

// Asignamos evento click a cada uno
alertIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    openReport();
  });
});
// Función para alternar idioma de un post
function translatePost(icon) {
  // Buscar el span que contiene el título del post
  const postTitleSpan = icon.closest(".post-title-bar").querySelector("span");

  // Guardamos los textos en data-attributes si no existen
  if (!postTitleSpan.dataset.spanish) {
    postTitleSpan.dataset.spanish = postTitleSpan.innerText; // texto actual
    // Ejemplo de traducción: podrías usar un diccionario más grande según tus posts
    postTitleSpan.dataset.english = translateToEnglish(postTitleSpan.innerText);
  }

  // Alternar idioma
  if (postTitleSpan.innerText === postTitleSpan.dataset.spanish) {
    postTitleSpan.innerText = postTitleSpan.dataset.english;
  } else {
    postTitleSpan.innerText = postTitleSpan.dataset.spanish;
  }
}

// Función simple de "traducción" (para demo, puedes adaptarla)
function translateToEnglish(text) {
  const translations = {
    "Clase completa de tejido en vivo": "Complete Live Knitting Class",
    "Aprende funciones básicas del celular": "Learn Basic Cellphone Functions",
  };
  return translations[text] || text;
}

// ====================
// Post Traducción
// ====================
function toggleLanguage(icon) {
  const postText = icon.closest(".post-title-bar").querySelector(".post-text");
  if (!icon.dataset.lang || icon.dataset.lang === "es") {
    postText.textContent = "Full knitting class live";
    icon.dataset.lang = "en";
  } else {
    postText.textContent = postText.dataset.original || postText.textContent;
    icon.dataset.lang = "es";
  }
}

// Guardar texto original
document
  .querySelectorAll(".post-text")
  .forEach((pt) => (pt.dataset.original = pt.textContent));

// ====================
// Report Post
// ====================
function openReport() {
  document.getElementById("reportModal").classList.remove("hidden");
}
function closeReport() {
  document.getElementById("reportModal").classList.add("hidden");
}
function submitReport() {
  const reason = document.getElementById("reportText").value.trim();
  if (reason) alert("Post reportado: " + reason);
  closeReport();
}

//----------------------------------
// eliminar cuenta y cerrar sesion
//----------------------------------

// Seleccionamos el modal y sus elementos
const confirmModal = document.querySelector(".confirm");
const confirmTitle = document.querySelector(".confirm-title");
const acceptBtn = document.querySelector(".confirm-accept");
const cancelBtn = document.querySelector(".confirm-cancel");

// Función para abrir el modal
// tipo puede ser "delete" o "logout"
function openConfirm(tipo) {
  confirmModal.classList.remove("hidden");

  if (tipo === "delete") {
    confirmTitle.textContent = "¿Estás seguro de eliminar la cuenta?";
    // Acción de aceptar
    acceptBtn.onclick = () => {
      closeConfirm();
      alert("Cuenta eliminada (simulación)"); // Aquí podrías redirigir o llamar API
    };
  } else if (tipo === "logout") {
    confirmTitle.textContent = "¿Estás seguro de cerrar sesión?";
    // Acción de aceptar
    acceptBtn.onclick = () => {
      closeConfirm();
      window.location.href = "index.html"; // Redirige al logout
    };
  }
}

// Función para cerrar el modal
function closeConfirm() {
  confirmModal.classList.add("hidden");
  // Limpiar acciones de aceptar para evitar problemas
  acceptBtn.onclick = null;
}

// Asignar eventos a tus opciones del menú
// Elimina la llamada a openPage en el HTML
document.querySelectorAll("li").forEach((li) => {
  if (li.textContent.includes("Eliminar Cuenta")) {
    li.onclick = () => openConfirm("delete");
  }
  if (li.textContent.includes("Cerrar Sesión")) {
    li.onclick = () => openConfirm("logout");
  }
});
