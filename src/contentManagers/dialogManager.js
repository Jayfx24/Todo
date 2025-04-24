
import {getAddForm } from "./todoManager"
import { getProjectForm } from "./projectsManager"
import { createTodoForm,createProjectForm } from "../mainDOM"



const addTodoBtn = document.getElementById('addTodo')

const addProjectBtn = document.getElementById('addProject')
const todoDialog = document.getElementById('todoDialog')
const projectDialog = document.getElementById('projectDialog')

const todoForm = document.getElementById('todoForm')





export function initBtns(){
    setupTodoDialog();
    setupProjectDialog();

    addTodoBtn.addEventListener('click',()=>{
        updateTodoForm()
        todoDialog.showModal()
        
        getAddForm();
    });

    addProjectBtn.addEventListener('click',()=>{
        projectDialog.showModal()  
        getProjectForm();
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