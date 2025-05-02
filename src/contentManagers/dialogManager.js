
import {getAddForm, populateForm } from "./todoManager"
import { getProjectForm } from "./projectsManager"
import { createTodoForm,createProjectForm } from "../mainDOM"
import { getCurrentView } from "../statusChecker"



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
        updateTodoForm();
        todoDialog.showModal();
        
        getAddForm();
    });

    addProjectBtn.addEventListener('click',()=>{
        projectDialog.showModal();  
        getProjectForm();
    });

    dialogs.forEach((dialog) => {
        dialog.addEventListener("click", (event) => {
            // Close dialog if clicked outside of content area
            if (event.target === dialog) {
                dialog.close();
            }
        });
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

// function attachEditListeners() {
//     const edit = document.querySelectorAll('.edit');
//     console.log(edit.length);

//     edit.forEach((btn) => {
//         btn.addEventListener('click', (e) =>{
//            const id =  e.target.dataset.id;
//             populateForm(id);
//         } 

            
//     )});
// }
