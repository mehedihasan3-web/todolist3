const container = document.querySelector(".container");
const todoForm = document.querySelector("#form");
const todoInput = document.querySelector("#todoInput");
const todoAddBtn = document.querySelector("#addTodoBtn");
const todoLists = document.querySelector("#lists");
const messegeElement = document.querySelector("#massege");

const showMessage = (text, status) => {
  messegeElement.textContent = text;
  messegeElement.classList.add(`bg-${status}`);

  setTimeout(() => {
    messegeElement.textContent = "";
    messegeElement.classList.remove(`bg-${status}`);
  }, 1000);
};

// deletetodo from localStorage

const deletetodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;
  todoLists.removeChild(selectedTodo);
  showMessage("Todo is Deleted", "danger");

  let todos = getTodosFromLocalStorage();
  todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
  localStorage.setItem("myTodos", JSON.stringify(todos));
};

// create_todo
const create_todo = (todoValue, todoId) => {
  const todoElement = document.createElement("li");
  todoElement.id = todoId;
  todoElement.classList.add("listStyle");
  todoElement.innerHTML = `
  <span>${todoValue}</span>
  <span><button class="btn" id="deleteBtn"><i class="fa-solid fa-trash"></i></button></span>
  `;
  todoLists.appendChild(todoElement);
  const deleteBtn = todoElement.querySelector("#deleteBtn");
  deleteBtn.addEventListener("click", deletetodo);
};

// getTodosFromLocalStorage

const getTodosFromLocalStorage = () => {
  return localStorage.getItem("myTodos")
    ? JSON.parse(localStorage.getItem("myTodos"))
    : [];
};

// first work
const addTodo = (e) => {
  e.preventDefault();
  const todoValue = todoInput.value;

  // second work todo id

  const todoId = Date.now().toString();

  create_todo(todoValue, todoId);
  showMessage("Todo is added", "success");
  todoInput.value = "";

  // adding value a localStorage
  const todos = getTodosFromLocalStorage();
  todos.push({ todoId, todoValue });
  localStorage.setItem("myTodos", JSON.stringify(todos));
};

// loadTodos

const loadTodos = () => {
  const todos = getTodosFromLocalStorage();

  todos.map((todo) => create_todo(todo.todoValue, todo.todoId));
};

todoForm.addEventListener("submit", addTodo);

window.addEventListener("DOMContentLoaded", loadTodos);
