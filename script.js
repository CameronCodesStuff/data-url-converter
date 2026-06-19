const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
const htmlInput = document.getElementById('htmlInput');
const urlOutput = document.getElementById('urlOutput');
const convertBtn = document.getElementById('convertBtn');
const copyBtn = document.getElementById('copyBtn');

let particlesArray = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.fillStyle = `rgba(255, 51, 51, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 9000);
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

initParticles();
animate();
window.addEventListener('resize', initParticles);

convertBtn.addEventListener('click', () => {
    const rawCode = htmlInput.value.trim();
    if (!rawCode) return;
    
    const encodedData = btoa(unescape(encodeURIComponent(rawCode)));
    const dataUrl = `data:text/html;base64,${encodedData}`;
    
    urlOutput.value = dataUrl;
    copyBtn.disabled = false;
    copyBtn.textContent = 'Copy URL';
});

copyBtn.addEventListener('click', () => {
    if (!urlOutput.value) return;
    
    navigator.clipboard.writeText(urlOutput.value).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy URL';
        }, 2000);
    });
});
