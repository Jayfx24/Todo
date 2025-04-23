export let currentView = 'all'


export function setView(view){
    currentView = view;
}

export function getCurrentView(){
    return currentView;
}