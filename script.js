// SELECTOR
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const name = document.querySelector(".name");

// console.log(name.innerText);
// let username = prompt("Enter Your Name");
// name.innerText = username;

// console.log(name.innerText);
do {
    let username = prompt("Enter Your Name");
    name.innerText = username;
} while (name.innerText.value === "");

// EVENT LISTENER
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
// filterOption.addEventListener('click', filterTodo);

// FUNCTIONS
function addTodo(event) {
  // Prevent from submitting or refresing
  event.preventDefault();

  // Creating Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Creating Li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;

  // append

  todoDiv.appendChild(newTodo);
  todoList.appendChild(todoDiv);

  //   localStorage
  saveLocalTodos(todoInput.value);

  // Check Button

  const checkButton = document.createElement("button");
  checkButton.classList.add("check-button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(checkButton);

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  todoDiv.appendChild(deleteButton);

  // APPEND TO LIST
  todoList.appendChild(todoDiv);

  // Clear the values

  todoInput.value = "";
}

// Delete and Check

function deleteCheck(event) {
  const item = event.target;
  // delete
  if (item.classList[0] === "delete-button") {
    const todo = item.parentElement;

    // animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // Check Mark

  if (item.classList[0] === "check-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// FILTER TODO

// function filterTodo(event) {
//     const todos = todoList.childNodes;

//     console.log(todos);
//     todos.forEach(function (todo) {
//         switch (event.target.value) {
//             case "all":
//                 todo.style.display = "flex";
//                 break;
//             case "completed":
//                 if (todo.classList.contains('completed')) {
//                     todo.style.display = "flex";

//                 } else {
//                     todo.style.display = "none";
//                 }

//                 break;

//             case "uncompleted":

//                 if (!todo.classList.contains('completed')) {
//                     todo.style.display = "flex";

//                 } else {
//                     todo.style.display = "none";
//                 }

//                 break;
//         }

//     })

// }

// local storage

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Creating Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Creating Li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;

    // append

    todoDiv.appendChild(newTodo);
    todoList.appendChild(todoDiv);

    // Check Button

    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(checkButton);

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todoDiv.appendChild(deleteButton);

    // APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
