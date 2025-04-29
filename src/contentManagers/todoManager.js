import { allTask } from "../todos";
import { filterByView } from "../contentFilter";
import { todoItem } from "../todos";
import { getCurrentView, getCurrentPeriod } from "../statusChecker";


const todoDialog = document.getElementById("todoDialog");
const todoContainer = document.querySelector(".todo-container");
const todoItems = document.createElement("div");
const completedDiv = document.createElement("div");

completedDiv.className = "completed-div";

let formData;

export function displayTodo(items) {
  
  const completed = items.filter(item => item.status)
  const uncompleted = items.filter(item => !item.status)

  console.log(completed)
  
  if (items.length > 0) {
    createTodoDOM(uncompleted, todoItems);
    createTodoDOM(completed, completedDiv);

    
  } else {
    
    showNoTask();
  }
  todoContainer.appendChild(todoItems)
  todoContainer.appendChild(completedDiv)
  handleStatusChange(items);

}

function createTodoDOM(items, parent) {
  parent.innerHTML = "";

  for (const todo of items) {
    const item = document.createElement("div");
    const title = document.createElement("p");
    const desc = document.createElement("p");
    const dueDate = document.createElement("p");
    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("data-id", todo.uuid); 


    item.className = "todo-item";
    checkBox.className = "checkbox";
    checkBox.checked = todo.status === true;

    title.textContent = todo["title"];
    desc.textContent = todo["desc"];
    dueDate.textContent = todo["dueDate"];

    item.appendChild(title);
    item.appendChild(desc);
    item.appendChild(dueDate);
    item.appendChild(checkBox);

    parent.appendChild(item);
   
  }
}

function showNoTask() {
  todoItems.innerHTML = "";

  const container = document.createElement("div");
  const p = document.createElement("p");

  const view = getCurrentPeriod();

  p.textContent = view;
  container.appendChild(p);
  todoItems.appendChild(container);
}

export function getAddForm() {
  const todoForm = document.getElementById("todoForm");

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formData = new FormData(todoForm);

    let title = formData.get("title");
    let desc = formData.get("desc");
    let dueDate = formData.get("dueDate");
    let priority = formData.get("priority");
    let project = formData.get("project");

    const newItem = todoItem(title, desc, dueDate, priority, project);

    allTask.push(newItem);
    const view = getCurrentView();

    filterByView(view);
    todoForm.reset();
    todoDialog.close();
  });
}


export function handleStatusChange(items) {
  const checkboxes = document.querySelectorAll(".checkbox");
  console.log('taskToUpdate')
  
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const status = checkbox.checked;
      const id = checkbox.getAttribute("data-id");      
      updateStatus(id, status, items);

  
    });
  });
}

function updateStatus(id, status, items) {
  const taskToUpdate = items.find((item) => item.uuid === id);
  console.log(taskToUpdate)
  if (taskToUpdate) {
    taskToUpdate.status = status;
    displayTodo(items);
}

}