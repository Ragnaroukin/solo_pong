// Constantes
const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
const rightMove = document.getElementById('droite');
const leftMove = document.getElementById('gauche');
const newGame = document.getElementById('newGame');
const score = document.getElementById('score');

canvas.height = 1.5 * canvas.width;
gauche.width = canvas.width / 3;
gauche.height = canvas.width / 3;

// Animation Frame
let rafId;

// Coordonnées
let xBall = canvas.width / 2;
let yBall = canvas.height / 2;
let xPad = canvas.width * 4 / 10;

// Vitesse
let speedX = -canvas.width/100;
let speedY = -canvas.width/100;
let coeff = 1;
let coeffX = randomCoeff();
let coeffY = randomCoeff();
let nbTouch = 0;

// Événements
let keysPressed = new Set();
let rightPressed = false;
let leftPressed = false;

// Score
let interval;
let time = 0;

// Fonctions dessin
function roundRect(x, y, w, h, radius)
{
  var r = x + w;
  var b = y + h;
  ctx.moveTo(x+radius, y);
  ctx.lineTo(r-radius, y);
  ctx.quadraticCurveTo(r, y, r, y+radius);
  ctx.lineTo(r, y+h-radius);
  ctx.quadraticCurveTo(r, b, r-radius, b);
  ctx.lineTo(x+radius, b);
  ctx.quadraticCurveTo(x, b, x, b-radius);
  ctx.lineTo(x, y+radius);
  ctx.quadraticCurveTo(x, y, x+radius, y);
}

function drawBall() {
    ctx.fillStyle = "black";
    ctx.lineWidth = canvas.width / 75;
    ctx.strokeStyle = "orange";
    ctx.beginPath();
    ctx.arc(xBall, yBall, canvas.width / 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

function drawRect() {
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    roundRect(xPad, canvas.height - 20, canvas.width/5, canvas.width/30, canvas.width/60);
    ctx.fill();
}

// Fonction déplacement
function randomCoeff() {
    return (0.95 + Math.random() * 0.1) * coeff;
}

function rightMovePad() {
    if (xPad + canvas.width/5 < canvas.width) xPad += canvas.width / 60;
}

function leftMovePad() {
    if (xPad > 0) xPad -= canvas.width / 60;
}

// Listener
rightMove.addEventListener('touchstart', () => {
    rightPressed = true;
});

rightMove.addEventListener('touchend', () => {
    rightPressed = false;
});

leftMove.addEventListener('touchstart', () => {
    leftPressed = true;
});

leftMove.addEventListener('touchend', () => {
    leftPressed = false;
});

newGame.addEventListener('click', () => {
    launch();
})

document.addEventListener('keydown', (e) => {
    keysPressed.add(e.key);
});

document.addEventListener('keyup', (e) => {
    keysPressed.delete(e.key);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { 
        launch();
    }
});

// Fonctions Score
function timer() {
    interval = setInterval(() => {
        time++;
    },10);
}

function formatTime(time) {
    let minutes = String(Math.floor(time / 6000)).padStart(2, '0');
    let seconds = String(Math.floor(time / 100) % 60).padStart(2, '0');
    let centiseconds = String(time % 100).padStart(2, '0');
    return `${minutes}:${seconds}:${centiseconds}`;
}


// Gestion animation
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    xBall += speedX * coeffX;
    yBall += speedY * coeffY;

    if (xBall > canvas.width - canvas.width / 30 || xBall < 0 + canvas.width / 30) {
        speedX = -speedX;
        nbTouch++;
    }

    if (yBall < 0 + canvas.width / 30 ) {
        speedY = -speedY;
        nbTouch++;
    }

    if (xBall > xPad && xBall < xPad + canvas.width/5 && yBall > canvas.height - 20 - canvas.width / 30 && speedY >= 0) {
        speedY = -speedY;
        coeffX = randomCoeff();
        coeffY = randomCoeff();
        nbTouch++;
    }

    if (keysPressed.has('ArrowRight') || rightPressed) rightMovePad();
    if (keysPressed.has('ArrowLeft') || leftPressed) leftMovePad();

    if (nbTouch >= 10) {
        nbTouch = 0;
        coeff = (coeff < 2) ? 1.05 * coeff: 2;
    }
}

function loop() {
    update();
    drawRect();
    drawBall();

    score.innerHTML = formatTime(time);

    rafId = requestAnimationFrame(loop);

    if (yBall > canvas.height - canvas.width / 30) {
        cancelAnimationFrame(rafId);
        clearInterval(interval);
    }
}

function launch() {
    xBall = canvas.width / 2;
    yBall = canvas.height / 2;
    xPad = canvas.width * 4 / 10;

    speedX = -canvas.width/100;
    speedY = -canvas.width/100;

    coeff = 1;
    coeffX = randomCoeff();
    coeffY = randomCoeff();

    time = 0;
    clearInterval(interval);
    cancelAnimationFrame(rafId);

    timer();
    loop();
}

// On vérifie si l'écran est tactile
//if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    gauche.hidden = false;
    droite.hidden = false;
//} else {
//    gauche.hidden = true;
//    droite.hidden = true;
//}