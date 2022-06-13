function selectTask(e) {
    const selectedTask = document.querySelectorAll('li');
    for (let i = 0; i < selectedTask.length; i += 1) {
        if (selectedTask[i].style.backgroundColor === 'gray') {
            selectedTask[i].style.backgroundColor = 'transparent';
            selectedTask[i].classList.remove('selected');
        }
    }
    e.target.style.backgroundColor = 'gray';
    e.target.classList.add('selected');
}
function completedTask(e) {
    const liTarget = e.target;
    if (liTarget.classList.contains('completed')) {
        liTarget.classList.remove('completed');
    } else {
        liTarget.classList.add('completed');
    }
}
function clearList() {
    const listItem = document.querySelector('ol');
    listItem.innerHTML = '';
    localStorage.clear();
}
function clearCompleteTasks() {
    const complete = document.querySelectorAll('.completed');
    for (let i = 0; i < complete.length; i += 1) {
        complete[i].remove();
    }
}
function addTask() {
    const input = document.getElementById('texto-tarefa');
    const newListItem = document.createElement('li');
    const taskList = document.getElementById('lista-tarefas');
    newListItem.innerText = input.value;
    newListItem.addEventListener('click', selectTask);
    newListItem.addEventListener('dblclick', completedTask);
    taskList.appendChild(newListItem);
    input.value = '';
}
function saveList() {
    const ntaskList = document.getElementById('lista-tarefas').innerHTML;
    localStorage.setItem('tasks', JSON.stringify(ntaskList));
}
function loadItem() {
    const getTaskItem = JSON.parse(localStorage.getItem('tasks'));
    const nTaskList = document.getElementById('lista-tarefas');
    nTaskList.innerHTML = getTaskItem;
}
function moveUp() {
    const containerli = document.getElementById('lista-tarefas');
    const selectedLi = document.querySelector('.selected');
    if (selectedLi === null) {
        alert('please, select one item list');
    } else if (selectedLi === containerli.firstElementChild) {
        alert('Ops');
    } else {
        containerli.insertBefore(selectedLi, selectedLi.previousElementSibling);
    }
}
function moveDown() {
    const containerli = document.getElementById('lista-tarefas');
    const selectedLi = document.querySelector('.selected');
    if (selectedLi === null) {
        alert('please, select one item list');
    } else if (selectedLi === containerli.lastElementChild) {
        alert('end of road');
    } else {
        containerli.insertBefore(selectedLi.nextElementSibling, selectedLi);
    }
}
function removeSelection() {
    const selectedLi = document.querySelector('.selected');
    selectedLi.remove();
}
function controllTasks() {
    const removeAllbtn = document.getElementById('apaga-tudo');
    const removeCompletedBtn = document.getElementById('remover-finalizados');
    const btnTask = document.getElementById('criar-tarefa');
    const saveBtn = document.getElementById('salvar-tarefas');
    const upBtn = document.getElementById('mover-cima');
    const downBtn = document.getElementById('mover-baixo');
    const removeSelectedButton = document.getElementById('remover-selecionado');
    saveBtn.addEventListener('click', saveList);
    removeAllbtn.addEventListener('click', clearList);
    removeCompletedBtn.addEventListener('click', clearCompleteTasks);
    btnTask.addEventListener('click', addTask);
    upBtn.addEventListener('click', moveUp);
    downBtn.addEventListener('click', moveDown);
    removeSelectedButton.addEventListener('click', removeSelection);
}
function start() {
    controllTasks();
    loadItem();
}
start();
