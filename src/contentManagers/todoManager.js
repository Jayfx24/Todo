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
import { getToday, dueDays, formattedDate } from "../dateUtility";
import { icons } from "../assets/icons";


const todoDialog = document.getElementById("todoDialog");
const todoContainer = document.querySelector(".todo-container");
const aside = document.querySelector("#sidebar");
const sidebarNav = document.createElement("ul");
const todoDiv = document.createElement("div");
const completedDiv = document.createElement("div");
const todoDivText = document.createElement("h2");
const completedDivText = document.createElement("h2");
const todoNav = document.createElement("div");
const showCurr = document.querySelector('.show-view')
const showCurrText = document.createElement('p')

todoDiv.className = "todo-div"
completedDiv.className = "completed-div";
completedDivText.className = "completed-text";
todoDivText.className = "todo-text";
sidebarNav.classList.add("sidebar-nav");
todoNav.classList.add("todo-nav");

todoDivText.textContent = "Active";
completedDivText.textContent = 'Completed'

allTask.push(...testTodos);


export function displayTodo(items) {
  const currView = getCurrentView()
  const completed = items.filter((item) => item.status);
  const uncompleted = items.filter((item) => !item.status);

  todoDiv.innerHTML = '';
  completedDiv.innerHTML = '';
 

  if (uncompleted.length === 0) {
    const noTaskContainer = showNoTask();
    console.log(noTaskContainer)
    todoDiv.appendChild(noTaskContainer);
    // showNoTask();
  }
  else{
    todoDiv.appendChild(todoDivText);
    createTodoDOM(uncompleted, todoDiv);
  }

  
  if (completed.length > 0) {
    completedDiv.classList.add('show')
    completedDiv.classList.add('scroll')
    todoDiv.classList.add('scroll')
    completedDiv.classList.remove('hide')
    completedDiv.appendChild(completedDivText)
    createTodoDOM(completed, completedDiv);
  }
  else{
    completedDiv.classList.add('hide')
    completedDiv.classList.remove('show')

  }
  
  
  todoContainer.appendChild(todoDiv);
  todoContainer.appendChild(completedDiv);

  if (currView !== 'overdue'){
    console.log(currView);
    todoContainer.appendChild(completedDiv);
  }
  else{
    if (currView === 'overdue' && todoContainer.contains(completedDiv)) {
      todoContainer.removeChild(completedDiv);
    }

  }

  handleStatusChange(items);
  displayCurrentView();
  deleteTodoItem();
}

