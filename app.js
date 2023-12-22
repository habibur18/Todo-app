const inputBox = document.querySelector("#input-box");
const addBtn = document.querySelector("#add-button");
const todoListContainer = document.querySelector("#list-container");

// main function to add todos
function addTodos() {
  if (inputBox.value === "") {
    alert("Input field cannot be empty");
  } else {
    const todoText = inputBox.value;
    const li = document.createElement("li");
    li.innerHTML = todoText;
    const delBtn = document.createElement("span");
    delBtn.innerHTML = "\u00d7";
    li.appendChild(delBtn);
    todoListContainer.insertBefore(li, todoListContainer.childNodes[0]);
    inputBox.value = "";
    setTodosLocalStorage();
  }
}

// add todos on click event
addBtn.addEventListener("click", addTodos);
inputBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTodos();
  }
});

// delete todos and mark them as completed or uncompleted on click
todoListContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    if (e.target.classList.contains("checked")) {
      todoListContainer.appendChild(e.target);
    } else {
      todoListContainer.insertBefore(e.target, todoListContainer.firstChild);
    }
    setTodosLocalStorage();
  } else if (e.target.tagName === "SPAN") {
    const li = e.target.parentElement;
    if (li.classList.contains("checked")) {
      li.remove();
    } else {
      if (confirm("Are you sure you want to delete this Unchecked Todo?")) {
        li.remove();
      }
    }
    setTodosLocalStorage();
  }
});

// save to local storage
const setTodosLocalStorage = () => {
  localStorage.setItem("allTodos", todoListContainer.innerHTML);
};

// show All todos from Local Storage
const showTodos = () => {
  todoListContainer.innerHTML = localStorage.getItem("allTodos");
};
showTodos();
