// //! elements selection
// const form = document.querySelector("#todoform");
// const todoInp = document.querySelector("#newtodo");
// const todosList = document.querySelector("#todos-list");
// const notifContainer = document.querySelector(".notification");

// //! variables
// //* when using the app for the 1st time, the storage is empty, then it's falsy so [] we'll be chosen
// let todos = JSON.parse(localStorage.getItem("todosList")) || [];

// //* cuz editTodoId will always be 0,1,2,3,... in editTodo function (cuz todoId is array index) and -1 means we're not editing
// let editTodoId = -1;

// //! first render
// renderTodos();

// //! prevent form from submiting and refreshing our page
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   //* save todos
//   saveTodo();
//   //* render todos
//   renderTodos();
//   //* update local storage each time after adding a todo
//   localStorage.setItem("todosList", JSON.stringify(todos));
//   //* clear input value after add or edit a todo
//   todoInp.value = "";
// });

// //! save Todo
// function saveTodo() {
//   const todoVal = todoInp.value;

//   //* check if input is empty
//   const isEmpty = todoVal === "";

//   //* check if Todo is duplicate
//   const isDuplicate = todos.some(
//     (todo) => todo.value.toLowerCase() === todoVal.toLowerCase()
//   );

//   if (isEmpty) {
//     showNotif("input is empty");
//   } else if (isDuplicate) {
//     showNotif("Todo is duplicate");
//     console.log(456);
//   }
//   //* check if Todo is being edited
//   else if (editTodoId >= 0) {
//     todos = todos.map((el, idx) => ({
//       ...el,
//       //* the value for edited element will be changed and others stay the same
//       value: idx === editTodoId ? todoVal : el.value,
//     }));
//     //* always reset editTodoId to -1 for next cases
//     editTodoId = -1;
//   } else {
//     console.log("123");
//     const todo = {
//       value: todoVal,
//       checked: false,
//       //* I don't want to have random color for each todo (activate the code if you want so)
//       // color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
//     };
//     todos.push(todo);
//     //* to empty the input value when todo is added
//     todoInp.value = "";
//   }
// }

// //! render todo
// function renderTodos() {
//   //* a message for the times that todo list is empty
//   if (todos.length === 0) {
//     todosList.innerHTML = `<p>You don't have any todos</p>`;
//     return;
//   }

//   //* clear list befor re-rendering new items
//   todosList.innerHTML = "";

//   //* render items
//   todos.forEach((el, idx) => {
//     todosList.innerHTML += `
//     <div class="todo" id=${idx}>
//     <img src=${
//       el.checked ? "assets/icon/checkedcircle.svg" : "assets/icon/circle.svg"
//     } alt=${el.checked ? "checked icon" : "circle icon"} data-action="check" />
//     <span class="${el.checked ? "checked" : ""}" data-action="check">${
//       el.value
//     }</span>
//     <img src="assets/icon/edit.svg" alt="edit icon" data-action="edit" />
//     <img src="assets/icon/trash.svg" alt="trash icon" data-action="delete" />
//   </div>
//     `;
//   });
// }

// //! click event listener for each Todo
// todosList.addEventListener("click", (e) => {
//   //* reach parent element of clicked target
//   const parentElement = e.target.parentNode;
//   //* if the className isn't todo, finish the function
//   if (parentElement.className !== "todo") return;

//   //* get todo id
//   const todoId = Number(parentElement.id);

//   //* target action attribute
//   const action = e.target.dataset.action;

//   //* Check
//   action === "check" && checkTodo(todoId);

//   //* Edit
//   action === "edit" && editTodo(todoId);

//   //* Delete
//   action === "delete" && deleteTodo(todoId);
// });

// //! check a Todo
// //* fisrt code
// // function checkTodo(todoId) {
// //   let newArr = todos.map((el, idx) => {
// //     if (idx === todoId) {
// //       return {
// //         value: el.value,
// //         checked: !el.checked,
// //       };
// //     } else {
// //       return {
// //         value: el.value,
// //         checked: el.checked,
// //       };
// //     }
// //   });
// //   todos = newArr;
// // }

// //* refactored code
// function checkTodo(todoId) {
//   todos = todos.map((el, idx) => ({
//     ...el,
//     checked: idx === todoId ? !el.checked : el.checked,
//   }));
//   renderTodos();
//   //* should add this everywhere we render todo cuz we need update local storage
//   localStorage.setItem("todosList", JSON.stringify(todos));
// }

// //*

