import { allTask } from "../todos";
import { testTodos } from "../data/testTodos";
import { filterByView, projectFilter } from "../contentFilter";
import { todoItem } from "../todos";
import {
  getCurrentView,
  getCurrentPeriod,
  getProjectCurrentView,
  getCurrentViewMsg
} from "../statusChecker";

const todoDialog = document.getElementById("todoDialog");
const todoContainer = document.querySelector(".todo-container");
const aside = document.querySelector("#sidebar");
const sidebarNav = document.createElement("ul");
const todoDiv = document.createElement("div");
const completedDiv = document.createElement("div");
const todoNav = document.createElement("div");


const showCurr = document.querySelector('.show-view')
const showCurrText = document.createElement('p')

todoDiv.className = "todo-div"
completedDiv.className = "completed-div";
sidebarNav.classList.add("sidebar-nav");
todoNav.classList.add("todo-nav");

allTask.push(...testTodos);


export function displayTodo(items) {
  const currView = getCurrentView()
  const completed = items.filter((item) => item.status);
  const uncompleted = items.filter((item) => !item.status);

  todoDiv.innerHTML = '';
  completedDiv.innerHTML = '';
 
  if (uncompleted.length > 0) {
    createTodoDOM(uncompleted, todoDiv);
  }
  
  if (completed.length > 0) {
    completedDiv.classList.add('show')
    completedDiv.classList.add('scroll')
    todoDiv.classList.add('scroll')
    completedDiv.classList.remove('hide')

    createTodoDOM(completed, completedDiv);
  }
  else{
    completedDiv.classList.add('hide')
    completedDiv.classList.remove('show')

  }
  
  
  if (uncompleted.length === 0   ) {
    showNoTask();
  }
  
  todoContainer.appendChild(todoDiv);
  if (currView !== 'overdue'){
    console.log(currView);
    todoContainer.appendChild(completedDiv);
  }
  else{
    if (todoContainer.contains(completedDiv)) {
      todoContainer.removeChild(completedDiv);
    }

  }

  handleStatusChange(items);
  showCurrTask();
}

function createTodoDOM(items, parent) {
  // parent.innerHTML = "";

  for (const todo of items) {
    const todoWrapper = document.createElement("div");
    const todoMainDiv = document.createElement("div");
    const subDiv = document.createElement('div');
    const subContent = document.createElement('div');

    const title = document.createElement("p");
    const desc = document.createElement("p");
    const dueDate = document.createElement("p");
    const createdAt = document.createElement("p");
    const projectType = document.createElement("p");
    const checkBox = document.createElement("input");

    // classes
    subDiv.className = 'hide';
    subContent.className = 'sub-con';
    // subDiv.className = 'sub-div';

    // summary
    const subTask = document.createElement('button');
    subTask.textContent = "Details";
    subTask.id = 'subDivBtn'; 

    const editBtn = document.createElement("button");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("data-id", todo.uuid);
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.setAttribute("data-id", todo.uuid);


    // CREATE SUB DIV

    // event listeners
    subTask.addEventListener('click',()=>{
      subDiv.classList.toggle('sub-div');
      subDiv.classList.toggle('hide');

    })

    editBtn.addEventListener("click", (e) => {
      console.log();
      const id = e.target.dataset.id;
      populateForm(id);
      getAddForm();
    });

    todoWrapper.className = "todo-wrap";
    todoMainDiv.className = "todo-main";
    checkBox.className = "checkbox";
    checkBox.checked = todo.status === true;

    title.textContent = todo["title"];
    desc.textContent = todo["desc"];
    dueDate.textContent = todo["dueDate"];
    createdAt.textContent = todo["createdAt"];
    projectType.textContent = todo["projectType"];

    todoMainDiv.appendChild(title);
    // todoMainDiv.appendChild(desc);
    todoMainDiv.appendChild(dueDate);
    todoMainDiv.appendChild(subTask);
    // renderTodoDetails(todo, todoMainDiv);
    todoMainDiv.appendChild(checkBox);
    todoMainDiv.appendChild(editBtn);

    subContent.appendChild(desc);
    subContent.appendChild(createdAt);
    subContent.appendChild(projectType);
    subDiv.appendChild(subContent)
    todoWrapper.appendChild(todoMainDiv);
    todoWrapper.appendChild(subDiv);
    parent.appendChild(todoWrapper);
    
  }
}

