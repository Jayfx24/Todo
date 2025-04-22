

const addTodoBtn = document.getElementById('addTodo')

const todoDialog = document.getElementById('todoDialog')
const projectDialog = document.getElementById('projectDialog')



export function initBtns(){
    addTodoBtn.addEventListener('click',()=>{
    todoDialog.showModal()
})}
