// import { allProjects } from "../index";
import { projectFilter } from "../contentFilter";
import { newProject } from "../projects";
import { getProjectCurrentView, setView, setAllView, setProjectView, defaultViews,getCurrentView } from "../statusChecker";
import { displayTodo, setAndRefreshDisplay } from "./todoManager";
import { icons } from "../assets/icons";
import { userTasksStorage, userProjectStorage } from "../storage";

let allProjects = [];

const aside = document.querySelector('#sidebar')
const projectNav = document.createElement('div');
const projectUl = document.createElement('ul')

projectNav.className = 'project-nav';
projectUl.className = 'project-list'



export function displayProjects() {
  allProjects = userProjectStorage.getStorage() ;
  createProjects(allProjects);
  // projectBtns();
  
  
}

function createProjects(items) {
  projectUl.innerHTML = "";

  for (const pj of items) {
    // console.log(pj);
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

export function editProject(){
  const showView = document.querySelector('.edit-con'); 
  const title =document.querySelector('.current-view');
  const titleHolder = title.textContent.trim().toLowerCase();
    showView.addEventListener('click', ()=>{
  
      const projects = userProjectStorage.getStorage();
      const tasks = userTasksStorage.getStorage();
  
       title.contentEditable = "true"
       title.focus();
  
       title.classList.add("editing-project");
  
       
       title.addEventListener("blur", ()=>{
         const newTitle = title.textContent.trim() ;
         if (!newTitle){
          alert("Invalid Input..try again");
          setAndRefreshDisplay(tasks);
  
          return
        } ;
          
         const updatedTitle = newTitle.toLowerCase();
  
         
         const project = projects.find(item => item.name === titleHolder);
         const projectHolder = project.name;
        if (!project || projects.some(item => item.name === updatedTitle)){
          alert("Project name already exist..try again");
          setAndRefreshDisplay(tasks);
          return
        }
        project.name = updatedTitle;
  
        tasks.forEach(item => {
          if (item.project === projectHolder) {
            item.project = updatedTitle;
          }
        });
  
      
        setAllView(updatedTitle)
        userProjectStorage.setStorage(projects);
        setAndRefreshDisplay(tasks);
        displayProjects();
        
        title.contentEditable = "false"
        title.classList.remove("editing-project");
  
  
      });
      title.addEventListener("keydown", (e) => {
        if (e.key === "Enter") title.blur();
      });
          
      })
        
    
  }



export function getProjectForm(){
  allProjects = userProjectStorage.getStorage() ;

  const pf = document.getElementById('projectForm');
  const pd = document.getElementById('projectDialog');


  pf.addEventListener('submit',(e)=>{
    e.preventDefault()

    const formData = new FormData(pf);

    const pName = formData.get('projectFormName').trim();
    
    if (!allProjects.some(project => project.name === pName.toLowerCase()) && pName){
      
      allProjects.push(newProject(pName));
      userProjectStorage.setStorage(allProjects)
    
    }
    else{
      alert(`${pName} already exists....Please try again :)`)
    }
    setAllView(pName);
    renderProjectTodo(pName);
    pf.reset();
    pd.close();
    displayProjects();
    
    
    })

    
}


export function renderProjectTodo(name){
  const data = userTasksStorage.getStorage()
  const pName = name;
  const projectTodos = projectFilter(data,pName);

  setView(pName);
  displayTodo(projectTodos);
  
}

export function deleteProject(){
  const delProjectBtn = document.getElementById('deleteProject');

  if (!defaultViews.includes(getCurrentView())){
    delProjectBtn.classList.remove('hide');

    delProjectBtn.textContent = "Delete Project";
    
   
  
    delProjectBtn.removeEventListener('click', handleDelete )
    delProjectBtn.addEventListener('click', handleDelete )
  }
    // deleteProject();
  
  else{
   delProjectBtn.classList.add('hide');

  }
   
   


  


}

function handleDelete(){
  
  const currProject = getProjectCurrentView().trim().toLowerCase();
    const confirmDelete = confirm(`Are you sure you want to delete the project "${currProject}" and all its associated todos?`);
    if (!confirmDelete) return;

    allProjects = userProjectStorage.getStorage();
    const allTodos = userTasksStorage.getStorage();
    const index = allProjects.findIndex(project => project.name === currProject);
    // console.log(index)
    // console.log(allProjects[index])
    if (index === -1) return alert("Project not found.");

    const updatedList = allTodos.filter(item => item.project !== allProjects[index].name);
    allProjects.splice(index,1)
    setView('tasks')
    userProjectStorage.setStorage(allProjects);
    setAndRefreshDisplay(updatedList);
    displayProjects();
    deleteProject();
}