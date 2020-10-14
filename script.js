//selectors
const toDoInput = document.querySelector('.todo-input');
const toDoButton = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

//eventlisteners
document.addEventListener('DOMContentLoaded', getTodos)
toDoButton.addEventListener('click', addTodo);
toDoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterToDo)

//functions

function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();
    //todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create li
    const newToDO = document.createElement('li');
    newToDO.innerText = toDoInput.value;
    newToDO.classList.add('todo-item');
    todoDiv.appendChild(newToDO);
    // ADD TODO TO LOCAL STORAGE
    saveLocalTodos(toDoInput.value)
    // completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // deleteButton
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // append to list
    toDoList.appendChild(todoDiv)
    // clear todo input value
    toDoInput.value = "";
}

function deleteCheck(evt) {
    const item = evt.target
    // delete todo
    if (item.classList[0] === 'trash-btn') {
        const toDo = item.parentElement;
        // animation
        toDo.classList.add('fall')
        removeLocalTodos(toDo)
        toDo.addEventListener('transitionend', () => {
            toDo.remove()
        })
    }

    // checkmark
    if (item.classList[0] === 'complete-btn') {
        const toDo = item.parentElement;
        toDo.classList.toggle('completed')
    }
}

function filterToDo(evnt) {
    const todos = toDoList.childNodes;
    todos.forEach(function (todo) {
        switch (evnt.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'complete':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncomplete':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'none';
                }
                else {
                    todo.style.display = 'flex';
                }
                break;
        }
    })
}

function saveLocalTodos(todo) {
    // check -- do I have todo already
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // create li
        const newToDO = document.createElement('li');
        newToDO.innerText = todo;
        newToDO.classList.add('todo-item');
        todoDiv.appendChild(newToDO);
        // completed button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // deleteButton
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        // append to list
        toDoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos));
}