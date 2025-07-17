//This file generates all the beginning UI elements onto the page.

import "./styles.css";
import {
  changeProjectTabsColor,
  disableOtherTabs,
  createEle,
} from "./helper-functions.js";
import { addNewProjectByIcon } from "./new-project-btn.js";
import {
  createSampleTabs,
  // projectObjects,
  // taskObjects,
  // itemObjects,
  updateAllTabs,
  loadStorage,
} from "./objects-n-classes.js";
import { createTaskDetailsBox } from "./add-new-task.js";

//images import
import odinImage from "./images/odin.png";
import plus from "./svg/plus.svg";
// import search from "./svg/search.svg";
// import today from "./svg/today.svg";
import addProject from "./svg/addProject.svg";

createMainElements();
changeProjectTabsColor();

loadStorage();
updateAllTabs();

function createMainElements() {
  //main containers
  const appContainer = createEle("div");
  appContainer.id = "appContainer";
  document.body.appendChild(appContainer);

  const leftContainer = createEle("div");
  leftContainer.id = "leftContainer";
  appContainer.appendChild(leftContainer);

  const rightContainer = createEle("div");
  rightContainer.id = "rightContainer";
  appContainer.appendChild(rightContainer);

  //logo section
  const logoContainer = createEle("div");
  logoContainer.id = "logoContainer";
  leftContainer.appendChild(logoContainer);

  const logo = createEle("img");
  logo.src = odinImage;
  logo.id = "logo";
  logoContainer.appendChild(logo);

  const logoText = createEle("p");
  logoText.textContent = "DoMe";
  logoText.id = "logoText";
  logoContainer.appendChild(logoText);

  // top left tabs
  const topLeftContainer = createEle("div");
  topLeftContainer.id = "topLeftContainer";
  leftContainer.appendChild(topLeftContainer);

  //Add new task tab
  const newTaskContainer = createEle("button");
  //addTask id will do adding task logic.
  newTaskContainer.id = "addTask";
  newTaskContainer.setAttribute("class", "tabButton left-tabs-style");
  topLeftContainer.appendChild(newTaskContainer);

  const newTaskSpan = createEle("span");
  newTaskContainer.appendChild(newTaskSpan);

  const plusIcon = createEle("img");
  plusIcon.src = plus;
  plusIcon.setAttribute("class", "left-side-icons");
  newTaskSpan.appendChild(plusIcon);

  const newTaskText = createEle("p");
  newTaskText.textContent = "Add a new task";
  newTaskSpan.appendChild(newTaskText);

  // //Search tab
  // const searchContainer = createEle("button");
  // //searchLogic will do search logic.
  // searchContainer.id = "searchLogic";
  // searchContainer.setAttribute("class", "tabButton left-tabs-style");
  // topLeftContainer.appendChild(searchContainer);

  // const searchSpan = createEle("span");
  // searchContainer.appendChild(searchSpan);

  // const searchIcon = createEle("img");
  // searchIcon.src = search;
  // searchIcon.setAttribute("class", "left-side-icons");
  // searchSpan.appendChild(searchIcon);

  // const searchText = createEle("p");
  // searchText.textContent = "Search task or project";
  // searchSpan.appendChild(searchText);

  // //Today tab
  // const todayContainer = createEle("button");
  // //todayLogic will do today logic.
  // todayContainer.id = "todayLogic";
  // todayContainer.setAttribute("class", "tabButton left-tabs-style");
  // topLeftContainer.appendChild(todayContainer);

  // const todaySpan = createEle("span");
  // todayContainer.appendChild(todaySpan);

  // const todayIcon = createEle("img");
  // todayIcon.src = today;
  // todayIcon.setAttribute("class", "left-side-icons");
  // todaySpan.appendChild(todayIcon);

  // const todayText = createEle("p");
  // todayText.textContent = "Today";
  // todaySpan.appendChild(todayText);

  //Bottom section

  const projectsTitleContainer = createEle("div");
  projectsTitleContainer.setAttribute("id", "projectsTitleContainer");
  leftContainer.appendChild(projectsTitleContainer);

  const allProjectsTitle = createEle("h2");
  allProjectsTitle.textContent = "All Projects";
  projectsTitleContainer.appendChild(allProjectsTitle);

  //Add Project icon
  const addProjectIcon = createEle("button");
  addProjectIcon.id = "addProjectIcon";
  const projectIcon = createEle("img");
  projectIcon.src = addProject;
  projectIcon.setAttribute("class", "left-side-icons");
  projectIcon.id = "projectIcon";
  addProjectIcon.appendChild(projectIcon);
  projectsTitleContainer.appendChild(addProjectIcon);

  addNewProjectByIcon();

  //PROJECTS DISPLAY

  const projectsContainer = createEle("div");
  projectsContainer.id = "projectsContainer";
  leftContainer.appendChild(projectsContainer);

  //Listen to "Add a new task" tab in Left Container.
  const newTaskBtn = document.querySelector("#addTask");
  newTaskBtn.addEventListener("click", () => {
    disableOtherTabs(newTaskBtn);
    createTaskDetailsBox();
  });

  createSampleTabs();

  // consoleLogObjArrays();
}

// function consoleLogObjArrays() {
//   const allProjects = createEle("button");
//   allProjects.id = "allProjects";
//   allProjects.textContent = "allProjects";
//   const leftContainer = document.querySelector("#leftContainer");
//   leftContainer.appendChild(allProjects);
//   document.querySelector("#allProjects").addEventListener("click", () => {
//     projectObjects.forEach((project) => {
//       console.log(project.projectName);
//       console.log(`tasksList:`);
//       project.tasksList.forEach((Id) => {
//         const task = taskObjects.find((task) => task.taskId == Id);
//         console.log(task.taskName);
//       });
//     });
//   });

//   const allTasks = createEle("button");
//   allTasks.id = "allTasks";
//   allTasks.textContent = "allTasks";
//   leftContainer.appendChild(allTasks);
//   document.querySelector("#allTasks").addEventListener("click", () => {
//     taskObjects.forEach((task) => {
//       console.log(`task: ${task.taskName}`);
//       console.log("itemsList:");
//       task.itemsList.forEach((Id) => {
//         const item = itemObjects.find((item) => item.itemId == Id);
//         console.log(item.itemName);
//       });
//     });
//   });

//   const allItems = createEle("button");
//   allItems.id = "allItems";
//   allItems.textContent = "allItems";
//   leftContainer.appendChild(allItems);
//   document.querySelector("#allItems").addEventListener("click", () => {
//     itemObjects.forEach((item) => {
//       console.log(`itemName: ${item.itemName}`);
//       console.log(`itemParent: ${item.parentTaskId}`);
//     });
//   });
// }
