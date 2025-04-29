import { testProjectsData } from "../data/testProjects";
import { allProjects } from "../projects";
import { allTask } from "../todos";
import { projectFilter } from "../contentFilter";
import { newProject } from "../projects";
import { setProjectView } from "../statusChecker";


const aside = document.querySelector('#sidebar')
const projectNav = document.createElement('div');
const projectUl = document.createElement('ul')

projectNav.className = 'project-nav';
projectUl.className = 'project-list'

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
    btn.textContent = `${pj["name"].toUpperCase()}`;
    btn.name = `${pj["name"].toLowerCase()}`;
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
    setProjectView(pName);
    projectFilter(allTask,pName);
  }
  
  
})

export function getProjectForm(){
  console.log('here')

  const pf = document.getElementById('projectForm')
  const pd = document.getElementById('projectDialog')

  pf.addEventListener('submit',(e)=>{
    e.preventDefault()

    const formData = new FormData(pf)

    const pName = formData.get('projectFormName')

    allProjects.push(newProject(pName));
    // console.log(allProjects)
    displayProjects()

    pf.reset()
    pd.close()
    })

    
}