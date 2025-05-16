import "./style.css";
import { displayTodo,deleteTodoItem } from "./contentManagers/todoManager";
import {  initSideNav } from "./nav/navigation";
import { initBtns } from "./contentManagers/dialogManager";
import { filterByView } from "./contentFilter";
import { testTodos } from "./data/testTodos";
import { testProjectsData } from "./data/testProjects";
import { userTasksStorage,userProjectStorage } from "./storage";
import { toggleIcon,toggleMode } from "./mainDOM";



const todoData = userTasksStorage.getStorage() 
const projectData = userProjectStorage.getStorage() 

const allTask = [];
const allProjects = [];


function app() {
 
  checkStorage();
  initSideNav();
  initBtns();
  initTodo(allTask)
  toggleIcon();
  toggleMode();

  

}

function initTodo(items){
  displayTodo(items)
  filterByView('tasks',items)
  deleteTodoItem();
  

 
   

  

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

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.display = "block";
});

