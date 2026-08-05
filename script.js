const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const filterButtons = document.querySelectorAll("[data-filter]")

// ======================
// STATE
// ======================

let todos = JSON.parse(localStorage.getItem("todos")) || [];


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let text = input.value.trim();

    if (text === "") return;

    const todo = {
        id: Date.now(),
        text,
        completed: false,
        editing: false
    };

    todos.push(todo);

    saveTodos()
    renderTodos()
    input.value = "";
})

// ======================
// LOCAL STORAGE
// ======================

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// ======================
// Filter State
// ======================

let currentFilter = "all";

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter
    })
})


// ======================
// Render
// ======================

function renderTodos() {
    todoList.innerHTML = "";

    let filteredTodos = todos.filter(todo => {
        if (currentFilter === "pending") {
            return !todo.completed;
        } else if (currentFilter === "completed") {
            return todo.completed;
        }
        return true
    })


    filteredTodos.forEach(() => {


        const li = document.createElement("li");
        li.className("todo-item");
        li.innerHTML = ``
    })

}
