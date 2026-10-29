/* =========================================================
   JAVASCRIPT DEL PORTAFOLIO
   1. Menú móvil (hamburguesa)
   2. Animación de aparición al hacer scroll
   3. Resaltar el enlace de la sección actual
   4. Año automático en el pie de página
   ========================================================= */

// ---------- 1. Menú móvil ----------
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  // classList.toggle agrega la clase "open" si no está, y la quita si ya está
  const abierto = navMenu.classList.toggle("open");
  navToggle.classList.toggle("open", abierto);
  navToggle.setAttribute("aria-expanded", abierto);
});

// Al hacer clic en un enlace, el menú se cierra
document.querySelectorAll(".nav__link").forEach((enlace) => {
  enlace.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ---------- 2. Animación al hacer scroll ----------
// IntersectionObserver avisa cuando un elemento entra en la pantalla
const observadorReveal = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
        observadorReveal.unobserve(entrada.target); // solo se anima una vez
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observadorReveal.observe(el));

// ---------- 3. Enlace activo según la sección visible ----------
const secciones = document.querySelectorAll("main section[id]");
const enlaces = document.querySelectorAll(".nav__link");

const observadorSecciones = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        enlaces.forEach((enlace) => {
          enlace.classList.toggle(
            "active",
            enlace.getAttribute("href") === `#${entrada.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" } // la sección cuenta cuando pasa por el centro
);

secciones.forEach((seccion) => observadorSecciones.observe(seccion));

// ---------- 4. Año automático ----------
document.getElementById("year").textContent = new Date().getFullYear();
