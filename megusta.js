// Carrusel simple (permite mover a la derecha/izquierda)
// Calcula el ancho del item visible y mueve el track en incrementos.

(function () {
  const track = document.getElementById("carouselTrack");
  const btnL = document.getElementById("btnLeft");
  const btnR = document.getElementById("btnRight");

  let index = 0;
  const items = track.querySelectorAll(".card");
  const total = items.length;

  // ancho del item (incluye gap)
  function getItemWidth() {
    if (items.length === 0) return 0;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap) || 20;
    const w = items[0].getBoundingClientRect().width;
    return w + gap;
  }

  function updateButtons() {
    // opcional: deshabilitar botones si en extremos
    const maxIndex = Math.max(0, total - visibleCount());
    btnL.disabled = index === 0;
    btnR.disabled = index >= maxIndex;
    btnL.style.opacity = btnL.disabled ? 0.45 : 1;
    btnR.style.opacity = btnR.disabled ? 0.45 : 1;
  }

  function visibleCount() {
    // cuántos items caben en viewport (entero), considerando gap
    if (items.length === 0) return 1;
    const viewportW = document
      .querySelector(".carousel-viewport")
      .getBoundingClientRect().width;
    const itemW = items[0].getBoundingClientRect().width;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.gap) || 20;
    const effectiveItemW = itemW + gap;
    return Math.floor(viewportW / effectiveItemW) || 1;
  }

  function moveTo(i) {
    const step = getItemWidth();
    const maxIndex = Math.max(0, total - visibleCount());
    index = Math.max(0, Math.min(i, maxIndex));
    track.style.transform = `translateX(-${index * step}px)`;
    updateButtons();
  }

  btnL.addEventListener("click", () => moveTo(index - 1));
  btnR.addEventListener("click", () => moveTo(index + 1));

  // soporte swipe básico en touch (mejorado)
  let startX = null;
  let moved = false;
  track.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length > 1) return; // ignora multi-touch
      startX = e.touches[0].clientX;
      moved = false;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchmove",
    (e) => {
      if (startX === null || e.touches.length > 1) return;
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 30) moved = true;
    },
    { passive: true }
  );

  track.addEventListener("touchend", (e) => {
    if (!moved || startX === null || e.changedTouches.length > 1) {
      startX = null;
      return;
    }
    const endX = e.changedTouches[0].clientX;
    const dx = endX - startX;
    if (dx < -40) moveTo(index + 1); // swipe izquierda -> derecha
    else if (dx > 40) moveTo(index - 1); // swipe derecha -> izquierda
    startX = null;
  });

  // debounce para resize
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => moveTo(index), 100);
  });

  // init
  if (items.length > 0) {
    moveTo(0);
  }
})();
