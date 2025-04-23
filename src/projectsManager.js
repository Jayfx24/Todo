import { it } from "date-fns/locale";
import { testProjectsData } from "./data/testProjects";
import { allProjects } from "./projects";
import { allTask } from "./tasks";
import { projectFilter } from "./contentFilter";


const aside = document.querySelector('#sidebar')
const projectNav = document.createElement('div');
projectNav.className = 'project-nav';
const projectUl = document.createElement('ul')
projectUl.className = 'project-list'
const todoContainer = document.querySelector(".todo-container");
allProjects.push(...testProjectsData);
export function displayProjects() {
  createProjects(allProjects);
}

function createProjects(items) {
  projectUl.innerHTML = "";

  for (const pj of items) {
    console.log(pj);
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = `${pj["projectName"]}`;
    btn.name = `${pj["projectName"].toLowerCase()}`;
    li.className = "project-nav-item";

    li.appendChild(btn);
    projectUl.appendChild(li);

  }
  projectNav.appendChild(projectUl)
  aside.appendChild(projectNav)
}


projectUl.addEventListener('click',(e) =>{
  if (e.target.tagName === 'BUTTON'){

    const pName = e.target.name;
    console.log(pName);
    projectFilter(allTask,pName);
  }
  
  
})