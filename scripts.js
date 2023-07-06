//! elements selection
const form = document.querySelector("#todoform");
const todoInp = document.querySelector("#newtodo");
const todosList = document.querySelector("#todos-list");

//! variables
let todos = [];
// cuz editTodoId will always be 0,1,2,3,... in editTodo function (cuz todoId is array index) and -1 means we're not editing
let editTodoId = -1;

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
  }
  if (ed) {
  } else {
    const todo = {
      value: todoVal,
      checked: false,
      //* I don't want to have random color for each todo (activate the code if you want so)
      // color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
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
    <img src=${
      el.checked ? "assets/icon/checkedcircle.svg" : "assets/icon/circle.svg"
    } alt=${el.checked ? "checked icon" : "circle icon"} data-action="check" />
    <span data-action="check">${el.value}</span>
    <img src="assets/icon/edit.svg" alt="edit icon" data-action="edit" />
    <img src="assets/icon/trash.svg" alt="trash icon" data-action="delete" />
  </div>
    `;
  });
}

//! click event listener for eacg Todo
todosList.addEventListener("click", (e) => {
  //* reach parent element of clicked target
  const parentElement = e.target.parentNode;
  //* if the className isn't todo, finish the function
  if (parentElement.className !== "todo") return;

  //* get todo id
  const todoId = Number(parentElement.id);

  //* target action attribute
  const action = e.target.dataset.action;
  action === "check" && checkTodo(todoId);
  console.log(action, todoId);
});

//! check a Todo
//* fisrt code
// function checkTodo(todoId) {
//   let newArr = todos.map((el, idx) => {
//     if (idx === todoId) {
//       return {
//         value: el.value,
//         checked: !el.checked,
//       };
//     } else {
//       return {
//         value: el.value,
//         checked: el.checked,
//       };
//     }
//   });
//   todos = newArr;
// }

//* refactored code
function checkTodo(todoId) {
  todos = todos.map((el, idx) => ({
    ...el,
    checked: idx === todoId ? !el.checked : el.checked,
  }));
  renderTodos();
}

//*

//! Edit Todo
function editTodo(todoId) {
  todoInp.value = todos[todoId].value;
  editTodoId = editTodo;
}
