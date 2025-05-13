import "./style.css";
import { displayProjects } from "./contentManagers/projectsManager";
import { displayTodo,deleteTodoItem } from "./contentManagers/todoManager";
import {  initSideNav } from "./nav/navigation";
import { initBtns } from "./contentManagers/dialogManager";
import { filterByView } from "./contentFilter";
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
  initBtns();
  initTodo(allTask)
  

}

function initTodo(items){
  displayTodo(items)
  deleteTodoItem();
  
  filterByView('tasks',items)
 
    // deleteProject();

  

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
