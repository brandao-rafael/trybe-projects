// Função para validar o login
function validateLogin() {
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const registeredEmail = 'tryber@teste.com';
    const registeredPassword = '123456';

    if (emailInput.value === registeredEmail && passwordInput.value === registeredPassword) {
        alert('Olá, Tryber!');
    } else {
        alert('Email ou senha inválidos.');
    }
}

// Função que verifica se o checkbox foi selecionado
function checkAgreement() {
    const checkbox = document.getElementById('agreement');
    const sendButton = document.getElementById('submit-btn');

    if (checkbox.checked) {
        sendButton.disabled = false;
    } else {
        sendButton.disabled = true;
    }
}

// Função dedicada ao contador
function characterCount(e) {
    const counter = document.getElementById('counter');
    counter.innerHTML = 500 - e.target.value.length;
}

// Função para pegar os valores dentro dos inputs
function getValues() {
    const name = document.getElementById('input-name').value;
    const lastName = document.getElementById('input-lastname').value;
    const email = document.getElementById('input-email').value;
    const house = document.getElementById('house').value;
    const family = document.querySelector('input[name="family"]:checked').value;
    const tecnologies = document.getElementsByClassName('subject');
    const trybewarts = document.querySelector('input[name="rate"]:checked').value;
    const textarea = document.getElementById('textarea').value;
    return { tecnologies, name, lastName, email, house, family, trybewarts, textarea };
}

// Função para criar objeto com as informações digitadas
function generateObject() {
    const { tecnologies, name, lastName, email, house, family, trybewarts, textarea } = getValues();
    const tecnologiesValue = [];
    for (let i = 0; i < tecnologies.length; i += 1) {
        if (tecnologies[i].checked) {
            tecnologiesValue.push(` ${tecnologies[i].value}`);
        }
    }
    const formsInformation = {
        name: `${name} ${lastName}`,
        email,
        casa: house,
        familia: family,
        matéria: tecnologiesValue,
        avaliação: trybewarts,
        observações: textarea,
    };
    window.localStorage.setItem('formsInformation', JSON.stringify(formsInformation));
    return formsInformation;
}

// Função para preencher o novo form
function fillNewForm() {
    const object = window.localStorage.getItem('formsInformation');
    const formsInfo = JSON.parse(object);
    const elements = document.getElementsByClassName('pElements');
    const formData = document.getElementById('form-data');
    for (let i = 0; i < elements.length; i += 1) {
        elements[i].style.display = 'flex';
    }
    formData.style.display = 'flex';
    const values = Object.values(formsInfo);
    for (let i = 0; i < values.length; i += 1) {
        elements[i].innerHTML += values[i];
    }
}

// função para ocultar os elementos do forms
function hideChildForm(e) {
    e.preventDefault();
    const forms = document.getElementById('evaluation-form');
    forms.style.display = 'none';
    generateObject();
    fillNewForm();
}

// Função que é executada ao carregar o JS
function start() {
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', validateLogin);

    const checkbox = document.getElementById('agreement');
    checkbox.onchange = checkAgreement;

    const textarea = document.getElementById('textarea');
    textarea.addEventListener('keyup', characterCount);

    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', hideChildForm);
}
start();
