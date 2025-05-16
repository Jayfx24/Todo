import { getToday, getEndOfWeek, getStartOfWeek } from './dateUtility';
import { setView,setViewText, setCurrTaskView, setProjectView } from './statusChecker';

// const  currProjectView = getProjectCurrentView();
const taskMessages = {
  today: [
    "✅ You're all caught up for today — well done!",
    "🛋️ No tasks for today. Take a breather or get ahead!",
    "🎯 Today’s list is clear. Nice job staying on track!",
    "☀️ Enjoy the moment — no tasks today!",
    "🧘 Relax! Nothing’s scheduled for today.",
    "😌 Today’s looking easy — no tasks due.",
    "💤 Take it slow, you’ve earned it — no tasks today!",
    "📅 No tasks today. Maybe review or prep for tomorrow?",
  ],
  week: [
    "🌈 You’ve got nothing scheduled this week — smooth sailing!",
    "📝 All clear for the week! Maybe plan something productive?",
    "⏳ No weekly tasks yet — a great chance to stay ahead.",
    "🌤️ Free week ahead — enjoy the extra space!",
    "💪 Your weekly task list is clear — great job!",
    "😎 No pressure this week. Keep up the momentum!",
    "🛫 No tasks on deck this week — make the most of it!",
    "📆 Clear skies this week — time to recharge or plan ahead.",
  ],
  upcoming: [
    "🔮 Nothing planned yet — the future’s wide open!",
    "🧭 No upcoming tasks. Perfect time to plan ahead!",
    "📂 Looking good! Add tasks when you're ready.",
    "🌱 No future tasks — set something exciting!",
    "📌 Add a goal to keep your momentum going.",
    "🗓️ Your schedule ahead is clear. Want to plan something?",
    "⚡ No tasks coming up — good chance to get ahead.",
    "🚀 Free path ahead — maybe create a new milestone?",
  ],
  overdue: [
    "👏 Great job! No overdue tasks — you’re staying on top!",
    "🟢 Nothing overdue. You're keeping things in check!",
    "🌟 Awesome work — all tasks are up to date!",
    "🥳 No overdue tasks. You're crushing it!",
    "📈 Everything’s on track — no past due tasks!",
    "✨ Clean slate — no overdue items!",
    "🙌 Staying consistent — love to see it!",
    "💯 You’ve got no overdue tasks — amazing!",
  ],
  default: [
    "➕ No tasks yet. Click the add button to get started!",
    "📭 Looks like your task list is empty — let’s change that!",
    "🆕 Ready to begin? Add your first task and start making progress!",
    "🚧 Nothing here yet. Time to build your list!",
    "🎯 No goals tracked yet. Let’s fix that!",
    "📋 Your board is empty. Add a task to kick things off!",
    "✨ Clean start — add your first task!",
    "👣 First step time — click add and get going!",
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
    // console.log(randomMessage)
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
            message = getRandomMessage(targetId);
            setViewText(message);
            setCurrTaskView(currentTaskHeading[targetId])
            return overdueTasks(todos);
            
        case 'tasks':
            setView('tasks');
            message = getRandomMessage('default')
            console.log(message)
            setViewText(message);
            setCurrTaskView(currentTaskHeading[targetId])
            return allTodoTasks(todos);
            
        default:
            return projectFilter(todos,targetId);
            
            

    }
}

export function toggleMode(){
  const body = document.body;

  body.classList.toggle('dark-mode');
}
