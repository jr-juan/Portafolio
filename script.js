// ===== FIREBASE =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDg7deQyE6JJyMeiW9kqLCFc1L4FruHQt4",
    authDomain: "portafolio-92a15.firebaseapp.com",
    projectId: "portafolio-92a15",
    storageBucket: "portafolio-92a15.firebasestorage.app",
    messagingSenderId: "13801389329",
    appId: "1:13801389329:web:ba124eec9f07fe25c2a0b0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===== CONTADOR =====
const LIMITE = 50;
const refContador = doc(db, 'contador', 'mensajes');
const contadorEl = document.createElement('p');
contadorEl.style.cssText = 'font-size: 12px; color: var(--texto-suave); margin-bottom: 8px;';

const formulario = document.querySelector('.formulario-contacto');
formulario.insertBefore(contadorEl, formulario.firstChild);

async function obtenerContador() {
    const snap = await getDoc(refContador);
    if (snap.exists()) {
        const total = snap.data().total;
        const restantes = LIMITE - total;
        contadorEl.textContent = `Mensajes disponibles este mes: ${restantes}/50`;
    }
}

obtenerContador();

formulario.addEventListener('submit', async () => {
    await updateDoc(refContador, { total: increment(1) });
});

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
const COLOR = '124, 106, 247';

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

    particulas.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR}, 0.5)`;
        ctx.fill();
    });

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

// ===== SCROLL OBSERVER =====
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

// ===== BOTÓN CV =====
const btnCV = document.getElementById('btn-cv');
const mensajeCV = document.createElement('p');
mensajeCV.textContent = 'CV en construcción — escríbeme por la sección de contacto.';
mensajeCV.style.cssText = 'color: var(--texto-suave); font-size: 13px; margin-top: 10px; display: none;';

btnCV.parentElement.appendChild(mensajeCV);

btnCV.addEventListener('click', () => {
    mensajeCV.style.display =
        mensajeCV.style.display === 'none' ? 'block' : 'none';
});