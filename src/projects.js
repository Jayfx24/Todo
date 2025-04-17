import { compareAsc, format } from "date-fns";

const projectForm = document.getElementById('projectForm')
const allProjects = []

const newProject = function(projectName){
    const date = new Date();
    const createdAt = format(date, 'yyyy-MM-dd HH:mm:ss');
    const uuid = crypto.randomUUID();

    return{projectName,createdAt,uuid}
}

function getProjectData(){
    projectForm.addEventListener('submit',(e)=>{
        e.preventDefault()
    
        const formData = new FormData(projectForm)
    
        const projectName = formData.get('projectName');
    
        allProjects.push(newProject(projectName));
        console.log(allProjects)
        
    })

}


function projectInit(){
    getProjectData()
}

export default projectInit