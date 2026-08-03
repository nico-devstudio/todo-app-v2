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
    localStorage.setItem("todos", JSON.stringify("todos"));
}