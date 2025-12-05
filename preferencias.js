// Activar / Desactivar preferencia
function togglePref(element) {
    element.classList.toggle("active");
  }
  
  // Guardar (simulado)
  function guardarPreferencias() {
    const activas = [...document.querySelectorAll(".pref-item.active")].map(
      (item) => item.textContent.trim()
    );
  
    alert("Preferencias guardadas:\n" + activas.join(", "));
  }
  