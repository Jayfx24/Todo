import { compareAsc, format } from "date-fns";

// project type

const allTask = []
const todoForm = document.getElementById('todoForm')

const todoItem = function (title,desc,dueDate,priority,projectType = 'default'){
    const date = new Date();
    const createdAt = format(date, 'yyyy-MM-dd HH:mm:ss');
    
    const uuid = crypto.randomUUID();
    const status = false

    console.table(title,desc,dueDate,priority,status,uuid,createdAt,projectType);
    return{title,desc,dueDate,priority,status,uuid,createdAt,projectType};
};

function getFormData(){
    let formData;
    todoForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        formData = new FormData(todoForm);
    
        let title = formData.get('title');
        let desc = formData.get('desc');
        let dueDate = formData.get('dueDate');
        let priority = formData.get('priority');
       
        
        allTask.push(todoItem(title,desc,dueDate,priority))
        console.table(allTask);
    })

}

function formInit(){
    getFormData()
}




const testTodos = [
    todoItem("Buy groceries", "Get milk, eggs, and bread", "2025-04-18", "High"),
    todoItem("Finish project", "Complete the Odin Project assignment", "2025-04-18", "High"),
    todoItem("Read book", "Read 30 pages of 'Atomic Habits'", "2025-04-22", "Medium"),
    todoItem("Call mom", "Weekly check-in call", "2025-04-19", "Low", "Family"),
    todoItem("Workout", "Gym session: chest and triceps", "2025-04-20", "Medium", )
  ];
  

export default formInit;
export {testTodos};