function showNoTask() {
  // todoDiv.innerHTML = "";
  const div = document.querySelector('.todo-div'); // Or use #your-div-id for an ID
if (div) {
  console.log("The div exists!");
} else {
  console.log("The div does not exist.");
}

  const container = document.createElement("div");
  const p = document.createElement("p");
  console.log('clearing')

  const view = getCurrentPeriod();

  p.textContent = view || 'default';
  container.appendChild(p);
  return container;
}
function createTodoDOM(items, parent) {
  // parent.innerHTML = "";

  for (const todo of items) {
    const todoWrapper = document.createElement("div");
    const todoMainDiv = document.createElement("div");
    const subDiv = document.createElement('div');
    const subContent = document.createElement('div');
    const checkboxDiv = document.createElement('div')
    const title = document.createElement("p");
    const desc = document.createElement("p");
    const dueDate = document.createElement("p");
    const createdAt = document.createElement("p");
    const projectType = document.createElement("p");
    const checkboxLabel = document.createElement("label");
    const checkboxInput = document.createElement("input");

    // classes
    subDiv.className = 'hide';
    subContent.className = 'sub-con';
    // subDiv.className = 'sub-div';
    checkboxDiv.className = "checkbox-wrapper";
    checkboxInput.className = "checkbox-input";
    todoWrapper.className = "todo-wrap";
    todoMainDiv.className = "todo-main";
    
    checkboxInput.checked = todo.status === true;
    title.className = 'title'
    dueDate.className = 'due-date'

    title.textContent = todo["title"];
    desc.textContent = todo["desc"];
    dueDate.textContent = todo["dueDate"];
    createdAt.textContent = todo["createdAt"];
    projectType.textContent = todo["projectType"];
    

    // summary
    const subTask = document.createElement('button');
    subTask.textContent = "Details";
    subTask.id = 'subDivBtn'; 

    const editBtn = document.createElement("button");
    checkboxLabel.textContent = "completed?"
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.setAttribute("data-id", todo.uuid);
    // checkboxInput.setAttribute("id", todo.uuid);
    checkboxLabel.setAttribute('for',todo.uuid);
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

    // overdue
    const overdue = document.createElement('p');
  
    if (todo.dueDate < getToday()){
      overdue.textContent = `Overdue: ${dueDays(todo.dueDate)}`
      overdue.classList.add('overdueTasks')
      console.log(dueDate.textContent)

    }
    else{
      overdue.classList.add('hide');
      console.log(dueDate.textContent)
    }

    // delete
    const deleteSvgWrapper = document.createElement('span');
    const deleteSvg = document.createElement('span');
    const deleteHoverSvg = document.createElement('span');
    deleteSvgWrapper.className = 'delete-wrapper';
    deleteSvg.className = 'delete-todo';
    deleteHoverSvg.className = 'delete-hover';
    deleteSvgWrapper.dataset.id = todo.uuid;
    
    deleteSvg.innerHTML = icons.delete;
    deleteHoverSvg.innerHTML = icons.deleteHover;


    
    deleteSvgWrapper.appendChild(deleteSvg);
    deleteSvgWrapper.appendChild(deleteHoverSvg);
    checkboxDiv.appendChild(checkboxLabel);
    checkboxDiv.appendChild(checkboxInput);
    todoMainDiv.appendChild(title);
    // todoMainDiv.appendChild(desc);
    todoMainDiv.appendChild(dueDate);
    todoMainDiv.appendChild(subTask);
    todoMainDiv.appendChild(checkboxDiv);
    todoMainDiv.appendChild(editBtn);
    todoMainDiv.appendChild(deleteSvgWrapper);
    
    subContent.appendChild(desc);
    subContent.appendChild(createdAt);
    subContent.appendChild(projectType);
    subContent.appendChild(overdue);
    subDiv.appendChild(subContent)
    todoWrapper.appendChild(todoMainDiv);
    todoWrapper.appendChild(subDiv);
    parent.appendChild(todoWrapper);
    
  }
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
  const checkboxes = document.querySelectorAll(".checkbox-input");

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


export function deleteTodoItem(){
  const deleteIcons = document.querySelectorAll('.delete-wrapper');
  deleteIcons.forEach(item =>{
    item.addEventListener('click', (e)=>{

      const wrapper = e.target.closest('[data-id]');
      const id = wrapper.dataset.id;
      const index = allTask.findIndex(task => task.uuid === id);
      if (index !== -1) {
        allTask.splice(index, 1); 
      }
      console.table(allTask)


      const view = getCurrentView();
      console.log(`passed view - ${view}`);
      const list = filterByView(view, allTask);
      displayTodo(list);
    })
  })

}
export function populateForm(id) {
  console.log("here");

  const todoData = allTask.find((item) => item["uuid"] === id);
  const todoForm = document.getElementById("todoForm");
  

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
    const svgWrapper = document.createElement('span');
    const textWrapper = document.createElement('span');
    const btn = document.createElement("button");
    li.classList.add("sidebar_item");
    
    svgWrapper.classList.add("btn-wrapper");
    btn.classList.add("sidebar_button");
    btn.id = button.id;
    svgWrapper.innerHTML = `${icons[button.id]}`;
    textWrapper.innerHTML = `${button.text}`;

    btn.appendChild(svgWrapper)
    btn.appendChild(textWrapper)
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

function displayCurrentView(){
  // show curr task/project view

  
  const currView = getCurrentViewMsg();
  console.log(`dialog ${currView}`)

  showCurr.innerHTML = `${icons.view}<span>${currView}</span>`;
  showCurr.className = "show-view";

 
  
}