
import { allTask } from "../tasks"
import { todoItem } from "../tasks"
import { displayTodo } from "../todoManager"
import { getCurrentView } from "../statusChecker"
import { filterByView, getAddForm } from "../todoManager"
import { projectType } from "../projectsManager"
import { formFuc,projectForm } from "../mainDOM"

const addTodoBtn = document.getElementById('addTodo')

const addProjectBtn = document.getElementById('addProject')
const todoDialog = document.getElementById('todoDialog')
const projectDialog = document.getElementById('projectDialog')

const todoForm = document.getElementById('todoForm')




export function initBtns(){
    formFuc(todoDialog);
    projectForm(projectDialog);
    addTodoBtn.addEventListener('click',()=>{
        todoDialog.showModal()
        
    });
    getAddForm();
    addProjectBtn.addEventListener('click',()=>{
        projectDialog.showModal()
        
    })


}