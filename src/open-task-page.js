//When a task tab on the left bottom container is clicked, the task details are shown on the right container.
//Task items can be added here.
//Task object can be modified/deleted from this file.
export { openTaskPage };

import "./styles.css";
import {
  itemObjects,
  projectObjects,
  taskObjects,
  updateStorage,
} from "./objects-n-classes.js";
import {
  createButton,
  createEle,
  createInput,
  createLabel,
  checkInputFieldStatus,
} from "./helper-functions.js";
import { newItemDetails } from "./new-item-details.js";
import { createItemDisplay } from "./items-display.js";
import {
  loadChooseFolder,
  assignFolderValueOnChange,
  enableAddingBtn,
} from "./add-new-task.js";
import { displayNewFolderWindow } from "./add-new-project.js";
import { updateProjectTasksTabs } from "./all-projects-tabs.js";

//svg imports
import taskEdit from "./svg/taskEdit.svg";
import plusWhite from "./svg/plusWhite.svg";
import editPurple from "./svg/editPurple.svg";
import newFolder from "./svg/newFolder.svg";
import plusPurple from "./svg/plusPurple.svg";

function openTaskPage(childTaskObj) {
  //task title
  const taskName = childTaskObj.taskName;
  const container = createEle("div");
  container.setAttribute("id", "openTaskContainer");
  const rightContainer = document.querySelector("#rightContainer");
  rightContainer.replaceChildren();
  rightContainer.appendChild(container);

  const taskTitleContainer = createEle("div");
  taskTitleContainer.setAttribute("class", "titleContainer");
  container.appendChild(taskTitleContainer);

  const taskTitle = createEle("p");
  taskTitle.textContent = taskName;
  taskTitle.setAttribute("class", "taskTitle");
  taskTitleContainer.appendChild(taskTitle);

  const taskEditIcon = createButton(taskEdit, "", "purpleIconBtn");
  taskEditIcon.id = "editTaskBtn";
  taskTitleContainer.appendChild(taskEditIcon);
  taskEditIcon.addEventListener("click", () => editTaskInfo(childTaskObj));

  //project title
  const projectTitle = createEle("p");
  const projectFolder = projectObjects.find((obj) =>
    obj.tasksList.includes(childTaskObj.taskId),
  );
  projectTitle.textContent = `from ${projectFolder.projectName}`;
  projectTitle.id = "taskPageProjectFolder";
  container.appendChild(projectTitle);

  //Project Description and notes
  const taskExtraInfo = createEle("div");
  container.appendChild(taskExtraInfo);
  if (childTaskObj.description) {
    taskExtraInfo.setAttribute("class", "taskExtraInfo");
    const description = createEle("p");
    description.textContent = `Task Description: ${childTaskObj.description}`;
    taskExtraInfo.appendChild(description);
  }
  if (childTaskObj.notes) {
    taskExtraInfo.setAttribute("class", "taskExtraInfo");
    const notes = createEle("p");
    notes.textContent = `Task Notes: ${childTaskObj.notes}`;
    taskExtraInfo.appendChild(notes);
  }

  //add new item button
  const addNewItemBtn = createButton(plusWhite, "Add new item");
  addNewItemBtn.id = "addNewItemBtn";
  taskTitleContainer.appendChild(addNewItemBtn);

  //items section
  const itemsContainer = createEle("div");
  itemsContainer.id = "itemsContainer";
  container.appendChild(itemsContainer);
  const parentTask = taskObjects.find((obj) => obj == childTaskObj);
  const itemsListRef = parentTask.itemsList;
  if (itemsListRef.length > 0) {
    loadItems(itemsListRef, parentTask);
  }

  addNewItemBtn.addEventListener("click", () => newItemDetails(childTaskObj));
}

function loadItems(itemsListRef, parentTask) {
  for (const itemIdRef of itemsListRef) {
    const item = itemObjects.find((obj) => obj.itemId == itemIdRef);
    createItemDisplay(item, parentTask);
  }
}

