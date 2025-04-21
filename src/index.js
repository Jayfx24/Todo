import './style.css'
import {testTodos} from './tasks'
import projectInit from './projects';
import {displayTasks} from './displayAll';
import { todayTask,weekTask, upcomingTask, allTasks } from './taskfilter';

const todoContainer = document.querySelector('.todo-container')
const sideNavBtns = document.querySelector('.sidebar-nav')

todoContainer.classList.add('todo-items')
    
sideNavBtns.addEventListener('click',(e)=>{
    switch (e.target.id){
        case 'tasks':
            allTasks(testTodos);
            break;
        
        case 'today':
            todayTask(testTodos);
            break;
        case 'week':
            weekTask(testTodos);
            break;
        
        case 'upcoming':
            upcomingTask(testTodos);
            break;
                                

    }
})