import {getToday } from "./dateUtility";

// project type

const allTask = []
const todoForm = document.getElementById('todoForm')

const todoItem = function (title,desc,dueDate,priority,projectType){
    const createdAt = getToday();
    const uuid = crypto.randomUUID();
    const status = false

    console.table(title,desc,dueDate,priority,status,uuid,createdAt,projectType);
    return{title,desc,dueDate,priority,status,uuid,createdAt,projectType};
};




export {allTask}






  

export {todoItem};