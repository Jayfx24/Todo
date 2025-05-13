
import { allTask } from '../todos';
import {testTodos} from '../data/testTodos'
import { filterByView} from '../contentFilter';
import { displayTodo,elements, components } from '../contentManagers/todoManager';
import { displayProjects,renderProjectTodo,deleteProject } from '../contentManagers/projectsManager';
import { displayCurrentView } from '../mainDOM';
import { icons } from '../assets/icons';
import { userTasksStorage } from '../storage';

let allUserTask = userTasksStorage.getStorage();

export function initSideNav (){

    displayTodoNav();
    displayProjects()
    projectBtns()
    
    
}

export function displayTodoNav() {
    allUserTask = userTasksStorage.getStorage();
    const buttons = [
      { id: "tasks", text: "Tasks" },
      { id: "today", text: "Today" },
      { id: "week", text: "This Week" },
      { id: "upcoming", text: "Upcoming" },
      { id: "overdue", text: "Overdue" },
    ];
  
    buttons.forEach((button) => {
      const li = document.createElement("li");
      const svgWrapper = document.createElement("span");
      const textWrapper = document.createElement("span");
      const btn = document.createElement("button");
      li.classList.add("sidebar_item");
  
      svgWrapper.classList.add("btn-wrapper");
      btn.classList.add("sidebar_button");
      btn.id = button.id;
      svgWrapper.innerHTML = `${icons[button.id]}`;
      textWrapper.innerHTML = `${button.text.toUpperCase()}`;
  
      btn.appendChild(svgWrapper);
      btn.appendChild(textWrapper);
      li.appendChild(btn);
      components.sidebarNav.appendChild(li);
  
      components.todoNav.appendChild(components.sidebarNav);
  
      elements.sidebar.appendChild(components.todoNav);
    });
    components.sidebarNav.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;
        
      let targetId = button.id;
      const filtered = filterByView(targetId, allUserTask);
      displayTodo(filtered);
      deleteProject();
    //   elements.delProjectBtn.classList.add('hide');
    });
  }

function projectBtns() {
const projectUl = document.querySelector('.project-list');


projectUl.addEventListener('click',(e) =>{
    const button = e.target.closest("button");
    if (!button) return; 
    
    renderProjectTodo(button.name);

    deleteProject();
    
    }
    
    
)
}
