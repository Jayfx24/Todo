import "./style.css";
import { displayProjects } from "./contentManagers/projectsManager";
import {  initSideNav } from "./nav/sideNavs";
import { initBtns } from "./contentManagers/dialogManager";
import { allTodoTasks } from "./contentFilter";
import { allTask } from "./todos";

function app() {
  initSideNav();
  displayProjects();
  initBtns();
  allTodoTasks(allTask);
}

app();

// work on overdue,update project in form to match current project - DONE
// completed and indicate if there is not task for the time period