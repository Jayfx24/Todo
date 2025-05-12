
import { allTask } from '../todos';
import {testTodos} from '../data/testTodos'
import { filterByView} from '../contentFilter';
import { displayTodo,displayTodoNav } from '../contentManagers/todoManager';
import { displayProjects } from '../contentManagers/projectsManager';


export function initSideNav (){
// const sidebar = document.getElementById("sidebar")
//     sidebar.innerHTML =''
    displayTodoNav();
    displayProjects()

}

function todoNavBtns(){

}

