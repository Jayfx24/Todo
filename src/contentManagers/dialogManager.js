
import {getAddForm, populateForm } from "./todoManager"
import { getProjectForm } from "./projectsManager"
import { createTodoForm,createProjectForm } from "../mainDOM"
import { getCurrentView } from "../statusChecker"
import { icons } from "../assets/icons"


const addTodoBtn = document.getElementById('addTodo')
const addProjectBtn = document.getElementById('addProject')
const todoDialog = document.getElementById('todoDialog')
const projectDialog = document.getElementById('projectDialog')
const todoForm = document.getElementById('todoForm')
const dialogs = document.querySelectorAll('dialog')



export function initBtns(){

    
    setupTodoDialog();
    setupProjectDialog();

    addTodoBtn.addEventListener('click',()=>{
        getAddForm();
        // updateTodoForm();
        todoDialog.showModal();
        
    });

    addProjectBtn.addEventListener('click',()=>{
        projectDialog.showModal();  
        getProjectForm();
    });

    dialogs.forEach((dialog) => {
        const closeSvgWrapper = document.createElement('span');
        closeSvgWrapper.className = "close-svg";
        closeSvgWrapper.innerHTML = icons.close;


        // Append all to form
        dialog.appendChild(closeSvgWrapper);
        dialog.addEventListener("click", (event) => {
            // Close dialog if clicked outside of content area
            if (event.target === dialog) {
                dialog.close();
            }
        });
        closeSvgWrapper.addEventListener('click',()=>{
            dialog.close();
        })
    });
    
   
}
function updateTodoForm(){
    todoDialog.innerHTML = ''
    createTodoForm(todoDialog)
}

function setupTodoDialog(){
    todoDialog.innerHTML = ''
    createTodoForm(todoDialog);
}

function setupProjectDialog(){
    projectDialog.innerHTML = ''
    createProjectForm(projectDialog);

}


