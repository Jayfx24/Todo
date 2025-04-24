import {getToday } from "./dateUtility";


const allTask = []
const todoItem = function (title,desc,dueDate,priority,projectType){
    const createdAt = getToday();
    const uuid = crypto.randomUUID();
    const status = false
    const pt = projectType || 'default'

    console.table(title,desc,dueDate,priority,status,uuid,createdAt,pt);
    return{title,desc,dueDate,priority,status,uuid,createdAt,pt};
};

export {allTask, todoItem};