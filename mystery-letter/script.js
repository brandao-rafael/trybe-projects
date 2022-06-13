const generateBtn = document.getElementById('criar-carta');
const paragraphParent = document.getElementById('carta-gerada');
const inputCards = document.getElementById('carta-texto');

function addStyleGroup() {
    const spanElement = document.querySelectorAll('span');
    const tempClass = ['newspaper', 'magazine1', 'magazine2'];
    for (let i = 0; i < spanElement.length; i += 1) {
        const randomClass = Math.floor(Math.random() * tempClass.length);
        const newClass = tempClass[randomClass];
        spanElement[i].classList.add(newClass);
    }
}

function addSizeGroup() {
    const spanElement = document.querySelectorAll('span');
    const tempClass = ['medium', 'big', 'reallybig'];
    for (let i = 0; i < spanElement.length; i += 1) {
        const randomClass = Math.floor(Math.random() * tempClass.length);
        const newClass = tempClass[randomClass];
        spanElement[i].classList.add(newClass);
    }
}

function addRotationGroup() {
    const spanElement = document.querySelectorAll('span');
    const tempClass = ['rotateleft', 'rotateright'];
    for (let i = 0; i < spanElement.length; i += 1) {
        const randomClass = Math.floor(Math.random() * tempClass.length);
        const newClass = tempClass[randomClass];
        spanElement[i].classList.add(newClass);
    }
}

function addInclinationGroup() {
    const spanElement = document.querySelectorAll('span');
    const tempClass = ['skewleft', 'skewright'];
    for (let i = 0; i < spanElement.length; i += 1) {
        const randomClass = Math.floor(Math.random() * tempClass.length);
        const newClass = tempClass[randomClass];
        spanElement[i].classList.add(newClass);
    }
    counterCard();
    generateNewStyle();
}
function clearSpan() {
    const spanElement = document.querySelectorAll('span');
    for (let i = 0; i < spanElement.length; i += 1) {
        spanElement[i].removeAttribute('class');
    }
}

function generateNewStyle() {
    const spanElement = document.querySelectorAll('span');
    console.log(spanElement);
    for (let i = 0; i < spanElement.length; i += 1) {
        spanElement[i].addEventListener('click', clearSpan);
        spanElement[i].addEventListener('click', addInclinationGroup);
        spanElement[i].addEventListener('click', addRotationGroup);
        spanElement[i].addEventListener('click', addSizeGroup);
        spanElement[i].addEventListener('click', addStyleGroup);
    }
}

function generateCards() {
    const phrase = inputCards.value.split(' ');
    paragraphParent.innerText = '';
    for (let i = 0; i < phrase.length; i += 1) {
        if (inputCards.value.trim().length === 0) {
            paragraphParent.innerText = 'Por favor, digite o conteúdo da carta.';
        } else {
            const newCard = document.createElement('span');
            newCard.innerText = phrase[i];
            paragraphParent.appendChild(newCard);
        }
    }
    addStyleGroup();
    addSizeGroup();
    addRotationGroup();
    addInclinationGroup();
}

function counterCard() {
    const counter = document.getElementById('carta-contador');
    const spanElement = document.querySelectorAll('span');
    counter.innerText = spanElement.length;
}

function start() {
    generateBtn.addEventListener('click', generateCards);
}
start();
