// manejo simple toggle mic + actualizar cuadro con la imagen school.png
let micListening = false;
let fakeTimer = null; // opcional si deseas simular escucha

function toggleMic() {
  const micZone = document.getElementById("micZone");
  const resultBox = document.getElementById("resultBox");
  const hint = document.getElementById("micHint");

  if (!micListening) {
    // iniciar animación
    micZone.classList.add("listening");
    micZone.setAttribute("aria-pressed", "true");
    hint.textContent = "Escuchando... pulsa de nuevo para detener";
    resultBox.classList.remove("result-ready");
    resultBox.innerHTML =
      '<div class="result-placeholder"><p>Escuchando... habla ahora (simulado).</p></div>';

    micListening = true;

    // (opcional) simulamos que se reconoce texto a los 3s y actualiza parcialmente
    // puedes quitar el timer si no quieres simulación
    fakeTimer = setTimeout(() => {
      // ejemplo de actualización intermedia (NO final)
      resultBox.innerHTML =
        '<div class="result-placeholder"><p>Analizando audio...</p></div>';
    }, 2500);
  } else {
    // detener animación
    micZone.classList.remove("listening");
    micZone.setAttribute("aria-pressed", "false");
    hint.textContent = "Presiona el micrófono para hablar";
    micListening = false;

    if (fakeTimer) {
      clearTimeout(fakeTimer);
      fakeTimer = null;
    }

    // actualizar cuadro con la imagen EXACTA que indicas en el doc
    resultBox.classList.add("result-ready");
    resultBox.innerHTML = `
      <div class="result-content" style="width:100%;">
        <p style="margin-top:10px;color:#333;font-weight:600;">Para ver talleres y poder aprender mas sobre la cultura 
        juvenil entre otras cosas de aprendizaje de cultura se le 
        recomienda entrar con uno de los “iconos” principales
        el cual seria:  </p>
        <img src="images/school.png" alt="Ejemplo" />
      </div>
    `;
  }
}
