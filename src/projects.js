import { getToday } from "./dateUtility";
import { displayProjects } from "./contentManagers/projectsManager";
const projectForm = document.getElementById('projectForm');
const allProjects = []

const newProject = function(projectName){
    const createdAt = getToday();
    const uuid = crypto.randomUUID();
    const name = projectName.toLowerCase()
    return{name,createdAt,uuid}
}


// projectUl.addEventListener('click',()=>{

//     // should show/hide projects else show no project, click here to create one
// })

export {newProject,allProjects}

