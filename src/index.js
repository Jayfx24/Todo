import "./style.css";
import { displayProjects } from "./projectsManager";
import {  initSideNav } from "./nav/sideNavs";
import { initBtns } from "./buttons/dialogButton";
import { allTodoTasks } from "./contentFilter";
import { allTask } from "./tasks";
import { setView } from "./statusChecker";

function app() {
  initSideNav()
  // sideNavInit();
  displayProjects();
  initBtns();
  allTodoTasks(allTask);
}

app()

// work on project dialog