import { filterByView} from "../contentFilter";
import { todoItem } from "../todos";
import {
  getCurrentView,
  getCurrentPeriod,
  getCurrentViewMsg,
} from "../statusChecker";
import { getToday, dueDays } from "../dateUtility";
import { icons } from "../assets/icons";
import { userTasksStorage } from "../storage";
import { displayCurrentView } from "../mainDOM";

export const elements = {
  todoDialog: document.getElementById("todoDialog"),
  todoContainer: document.querySelector(".todo-container"),
  sidebar: document.querySelector("#sidebar"),
  delProjectBtn : document.getElementById('deleteProject'),
};

export const components = {
  sidebarNav: document.createElement("ul"),
  todoDiv: document.createElement("div"),
  completedDiv: document.createElement("div"),
  todoDivText: document.createElement("h2"),
  completedDivText: document.createElement("h2"),
  todoNav: document.createElement("div"),
};

components.todoDiv.className = "todo-div";
components.completedDiv.className = "completed-div";
components.completedDivText.className = "completed-text";
components.todoDivText.className = "todo-text";
components.sidebarNav.classList.add("sidebar-nav");
components.todoNav.classList.add("todo-nav");
components.todoDivText.textContent = "Active";
components.completedDivText.textContent = "Completed";

export const getAllUserTask = () => userTasksStorage.getStorage();
let allUserTask = getAllUserTask();

let isUpdatingForm = false;

export function displayTodo(items) {
  const currView = getCurrentView();
  const completed = items.filter((item) => item.status).sort((a,b) => new Date(b.completedAt) - new Date(a.completedAt));
  const uncompleted = items.filter((item) => !item.status);
  // console.log(completed)

  components.todoDiv.innerHTML = "";
  components.completedDiv.innerHTML = "";

  if (uncompleted.length === 0) {
    const noTaskContainer = showNoTask();
    
    components.todoDiv.appendChild(noTaskContainer);
   
  } else {
    components.todoDiv.appendChild(components.todoDivText);
    createTodoDOM(uncompleted, components.todoDiv);
  }

  if (completed.length > 0) {
    components.completedDiv.classList.add("show");
    components.completedDiv.classList.add("scroll");
    components.todoDiv.classList.add("scroll");
    components.completedDiv.classList.remove("hide");
    components.completedDiv.appendChild(components.completedDivText);
    createTodoDOM(completed, components.completedDiv);
  } else {
    components.completedDiv.classList.add("hide");
    components.completedDiv.classList.remove("show");
  }

  elements.todoContainer.appendChild(components.todoDiv);
  elements.todoContainer.appendChild(components.completedDiv);

  if (currView !== "overdue") {
    // console.log(currView);
    elements.todoContainer.appendChild(components.completedDiv);
  } else {
    if (
      currView === "overdue" &&
      elements.todoContainer.contains(components.completedDiv)
    ) {
      elements.todoContainer.removeChild(components.completedDiv);
    }
  }

  handleStatusChange();
  displayCurrentView();
  deleteTodoItem();
}

