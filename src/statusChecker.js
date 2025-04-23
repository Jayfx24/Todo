export let currentView = 'default'


export function setView(view){
    currentView = view;
}

export function getCurrentView(){
    return currentView;
}