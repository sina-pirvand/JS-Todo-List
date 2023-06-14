//! elements selection
const form = document.querySelector("#todoform");
const todoInp = document.querySelector("#newtodo");
const todosList = document.querySelector("#todos-list");

//! variables
let todos = [];

//! prevent form from submiting and refreshing our page
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //* save todos
  saveTodo();
  //* render todos
  renderTodos();
});

//! save Todo
function saveTodo() {
  const todoVal = todoInp.value;

  //* check if input is empty
  const isEmpty = todoVal === "";

  //* check if Todo is duplicate
  const isDuplicate = todos.some(
    (todo) => todo.value.toLowerCase() === todoVal.toLowerCase()
  );

  if (isEmpty) {
    alert("input is empty");
  } else if (isDuplicate) {
    alert("Todo is duplicate");
  } else {
    const todo = {
      value: todoVal,
      checked: false,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
    todos.push(todo);
    //* to empty the input value when todo is added
    todoInp.value = "";
  }
}

//! render todo
function renderTodos() {
  //* clear list befor re-rendering new items
  todosList.innerHTML = "";
  //* render items
  todos.forEach((el, idx) => {
    todosList.innerHTML += `
    <div class="todo" id=${idx}>
    <i><img src=${
      el.checked ? "assets/icon/checked circle.svg" : "assets/icon/circle.svg"
    } alt=${el.checked ? "checked icon" : "circle icon"} /></i>
    <span>${el.value}</span>
    <i><img src="assets/icon/edit.svg" alt="edit icon" /></i>
    <i><img src="assets/icon/trash.svg" alt="trash icon" /></i>
  </div>
    `;
  });
}
