const taskInput = document.querySelector("#task");
const ulItem = document.querySelector("#list");

let todos = [];

runEvents();

function runEvents() {
    document.addEventListener("DOMContentLoaded", pageloaded);
    ulItem.addEventListener("click", allTodos);
}

function deleteAllTodos() {
    ulItem.innerHTML = "";
    localStorage.removeItem("todos");
}

function allTodos(e) {
    if (e.target.className === "fa fa-remove") {
        const todo = e.target.parentElement;
        todo.remove();
        deleteTodoToStorage(todo.textContent);

    } else if (e.target) {
        e.target.classList.toggle("checked");
    }
}

function deleteTodoToStorage(del){
    checkTodosFromStorage();
    todos.forEach(function(todo, index){
        if(todo === del){
            todos.splice(index, 1)
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

function newElement() {
    const newTodo = taskInput.value.trim();
    if (newTodo === "") {
        $('#liveToastError').toast('show')
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        $('#liveToast').toast('show')
    }
    e.preventDefault();
}

function addTodoToUI(newTodo) {
    const li = document.createElement("li");
    li.classList.add("list-item");
    li.innerHTML = newTodo;

    const span = document.createElement("i");
    span.className = "fa fa-remove";

    ulItem.append(li);
    li.appendChild(span);

    taskInput.value = "";
}

function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function pageloaded() {
    checkTodosFromStorage();
    todos.forEach(todo => {
        addTodoToUI(todo);
    });
}

