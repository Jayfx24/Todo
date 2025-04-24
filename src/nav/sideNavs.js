
import { allTask } from '../todos';
import {testTodos} from '../data/testTodos'
import { filterByView} from '../contentFilter';



allTask.push(...testTodos)

const aside = document.querySelector('#sidebar')


export function initSideNav (){

    const todoNav = document.createElement('div');
    todoNav.classList.add('todo-nav');
    
    const sidebarNav = document.createElement('ul');
    sidebarNav.classList.add('sidebar-nav');
    
    const buttons = [
      { id: 'tasks', text: 'Tasks' },
      { id: 'today', text: 'Today' },
      { id: 'week', text: 'This Week' },
      { id: 'allTask', text: 'All Tasks' },
      { id: 'upcoming', text: 'Upcoming' },
      { id: 'overdue', text: 'Overdue' },
    ];
    
    buttons.forEach(button => {
      const li = document.createElement('li');
      li.classList.add('sidebar_item');
    
      const btn = document.createElement('button');
      btn.classList.add('sidebar_button');
      btn.id = button.id;  
      btn.textContent = button.text;  

      li.appendChild(btn);  
      sidebarNav.appendChild(li); 
    
    todoNav.appendChild(sidebarNav);
    
    aside.appendChild(todoNav);

    sidebarNav.addEventListener('click',(e)=>{
        let targetId = e.target.id;
        filterByView(targetId)
   
})
})
}