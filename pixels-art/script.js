function createPersonGridElements() {
    const input = document.createElement('input');
    const generateBtn = document.createElement('button');
    const location = document.getElementById('personSection');
    input.setAttribute('id', 'board-size');
    input.setAttribute('placeholder', 'Number');
    input.setAttribute('type', 'number');
    input.setAttribute('name', 'quantity');
    input.setAttribute('min', '1');
    generateBtn.setAttribute('id', 'generate-board');
    generateBtn.innerText = 'VQV';
    location.appendChild(input);
    location.appendChild(generateBtn);
}
createPersonGridElements();
const input = document.getElementById('board-size');
let inputValue = 5;
const black = document.querySelector('.black');
const color = document.querySelectorAll('.color');

black.classList.add('selected');
generatePersonGrid(inputValue);

function actionCreateGrid() {
    const btn = document.getElementById('generate-board');
    btn.addEventListener('click', conditions);
}

actionCreateGrid();
function conditions() {
    const pixelBoard = document.getElementById('pixel-board');
    pixelBoard.innerHTML = '';
    inputValue = input.value;
    if (inputValue === '') {
        alert('Board inválido!');
    } else if (inputValue < 5 && inputValue > 0) {
        inputValue = 5;
    } else if (inputValue > 50) {
        inputValue = 50;
    }
    generatePersonGrid(inputValue);
}
function generatePersonGrid(param) {
    const inside = document.getElementById('pixel-board');
    for (let i = 0; i < param; i += 1) {
        const row = document.createElement('div');
        row.className = 'line';
        for (let j = 0; j < param; j += 1) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            row.appendChild(pixel);
        }
        inside.appendChild(row);
    }
    getColor();
}

function addEvent() {
    for (let i = 0; i < color.length; i += 1) {
        color[i].addEventListener('click', controlClass);
    }
}
function controlClass() {
    for (let i = 0; i < color.length; i += 1) {
        color[i].classList.remove('selected');
    }
    event.target.classList.add('selected');
}
addEvent();

function getColor() {
    const pixels = document.querySelectorAll('.pixel');
    for (let i = 0; i < pixels.length; i += 1) {
        pixels[i].addEventListener('click', changeColor);
    }
}
function changeColor() {
    const selected = document.querySelector('.selected');
    const computedStyle = window.getComputedStyle(selected).backgroundColor;
    event.target.style.backgroundColor = computedStyle;
}

function createButton() {
    const resetBtn = document.createElement('button');
    resetBtn.setAttribute('id', 'clear-board');
    resetBtn.innerText = 'Limpar';
    const location = document.getElementById('personSection');
    location.appendChild(resetBtn);
}
createButton();
function clearPixel() {
    const btnReset = document.getElementById('clear-board');
    btnReset.addEventListener('click', getClearPixel);
}
function getClearPixel() {
    const pixels = document.querySelectorAll('.pixel');
    for (let i = 0; i < pixels.length; i += 1) {
        pixels[i].style.backgroundColor = 'white';
    }
}
clearPixel();
window.onload = function start() {
    function generateRandomColor() {
        const blue = document.querySelector('.blue');
        const red = document.querySelector('.red');
        const green = document.querySelector('.green');
        const newColor1 = Math.floor(Math.random() * 16777215).toString(16);
        const newColor2 = Math.floor(Math.random() * 16777215).toString(16);
        const newColor3 = Math.floor(Math.random() * 16777215).toString(16);
        blue.style.backgroundColor = `${'#'}${newColor1}`;
        red.style.backgroundColor = `${'#'}${newColor2}`;
        green.style.backgroundColor = `${'#'}${newColor3}`;
    }
    generateRandomColor();
};
