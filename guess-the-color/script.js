const balls = document.querySelectorAll('.ball');
const rgb = document.getElementById('rgb-color');
const answerText = document.getElementById('answer');
const lastball = document.getElementById('ballSection').lastElementChild;
const points = document.getElementById('score');

function randomBall() {
    const ballSection = document.getElementById('ballSection');
    for (let j = 6; j >= 0; j -= 1) {
        ballSection.appendChild(ballSection.children[Math.random() * j | 0]);
    }
}
function generateBallColor() {
    for (let i = 0; i < balls.length - 1; i += 1) {
        const num = Math.round(0xffffff * Math.random());
        const r = num >> 16;
        const g = num >> 8 & 255;
        const b = num & 255;
        balls[i].style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }
    lastball.style.backgroundColor = `rgb${rgb.innerText}`;
    randomBall();
}
function toCompareAnswer(e) {
    const awnser = e.target;
    const rgbValue = `rgb${rgb.innerText}`;
    let npoints = parseInt(points.innerText);
    if (awnser.style.backgroundColor === rgbValue) {
        answerText.innerText = 'Acertou!';
        npoints += 3;
        points.innerText = npoints;
    } else {
        answerText.innerText = 'Errou! Tente novamente!';
    }
    localStorage.setItem('points', points.innerText);
}
function restartGame() {
    generateBallColor();
    const num = Math.round(0xffffff * Math.random());
    const r = num >> 16;
    const g = num >> 8 & 255;
    const b = num & 255;
    rgb.innerText = `(${r}, ${g}, ${b})`;
    lastball.style.backgroundColor = `rgb${rgb.innerText}`;
    answerText.innerText = 'Escolha uma cor';
}
function control() {
    const resetBtn = document.getElementById('reset-game');
    for (let i = 0; i < balls.length; i += 1) {
        balls[i].addEventListener('click', toCompareAnswer);
    }
    resetBtn.addEventListener('click', restartGame);
}
function start() {
    generateBallColor();
    control();
    points.innerHTML = localStorage.getItem('points');
}
start();
window.onload = () => {
    points.innerText = 0;
};
