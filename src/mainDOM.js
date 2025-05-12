
import { getProjectCurrentView, getCurrentViewMsg, getCurrentView,setCurrTaskView, setProjectView, setView } from "./statusChecker";
import { userProjectStorage, userTasksStorage } from "./storage";
import { icons } from "./assets/icons";
import { initSideNav } from "./nav/sideNavs";
import { displayProjects } from "./contentManagers/projectsManager";
import { setAndRefreshDisplay} from "./contentManagers/todoManager";

const elements = {
  showCurrentView: document.querySelector(".show-view"),

}


export function createTodoForm(ele) {
  const form = document.createElement("form");
  form.id = "todoForm";

  // Title
  const projectGroup = document.createElement("div");
  projectGroup.className = "form-group";
  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("for", "title");
  projectLabel.textContent = "Title";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.name = "title";
  titleInput.required = true;
  projectGroup.appendChild(projectLabel);
  projectGroup.appendChild(titleInput);

  // Description
  const descGroup = document.createElement("div");
  descGroup.className = "form-group";
  const descLabel = document.createElement("label");
  descLabel.setAttribute("for", "desc");
  descLabel.textContent = "Description";
  const descTextarea = document.createElement("textarea");
  descTextarea.id = "desc";
  descTextarea.name = "desc";
  descTextarea.placeholder = "Enter description here...";
  descTextarea.rows = 8;
  descGroup.appendChild(descLabel);
  descGroup.appendChild(descTextarea);

  
  
  // Due Date
  const dueDateGroup = document.createElement("div");
  const dueDateLabel = document.createElement("label");
  const dueDateInput = document.createElement("input");
  dueDateGroup.className = "form-group";
  dueDateLabel.setAttribute("for", "dueDate");
  dueDateLabel.textContent = "Due Date";
  dueDateInput.type = "date";
  dueDateInput.id = "dueDate";
  dueDateInput.name = "dueDate";
  dueDateInput.required = true;
  dueDateGroup.appendChild(dueDateLabel);
  dueDateGroup.appendChild(dueDateInput);

  // Project Type (empty container)
  const projectTypeGroup = document.createElement("div");
  projectTypeGroup.className = "form-group project-type";

  const select = document.createElement("select");
  select.name = 'project'

  const updatedArr = currPView()
  console.log(updatedArr)
  console.log('updatedArr')
  updatedArr.forEach((item) => {
      const option = document.createElement("option");
      const name = item.name;
      option.value = name;
      option.textContent = name.toUpperCase();

      select.appendChild(option);
  });
    projectTypeGroup.appendChild(select);

  // Priority
  const priorityGroup = document.createElement("div");
  priorityGroup.className = "form-group";
  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "priority");
  priorityLabel.textContent = "Priority";
  const prioritySelect = document.createElement("select");
  prioritySelect.name = "priority";
  prioritySelect.id = "priority";
  prioritySelect.required = true;

  ["low", "medium", "high"].forEach((level) => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
    // option.textContent = level;
    prioritySelect.appendChild(option);
  });

  priorityGroup.appendChild(priorityLabel);
  priorityGroup.appendChild(prioritySelect);

  

  const uuid  = document.createElement('input');
  uuid.setAttribute('type','hidden');
  uuid.setAttribute('name','uuid');
  uuid.setAttribute('id','uuid');

  // Submit Button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Send";
  submitButton.id = 'todoFormBtn'


  // close
  // const closeSvgWrapper = document.createElement('span');
  // closeSvgWrapper.className = "close-svg";
  // closeSvgWrapper.innerHTML = icons.close;


  // // Append all to form
  // form.appendChild(closeSvgWrapper);
  form.appendChild(projectGroup);
  form.appendChild(projectTypeGroup);
  form.appendChild(descGroup);
  form.appendChild(dueDateGroup);
  form.appendChild(projectTypeGroup);
  form.appendChild(priorityGroup);
  form.appendChild(uuid);
  form.appendChild(submitButton);

  
  ele.appendChild(form);
}




export function createProjectForm(ele) {
  const form = document.createElement("form");
  form.id = "projectForm";

  const projectGroup = document.createElement("div");
  projectGroup.className = "form-group";
  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("for", "projectFormName");
  projectLabel.textContent = "Project Name";
  const projectInput = document.createElement("input");
  projectInput.type = "text";
  projectInput.id = "projectFormName";
  projectInput.name = "projectFormName";
  projectInput.required = true;
  projectGroup.appendChild(projectLabel);
  projectGroup.appendChild(projectInput);
  
   // Submit Button
   const submitButton = document.createElement("button");
   submitButton.type = "submit";
   submitButton.textContent = "Create new project :)";
   submitButton.id = 'projectFormBtn'

  form.appendChild(projectGroup);
  form.appendChild(submitButton);
  ele.appendChild(form);

  

}

function currPView(){
  const allProjects = userProjectStorage.getStorage() ;

  const view = getProjectCurrentView().toLowerCase();
  const updatedArr = [allProjects.find(item => item['name'] === view),...allProjects.filter(item => item['name'] != view)];
  console.log(`here - ${view}`)

  console.log(updatedArr)
  return updatedArr;
}

export function displayCurrentView() {
  const currViewMsg = getCurrentViewMsg();
  const currentView = getCurrentView();
  const views = ['tasks','today','week','upcoming','overdue','personal',null]
 
  console.log(currViewMsg)

  if(!views.includes(currentView)){
    elements.showCurrentView.innerHTML = `${icons.view}<span class="edit-con"> <span class="current-view">${currViewMsg}</span><span class="project-edit">${icons.edit}</span></span>`;
    projectListeners();
  }
  else{
    elements.showCurrentView.innerHTML = `${icons.view}<span >${currViewMsg}</span>`;
  }
  elements.showCurrentView.className = "show-view";
}

function projectListeners(){
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
       const newTitle = title.textContent.trim() || "Untitled";
       const updatedTitle = newTitle.toLowerCase();
      
       
       const project = projects.find(item => item.name === titleHolder);
       const projectHolder = project.name;
      if (project){
        project.name = updatedTitle;
      }

      tasks.forEach(item => {
        if (item.project === projectHolder) {
          item.project = updatedTitle;
        }
      });

      // Don't Touch
      setView(updatedTitle)
      setCurrTaskView(updatedTitle);
      setProjectView(updatedTitle);
      userProjectStorage.setStorage(projects);
      setAndRefreshDisplay(tasks);
      displayCurrentView();
      displayProjects()
      
      title.contentEditable = "false"
      title.classList.remove("editing-project");


    });
    title.addEventListener("keydown", (e) => {
      if (e.key === "Enter") title.blur();
    });
        
    })
      
  
}

// function projectListeners(){
//   const title =document.querySelector('.current-view')
//   const projectDialog = document.getElementById('projectDialog');
//    const projectEdit = document.querySelector(".project-edit");
//     projectEdit.addEventListener('click', ()=>{
//        const input = document.createElement('input');
//        const titleText  = title.textContent;
//        input.value = titleText;
//        input.className = 'project-input'
  
//        title.replaceWith(input)
//        input.focus();
  
  
//       input.addEventListener("blur", ()=>{
//         const newTitle = input.value.trim() || "Untitled";
//         const newSpan = document.createElement("span");
//         newSpan.textContent = newTitle;
//         newSpan.className = "current-view";
//         input.replaceWith(newSpan);
  
//         // displayCurrentView();
//       });
//       input.addEventListener("keydown", (e) => {
//         if (e.key === "Enter") input.blur();
//       });
          
//       })
        
    
//   }