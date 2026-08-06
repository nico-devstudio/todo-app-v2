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
        renderTodos();
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


    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "todo-item";

        if (todo.editing === false) {
            li.innerHTML = `<span class = "${todo.completed ? "completed" : ""}">
                        ${todo.text} </span> 
                        
                        <div>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                        </div>
                        `
            li.querySelector("span").addEventListener("click", () => {
                toggleComplete(todo.id)
            })
            li.querySelector(".delete-btn").addEventListener("click", () => {
                deleteTodo(todo.id)
            })
            li.querySelector(".edit-btn").addEventListener("click", () => {
                todo.editing = !todo.editing;
                renderTodos();
                saveTodos();
            })
        } else {
            li.innerHTML = `
                        <input value = "${todo.text}">
                        <button class="save-btn">Save</button>
                        `;
            const editInput = li.querySelector("input");
            li.querySelector(".save-btn").addEventListener("click", () => {
                saveEdit(todo.id, editInput.value.trim())
            })

            editInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter")
                    saveEdit(todo.id, editInput.value.trim())
            })
        }
        todoList.appendChild(li);

    })

}

renderTodos();


// ======================
// Toggle Complete
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
// Delete To do
// ======================

function deleteTodo(id) {
    todos = todos.filter(todo => {
        return todo.id !== id
    })

    saveTodos()
    renderTodos()
}

// ======================
// Save Edit
// ======================

function saveEdit(id, newText) {

    todos = todos.map(todo => {
        if (todo.id === id) {
            if (newText === "") return todo;
            todo.text = newText;
            todo.editing = false;
        }
        return todo;
    })

    saveTodos();
    renderTodos();
}