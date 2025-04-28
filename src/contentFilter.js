import { getToday, getEndOfWeek, getStartOfWeek } from './dateUtility';
import { displayTodo } from './contentManagers/todoManager';
import { setView,setViewText } from './statusChecker';
import { allTask } from './todos';


const day = 'No Task for the day';
const week = 'No Task for this week';
const upcomingT = 'No Task planned';
const overdueT = 'No Task missed, Good Job';
const NoTask = 'No task click on the add todo button to add one'



export function todayTask(items){
    const today = getToday();
    const todayArr = items.filter(item => item['dueDate'] === today);
    displayTodo(todayArr)
}

export function weekTask(items){
    const endOfWeekDate = getEndOfWeek();
    const startOfWeekDate = getStartOfWeek();
    const weekArr = items.filter(item => item['dueDate'] <= endOfWeekDate && item['dueDate'] >= startOfWeekDate);
    displayTodo(weekArr)
}

export function upcomingTask(items){
    const endOfWeekDate = getEndOfWeek();
    const upcomingArr = items.filter(item => item['dueDate'] > endOfWeekDate);
    displayTodo(upcomingArr);
}

export function overdueTasks(items){
    const today = getToday();
    const overdueArr = items.filter(item => item['status'] === false && item['dueDate'] < today);
    displayTodo(overdueArr)
}

export function allTodoTasks(items){
    displayTodo(items)
    console.log('working')
}


export function projectFilter(items,name){
    const projectTodos = items.filter(item => item['pt'] === name);
    displayTodo(projectTodos)

}
export function filterByView(targetId){
    switch (targetId){
        
        case 'today':
            setView('today');
            setViewText(day);
            todayTask(allTask);
            break;
        case 'week':
            setView('week');
            setViewText(week);
            weekTask(allTask);
            break;
        
        case 'upcoming':
            setView('upcoming');
            setViewText(upcomingT);
            upcomingTask(allTask);
            break;

        case 'overdue':
            setView('overdue')
            setViewText(overdueT);
            overdueTasks(allTask);
            break;
                                     
        default:
            allTodoTasks(allTask);
            setViewText(NoTask);
            break;

    }
}