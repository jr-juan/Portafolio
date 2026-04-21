// ===== CANVAS DE PARTÍCULAS =====
const canvas = document.getElementById('canvas-fondo');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const CANTIDAD = 80;
const DISTANCIA_MAX = 150;
const VELOCIDAD = 0.4;
const COLOR = '124, 106, 247'; // color acento en RGB

const particulas = [];

for (let i = 0; i < CANTIDAD; i++) {
    particulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * VELOCIDAD,
        vy: (Math.random() - 0.5) * VELOCIDAD,
        radio: Math.random() * 2 + 1
    });
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mover y dibujar partículas
    particulas.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Rebotar en los bordes
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Dibujar punto
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR}, 0.5)`;
        ctx.fill();
    });

    // Dibujar líneas entre partículas cercanas
    for (let i = 0; i < particulas.length; i++) {
        for (let j = i + 1; j < particulas.length; j++) {
            const dx = particulas[i].x - particulas[j].x;
            const dy = particulas[i].y - particulas[j].y;
            const distancia = Math.sqrt(dx * dx + dy * dy);

            if (distancia < DISTANCIA_MAX) {
                const opacidad = 1 - distancia / DISTANCIA_MAX;
                ctx.beginPath();
                ctx.moveTo(particulas[i].x, particulas[i].y);
                ctx.lineTo(particulas[j].x, particulas[j].y);
                ctx.strokeStyle = `rgba(${COLOR}, ${opacidad * 0.3})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animar);
}

animar();

// SCROLL OBSERVER para animar secciones al entrar en pantalla
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
});

const secciones = document.querySelectorAll('.contenido section');
secciones.forEach(seccion => observer.observe(seccion));