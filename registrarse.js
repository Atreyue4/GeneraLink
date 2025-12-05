document.addEventListener("DOMContentLoaded", () => {
  const btnRegistrar = document.getElementById("btnRegistrar");
  const form = document.getElementById("registerForm");

  btnRegistrar.addEventListener("click", (e) => {
    e.preventDefault(); // evita la navegación inmediata

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("email").value.trim();
    const contraseña = document.getElementById("password").value.trim();
    const fecha = document.getElementById("fecha").value.trim();
    const recordar = document.getElementById("rec").checked;

    // Validación básica
    if (!nombre || !correo || !contraseña || !fecha) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Validación simple de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      alert("Ingresa un correo válido.");
      return;
    }

    // Guardar en localStorage (nombres de clave iguales a los usados por iniciar-sesion.js)
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("correo", correo);
    localStorage.setItem("contraseña", contraseña);
    localStorage.setItem("fecha", fecha);

    // Guardar preferencia "recordarme" si se desea (opcional)
    if (recordar) {
      localStorage.setItem("recordar", "true");
    } else {
      localStorage.removeItem("recordar");
    }

    // Mensaje y redirección manual (ya que evitamos el href directo)
    alert("Registro exitoso. Serás redirigido para iniciar sesión.");
    window.location.href = "iniciar-sesion.html";
  });

  // Opcional: prevenir envío del form con Enter si quieres manejar todo con el enlace
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
});
