import { getToday, getEndOfWeek, getStartOfWeek } from './dateUtility';
import { displayTodo } from './todoManager';

export function todayTask(items){
    const today = getToday()
    const todayArr = items.filter(item => item['dueDate'] === today)
    displayTodo(todayArr)
}

export function weekTask(items){
    const endOfWeekDate = getEndOfWeek();
    const startOfWeekDate = getStartOfWeek();
    const weekArr = items.filter(item => item['dueDate'] <= endOfWeekDate && item['dueDate'] >= startOfWeekDate)
    displayTodo(weekArr)
}

export function upcomingTask(items){
    const endOfWeekDate = getEndOfWeek();
    const upcomingArr = items.filter(item => item['dueDate'] > endOfWeekDate)
    displayTodo(upcomingArr)
}


export function allTodoTasks(items){
    displayTodo(items)
}
