import {getToday } from "./dateUtility";

// project type

const allTask = []
const todoForm = document.getElementById('todoForm')

const todoItem = function (title,desc,dueDate,priority,projectType = 'default'){
    const createdAt = getToday();
    const uuid = crypto.randomUUID();
    const status = false

    console.table(title,desc,dueDate,priority,status,uuid,createdAt,projectType);
    return{title,desc,dueDate,priority,status,uuid,createdAt,projectType};
};


let formData;
todoForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    formData = new FormData(todoForm);

    let title = formData.get('title');
    let desc = formData.get('desc');
    let dueDate = formData.get('dueDate');
    let priority = formData.get('priority');
    
    
    allTask.push(todoItem(title,desc,dueDate,priority))
    console.table(allTask);
})








const testTodos = [
    todoItem("Buy groceries", "Get milk, eggs, and bread", "2025-04-21", "High"),
    todoItem("Finish project", "Complete the Odin Project assignment", "2025-04-30", "High"),
    todoItem("Read book", "Read 30 pages of 'Atomic Habits'", "2025-04-22", "Medium"),
    todoItem("Call mom", "Weekly check-in call", "2025-04-19", "Low", "Family"),
    todoItem("Workout", "Gym session: chest and triceps", "2025-04-29", "Medium", )
  ];
  

export {testTodos};