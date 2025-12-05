document.addEventListener("DOMContentLoaded", () => {
  const btnIngresar = document.querySelector(".pantalla-inicio");

  btnIngresar.addEventListener("click", (e) => {
    e.preventDefault(); // Evita ir a inicio.html automáticamente

    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    // Recuperar datos guardados en el registro
    const savedEmail = localStorage.getItem("correo");
    const savedPassword = localStorage.getItem("contraseña");

    // Validaciones
    if (!savedEmail || !savedPassword) {
      alert("No existe un usuario registrado. Regístrate primero.");
      return;
    }

    if (emailInput === savedEmail && passwordInput === savedPassword) {
      // Si coincide → ir a inicio.html
      window.location.href = "inicio.html";
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
});
