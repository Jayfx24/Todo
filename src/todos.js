import {getToday } from "./dateUtility";

const allTask = []
const todoItem = function (title,desc,dueDate,priority,projectType){
    const createdAt = getToday();
    const uuid = crypto.randomUUID();
    const project = projectType ;
    const status = false;
    const showSubDiv = false;
    const completedAt = null;

    // console.table(title,desc,dueDate,priority,status,uuid,createdAt,project);
    return{title,desc,dueDate,priority,status,uuid,createdAt,project,showSubDiv,completedAt};
};

export {allTask, todoItem};