function editTaskInfo(childTaskObj) {
  const editTaskPage = createEle("div");
  editTaskPage.id = "editTaskPage";
  document.querySelector("#rightContainer").appendChild(editTaskPage);

  const editTaskDetailsBox = createEle("div");
  editTaskDetailsBox.id = "editTaskDetailsDiv";
  editTaskPage.appendChild(editTaskDetailsBox);

  const taskDetailsTitle = createEle("h1");
  taskDetailsTitle.textContent = "Edit Task Details:";
  taskDetailsTitle.id = "taskDetailsTitle";
  editTaskDetailsBox.appendChild(taskDetailsTitle);

  const backdrop = createEle("div");
  backdrop.id = "transparent-backdrop";
  editTaskPage.appendChild(backdrop);

  //task Name tab
  const taskNameContainer = createEle("div");
  taskNameContainer.setAttribute("class", "taskDetailsContainers");
  editTaskDetailsBox.appendChild(taskNameContainer);

  const taskNameLabel = createLabel("taskName", "*Task Name:");
  taskNameContainer.appendChild(taskNameLabel);

  const taskNameInput = createInput(
    "text",
    "taskName",
    "inputField",
    "Add task name",
  );
  taskNameInput.value = childTaskObj.taskName;
  taskNameContainer.appendChild(taskNameInput);

  const taskNameAddBtn = createButton(editPurple, "Edit", "inputButton");
  taskNameContainer.appendChild(taskNameAddBtn);

  //choose project folder tab
  const setFolderContainer = createEle("div");
  setFolderContainer.setAttribute("class", "taskDetailsContainers");
  editTaskDetailsBox.appendChild(setFolderContainer);

  const setFolderLabel = createLabel("setFolder", "*Project folder:");
  setFolderContainer.appendChild(setFolderLabel);

  const setFolderInput = createInput(
    "text",
    "setFolder",
    "",
    "*Please choose a project folder",
  );
  setFolderInput.readOnly = true;
  const projectFolder = projectObjects.find((obj) =>
    obj.tasksList.includes(childTaskObj.taskId),
  );
  setFolderInput.value = projectFolder.projectName;
  setFolderContainer.appendChild(setFolderInput);

  const folderTabsContainer = createEle("div");
  folderTabsContainer.setAttribute("class", "folderTabs");
  setFolderContainer.appendChild(folderTabsContainer);

  const select = createEle("select");
  select.setAttribute("id", "choosingFolder");
  select.setAttribute("class", "setProjectFolderBtn");
  folderTabsContainer.appendChild(select);

  const defaultOption = createEle("option");
  defaultOption.value = "";
  defaultOption.textContent = "Choose a project folder";
  defaultOption.setAttribute("class", "chooseFolderOptions");
  select.appendChild(defaultOption);

  loadChooseFolder();
  select.value = projectFolder.projectName;
  select.addEventListener("focus", loadChooseFolder);

  folderTabsContainer.appendChild(select);

  const newFolderAddBtn = createButton(newFolder, "create new project");
  newFolderAddBtn.setAttribute("class", "setProjectFolderBtn");
  newFolderAddBtn.id = "newFolderWindow";
  folderTabsContainer.appendChild(newFolderAddBtn);
  newFolderAddBtn.addEventListener("click", displayNewFolderWindow);

  //Description tab
  const taskDescriptionContainer = createEle("div");
  taskDescriptionContainer.setAttribute("class", "taskDetailsContainers");
  editTaskDetailsBox.appendChild(taskDescriptionContainer);

  const taskDescriptionLabel = createLabel("taskDescription", "Description:");
  taskDescriptionContainer.appendChild(taskDescriptionLabel);

  const taskDescriptionInput = createInput(
    "text",
    "taskDescription",
    "inputField",
  );
  taskDescriptionContainer.appendChild(taskDescriptionInput);
  taskDescriptionInput.value = childTaskObj.description;

  let taskDescriptionAddBtn;
  if (taskDescriptionInput.value) {
    taskDescriptionAddBtn = createButton(editPurple, "Edit", "inputButton");
  } else {
    taskDescriptionAddBtn = createButton(plusPurple, "Add", "inputButton");
  }
  taskDescriptionContainer.appendChild(taskDescriptionAddBtn);

  //Notes tab
  const taskNotesContainer = createEle("div");
  taskNotesContainer.setAttribute("class", "taskDetailsContainers");
  editTaskDetailsBox.appendChild(taskNotesContainer);

  const taskNotesLabel = createLabel("taskNotes", "Notes:");
  taskNotesContainer.appendChild(taskNotesLabel);

  const taskNotesInput = createInput("text", "taskNotes", "inputField");
  taskNotesContainer.appendChild(taskNotesInput);
  taskNotesInput.value = childTaskObj.notes;

  let taskNotesAddBtn;
  if (taskNotesInput.value) {
    taskNotesAddBtn = createButton(editPurple, "Edit", "inputButton");
  } else {
    taskNotesAddBtn = createButton(plusPurple, "Add", "inputButton");
  }
  taskNotesContainer.appendChild(taskNotesAddBtn);

  //Main Action Buttons tab
  const mainActionBtnsContainer = createEle("div");
  mainActionBtnsContainer.setAttribute("class", "mainActionBtnsContainer");
  editTaskDetailsBox.appendChild(mainActionBtnsContainer);

  const editTaskActionBtn = createEle("button");
  editTaskActionBtn.id = "editTaskActionBtn";
  editTaskActionBtn.addEventListener("click", () =>
    clickEditTaskSubmit(childTaskObj),
  );
  editTaskActionBtn.setAttribute("class", "mainActionBtns addActionBtn");
  editTaskActionBtn.textContent = "Save Edits";
  mainActionBtnsContainer.appendChild(editTaskActionBtn);

  const deleteTaskBtn = createEle("button");
  deleteTaskBtn.addEventListener("click", () => deleteTask(childTaskObj));
  deleteTaskBtn.setAttribute("class", "mainActionBtns delActionBtn");
  deleteTaskBtn.textContent = "Delete Task";
  mainActionBtnsContainer.appendChild(deleteTaskBtn);

  document.querySelectorAll(".inputField").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        event.preventDefault();
        clickEditTaskSubmit(childTaskObj);
      }
    });
  });

  assignFolderValueOnChange();
  checkInputFieldStatus();
  updateStorage();
  enableAddingBtn(editTaskActionBtn);
}

