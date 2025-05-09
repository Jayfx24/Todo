import {getToday } from "./dateUtility";
import { userStorage } from "./storage";

const allTask = []
const todoItem = function (title,desc,dueDate,priority,projectType){
    const createdAt = getToday();
    const uuid = crypto.randomUUID();
    const project = projectType ;
    const status = false;
    const showSubDiv = false;

    console.table(title,desc,dueDate,priority,status,uuid,createdAt,project);
    return{title,desc,dueDate,priority,status,uuid,createdAt,project,showSubDiv};
};

export {allTask, todoItem};