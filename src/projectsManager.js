import { testProjectsData } from "./data/testProjects";
import { allProjects } from "./projects";

const projectUl = document.querySelector(".project-list");
const todoForm = document.getElementById("todoForm");
allProjects.push(...testProjectsData);
export function displayProjects() {
  createProjects(allProjects);
}

function createProjects(items) {
  projectUl.innerHTML = "";

  for (const pj of items) {
    console.log(pj);
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.textContent = `${pj["projectName"]}`;

    li.className = "project-nav-item";

    li.appendChild(btn);
    projectUl.appendChild(li);
  }
}

