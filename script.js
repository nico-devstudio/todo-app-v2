const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input")


let todos = JSON.parse(localStorage.getItem("todos")) || [];


// ======================
// STATE
// ======================

let text = input.value.trim()

form.addEventListener("submit", function (e) {
    e.preventDefault()

    if (text === "") return

    const todo = {
        id: Date.now(),
        text,
        completed: false
    };

    saveTodos();
    renderTodos();
    input.value = "";
})

// ======================
//
// ======================