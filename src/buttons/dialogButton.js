
import { allTask } from "../tasks"
import { todoItem } from "../tasks"
import { displayTodo } from "../todoManager"
import { getCurrentView } from "../statusChecker"
import { filterByView, getAddForm } from "../todoManager"
import { projectType } from "../projectsManager"
import { formFuc } from "../mainDOM"

const addTodoBtn = document.getElementById('addTodo')

const projectDialog = document.getElementById('projectDialog')
const todoForm = document.getElementById('todoForm')




export function initBtns(){
    formFuc(todoDialog)
    addTodoBtn.addEventListener('click',()=>{
        // projectType()
        todoDialog.showModal()
        
    })
    getAddForm()


}