// //! Edit Todo
// function editTodo(todoId) {
//   todoInp.value = todos[todoId].value;
//   editTodoId = todoId;
// }

// //! Delete Todo
// function deleteTodo(todoId) {
//   //* returns all todos exept those which their index isn't equal to todoId
//   todos = todos.filter((el, idx) => idx !== todoId);

//   //* reset editTodoId to -1
//   editTodoId = -1;

//   //* Re-render the list
//   renderTodos();
//   localStorage.setItem("todosList", JSON.stringify(todos));
// }

// //! Show notification
// function showNotif(msg) {
//   notifContainer.innerHTML = msg;
//   notifContainer.classList.add("notif-enter");
//   setTimeout(() => {
//     notifContainer.classList.remove("notif-enter");
//   }, 2000);
// }

//! elements selection
const form = document.querySelector("#todo-form");
const todoInp = document.querySelector("#newtodo-input");
const todosList = document.querySelector(".tasks-list-container");
// const notifContainer = document.querySelector(".notification");

//! VARIABLES
let todos = [];
//* cuz editTodoId will always be 0,1,2,3,... in editTodo function (cuz todoId is array index) and -1 means we're not editing
let editTodoId = -1;

//! FORM SUBMITION EVENT
form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveTodo();
  renderTodo();
});

//! SAVE TODO
function saveTodo() {
  const todoInputVal = todoInp.value;
  //* check if input is empty
  const isEmpty = todoInputVal === "";
  //* check if Todo is duplicate
  const isDuplicate = todos.some(
    (todo) => todo.value.toLowerCase() === todoInputVal.toLowerCase()
  );

  if (isEmpty) {
    alert("empty");
  } else if (isDuplicate) {
    alert("duplicate");
  }
  //* check for editing
  else if (editTodoId >= 0) {
    todos = todos.map((el, idx) => ({
      ...el,
      value: idx === editTodoId ? todoInputVal : el.value,
    }));
    editTodoId = -1;
  } else {
    todos.push({
      value: todoInputVal,
      checked: false,
    });
  }
}

//! RENDER TODO
function renderTodo() {
  //* Clear container before a re-render
  todosList.innerHTML = "";

  //* render todos
  todos.forEach((el, idx) => {
    todosList.innerHTML += `
  <div
  class="task d-flex align-items-center p-3 mx-2 mx-lg-4 mb-1 rounded-3"
  id= ${`task-${idx}`}
>
  <img
    class="cursor-pointer"
    src=${
      el.checked ? "assets/icon/checkedcircle.svg" : "assets/icon/circle.svg"
    } alt=${el.checked ? "checked icon" : "circle icon"} data-action = "check"
  />
  <span class="mx-2 cursor-pointer w-100" data-action = "check">${
    el.value
  }</span>

  <img
    class="cursor-pointer ml-auto"
    src="assets/icon/edit.svg"
    alt="edit icon"
    data-action = "edit"
  />
  <img
    class="cursor-pointer mx-1"
    src="assets/icon/trash.svg"
    alt="delete icon"
    data-action = "delete"
  />
</div>
    `;
  });
}

//! todos list click listener
todosList.addEventListener("click", (e) => {
  //* reach parent element of clicked target
  const parentElement = e.target.parentNode;
  //* if the className isn't task, finish the function
  if (!parentElement.classList.contains("task")) return;
  //* get todo id numeric part (needs to be converted from string to number)
  const todoId = Number(parentElement.id.slice(-1));
  //* get target action attribute
  const action = e.target.dataset.action;
  //* operations depending to action
  //* Check
  action === "check" && checkTodo(todoId);
  //* Edit
  action === "edit" && editTodo(todoId);
  //* Delete
  action === "delete" && deleteTodo(todoId);
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
  renderTodo();
}

//! Edit Todo
function editTodo(todoId) {
  todoInp.value = todos[todoId].value;
  editTodoId = todoId;
}

//! DELETE TODO
function deleteTodo(todoId) {
  //* returns all todos exept those which their index isn't equal to todoId
  todos = todos.filter((el, idx) => idx !== todoId);

  //* reset editTodoId to -1
  //* to prevent editing next todo when delete current todo while it was being edited
  editTodoId = -1;

  //* Re-render the list
  renderTodo();
}

//! DarK/light mode
const theme = document.querySelector("#theme-toggle");
const body = document.querySelector("body");

theme.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.contains("dark-mode")
    ? (theme.src = "assets/icon/moon.svg")
    : (theme.src = "assets/icon/sun.svg");
});
