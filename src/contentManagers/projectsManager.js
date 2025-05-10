// import { allProjects } from "../index";
import { projectFilter } from "../contentFilter";
import { newProject } from "../projects";
import { setProjectView, setView } from "../statusChecker";
import { displayTodo } from "./todoManager";
import { icons } from "../assets/icons";
import { userTasksStorage, userProjectStorage } from "../storage";
import { getCurrentView } from "../statusChecker";

let allProjects = [];
const aside = document.querySelector('#sidebar')
const projectNav = document.createElement('div');
const projectUl = document.createElement('ul')

projectNav.className = 'project-nav';
projectUl.className = 'project-list'



export function displayProjects() {
  allProjects = userProjectStorage.getStorage() ;
  createProjects(allProjects);
  projectBtns();
}

function createProjects(items) {
  projectUl.innerHTML = "";

  for (const pj of items) {
    console.log(pj);
    const li = document.createElement("li");
    const btn = document.createElement("button");
    const textWrapper = document.createElement("span");
    const svgWrapper = document.createElement("span");

    svgWrapper.innerHTML = `${icons.card}`
    textWrapper.textContent = `${pj["name"].toUpperCase()}`;
    btn.name = `${pj["name"].toLowerCase()}`;
    btn.id = pj['name'].toLowerCase();
    btn.className = 'project-nav-btn';
    li.className = "project-nav-item";

    btn.appendChild(svgWrapper)
    btn.appendChild(textWrapper)
    li.appendChild(btn);
    projectUl.appendChild(li);

  }
  projectNav.appendChild(projectUl)
  aside.appendChild(projectNav)
}

function projectBtns() {
  const projectUl = document.querySelector('.project-list');


  projectUl.addEventListener('click',(e) =>{
    const button = e.target.closest("button");
    if (!button) return; 
    
      const data = userTasksStorage.getStorage()
      const pName = button.name;
      const projectTodos = projectFilter(data,pName);

      setView(pName);
      displayTodo(projectTodos);
     
    }
    
    
  )
}

export function getProjectForm(){
  console.log('here')

  const pf = document.getElementById('projectForm');
  const pd = document.getElementById('projectDialog');


  pf.addEventListener('submit',(e)=>{
    e.preventDefault()

    const formData = new FormData(pf);

    const pName = formData.get('projectFormName');
    if (pName){
      
      allProjects.push(newProject(pName));
      userProjectStorage.setStorage(allProjects)
      console.table(allProjects);
    }
    
    
    pf.reset();
    pd.close();
    displayProjects();
    })

    
}
