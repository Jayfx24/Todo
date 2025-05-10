// import { initBtns } from "../contentManagers/dialogManager";

// export function navigationBtns() {
//     const btnContainer = document.querySelector('.btns');
    
//     const deleteBtn = document.createElement('button');
//     deleteBtn.id = 'deleteProject';
//     deleteBtn.type = 'button';
//     deleteBtn.textContent = 'Delete Project';
    
//     const editBtn = document.createElement('button');
//     editBtn.id = 'editProject';
//     editBtn.type = 'button';
//     editBtn.textContent = 'Edit Project';
    
//     const addProjectBtn = document.createElement('button');
//     addProjectBtn.id = 'addProject';
//     addProjectBtn.type = 'button';
//     addProjectBtn.textContent = 'Add New Project';
    
//     const addTodoBtn = document.createElement('button');
//     addTodoBtn.id = 'addTodo';
//     addTodoBtn.type = 'button';
//     addTodoBtn.textContent = 'Add todo';
    
    
//     btnContainer.appendChild(deleteBtn);
//     btnContainer.appendChild(editBtn);
//     btnContainer.appendChild(addProjectBtn);
//     btnContainer.appendChild(addTodoBtn);
//     initBtns();
// }

// function projectNavBtn(){
//     const editProjectBtn = document.getElementById('editProject')
//     const delProjectBtn = document.getElementById('deleteProject')
//     const todoViews = ["tasks", "today", "week", "upcoming", "overdue"];
//     const view = getCurrentView();
  
//     editProjectBtn.textContent = "Edit Project";
//     delProjectBtn.textContent = "Delete Project";
//     console.log(view)
  
//     const shouldShow = todoViews.includes(view)|| !view;
//     editProjectBtn.classList.toggle('show', !shouldShow);
//     delProjectBtn.classList.toggle('show', !shouldShow);
//   }