
import { todayTask,weekTask, upcomingTask, allTasks } from '../taskfilter';
import { allTask } from '../tasks';
import {testTodos} from '../data/testTodos'


const sideNavBtns = document.querySelector('.sidebar-nav')
allTask.push(...testTodos)


export function sideNavInit(){
    sideNavBtns.addEventListener('click',(e)=>{
    switch (e.target.id){
        case 'tasks':
            allTasks(allTask);
            break;
        
        case 'today':
            todayTask(allTask);
            break;
        case 'week':
            weekTask(allTask);
            break;
        
        case 'upcoming':
            upcomingTask(allTask);
            break;
                                

    }
})}