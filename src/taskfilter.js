import { getToday, getEndOfWeek, getStartOfWeek } from './dateUtility';
import { displayTasks } from './todoManager';


export function todayTask(items){
    const today = getToday()
    const todayArr = items.filter(item => item['dueDate'] === today)
    displayTasks(todayArr)
}

export function weekTask(items){
    const endOfWeekDate = getEndOfWeek();
    const startOfWeekDate = getStartOfWeek();
    const weekArr = items.filter(item => item['dueDate'] <= endOfWeekDate && item['dueDate'] >= startOfWeekDate)
    displayTasks(weekArr)
}

export function upcomingTask(items){
    const endOfWeekDate = getEndOfWeek();
    console.log(endOfWeekDate)
    const upcomingArr = items.filter(item => item['dueDate'] > endOfWeekDate)
    displayTasks(upcomingArr)
}


export function allTasks(items){
    displayTasks(items)
}
