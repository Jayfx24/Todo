import "./style.css";
import { displayProjects } from "./contentManagers/projectsManager";
import { displayTodo,deleteTodoItem } from "./contentManagers/todoManager";
import {  initSideNav } from "./nav/sideNavs";
import { initBtns } from "./contentManagers/dialogManager";
// import { allTask } from "./todos";
import { filterByView } from "./contentFilter";
import { allTodoTasks } from "./contentFilter";
import { testTodos } from "./data/testTodos";
import { testProjectsData } from "./data/testProjects";
import { userTasksStorage,userProjectStorage } from "./storage";




const todoData = userTasksStorage.getStorage() 
const projectData = userProjectStorage.getStorage() 

const allTask = [];
const allProjects = [];

function app() {
  checkStorage();
  initSideNav();
  // displayProjects();
  initBtns();
  initTodo(allTask)
  

}

function initTodo(items){
  displayTodo(items)
  deleteTodoItem();
  filterByView('tasks',items)

}


function checkStorage(){
  if (todoData.length > 0){
    allTask.push(...todoData);
  }
  else{
    allTask.push(...testTodos);
    userTasksStorage.setStorage(allTask)
  }

  if (projectData.length > 0){
    testProjectsData.push(...projectData);
  }
  else{
    allProjects.push(...testProjectsData);
    userProjectStorage.setStorage(allProjects)
  }

}

app();