function clickEditTaskSubmit(childTaskObj) {
  const objName = document.querySelector("#taskName");
  const objFolder = document.querySelector("#setFolder");
  const objDescription = document.querySelector("#taskDescription").value;
  const objNotes = document.querySelector("#taskNotes").value;

  let foundProjectObj;
  for (const projectObj of projectObjects) {
    if (objFolder.value == projectObj.projectName) {
      foundProjectObj = projectObj;
    }
  }

  if (objName.value === "" || objFolder.value === "") {
    alert("Please add task name and project folder");
    return false;
  } else {
    //If folder is changed,
    //Remove taskId from current project's tasksList.
    const oldProject = projectObjects.find((obj) =>
      obj.tasksList.includes(childTaskObj.taskId),
    );
    if (objFolder.value !== oldProject.projectName) {
      const index = oldProject.tasksList;
      const indexToRemove = index.findIndex(
        (taskId) => childTaskObj.taskId == taskId,
      );
      oldProject.tasksList.splice(indexToRemove, 1);
      //Add taskId to new project's tasksList.
      foundProjectObj.tasksList.push(childTaskObj.taskId);
      //Move the task tab in projects and tasks tabs.
      document.getElementById(childTaskObj.taskId).remove();
      updateProjectTasksTabs(foundProjectObj.projectId, childTaskObj);
      document
        .getElementById(childTaskObj.taskId)
        .classList.add("active-yellow");
    }
    //update task name in task tabs.
    const taskTab = document.getElementById(childTaskObj.taskName);
    taskTab.id = objName.value;
    taskTab.textContent = objName.value;

    //update task object details in taskObjects array.
    childTaskObj.taskName = objName.value;
    childTaskObj.projectFolder = foundProjectObj.projectId;
    childTaskObj.description = objDescription;
    childTaskObj.notes = objNotes;
    updateStorage();
    removeTaskPage();
    openTaskPage(childTaskObj);
    return true;
  }
}

function deleteTask(childTaskObj) {
  //Remove taskId from current project's tasksList.
  const oldProject = projectObjects.find((obj) =>
    obj.tasksList.includes(childTaskObj.taskId),
  );
  const index = oldProject.tasksList;
  const indexToRemove = index.findIndex(
    (taskId) => childTaskObj.taskId == taskId,
  );
  oldProject.tasksList.splice(indexToRemove, 1);
  //remove all associated item objects.
  for (let index = itemObjects.length - 1; index >= 0; index--) {
    if (itemObjects[index].parentTaskId == childTaskObj.taskId) {
      itemObjects.splice(index, 1);
    }
  }
  //remove task object from projects and tasks tabs.
  document.getElementById(childTaskObj.taskId).remove();
  //remove task object from taskObjects array.
  const taskToRemove = taskObjects.findIndex(
    (task) => task.taskId == childTaskObj.taskId,
  );
  taskObjects.splice(taskToRemove, 1);
  updateStorage();
  removeTaskPage();
  const rightContainer = document.querySelector("#rightContainer");
  rightContainer.replaceChildren();
}

function removeTaskPage() {
  const taskPage = document.querySelector("#editTaskPage");
  taskPage.remove();
}
