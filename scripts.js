//! elements selection
const tasksPendingNum = document.querySelector(".tasks-pending-num");
const form = document.querySelector("#todo-form");
const todoInp = document.querySelector("#newtodo-input");
const todosList = document.querySelector(".tasks-list-container");
const test = document.querySelector(".tasks-list-container:first-child");
const filters = document.querySelectorAll(".filter");
const theme = document.querySelector("#theme-toggle");
const body = document.querySelector("body");

//! VARIABLES
let todos = JSON.parse(localStorage.getItem("todos-list")) || [];
let editId;
let isEdited = false;

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

todoInp.addEventListener("keyup", (e) => {
  let inputVal = todoInp.value.trim();
  const isDuplicate = todos.some(
    (todo) => todo.name.toLowerCase() === todoInp.value.toLowerCase()
  );
  //* enter pressed and input value isn't empty
  if (e.key === "Enter" && inputVal) {
    if (isDuplicate) {
      alert("Duplicate todo");
    }
    //* if isEdited isn't true
    else if (!isEdited) {
      let taskInfo = { name: inputVal, status: "pending" };
      //* adding new todo
      todos.push(taskInfo);
    } else {
      isEdited = false;
      todos[editId].name = inputVal;
    }
    todoInp.value = "";

    filters[0].click();
    localStorage.setItem("todos-list", JSON.stringify(todos));
    showTodo("all");
  }
});

showTodo("all");

function showTodo(filter) {
  todosList.innerHTML = "";
  todos.forEach((el, idx) => {
    let isCompleted = el.status === "completed" ? "checked" : "";
    if (filter === el.status || filter === "all") {
      todosList.innerHTML += `
      <li
      class="task d-flex align-items-center p-3 mx-2 mx-lg-4 mb-1 rounded-3 ${isCompleted}"
    >
      <input onclick="updateStatus(this)" type="checkbox" class="form-check-input cursor-pointer m-0" id="${idx}" ${isCompleted} />
      <label class="w-100 mx-2 cursor-pointer form-check-label" for="${idx}"
        >${el.name}</label
      >
      <img
      //* because of "", our argument must be in '' otherwise we'll face an error
        onclick="editTodo(${idx},'${el.name}')"
        class="cursor-pointer ml-auto"
        src="assets/icon/edit.svg"
        alt="edit icon"
      />
      <img
        onclick="deleteTodo(${idx})"
        class="cursor-pointer mx-1"
        src=${
          body.classList.contains("dark-mode")
            ? "assets/icon/trash-dark.svg"
            : "assets/icon/trash.svg"
        }
        alt="delete icon"
      />
    </li>
      `;
    }
  });
  showPendingNum();
}

function updateStatus(todo) {
  if (todo.checked) {
    todo.parentElement.classList.add("checked");
    todos[todo.id].status = "completed";
  } else {
    todo.parentElement.classList.remove("checked");
    todos[todo.id].status = "pending";
  }
  localStorage.setItem("todos-list", JSON.stringify(todos));
  showPendingNum();
}

function deleteTodo(todoId) {
  //* delete selected task from todos array
  todos.splice(todoId, 1);
  filters[0].click();
  localStorage.setItem("todos-list", JSON.stringify(todos));
  showTodo("all");
}

function editTodo(todoId, todoVal) {
  editId = todoId;
  isEdited = true;
  todoInp.value = todoVal;
}

//! Filters
filters.forEach((el) => {
  el.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    el.classList.add("active");
    showTodo(el.id);
  });
});

//! CALCULATE NUM OF PENDING TODOS
function showPendingNum() {
  pendingTodos = todos.filter((el) => el.status === "pending");
  tasksPendingNum.textContent = `${pendingTodos.length} Tasks pending`;
}

//! DarK/light mode
theme.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.contains("dark-mode")
    ? (theme.src = "assets/icon/moon.svg")
    : (theme.src = "assets/icon/sun.svg");
  filters[0].click();
  showTodo("all");
});

//! SORTABLE
const sortable = Sortable.create(
  document.querySelector(".tasks-list-container"),
  {
    animation: 300,
  }
);
