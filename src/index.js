import "./style.css";
import { displayProjects } from "./projectsManager";
import { sideNavInit } from "./nav/sideNavs";
import { initBtns } from "./buttons/dialogButton";
import { allTodoTasks } from "./taskfilter";
import { allTask } from "./tasks";

function app() {
  allTodoTasks(allTask);
  sideNavInit();
  displayProjects();
  initBtns();
}

app()