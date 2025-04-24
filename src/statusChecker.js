export let currentView = 'all'


export function setView(view){
    currentView = view;
}

export function getCurrentView(){
    return currentView;
}


let currentProjectView = 'personal'

export function setProjectView(view){
    currentProjectView = view;
    console.log(currentProjectView);


} 

export function getProjectCurrentView(){
    return currentProjectView;
}