let currentView = null;
let currTaskMsg = "ALL TASKS";
let currentProjectView = 'personal';
let currentPeriodText;

export const defaultViews = ['tasks','today','week','upcoming','overdue','personal',null]


export function setView(view){
    currentView = view;
    console.log(`current view - ${currentView}`)

}

export function getCurrentView(){
    
    return currentView;
}



export function setProjectView(view){
    currentProjectView = view;
    console.log(currentProjectView);
    
    
} 

export function getProjectCurrentView(){
    console.log(`current get view - ${currentProjectView}`)
    return currentProjectView;
}


export function setViewText(text){
    currentPeriodText = text;
}

export function getCurrentPeriod(){
    return currentPeriodText;
}



export function setCurrTaskView(text){
    currTaskMsg = text.toUpperCase();
}

export function getCurrentViewMsg(){
    return currTaskMsg;
}

export function setAllView(view){
    currTaskMsg = view.toUpperCase();
    currentView = view;
    currentProjectView = view;


}