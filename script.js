const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const filterButtons = document.querySelectorAll("[data-filter]")


let todos = JSON.parse(localStorage.getItem("todos")) || [];


// ======================
// STATE
// ======================

form.addEventListener("submit", function (e) {
    e.preventDefault()

    const text = input.value.trim()

    if (text === "") return

    const todo = {
        id: Date.now(),
        text,
        completed: false,
        editing: false,
    };

    todos.push(todo)

    saveTodos();
    renderTodos();
    input.value = "";
})

// ======================
// Local Storage
// ======================

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos))
}

// ======================
// Filter State
// ======================

let currentFilter = "all";

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        renderTodos();
    })
})


// ======================
// Render Todo
// ======================

function renderTodos() {
    todoList.innerHTML = "";

    let filteredTodos = todos.filter(todo => {
        if (currentFilter === "completed") {
            return todo.completed === true
        } else if (currentFilter === "pending") {
            return todo.completed === false
        }

        return true;
    })

    filteredTodos.forEach(todo => {


        const li = document.createElement("li");
        li.className = "todo-item";
        if (todo.editing === false) {
            li.innerHTML = `<span class = "${todo.completed ? "completed" : ""}">
                    ${todo.text}  </span> 
                    <div>
                    <button class="edit-btn">Edit</button>
                   <button class="delete-btn">Delete</button>
                   </div>`;
            li.querySelector("span").addEventListener("click", function () {
                toggleComplete(todo.id)
            })
            li.querySelector(".edit-btn").addEventListener("click", function () {
                startEdit(todo.id)
            })
            li.querySelector(".delete-btn").addEventListener("click", function () {
                deleteTodo(todo.id)
            })
        } else {
            li.innerHTML = `<input value="${todo.text}">
                    <button class="save-btn">Save</button>
                  `;

            let editInput = li.querySelector("input")
            li.querySelector(".save-btn").addEventListener("click", function () {
                const newText = editInput.value.trim();

                if (newText === "") return;

                todo.text = newText;
                todo.editing = false;

                saveTodos();
                renderTodos();
            })

            editInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    const newText = editInput.value.trim();

                    if (newText === "") return;

                    todo.text = newText;
                    todo.editing = false;

                    saveTodos();
                    renderTodos();
                }
            })
        }

        todoList.appendChild(li)
    });
}

renderTodos()

// ======================
// Toggle complete
// ======================

function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed
        }
        return todo
    })
    saveTodos()
    renderTodos()
}

// ======================
// Delete Todo
// ======================

function deleteTodo(id) {
    todos = todos.filter(todo => {
        return todo.id !== id
    })
    saveTodos()
    renderTodos()
}

// ======================
// Edit Todo
// ======================


function startEdit(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.editing = true;
        }

        return todo;
    })

    saveTodos();
    renderTodos();
}

