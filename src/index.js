import "./style.css";
import { displayProjects } from "./contentManagers/projectsManager";
import { displayTodo } from "./contentManagers/todoManager";
import {  initSideNav } from "./nav/sideNavs";
import { initBtns } from "./contentManagers/dialogManager";
import { allTask } from "./todos";

function app() {
  
  displayTodo(allTask)
  initSideNav();
  // displayProjects();
  initBtns();

}

app();

// work on overdue,update project in form to match current project - DONE
// complete and indicate if there is no task for the time period - DONE
// If completed it should create a new container and show the completed ones below the todoContainer;.
/* show description with show details and edit to populate 
 */