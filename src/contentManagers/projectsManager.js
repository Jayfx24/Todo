import { testProjectsData } from "../data/testProjects";
import { allProjects } from "../projects";
import { allTask } from "../todos";
import { projectFilter } from "../contentFilter";
import { newProject } from "../projects";
import { setProjectView, setView } from "../statusChecker";
import { displayTodo } from "./todoManager";


const aside = document.querySelector('#sidebar')
const projectNav = document.createElement('div');
const projectUl = document.createElement('ul')

projectNav.className = 'project-nav';
projectUl.className = 'project-list'

allProjects.push(...testProjectsData);


export function displayProjects() {
  createProjects(allProjects);
  projectBtns();
}

function createProjects(items) {
  projectUl.innerHTML = "";

  for (const pj of items) {
    console.log(pj);
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = `${pj["name"].toUpperCase()}`;
    btn.name = `${pj["name"].toLowerCase()}`;
    btn.id = pj['name'].toLowerCase();
    btn.className = 'project-nav-btn';
    li.className = "project-nav-item";

    li.appendChild(btn);
    projectUl.appendChild(li);

  }
  projectNav.appendChild(projectUl)
  aside.appendChild(projectNav)
}

function projectBtns() {
  const projectUl = document.querySelector('.project-list');

  // projectNav.appendChild(projectUl);
  projectUl.addEventListener('click',(e) =>{
    if (e.target.tagName === 'BUTTON'){

      const pName = e.target.name;
      setProjectView(pName);
      setView(pName);
      const projectTodos = projectFilter(allTask,pName);
      displayTodo(projectTodos);
    }
    
    
  })
}

export function getProjectForm(){
  console.log('here')

  const pf = document.getElementById('projectForm')
  const pd = document.getElementById('projectDialog')

  pf.addEventListener('submit',(e)=>{
    e.preventDefault()

    const formData = new FormData(pf)

    const pName = formData.get('projectFormName')

    allProjects.push(newProject(pName));
    
    displayProjects()

    pf.reset()
    pd.close()
    })

    
}