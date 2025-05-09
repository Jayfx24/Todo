import { getToday, getEndOfWeek, getStartOfWeek } from './dateUtility';
import { setView,setViewText, setCurrTaskView, setProjectView } from './statusChecker';

// const  currProjectView = getProjectCurrentView();
const taskMessages = {
    today: [
      'No tasks for today! Take it easy or plan something ahead.',
      'Looks like today is task-free! Maybe take a break?',
      'No tasks to tackle today, enjoy the moment.',
    ],
    week: [
      'You’re all set for the week—no tasks yet!',
      'No tasks this week, maybe start planning ahead?',
      'Take the week off—there’s nothing on your plate!',
    ],
    upcoming: [
      'No tasks planned, time to add something to look forward to!',
      'The future is wide open, maybe add some tasks to stay on track?',
      'Looks like there’s nothing planned ahead. Let’s fill that up!',
    ],
    overdue: [
      'You missed some tasks. No worries, you’ve got this!',
      'Overdue tasks—time to catch up!',
      'It’s never too late! Let’s finish those overdue tasks!',
    ],
    default: [
      'No tasks available. Click the add button and start tracking your goals.',
      'Looks like you don’t have any tasks yet—add your first one!',
      'Ready to get started? Click on add to start adding tasks!',
    ],
  };

const currentTaskHeading = {
  today: "Today",
  tasks: "All Tasks",
  week: "This Week",
  upcoming: "This Month",
  overdue: "Overdue",
}


  function getRandomMessage(view) {
    const messages = taskMessages[view] || taskMessages.default;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    console.log(randomMessage)
    return randomMessage;
  }



export function todayTask(items){
    const today = getToday();
    const todayArr = items.filter(item => item['dueDate'] === today);
    return todayArr;
}

export function weekTask(items){
    const endOfWeekDate = getEndOfWeek();
    const startOfWeekDate = getStartOfWeek();
    const weekArr = items.filter(item => item['dueDate'] <= endOfWeekDate && item['dueDate'] >= startOfWeekDate);
    return weekArr;
}

export function upcomingTask(items){
    const endOfWeekDate = getEndOfWeek();
    const upcomingArr = items.filter(item => item['dueDate'] > endOfWeekDate);
    return upcomingArr;
}

export function overdueTasks(items){
    const today = getToday();
    const overdueArr = items.filter(item => item['status'] === false && item['dueDate'] < today);
    return overdueArr;
}

export function allTodoTasks(items){
  //  filterByView('tasks',items)
    return items;
}


export function projectFilter(items,name){
    const projectTodos = items.filter(item => item['project'] === name);
    const message = getRandomMessage(name)
    setCurrTaskView(name);
    setViewText(message);
    setProjectView(name);
    return projectTodos;

}
export function filterByView(targetId, todos){
    let message;
    switch (targetId){
        case 'today':
            setView('today');
            message = getRandomMessage(targetId)
            setViewText(message);
            setCurrTaskView(currentTaskHeading[targetId])
            return todayTask(todos);
            
        case 'week':
            setView('week');
            message = getRandomMessage(targetId)
            setViewText(message);
            setCurrTaskView(currentTaskHeading[targetId])
            return weekTask(todos);
            
        
        case 'upcoming':
            setView('upcoming');
            message = getRandomMessage(targetId)
            setViewText(message);
            setCurrTaskView(currentTaskHeading[targetId])
            return upcomingTask(todos);
            

        case 'overdue':
            setView('overdue')
            message = getRandomMessage(targetId)
            setViewText(message);;
            setCurrTaskView(currentTaskHeading[targetId])
            return overdueTasks(todos);
            
        case 'tasks':
            setView('tasks');
            message = getRandomMessage('default')
            setViewText(message);
            setCurrTaskView(currentTaskHeading[targetId])
            return allTodoTasks(todos);
            
        default:
            return projectFilter(todos,targetId);
            
            

    }
}