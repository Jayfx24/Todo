import { format, endOfWeek } from "date-fns";
import { testTodos } from "./tasks";


const todoContainer = document.querySelector('.todo-container')
const tasksBtn = document.getElementById('tasks')
const todayBtn = document.getElementById('today')
const weekBtn = document.getElementById('week')
const upcomingBtn = document.getElementById('upcoming')

const getToday = () => new Date();
const getEndOfWeek = () => endOfWeek(new Date(), { weekStartsOn: 1 });
const formatDate = (date) => format(date, 'yyyy-MM-dd');

function displayTasks(items){

    const todoItems = document.querySelector('.todo-items')
    todoItems.innerHTML= ''

    for(const todo of items){
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

function todayTask(items){
    const today = getToday()
    const formattedToday = formatDate(today)
    const todayArr = items.filter(item => item['dueDate'] === formattedToday)
    displayTasks(todayArr)
}

function weekTask(items){
    const endOfWeekDate = getEndOfWeek();
    const formattedEndOfWeek = formatDate(endOfWeekDate)
    const weekArr = items.filter(item => item['dueDate'] <= formattedEndOfWeek)
    displayTasks(weekArr)
}

function upcomingTask(items){
    const endOfWeekDate = endOfWeek(getToday(), { weekStartsOn: 1 });
    const formattedEndOfWeek = formatDate(endOfWeekDate)
    const upcomingArr = items.filter(item => item['dueDate'] > formattedEndOfWeek)
    displayTasks(upcomingArr)
}

function displayAllInit() {
    todoContainer.classList.add('todo-items')
    tasksBtn.addEventListener('click',()=>{
        displayTasks(testTodos);
    })

    todayBtn.addEventListener('click',()=>{
        
        todayTask(testTodos);
    })

    weekBtn.addEventListener('click',()=>{
        
        weekTask(testTodos);
    })
    upcomingBtn.addEventListener('click',()=>{
        
        upcomingTask(testTodos);
    })
}

export default displayAllInit