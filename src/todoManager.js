import { allTask } from "./tasks"
import { setView } from "./statusChecker"
import { todayTask,weekTask, upcomingTask, allTodoTasks } from './contentFilter';
import { todoItem } from "./tasks";
import { getCurrentView } from "./statusChecker";


const todoItems = document.querySelector('.todo-container')
const todoDialog = document.getElementById('todoDialog')

let formData;

export function displayTodo(items){
    createTodoDOM(items,todoItems)
}

function createTodoDOM(items,todoItems){
    todoItems.innerHTML= ''

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




export function filterByView(targetId){
    switch (targetId){
        
        case 'today':
            setView('today')
            todayTask(allTask);
            break;
        case 'week':
            setView('week')
            weekTask(allTask);
            break;
        
        case 'upcoming':
            setView('upcoming')
            upcomingTask(allTask);
            break;
                                     
        default:
            allTodoTasks(allTask);
            break;

    }
}


export function getAddForm(){
    const todoForm = document.getElementById('todoForm')

    todoForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        formData = new FormData(todoForm);
    
        let title = formData.get('title');
        let desc = formData.get('desc');
        let dueDate = formData.get('dueDate');
        let priority = formData.get('priority');
        let project = formData.get('project');
        
        
        const newItem = todoItem(title,desc,dueDate,priority,project)
        
        allTask.push(newItem)
        const view = getCurrentView()

        filterByView(view)
        todoForm.reset()
        todoDialog.close()
    })

}

