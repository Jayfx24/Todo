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


export {allTask}






  

export {todoItem};