/* ============================================================
   PERFIL — ABRIR Y CERRAR MODAL
============================================================ */

const modalEditar = document.getElementById("modalEditar");

function abrirEditar() {
  modalEditar.classList.remove("hidden");

  // Cargar datos actuales
  document.getElementById("editarNombre").value =
    document.getElementById("perfilNombre").textContent;

  document.getElementById("editarBio").value =
    document.getElementById("perfilBio").textContent;
}

function cerrarEditar() {
  modalEditar.classList.add("hidden");
}

/* ============================================================
   PERFIL — GUARDAR CAMBIOS
============================================================ */

function guardarCambios() {
  // Nombre
  const nombreNuevo = document.getElementById("editarNombre").value.trim();
  const bioNueva = document.getElementById("editarBio").value.trim();
  const fotoArchivo = document.getElementById("editarFoto").files[0];

  if (nombreNuevo)
    document.getElementById("perfilNombre").textContent = nombreNuevo;
  if (bioNueva) document.getElementById("perfilBio").textContent = bioNueva;

  // Si sube foto → actualizar
  if (fotoArchivo) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("perfilFoto").src = e.target.result;
    };
    reader.readAsDataURL(fotoArchivo);
  }

  cerrarEditar();
}
