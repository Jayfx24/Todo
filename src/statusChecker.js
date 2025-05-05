export let currentView = null;
let currTaskMsg = "All Tasks";

export function setView(view){
    currentView = view;
    console.log(`current view - ${currentView}`)

}

export function getCurrentView(){
    console.log(`current get view - ${currentView}`)

    return currentView;
}


let currentProjectView = 'personal';

export function setProjectView(view){
    currentProjectView = view;
    console.log(currentProjectView);


} 

export function getProjectCurrentView(){
    return currentProjectView;
}

let currentPeriodText;

export function setViewText(text){
    currentPeriodText = text;
}

export function getCurrentPeriod(){
    return currentPeriodText;
}



export function setCurrTaskView(text){
    currTaskMsg = text;
}

export function getCurrentViewMsg(){
    return currTaskMsg.toUpperCase();
}