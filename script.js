const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
const rightMove = document.getElementById('droite');
const leftMove = document.getElementById('gauche');
const newGame = document.getElementById('newGame');
const score = document.getElementById('score');

canvas.height = 1.5 * canvas.width;

let xBall = canvas.width / 2;
let yBall = canvas.height / 2;
let xPad = canvas.width * 4 / 10;

let speedX = -canvas.width/60;
let speedY = -canvas.width/60;

let rafId;

let keysPressed = new Set();
let rightPressed = false;
let leftPressed = false;
let timer;

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
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(xBall, yBall, canvas.width / 30, 0, Math.PI * 2);
    ctx.fill();
}

function drawRect() {
    ctx.fillStyle = "cyan";
    ctx.beginPath();
    roundRect(xPad, canvas.height - 20, canvas.width/5, canvas.width/30, canvas.width/60);
    ctx.fill();
}

function rightMovePad() {
    if (xPad + canvas.width/5 < canvas.width) xPad += canvas.width / 60;
}

function leftMovePad() {
    if (xPad > 0) xPad -= canvas.width / 60;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    xBall += speedX;
    yBall += speedY;

    if (xBall > canvas.width - canvas.width / 30 || xBall < 0 + canvas.width / 30) speedX = -speedX;
    if (yBall < 0 + canvas.width / 30 ) speedY = -speedY;
    if (xBall > xPad && xBall < xPad + canvas.width/5 && yBall > canvas.height - 20 - canvas.width / 30 && speedY >= 0) speedY = -speedY;

    if (keysPressed.has('ArrowRight') || rightPressed) rightMovePad();
    if (keysPressed.has('ArrowLeft') || leftPressed) leftMovePad();
}

function loop() {
    update();
    drawRect();
    drawBall();
    rafId = requestAnimationFrame(loop);
    if (yBall > canvas.height - canvas.width / 30) {
        cancelAnimationFrame(rafId);
    }
}

// Gestion des déplacements


let movementInterval;

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

document.addEventListener('keydown', (e) => {
    keysPressed.add(e.key);
});

document.addEventListener('keyup', (e) => {
    keysPressed.delete(e.key);
});

// Gestion Timer


// démarrer l'animation
loop();