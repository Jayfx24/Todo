export function handleStatusChange(todos){
    const checkboxes = document.querySelectorAll('.checkbox');

    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            const status = checkbox.checked;
            updateStatus(index , status, todos);
        })
    })


}

function updateStatus(index, status, items){

    items[index].status = status
    console.log(items[index])


}

// export function checkTodoStatus(todos) {
//     const checkBoxes = document.querySelectorAll('.checkbox');
//     checkBoxes.forEach((item) => {
//         item.addEventListener('change', () => {
//             const id = parseInt(item.dataset.id); // Get the id from the checkbox
//             const todo = todos.find(t => t.id === id); // Find the matching object
//             console.log(`Clicked: ${todo.title} | Completed: ${item.checked}`);
//         });
//     });
// }
