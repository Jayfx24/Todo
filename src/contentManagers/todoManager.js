  // import { allUserTask } from "../todos";
  import { testTodos } from "../data/testTodos";
  import { filterByView, projectFilter } from "../contentFilter";
  import { todoItem } from "../todos";
  import {
    getCurrentView,
    getCurrentPeriod,
    getProjectCurrentView,
    getCurrentViewMsg
  } from "../statusChecker";
  import { getToday, dueDays, formattedDate } from "../dateUtility";
  import { icons } from "../assets/icons";
  import { userTasksStorage } from "../storage";

  const allUserTask = userTasksStorage.getStorage();

  // ENSURE TO CLOSE SUBDIV IF CLICK OUTSIDE
  const todoDialog = document.getElementById("todoDialog");
  const todoContainer = document.querySelector(".todo-container");
  const aside = document.querySelector("#sidebar");
  const sidebarNav = document.createElement("ul");
  const todoDiv = document.createElement("div");
  const completedDiv = document.createElement("div");
  const todoDivText = document.createElement("h2");
  const completedDivText = document.createElement("h2");
  const todoNav = document.createElement("div");
  const showCurr = document.querySelector('.show-view')
  const showCurrText = document.createElement('p')
  let isUpdatingForm = false;


  todoDiv.className = "todo-div"
  completedDiv.className = "completed-div";
  completedDivText.className = "completed-text";
  todoDivText.className = "todo-text";
  sidebarNav.classList.add("sidebar-nav");
  todoNav.classList.add("todo-nav");

  todoDivText.textContent = "Active";
  completedDivText.textContent = 'Completed'

  // allUserTask.push(...testTodos);


  export function displayTodo(items) {
    const currView = getCurrentView()
    const completed = items.filter((item) => item.status);
    const uncompleted = items.filter((item) => !item.status);

    todoDiv.innerHTML = '';
    completedDiv.innerHTML = '';
  

    if (uncompleted.length === 0) {
      const noTaskContainer = showNoTask();
      // console.log(noTaskContainer)
      todoDiv.appendChild(noTaskContainer);
      // showNoTask();
    }
    else{
      todoDiv.appendChild(todoDivText);
      createTodoDOM(uncompleted, todoDiv);
    }

    
    if (completed.length > 0) {
      completedDiv.classList.add('show')
      completedDiv.classList.add('scroll')
      todoDiv.classList.add('scroll')
      completedDiv.classList.remove('hide')
      completedDiv.appendChild(completedDivText)
      createTodoDOM(completed, completedDiv);
    }
    else{
      completedDiv.classList.add('hide')
      completedDiv.classList.remove('show')

    }
    
    
    todoContainer.appendChild(todoDiv);
    todoContainer.appendChild(completedDiv);

    if (currView !== 'overdue'){
      // console.log(currView);
      todoContainer.appendChild(completedDiv);
    }
    else{
      if (currView === 'overdue' && todoContainer.contains(completedDiv)) {
        todoContainer.removeChild(completedDiv);
      }

    }

    handleStatusChange(items);
    displayCurrentView();
    deleteTodoItem();
  }

  function showNoTask() {
    // todoDiv.innerHTML = "";
    const div = document.querySelector('.todo-div'); // Or use #your-div-id for an ID
  if (div) {
    console.log("The div exists!");
  } else {
    console.log("The div does not exist.");
  }

    const container = document.createElement("div");
    const p = document.createElement("p");
    // console.log('clearing')

    const view = getCurrentPeriod();

    p.textContent = view || 'default';
    container.appendChild(p);
    return container;
  }
  function createTodoDOM(items, parent) {
    // parent.innerHTML = "";

    for (const todo of items) {
      const todoWrapper = document.createElement("div");
      const todoMainDiv = document.createElement("div");
      const subDiv = document.createElement('div');
      const subContent = document.createElement('div');
      const checkboxDiv = document.createElement('div')
      const title = document.createElement("p");
      const desc = document.createElement("p");
      const dueDate = document.createElement("p");
      const createdAt = document.createElement("p");
      const projectType = document.createElement("p");
    
      const checkboxInput = document.createElement("input");
      const subTask = document.createElement('button');
      const editSpan = document.createElement("span");
      const overdue = document.createElement('p');
      const deleteSvgWrapper = document.createElement('span');
      const deleteSvg = document.createElement('span');
      const deleteHoverSvg = document.createElement('span');
      const options = document.createElement('span')
      const completeSvgWrapper = document.createElement('span')
      // classes

      todoWrapper.classList.add("todo-wrap");
      todoMainDiv.classList.add("todo-main");
      options.classList.add('todo-options')
      subDiv.className = 'hide';
      subContent.classList.add('sub-con');
      // subTask.classList.add('hide');
      checkboxDiv.classList.add("checkbox-wrapper");
      desc.classList.add('desc');
      createdAt.classList.add('created-at');
      projectType.classList.add('project-type');
      completeSvgWrapper.classList.add('complete-svg');
      checkboxInput.classList.add("checkbox-input");
      editSpan.classList.add("edit");
      deleteSvgWrapper.classList.add('delete-wrapper');
      deleteSvg.classList.add('delete-todo');
      deleteHoverSvg.classList.add('delete-hover');

      title.className = 'title'
      dueDate.className = 'due-date'
      // IDs
      subTask.id = 'subDivBtn'; 
      // TextContents
      title.textContent = todo["title"];
      desc.textContent = todo["desc"];
      dueDate.textContent = todo["dueDate"];
      createdAt.textContent = todo["createdAt"];
      projectType.textContent = todo["project"].toUpperCase();
      subTask.textContent = "Details";
    
      editSpan.innerHTML = icons.edit;
      
      
      // Attributes
      
      completeSvgWrapper.setAttribute("data-id", todo.uuid);
      editSpan.setAttribute("data-id", todo.uuid);
      deleteSvgWrapper.dataset.id = todo.uuid;
      
      // innerHTML
      completeSvgWrapper.innerHTML = todo.status ? icons.completed:icons.complete;
      deleteSvg.innerHTML = icons.delete;
      deleteHoverSvg.innerHTML = icons.deleteHover;

      

    

      // event listeners
      subTask.addEventListener('click',()=>{
        subDiv.classList.toggle('sub-div');
        subDiv.classList.toggle('hide');
        

      })

      editSpan.addEventListener("click", (e) => {

        const wrapper = e.target.closest('[data-id]');
        if (!wrapper) return;
        const id = wrapper.dataset.id
        
        populateForm(id);
        getAddForm();
        isUpdatingForm = false;
        todo.showSubDiv = false;
        console.log(todo)
        

      });

      // overdue
    
      if (todo.dueDate < getToday()){
        // console.log('Due date:', todo);
        overdue.textContent = `Overdue: ${dueDays(todo.dueDate)}`
        overdue.classList.add('overdueTasks')
        // console.log(dueDate.textContent)

      }
      else{
        overdue.classList.add('hide');
        // console.log(dueDate.textContent)
      }


      
      deleteSvgWrapper.appendChild(deleteSvg);
      deleteSvgWrapper.appendChild(deleteHoverSvg);
      
      todoMainDiv.appendChild(completeSvgWrapper);
      options.appendChild(editSpan);
      options.appendChild(deleteSvgWrapper);
    
      todoMainDiv.appendChild(title);
      todoMainDiv.appendChild(dueDate);
      todoMainDiv.appendChild(subTask);
      
      subContent.appendChild(createdAt);
      subContent.appendChild(projectType);
      subContent.appendChild(overdue);
      subContent.appendChild(options);
      subDiv.appendChild(desc);
      subDiv.appendChild(subContent)
      todoWrapper.appendChild(todoMainDiv);
      todoWrapper.appendChild(subDiv);
      parent.appendChild(todoWrapper);
      
    }
  }



  export function getAddForm() {
    const todoForm = document.getElementById("todoForm");

    if (!isUpdatingForm){
      todoForm.reset();
    }
    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const id = todoForm.elements["uuid"].value;
      const formData = new FormData(todoForm);
      let title = formData.get("title");
      let desc = formData.get("desc");
      let dueDate = formData.get("dueDate");
      let priority = formData.get("priority");
      let project = formData.get("project");

      if (id ) {
        const index = allUserTask.findIndex((item) => item.uuid === id);
        
        allUserTask[index].showSubDiv = true;
      

        if (title && desc && dueDate && priority && project) {
          // console.log(allUserTask[index]);

          allUserTask[index] = {
            ...allUserTask[index],
            title,
            desc,
            dueDate,
            priority,
            project,
          };
          // console.table(allUserTask[index]);
        } else {
          return;
        }
      } 
      else {
        const newItem = todoItem(title, desc, dueDate, priority, project);
        allUserTask.push(newItem);
      }
      
      refreshDisplay()
    
      todoForm.reset();
      todoDialog.close();
    });
    
  }

  function handleStatusChange(items) {
    const checkboxes = document.querySelectorAll(".complete-svg");
    

    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        const wrapper = e.target.closest('[data-id]');
        if (!wrapper) return;

        const id = wrapper.dataset.id
        // checkbox.innerHTML = '';
        updateStatus(id, items);
      });
    });
  }

  function updateStatus(id, items) {
    const taskToUpdate = items.find((item) => item.uuid === id);

    if (taskToUpdate) {
      taskToUpdate.status = !taskToUpdate.status;
      displayTodo(items);
    }
  }


  export function deleteTodoItem(){
    const deleteIcons = document.querySelectorAll('.delete-wrapper');
    deleteIcons.forEach(item =>{
      item.addEventListener('click', (e)=>{

        const wrapper = e.target.closest('[data-id]');
        const id = wrapper.dataset.id;
        const index = allUserTask.findIndex(task => task.uuid === id);
        if (index !== -1) {
          allUserTask.splice(index, 1); 
        }
      

        refreshDisplay();
      })
    })

  }
  export function populateForm(id) {
    if (id){
      const todoData = allUserTask.find((item) => item["uuid"] === id);
      const todoForm = document.getElementById("todoForm");
      
    
      todoForm.elements["title"].value = todoData["title"];
      todoForm.elements["desc"].value = todoData["desc"];
      todoForm.elements["dueDate"].value = todoData["dueDate"];
      todoForm.elements["project"].value = todoData["project"];
      todoForm.elements["priority"].value = todoData["priority"].toLowerCase();
      todoForm.elements["uuid"].value = id;
    
      isUpdatingForm = true;
      todoDialog.showModal();
    }
  }

  export function displayTodoNav() {
    const buttons = [
      { id: "tasks", text: "Tasks" },
      { id: "today", text: "Today" },
      { id: "week", text: "This Week" },
      // { id: "allUserTask", text: "All Tasks" },
      { id: "upcoming", text: "Upcoming" },
      { id: "overdue", text: "Overdue" },
    ];

    buttons.forEach((button) => {
      const li = document.createElement("li");
      const svgWrapper = document.createElement('span');
      const textWrapper = document.createElement('span');
      const btn = document.createElement("button");
      li.classList.add("sidebar_item");
      
      svgWrapper.classList.add("btn-wrapper");
      btn.classList.add("sidebar_button");
      btn.id = button.id;
      svgWrapper.innerHTML = `${icons[button.id]}`;
      textWrapper.innerHTML = `${button.text.toUpperCase()}`;

      btn.appendChild(svgWrapper)
      btn.appendChild(textWrapper)
      li.appendChild(btn);
      sidebarNav.appendChild(li);

      todoNav.appendChild(sidebarNav);

      aside.appendChild(todoNav);

    });
    sidebarNav.addEventListener("click", (e) => {

      const button = e.target.closest("button");
      if (!button) return; 

      let targetId = button.id;
      const filtered = filterByView(targetId, allUserTask);
      displayTodo(filtered);
    });
  }

  function displayCurrentView(){

    const currView = getCurrentViewMsg();
    // console.log(`dialog ${currView}`)

    showCurr.innerHTML = `${icons.view}<span>${currView}</span>`;
    showCurr.className = "show-view";
  

  
    
  }

  function refreshDisplay(){
    userTasksStorage.setStorage(allUserTask);

    const view = getCurrentView();
    const list = filterByView(view, allUserTask);
      // console.log(`passed view - ${view}`);
      displayTodo(list);
  } 

