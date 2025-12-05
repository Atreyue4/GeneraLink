/* ============================================================
   MODALES CREAR POST
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
         MENÚ HAMBURGUESA (MÓVIL)
      ============================================================ */
const mobileMenu = document.getElementById("mobileMenu");
const burgerBtn = document.getElementById("menuHamburger");
const menuBackBtn = document.querySelector("#mobileMenu .menu-back");

// Abrir menú
function openMobileMenu() {
  mobileMenu.classList.remove("hidden");
  setTimeout(() => mobileMenu.classList.add("active"), 10);
}

// Cerrar menú
function closeMobileMenu() {
  mobileMenu.classList.remove("active");
  setTimeout(() => mobileMenu.classList.add("hidden"), 300);
}

menuBackBtn.addEventListener("click", closeMobileMenu);

// Evitar que clic dentro del menú cierre el menú
mobileMenu.addEventListener("click", (e) => e.stopPropagation());

// Cerrar menú al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !burgerBtn.contains(e.target)) {
    closeMobileMenu();
  }
});

/* ============================================================
         MENÚ DE PERFIL
      ============================================================ */
function toggleProfileMenu() {
  document.getElementById("profileMenu").classList.toggle("hidden");
}

document.addEventListener("click", function (e) {
  const menu = document.getElementById("profileMenu");
  const profile = document.querySelector(".profile-icon");

  if (!menu.contains(e.target) && !profile.contains(e.target)) {
    menu.classList.add("hidden");
  }
});

/* ============================================================
         NAVEGACIÓN
      ============================================================ */
function openPage(url) {
  window.location.href = url;
}

function openPageNewTab(url) {
  window.open(url, "_blank");
}

function openArrow() {
  window.history.back();
}

/* ============================================================
         CONFIRMACIÓN CERRAR SESIÓN / ELIMINAR CUENTA
      ============================================================ */
const confirmModal = document.querySelector(".confirm");
const confirmTitle = document.querySelector(".confirm-title");
const acceptBtn = document.querySelector(".confirm-accept");
const cancelBtn = document.querySelector(".confirm-cancel");

function openConfirm(tipo) {
  confirmModal.classList.remove("hidden");

  if (tipo === "delete") {
    confirmTitle.textContent = "¿Estás seguro de eliminar la cuenta?";
    acceptBtn.onclick = () => {
      closeConfirm();
      alert("Cuenta eliminada (simulación)");
    };
  } else if (tipo === "logout") {
    confirmTitle.textContent = "¿Estás seguro de cerrar sesión?";
    acceptBtn.onclick = () => {
      closeConfirm();
      window.location.href = "logout.html";
    };
  }
}

function closeConfirm() {
  confirmModal.classList.add("hidden");
  acceptBtn.onclick = null;
}
