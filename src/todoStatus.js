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
    


}



