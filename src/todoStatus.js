
export function handleStatusChange(items) {
  const checkboxes = document.querySelectorAll(".checkbox");
  
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const status = checkbox.checked;
      const id = checkbox.getAttribute("data-id");      
      updateStatus(id, status, items);
    });
    return items;
  });
}

function updateStatus(id, status, items) {
  const taskToUpdate = items.find((item) => item.uuid === id);
  console.log(taskToUpdate)
  if (taskToUpdate) {
    taskToUpdate.status = status;
    return items;
}

}
