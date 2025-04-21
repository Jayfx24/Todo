import './style.css'
import {testTodos} from '/data/testTodos'
import { displayProjects } from './projectsManager';
import { todayTask,weekTask, upcomingTask, allTasks } from './taskfilter';
import { allTask } from './tasks';

const todoContainer = document.querySelector('.todo-container')
const sideNavBtns = document.querySelector('.sidebar-nav')
allTask.push(...testTodos)

todoContainer.classList.add('todo-items')
    
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
})
displayProjects()