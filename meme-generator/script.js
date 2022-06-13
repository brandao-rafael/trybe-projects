const textInput = document.getElementById('text-input');
const imageInsert = document.getElementById('meme-insert');
const container = document.getElementById('meme-image-container');
const memeContainer = document.getElementById('meme-image');

function getLiveText() {
    const imgContainer = document.getElementById('meme-text');
    imgContainer.innerHTML = textInput.value;
}

const getImage = (e) => {
    memeContainer.src = URL.createObjectURL(e.target.files[0]);
};

const changeBorder = (e) => {
    container.setAttribute('class', e.target.classList[0]);
};

const getClickedBtn = () => {
    const borderBtn = document.querySelector('.btn-section').children;
    for (let i = 0; i < borderBtn.length; i += 1) {
        borderBtn[i].addEventListener('click', changeBorder);
    }
};

const setPreviewImg = (e) => {
    const srcImg = e.target.src;
    memeContainer.src = srcImg;
};

const getClickPreviewImg = () => {
    const preview = document.querySelector('.presets-img').children;
    for (let i = 0; i < preview.length; i += 1) {
        preview[i].addEventListener('click', setPreviewImg);
    }
};

function start() {
    textInput.addEventListener('keyup', getLiveText);
    imageInsert.addEventListener('change', getImage);

    getClickPreviewImg();
    getClickedBtn();
}
start();
