
import {getAddForm, populateForm } from "./todoManager"
import { getProjectForm } from "./projectsManager"
import { createTodoForm,createProjectForm } from "../mainDOM"
import { getCurrentView } from "../statusChecker"
import { icons } from "../assets/icons"


const addTodoBtn = document.getElementById('addTodo')
const addProjectBtn = document.getElementById('addProject')
const todoDialog = document.getElementById('todoDialog')
const projectDialog = document.getElementById('projectDialog')
// const todoForm = document.getElementById('todoForm')
// const dialogs = document.querySelectorAll('dialog')



export function initBtns(){
    setupTodoDialog();

    addTodoBtn.addEventListener('click',()=>{
        setupTodoDialog();
        todoDialog.showModal();
        getAddForm();
        
    });
    
    addProjectBtn.addEventListener('click',()=>{
        projectDialog.showModal();  
        setupProjectDialog();
        getProjectForm();
    });

}

function setupTodoDialog(){
    todoDialog.innerHTML = ''
    
    createCloseSvg(todoDialog);
    createTodoForm(todoDialog);
}

function setupProjectDialog(){
    projectDialog.innerHTML = ''
    createCloseSvg(projectDialog);
    createProjectForm(projectDialog);

}


function createCloseSvg(dialog) {
    const closeSvgWrapper = document.createElement('span');
    closeSvgWrapper.className = "close-svg";
    closeSvgWrapper.innerHTML = icons.close;


    // Append all to form
    dialog.appendChild(closeSvgWrapper);
    dialog.addEventListener("click", (event) => {
        
        if (event.target === dialog) {
            dialog.close();
        }
    });
    closeSvgWrapper.addEventListener('click',()=>{
        dialog.close();
    })}
