import { testTodos } from "./tasks";


const todoContainer = document.querySelector('.todo-container')
const tasks = document.getElementById('tasks')


function displayTasks(allTasks){

    const todoItems = document.querySelector('.todo-items')
    todoItems.innerHTML= ''

    for(const todo of allTasks){
        console.log(todo)
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



function displayAllInit() {
    tasks.addEventListener('click',()=>{
        todoContainer.classList.add('todo-items')
        displayTasks(testTodos)
        console.log('working')
    })
    
}

export default displayAllInit