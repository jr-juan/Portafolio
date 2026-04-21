// 1. Crea el observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // El elemento entró en pantalla
            entry.target.classList.add('visible');
        }else {
            entry.target.classList.remove('visible'); 
        }
    });
});

// 2. Dile qué elementos observar
const secciones = document.querySelectorAll('.contenido section');
secciones.forEach(seccion => observer.observe(seccion));