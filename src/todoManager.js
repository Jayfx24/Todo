import { allTask } from "./tasks"


export function displayTasks(items){
    
    const todoItems = document.querySelector('.todo-container')
    todoItems.innerHTML= ''

    createTodo(items,todoItems)

}

function createTodo(items,todoItems){
    for(const todo of items){
        const item = document.createElement('div')
        const title = document.createElement('p')
        const desc = document.createElement('p')
        const dueDate = document.createElement('p')

        item.className = 'todo-item'

        title.textContent = todo['title']
        desc.textContent = todo['desc']
        dueDate.textContent = todo['dueDate']


        item.appendChild(title)
        item.appendChild(desc)
        item.appendChild(dueDate)

        todoItems.appendChild(item)
    }
}

