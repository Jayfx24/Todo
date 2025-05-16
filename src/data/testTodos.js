import { todoItem } from "../todos";


export const testTodos = [
  todoItem("Plan project scope", "Define goals, features, and deliverables to keep the project focused and organized.", "2025-05-16", "high", "school"),
  todoItem("Create wireframes", "Sketch layouts and user flows to visualize the site structure and UX.", "2025-05-17", "medium", "school"),
  todoItem("Set up Git repository", "Initialize Git repo, commit starter files, and push to GitHub for version control.", "2025-05-18", "high", "personal"),
  todoItem("Write base HTML structure", "Build main HTML skeleton to establish site content and layout foundation.", "2025-05-19", "medium", "school"),
  todoItem("Design header and navigation", "Create responsive navigation bar with logo and menus.", "2025-05-20", "medium", "school"),
  todoItem("Implement mobile responsiveness", "Use CSS media queries to ensure site displays well on all devices.", "2025-05-21", "high", "school"),
  todoItem("Create CSS variables and base styles", "Define colors, fonts, and spacing using CSS variables for style consistency.", "2025-05-22", "medium", "personal"),
  todoItem("Develop homepage content sections", "Add hero banners, features, and info blocks to engage visitors.", "2025-05-23", "medium", "school"),
  todoItem("Add interactive JavaScript elements", "Implement modals, sliders, and dynamic buttons to improve interaction.", "2025-05-24", "high", "school"),
  todoItem("Build contact form", "Create contact form with validation and submission features.", "2025-05-25", "medium", "personal"),
  todoItem("Connect to API", "Fetch dynamic data from an API and display it in real time.", "2025-05-26", "high", "work"),
  todoItem("Test cross-browser compatibility", "Check site functionality on Chrome, Firefox, Safari, and Edge.", "2025-05-27", "medium", "work"),
  todoItem("Fix bugs and layout issues", "Debug and resolve issues found during testing to improve usability.", "2025-05-28", "high", "school"),
  todoItem("Add footer with social links", "Design footer with relevant links and social media icons.", "2025-05-29", "low", "school"),
  todoItem("Optimize images and assets", "Compress images and minify CSS/JS to speed up loading times.", "2025-05-30", "medium", "personal"),
  todoItem("Improve accessibility", "Ensure screen reader and keyboard navigation support.", "2025-05-31", "high", "school"),
  todoItem("Prepare project documentation", "Write README with setup instructions and usage guidelines.", "2025-06-01", "high", "work"),
  todoItem("Peer code review", "Get feedback from peers to improve code quality and catch bugs.", "2025-06-02", "medium", "school"),
  todoItem("Deploy project online", "Publish project on hosting platform like Netlify or GitHub Pages.", "2025-06-03", "high", "personal"),
  todoItem("Celebrate project completion 🎉", "Take time to appreciate your hard work and celebrate success!", "2025-06-04", "low", "personal"),
  todoItem("Setup project board", "Create tasks and milestones on project management board.", "2025-06-05", "medium", "work"),
  todoItem("Review design guidelines", "Make sure designs follow brand and UX standards.", "2025-06-06", "medium", "school"),
  todoItem("Implement SEO basics", "Add meta tags and optimize content for search engines.", "2025-06-07", "high", "work"),
  todoItem("Create reusable components", "Build modular UI components for better code reuse.", "2025-06-08", "medium", "personal"),
  todoItem("Add unit tests", "Write tests for core functionality to prevent regressions.", "2025-06-09", "high", "school"),
  todoItem("Setup CI/CD pipeline", "Automate testing and deployment with continuous integration.", "2025-06-10", "high", "work"),
  todoItem("Analyze user feedback", "Review feedback to prioritize improvements and fixes.", "2025-06-11", "medium", "work"),
  todoItem("Update dependencies", "Keep libraries and frameworks up to date to ensure security.", "2025-06-12", "medium", "personal"),
  todoItem("Add analytics tracking", "Integrate tools to track user behavior and site metrics.", "2025-06-13", "medium", "work"),
  todoItem("Prepare demo presentation", "Create slides and demo flow for stakeholders review.", "2025-06-14", "high", "work"),
];

const completedDate = "2025-05-11";
[0, 4,].forEach(i => {
  testTodos[i].status = true;
  testTodos[i].completedAt = completedDate;
});

