//When a folder tab is clicked from the left bottom container, folder contents will collapse.
export { openFolderPage };

import "./styles.css";
import {
  itemObjects,
  taskObjects,
  projectObjects,
  updateStorage,
} from "./objects-n-classes.js";
import {
  createEle,
  createButton,
  createLabel,
  createInput,
} from "./helper-functions.js";

//svg imports
import projectEdit from "./svg/taskEdit.svg";

function openFolderPage(folderObj) {
  const container = document.querySelector("#rightContainer");
  container.replaceChildren();

  const projectSummary = createEle("div");
  projectSummary.setAttribute("class", "projectSummary");
  container.appendChild(projectSummary);

  const projectContainer = createEle("div");
  projectContainer.setAttribute("class", "titleContainer");
  projectSummary.appendChild(projectContainer);

  const projectTitle = createEle("p");
  projectTitle.textContent = `Project Name:  ${folderObj.projectName}`;
  projectTitle.id = "projectTitle";
  projectContainer.appendChild(projectTitle);

  const projectEditIcon = createButton(projectEdit, "", "purpleIconBtn");
  projectContainer.appendChild(projectEditIcon);
  projectEditIcon.addEventListener("click", () => editProject(folderObj));

  folderObj.tasksList.forEach((taskId) => {
    const taskObj = taskObjects.find((task) => task.taskId == taskId);
    displayTasksSummary(taskObj);
  });
}

function displayTasksSummary(taskObj) {
  const projectSummary = document.querySelector(".projectSummary");
  const taskContainer = createEle("div");
  taskContainer.setAttribute("class", "folderTaskContainer");
  projectSummary.appendChild(taskContainer);

  const taskName = createEle("div");
  taskName.setAttribute("class", "folderTaskName");
  taskName.textContent = `Task Name:  ${taskObj.taskName}`;
  taskContainer.appendChild(taskName);

  const taskActionBtn = createEle("button");
  taskActionBtn.textContent = "Go to Task Page";
  taskActionBtn.addEventListener("click", () => {
    const taskTab = document.getElementById(taskObj.taskId);
    taskTab.click();
  });
  taskActionBtn.setAttribute("class", "folderTaskBtn");
  taskContainer.appendChild(taskActionBtn);

  const itemContainer = createEle("div");
  itemContainer.setAttribute("class", "folderItemsContainer");
  itemContainer.textContent = "Task items:";
  projectSummary.appendChild(itemContainer);
  const allItems = createEle("div");
  allItems.setAttribute("class", "folderAllItems");
  itemContainer.appendChild(allItems);

  taskObj.itemsList.forEach((itemId) => {
    const itemObj = itemObjects.find((item) => item.itemId == itemId);
    const itemName = createEle("li");
    itemName.textContent = itemObj.itemName;
    allItems.appendChild(itemName);
  });
}

function editProject(folderObj) {
  const editProjectContainer = createEle("div");
  editProjectContainer.id = "editProjectContainer";
  document.body.appendChild(editProjectContainer);

  const projectFolderContainer = createEle("div");
  projectFolderContainer.id = "projectFolderContainer";
  editProjectContainer.appendChild(projectFolderContainer);

  const backdrop = createEle("div");
  backdrop.id = "transparent-backdrop";
  editProjectContainer.appendChild(backdrop);

  const label = createLabel("folder-name", "Edit project folder name:");
  projectFolderContainer.appendChild(label);

  const input = createInput("text", "folder-name");
  input.value = folderObj.projectName;
  input.setAttribute("placeholder", "Type the name here");
  projectFolderContainer.appendChild(input);

  const mainActionBtnsContainer = createEle("div");
  mainActionBtnsContainer.setAttribute("class", "projectActionBtnsContainer");
  projectFolderContainer.appendChild(mainActionBtnsContainer);

  const saveProjectActionBtn = createEle("button");
  saveProjectActionBtn.id = "saveProjectActionBtn";
  saveProjectActionBtn.addEventListener("click", () => {
    saveProjectEdit(folderObj);
  });
  saveProjectActionBtn.setAttribute(
    "class",
    "mainActionBtns mainProjectActionBtn",
  );
  saveProjectActionBtn.textContent = "Save and Close";
  mainActionBtnsContainer.appendChild(saveProjectActionBtn);

  const deleteProjectBtn = createEle("button");
  deleteProjectBtn.addEventListener("click", () => deleteProject(folderObj));
  deleteProjectBtn.setAttribute("class", "mainActionBtns delActionBtn");
  deleteProjectBtn.textContent = "Delete Project";
  mainActionBtnsContainer.appendChild(deleteProjectBtn);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveProjectEdit(folderObj);
    }
  });
}

function saveProjectEdit(folderObj) {
  const nameInput = document.querySelector("#folder-name");
  if (nameInput.value === "") {
    alert("Please add the name of the new project folder.");
    return false;
  } else {
    //new name is updated in current open-folder-page.js
    const currentPageFolderName = document.querySelector("#projectTitle");
    currentPageFolderName.textContent = nameInput.value;
    //new name is updated in left tabs section.
    const projectTab = document.getElementById(folderObj.projectName);
    projectTab.textContent = nameInput.value;
    projectTab.id = nameInput.value;
    //new name is saved in projectObject array.
    folderObj.projectName = nameInput.value;
    updateStorage();
    removeEditProjectContainer();
    return true;
  }
}

function deleteProject(folderObj) {
  //project tab in the left section, along with it's tasks tabs are removed.
  const projectTab = document.getElementById(folderObj.projectId);
  projectTab.remove();

  const tasksIds = [...folderObj.tasksList];

  //All associated items are removed from taskObjects array.
  tasksIds.forEach((id) => {
    for (let i = itemObjects.length - 1; i >= 0; i--)
      if (itemObjects[i].parentTaskId == id) {
        itemObjects.splice(i, 1);
        console.log(itemObjects);
      }
  });
  //All associated tasks are removed from taskObjects array.
  tasksIds.forEach((id) => {
    const index = taskObjects.findIndex((taskObj) => taskObj.taskId == id);
    taskObjects.splice(index, 1);
  });

  //ProjectObj is removed from projectObjects array.
  const index = projectObjects.findIndex(
    (projectObj) => projectObj.projectId == folderObj.projectId,
  );
  projectObjects.splice(index, 1);
  updateStorage();

  removeEditProjectContainer();
  const container = document.querySelector("#rightContainer");
  container.replaceChildren();
}

function removeEditProjectContainer() {
  const projectSettingContainer = document.querySelector(
    "#editProjectContainer",
  );
  projectSettingContainer.remove();
}
