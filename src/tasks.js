import { compareAsc, format } from "date-fns";

const allTask = []

const todoItem = function (title,description = null,dueDate,priority = 'Low',completed= false,projectType = 'default'){
    const date = new Date()
    const uuid = crypto.randomUUID()
    const getCreatedDate = function (){
        return format(date, 'yyyy-MM-dd HH:mm:ss')
    }
    return{title,description,dueDate,priority,completed,uuid,getCreatedDate};
};



export default todoItem;