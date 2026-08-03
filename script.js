const form = document.getElementById("todo-form")
const input = document.getElementById("todo-input")
const todoList = document.getElementById("todo-list")

// ======================
// STATE
// ======================

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// ======================
// ADD TODO
// ======================

form.addEventListener("submit", function (e) {
    e.preventDefault;
    const todo = {
        id: Date.now(),
        text: input.value,
        completed: false
    };

    todos.push(todo)
    saveTodos();
    renderTodos();
    input.value = ""
})

// ======================
// Local Storage
// ======================

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// ======================
// RENDERING
// ======================

function renderTodos() {
    todoList.innerHTML = ""
    const li = document.createElement('li');
    li.className = "todo-item";
    li.innerHTML = `<span class = "${todo.completed} ? "completed" : """>
        ${todo.text} <button onclick = "deleteTodo(${todo.id})> Delete </button>`
    li.querySelector("span").addEventListener("click", toggleComplete)
    todoList.appendChild("li")

}

renderTodos()