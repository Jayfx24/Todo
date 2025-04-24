import { allProjects } from "./projects";

export function createTodoForm(ele) {
  const form = document.createElement("form");
  form.id = "todoForm";

  // Title
  const projectGroup = document.createElement("div");
  projectGroup.className = "form-group";
  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("for", "title");
  projectLabel.textContent = "Title";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.name = "title";
  titleInput.required = true;
  projectGroup.appendChild(projectLabel);
  projectGroup.appendChild(titleInput);

  // Description
  const descGroup = document.createElement("div");
  descGroup.className = "form-group";
  const descLabel = document.createElement("label");
  descLabel.setAttribute("for", "desc");
  descLabel.textContent = "Description";
  const descTextarea = document.createElement("textarea");
  descTextarea.id = "desc";
  descTextarea.name = "desc";
  descTextarea.placeholder = "Enter description here...";
  descTextarea.rows = 8;
  descGroup.appendChild(descLabel);
  descGroup.appendChild(descTextarea);

  
  
  // Due Date
  const dueDateGroup = document.createElement("div");
  dueDateGroup.className = "form-group";
  const dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "dueDate");
  dueDateLabel.textContent = "Due Date";
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.id = "dueDate";
  dueDateInput.name = "dueDate";
  dueDateGroup.appendChild(dueDateLabel);
  dueDateGroup.appendChild(dueDateInput);

  // Project Type (empty container)
  const projectTypeGroup = document.createElement("div");
  projectTypeGroup.className = "form-group project-type";

  const select = document.createElement("select");
  select.name = 'project'

  allProjects.forEach((item) => {
      const option = document.createElement("option");
      const name = item.projectName;
      option.value = name.toLowerCase();;
      option.textContent = name.toUpperCase();

      select.appendChild(option);
  });
    projectTypeGroup.appendChild(select);

  // Priority
  const priorityGroup = document.createElement("div");
  priorityGroup.className = "form-group";
  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "priority");
  priorityLabel.textContent = "Priority";
  const prioritySelect = document.createElement("select");
  prioritySelect.name = "priority";
  prioritySelect.id = "priority";
  prioritySelect.required = true;

  ["low", "medium", "high"].forEach((level) => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
    prioritySelect.appendChild(option);
  });

  priorityGroup.appendChild(priorityLabel);
  priorityGroup.appendChild(prioritySelect);

  // Submit Button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Send";

  // Append all to form
  form.appendChild(projectGroup);
  form.appendChild(projectTypeGroup);
  form.appendChild(descGroup);
  form.appendChild(dueDateGroup);
  form.appendChild(projectTypeGroup);
  form.appendChild(priorityGroup);
  form.appendChild(submitButton);

  
  ele.appendChild(form);
}




export function createProjectForm(ele) {
  const form = document.createElement("form");
  form.id = "projectForm";

  const projectGroup = document.createElement("div");
  projectGroup.className = "form-group";
  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("for", "projectFormName");
  projectLabel.textContent = "Project Name";
  const projectInput = document.createElement("input");
  projectInput.type = "text";
  projectInput.id = "projectFormName";
  projectInput.name = "projectFormName";
  projectInput.required = true;
  projectGroup.appendChild(projectLabel);
  projectGroup.appendChild(projectInput);
  
   // Submit Button
   const submitButton = document.createElement("button");
   submitButton.type = "submit";
   submitButton.textContent = "Create new project :)";

  form.appendChild(projectGroup);
  form.appendChild(submitButton);
  ele.appendChild(form);

  

}