function showNoTask() {
  const container = document.createElement("div");
  const p = document.createElement("p");

  const view = getCurrentPeriod();

  p.textContent = view || "default";
  container.appendChild(p);
  return container;
}
function createTodoDOM(items, parent) {
  // parent.innerHTML = "";

  for (const todo of items) {
    const todoWrapper = document.createElement("div");
    const todoMainDiv = document.createElement("div");
    const subDiv = document.createElement("div");
    const subContent = document.createElement("div");
    const checkboxDiv = document.createElement("div");
    const title = document.createElement("p");
    const desc = document.createElement("p");
    const dueDate = document.createElement("p");
    const createdAt = document.createElement("p");
    const projectType = document.createElement("p");

    const checkboxInput = document.createElement("input");
    const details = document.createElement("button");
    const editSpan = document.createElement("span");
    const overdue = document.createElement("p");
    const deleteSvgWrapper = document.createElement("span");
    const deleteSvg = document.createElement("span");
    const deleteHoverSvg = document.createElement("span");
    const options = document.createElement("span");
    const completeSvgWrapper = document.createElement("span");
    // classes

    todoWrapper.classList.add("todo-wrap");
    todoMainDiv.classList.add("todo-main");
    options.classList.add("todo-options");
    subDiv.className = "hide";
   

    subContent.classList.add("sub-con");
    details.classList.add('details');
    checkboxDiv.classList.add("checkbox-wrapper");
    desc.classList.add("desc");
    createdAt.classList.add("created-at");
    projectType.classList.add("project-type");
    completeSvgWrapper.classList.add("complete-svg");
    checkboxInput.classList.add("checkbox-input");
    editSpan.classList.add("edit");
    deleteSvgWrapper.classList.add("delete-wrapper");
    deleteSvg.classList.add("delete-todo");
    deleteHoverSvg.classList.add("delete-hover");

    title.className = "title";
    dueDate.className = "due-date";
    // IDs
    details.id = "subDivBtn";
    // TextContents
    title.textContent = todo["title"];
    desc.textContent = todo["desc"];
    dueDate.textContent = todo["dueDate"];
    createdAt.textContent = todo["createdAt"];
    projectType.textContent = todo["project"].toUpperCase();
    details.textContent = "Details";

    editSpan.innerHTML = icons.edit;

    // Attributes

    completeSvgWrapper.setAttribute("data-id", todo.uuid);
    editSpan.setAttribute("data-id", todo.uuid);
    deleteSvgWrapper.dataset.id = todo.uuid;

    // innerHTML
    completeSvgWrapper.innerHTML = todo.status
      ? icons.completed
      : icons.complete;
    deleteSvg.innerHTML = icons.delete;
    deleteHoverSvg.innerHTML = icons.deleteHover;



    // event listeners
    details.addEventListener("click", () => {
      subDiv.classList.toggle("sub-div");
      subDiv.classList.toggle("hide");
    });

    editSpan.addEventListener("click", (e) => {
      const wrapper = e.target.closest("[data-id]");
      if (!wrapper) return;
      const id = wrapper.dataset.id;

      populateForm(id);
      getAddForm();
      isUpdatingForm = false;
      todo.showSubDiv = false;
      console.log(todo);
    });

    // overdue

    if (todo.dueDate < getToday() && !todo.status) {
      // console.log('Due date:', todo);
      overdue.textContent = `Overdue: ${dueDays(todo.dueDate)}`;
      overdue.classList.add("overdueTasks");
      // console.log(dueDate.textContent)
    } 
    
    else {
      overdue.classList.add("hide");
      // console.log(dueDate.textContent)
    }


    deleteSvgWrapper.appendChild(deleteSvg);
    deleteSvgWrapper.appendChild(deleteHoverSvg);

    todoMainDiv.appendChild(completeSvgWrapper);
    options.appendChild(editSpan);
    options.appendChild(deleteSvgWrapper);

    todoMainDiv.appendChild(title);
    todoMainDiv.appendChild(dueDate);
    todoMainDiv.appendChild(details);

    subContent.appendChild(createdAt);
    subContent.appendChild(projectType);
    subContent.appendChild(overdue);
    subContent.appendChild(options);
    subDiv.appendChild(desc);
    subDiv.appendChild(subContent);
    todoWrapper.appendChild(todoMainDiv);
    todoWrapper.appendChild(subDiv);
    parent.appendChild(todoWrapper);
  }
}

function handleStatusChange() {
  const checkboxes = document.querySelectorAll(".complete-svg");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      const wrapper = e.target.closest("[data-id]");
      if (!wrapper) return;

      const id = wrapper.dataset.id;
      // checkbox.innerHTML = '';
      updateStatus(id);
    });
  });
}

function updateStatus(id) {
  allUserTask = getAllUserTask();
  const taskToUpdate = allUserTask.find((item) => item.uuid === id);

  if (taskToUpdate) {
    taskToUpdate.status = !taskToUpdate.status;
    taskToUpdate.completedAt = taskToUpdate.status ? new Date().toISOString(): null;
    console.log(allUserTask)
    setAndRefreshDisplay(allUserTask);
  }
}

