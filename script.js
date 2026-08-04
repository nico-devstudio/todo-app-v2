const form = document.getElementById("todo-form")
const input = document.getElementById("todo-input")
const todoList = document.getElementById("todo-list")
const filterButtons = document.querySelectorAll("[data-filter]");

// ======================
// STATE
// ======================

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// ======================
// ADD TODO
// ======================

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const text = input.value.trim()

    if (text === "") return

    const todo = {
        id: Date.now(),
        text,
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
// FILTER State
// ======================

let currentFilter = "all";

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        renderTodos();

    });

});

// ======================
// RENDERING
// ======================

function renderTodos() {
    todoList.innerHTML = "";


    let filteredTodos = todos.filter(todo => {

        if (currentFilter === "completed") {
            return todo.completed === true;
        } else if (currentFilter === "pending") {
            return todo.completed === false
        }

        return true;


    })

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = "todo-item";
        li.innerHTML = `<span class = "${todo.completed ? "completed" : ""}">
        ${todo.text} </span>
         <button onclick = "deleteTodo(${todo.id})"> Delete </button>`
        li.querySelector("span").addEventListener("click", () => {
            toggleComplete(todo.id);
        })

        todoList.appendChild(li)
    })


}

renderTodos()

// ======================
// TOGGLE COMPLETE
// ======================

function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed
        }

        return todo
    });

    saveTodos();
    renderTodos();
}

// ======================
// Delete Todo
// ======================

function deleteTodo(id) {
    todos = todos.filter(todo => {
        return todo.id !== id;
    })

    saveTodos();
    renderTodos();
}


