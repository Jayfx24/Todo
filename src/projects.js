import { getToday } from "./dateUtility";
const allProjects = []

const newProject = function(projectName){
    const createdAt = getToday();
    const uuid = crypto.randomUUID();
    const name = projectName.toLowerCase()
    return{name,createdAt,uuid}
}


export {newProject}

