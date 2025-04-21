import { getToday } from "./dateUtility";

const projectForm = document.getElementById('projectForm')
const allProjects = []

const newProject = function(projectName){
    const createdAt = getToday();
    const uuid = crypto.randomUUID();

    return{projectName,createdAt,uuid}
}


projectForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const formData = new FormData(projectForm)

    const projectName = formData.get('projectName');

    allProjects.push(newProject(projectName));
    console.log(allProjects)
    
})



