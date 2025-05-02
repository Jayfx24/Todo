import {getToday } from "./dateUtility";


const allTask = []
const todoItem = function (title,desc,dueDate,priority,projectType){
    const createdAt = getToday();
    const uuid = crypto.randomUUID();
    const status = false;
    const project = projectType ;

    console.table(title,desc,dueDate,priority,status,uuid,createdAt,project);
    return{title,desc,dueDate,priority,status,uuid,createdAt,project};
};

export {allTask, todoItem};