
import { allTask } from '../tasks';
import {testTodos} from '../data/testTodos'
import { setView } from '../statusChecker';
import { filterByView } from '../todoManager';
const sideNavBtns = document.querySelector('.sidebar-nav')
allTask.push(...testTodos)


export function sideNavInit(){
    sideNavBtns.addEventListener('click',(e)=>{
        let targetId = e.target.id;
        filterByView(targetId)
   
})}