function showNoTask() {
  todoDiv.innerHTML = "";

  const container = document.createElement("div");
  const p = document.createElement("p");

  const view = getCurrentPeriod();

  p.textContent = view;
  container.appendChild(p);
  todoDiv.appendChild(container);
}

export function getAddForm() {
  const todoForm = document.getElementById("todoForm");

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = todoForm.elements["uuid"].value;

    const formData = new FormData(todoForm);
    let title = formData.get("title");
    let desc = formData.get("desc");
    let dueDate = formData.get("dueDate");
    let priority = formData.get("priority");
    let project = formData.get("project");

    if (id) {
      const index = allTask.findIndex((item) => item.uuid === id);
      console.table(allTask[index]);

      if (title && desc && dueDate && priority && project) {
        allTask[index] = {
          ...allTask[index],
          title,
          desc,
          dueDate,
          priority,
          project,
        };
        console.table(allTask[index]);
      } else {
        return;
      }
      // const view = getProjectCurrentView();
      // console.log(view);
      // const projectTodos = projectFilter(allTask,view);
      // displayTodo(projectTodos);
    } 
    else {
      const newItem = todoItem(title, desc, dueDate, priority, project);
      allTask.push(newItem);
    }
    const view = getCurrentView();
    console.log(`passed view - ${view}`);
    const list = filterByView(view, allTask);
    displayTodo(list);

    todoDialog.close();
    todoForm.reset();
  });
}

function handleStatusChange(items) {
  const checkboxes = document.querySelectorAll(".checkbox");

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

  if (taskToUpdate) {
    taskToUpdate.status = status;
    displayTodo(items);
  }
}

function renderTodoDetails(todo, parent) {
  const subDiv = document.createElement("div");
  // const summary = document.createElement("button");
  const contentDiv = document.createElement("div");
  const desc = document.createElement("p");
  
  summary.textContent = "Details";
  desc.textContent = todo["desc"];
  createdAt.textContent = todo["createdAt"];
  projectType.textContent = todo["project"];

  // subDiv.open = false;

  contentDiv.appendChild(desc);
  contentDiv.appendChild(createdAt);
  contentDiv.appendChild(projectType);
  subDiv.appendChild(summary);
  subDiv.appendChild(contentDiv);
  parent.appendChild(subDiv);
}

export function populateForm(id) {
  console.log("here");

  const todoData = allTask.find((item) => item["uuid"] === id);
  const todoForm = document.getElementById("todoForm");
  // console.log(todoForm.elements);
  // console.log(todoData);

  todoForm.elements["title"].value = todoData["title"];
  todoForm.elements["desc"].value = todoData["desc"];
  todoForm.elements["dueDate"].value = todoData["dueDate"];
  todoForm.elements["project"].value = todoData["project"];
  todoForm.elements["priority"].value = todoData["priority"].toLowerCase();
  todoForm.elements["uuid"].value = id;

  todoDialog.showModal();
}

export function displayTodoNav() {
  const buttons = [
    { id: "tasks", text: "Tasks" },
    { id: "today", text: "Today" },
    { id: "week", text: "This Week" },
    // { id: "allTask", text: "All Tasks" },
    { id: "upcoming", text: "Upcoming" },
    { id: "overdue", text: "Overdue" },
  ];

  buttons.forEach((button) => {
    const li = document.createElement("li");
    li.classList.add("sidebar_item");

    const btn = document.createElement("button");
    btn.classList.add("sidebar_button");
    btn.id = button.id;
    btn.textContent = button.text;

    li.appendChild(btn);
    sidebarNav.appendChild(li);

    todoNav.appendChild(sidebarNav);

    aside.appendChild(todoNav);

  });
  sidebarNav.addEventListener("click", (e) => {

    const button = e.target.closest("button");
    if (!button) return; 

    let targetId = button.id;
    const filtered = filterByView(targetId, allTask);
    displayTodo(filtered);
  });
}

function showCurrTask(){
  // show curr task/project view

  
  const currView = getCurrentViewMsg();
  console.log(`dialog ${currView}`)
  showCurrText.textContent = currView;
  showCurr.className = "show-view";

  showCurr.appendChild(showCurrText);
  
}