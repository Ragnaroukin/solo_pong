const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
canvas.height = 1.5 * canvas.width;

let xBall = canvas.width / 2;
let yBall = canvas.height / 2;
let speedX = -canvas.width/60;
let speedY = -canvas.width/60;
let rafId;

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
    roundRect(canvas.width * 4 / 10, canvas.height - 20, canvas.width/5, canvas.width/30, canvas.width/60);
    ctx.fill();
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    xBall += speedX;
    yBall += speedY;

    if (xBall > canvas.width - canvas.width / 30 || xBall < 0 + canvas.width / 30) speedX = -speedX;
    if (yBall < 0 + canvas.width / 30 ) speedY = -speedY;
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

// démarrer l'animation
loop();

//if (yBall > canvas.height - canvas.width / 30) {
//        cancelAnimationFrame(rafId);
//}

// possibilité d'arrêter l'animation avec le bouton 'stop'
//let stopAnimation = document.getElementById('stop');
//stopAnimation.addEventListener('click', () => {
//    cancelAnimationFrame(rafId)
//})