export function deleteTodoItem() {
  allUserTask = getAllUserTask();

  const deleteIcons = document.querySelectorAll(".delete-wrapper");
  deleteIcons.forEach((item) => {
    item.addEventListener("click", (e) => {
      const wrapper = e.target.closest("[data-id]");
      const id = wrapper.dataset.id;
      const index = allUserTask.findIndex((task) => task.uuid === id);
      if (index !== -1) {
        allUserTask.splice(index, 1);
      }

      setAndRefreshDisplay(allUserTask);
    });
  });
}
export function getAddForm() {
  const todoForm = document.getElementById("todoForm");

  if (!isUpdatingForm) {
    todoForm.reset();
  }
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = todoForm.elements["uuid"].value;
    const formData = new FormData(todoForm);
    let title = formData.get("title");
    let desc = formData.get("desc");
    let dueDate = formData.get("dueDate");
    let priority = formData.get("priority");
    let project = formData.get("project");

    allUserTask = userTasksStorage.getStorage()

    if (id) {
      const index = allUserTask.findIndex((item) => item.uuid === id);

      allUserTask[index].showSubDiv = true;

      if (title && desc && dueDate && priority && project) {
        // console.log(allUserTask[index]);

        allUserTask[index] = {
          ...allUserTask[index],
          title,
          desc,
          dueDate,
          priority,
          project,
        };
        // console.table(allUserTask[index]);
      } else {
        return;
      }
    } else {
      const newItem = todoItem(title, desc, dueDate, priority, project);
      allUserTask.unshift(newItem);
    }

    setAndRefreshDisplay(allUserTask);

    todoForm.reset();
    elements.todoDialog.close();
  });
}

export function populateForm(id) {
  allUserTask = getAllUserTask();
  if (id) {
    const todoData = allUserTask.find((item) => item["uuid"] === id);
    const todoForm = document.getElementById("todoForm");

    todoForm.elements["title"].value = todoData["title"];
    todoForm.elements["desc"].value = todoData["desc"];
    todoForm.elements["dueDate"].value = todoData["dueDate"];
    todoForm.elements["project"].value = todoData["project"];
    todoForm.elements["priority"].value = todoData["priority"].toLowerCase();
    todoForm.elements["uuid"].value = id;

    isUpdatingForm = true;
    elements.todoDialog.showModal();
  }
}

// export function displayTodoNav() {
//   const buttons = [
//     { id: "tasks", text: "Tasks" },
//     { id: "today", text: "Today" },
//     { id: "week", text: "This Week" },
//     // { id: "allUserTask", text: "All Tasks" },
//     { id: "upcoming", text: "Upcoming" },
//     { id: "overdue", text: "Overdue" },
//   ];

//   buttons.forEach((button) => {
//     const li = document.createElement("li");
//     const svgWrapper = document.createElement("span");
//     const textWrapper = document.createElement("span");
//     const btn = document.createElement("button");
//     li.classList.add("sidebar_item");

//     svgWrapper.classList.add("btn-wrapper");
//     btn.classList.add("sidebar_button");
//     btn.id = button.id;
//     svgWrapper.innerHTML = `${icons[button.id]}`;
//     textWrapper.innerHTML = `${button.text.toUpperCase()}`;

//     btn.appendChild(svgWrapper);
//     btn.appendChild(textWrapper);
//     li.appendChild(btn);
//     components.sidebarNav.appendChild(li);

//     components.todoNav.appendChild(components.sidebarNav);

//     elements.sidebar.appendChild(components.todoNav);
//   });
//   components.sidebarNav.addEventListener("click", (e) => {
//     const button = e.target.closest("button");
//     if (!button) return;

//     let targetId = button.id;
//     const filtered = filterByView(targetId, allUserTask);
//     displayTodo(filtered);
//   });
// }



export function setAndRefreshDisplay(arr) {
  userTasksStorage.setStorage(arr);
  allUserTask = getAllUserTask(); 
  const view = getCurrentView();
  const list = filterByView(view, allUserTask);
  displayTodo(list);
}

