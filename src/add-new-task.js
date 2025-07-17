//When the top left tab "Add New Task" is clicked, this page is generated and a new task is created.
export {
  loadChooseFolder,
  createTaskDetailsBox,
  assignFolderValueOnChange,
  enableAddingBtn,
};
import "./styles.css";
import {
  projectObjects,
  taskObjects,
  NewTask,
  updateStorage,
} from "./objects-n-classes.js";
import {
  createEle,
  createLabel,
  createInput,
  createButton,
  checkInputFieldStatus,
  enableOtherTabs,
  truncateString,
} from "./helper-functions.js";
import { displayNewFolderWindow } from "./add-new-project.js";
import { updateProjectTasksTabs } from "./all-projects-tabs.js";

//svg imports
import newFolder from "./svg/newFolder.svg";
import plusPurple from "./svg/plusPurple.svg";

function createTaskDetailsBox() {
  const addNewTaskPage = createEle("div");
  addNewTaskPage.id = "addNewTaskPage";
  const rightContainer = document.querySelector("#rightContainer");
  rightContainer.replaceChildren();
  rightContainer.appendChild(addNewTaskPage);
  const newTaskDetailsBox = createEle("div");
  newTaskDetailsBox.id = "newTaskDetailsDiv";
  addNewTaskPage.appendChild(newTaskDetailsBox);

  const taskDetailsTitle = createEle("h1");
  taskDetailsTitle.textContent = "New Task Details:";
  taskDetailsTitle.id = "taskDetailsTitle";
  newTaskDetailsBox.appendChild(taskDetailsTitle);

  //task Name tab
  const taskNameContainer = createEle("div");
  taskNameContainer.setAttribute("class", "taskDetailsContainers");
  newTaskDetailsBox.appendChild(taskNameContainer);

  const taskNameLabel = createLabel("taskName", "*Task Name:");
  taskNameContainer.appendChild(taskNameLabel);

  const taskNameInput = createInput(
    "text",
    "taskName",
    "inputField",
    "Add task name",
  );
  taskNameContainer.appendChild(taskNameInput);
  taskNameInput.focus();

  const taskNameAddBtn = createButton(plusPurple, "Add", "inputButton");
  taskNameContainer.appendChild(taskNameAddBtn);
  taskNameAddBtn.disabled = true;

  //choose project folder tab
  const setFolderContainer = createEle("div");
  setFolderContainer.setAttribute("class", "taskDetailsContainers");
  newTaskDetailsBox.appendChild(setFolderContainer);

  const setFolderLabel = createLabel("setFolder", "*Project folder:");
  setFolderContainer.appendChild(setFolderLabel);

  const setFolderInput = createInput(
    "text",
    "setFolder",
    "",
    "*Please choose a project folder",
  );
  setFolderInput.readOnly = true;
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
  newTaskDetailsBox.appendChild(taskDescriptionContainer);

  const taskDescriptionLabel = createLabel("taskDescription", "Description:");
  taskDescriptionContainer.appendChild(taskDescriptionLabel);

  const taskDescriptionInput = createInput(
    "text",
    "taskDescription",
    "inputField",
  );
  taskDescriptionContainer.appendChild(taskDescriptionInput);

  const taskDescriptionAddBtn = createButton(plusPurple, "Add", "inputButton");
  taskDescriptionContainer.appendChild(taskDescriptionAddBtn);

  //Notes tab
  const taskNotesContainer = createEle("div");
  taskNotesContainer.setAttribute("class", "taskDetailsContainers");
  newTaskDetailsBox.appendChild(taskNotesContainer);

  const taskNotesLabel = createLabel("taskNotes", "Notes:");
  taskNotesContainer.appendChild(taskNotesLabel);

  const taskNotesInput = createInput("text", "taskNotes", "inputField");
  taskNotesContainer.appendChild(taskNotesInput);

  const taskNotesAddBtn = createButton(plusPurple, "Add", "inputButton");
  taskNotesContainer.appendChild(taskNotesAddBtn);

  //Main Action Buttons tab
  const mainActionBtnsContainer = createEle("div");
  mainActionBtnsContainer.setAttribute("class", "mainActionBtnsContainer");
  newTaskDetailsBox.appendChild(mainActionBtnsContainer);

  const addTaskActionBtn = createEle("button");
  addTaskActionBtn.id = "addNewTaskActionBtn";
  addTaskActionBtn.addEventListener("click", clickNewTaskSubmit);
  addTaskActionBtn.setAttribute("class", "mainActionBtns addActionBtn");
  addTaskActionBtn.textContent = "Add new Task";
  mainActionBtnsContainer.appendChild(addTaskActionBtn);
  addTaskActionBtn.disabled = true;

  const newTaskCancelBtn = createEle("button");
  newTaskCancelBtn.addEventListener("click", removeTaskPage);
  newTaskCancelBtn.setAttribute("class", "mainActionBtns cancelActionBtn");
  newTaskCancelBtn.textContent = "Cancel Task";
  mainActionBtnsContainer.appendChild(newTaskCancelBtn);

  document.querySelectorAll(".inputField").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        event.preventDefault();
        clickNewTaskSubmit();
      }
    });
  });
  assignFolderValueOnChange();
  checkInputFieldStatus();
  enableAddingBtn(addTaskActionBtn);
}

function enableAddingBtn(taskActionBtn) {
  const taskName = document.querySelector("#taskName");
  const folder = document.querySelector("#choosingFolder");
  taskName.addEventListener("input", () => {
    if (!taskName.value) {
      taskActionBtn.disabled = true;
    } else {
      if (folder.value) {
        taskActionBtn.disabled = false;
      }
    }
  });
  folder.addEventListener("input", () => {
    if (folder.value && taskName.value) {
      taskActionBtn.disabled = false;
    } else {
      taskActionBtn.disabled = true;
    }
  });
}

function loadChooseFolder() {
  const choosingFolder = document.querySelector("#choosingFolder");
  const options = choosingFolder.childNodes;
  for (const folder of projectObjects) {
    let folderExists = false;
    options.forEach((option) => {
      if (option.value == folder.projectName) {
        folderExists = true;
      }
    });
    if (folderExists == false) {
      const option = createEle("option");
      option.value = folder.projectName;
      option.textContent = truncateString(folder.projectName, 30);
      option.setAttribute("class", "chooseFolderOptions");
      choosingFolder.appendChild(option);
    }
  }
}

//When New Task Action Button is clicked, this function calls class NewTask() and return object's values.
function clickNewTaskSubmit() {
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
    const newTaskObj = new NewTask(
      objName.value,
      foundProjectObj.projectId,
      objDescription,
      objNotes,
    );
    taskObjects.push(newTaskObj);
    foundProjectObj.tasksList.push(newTaskObj.taskId);
    updateProjectTasksTabs(foundProjectObj.projectId, newTaskObj);
    updateStorage();
    removeTaskPage();
    return true;
  }
}

function removeTaskPage() {
  const taskPage = document.querySelector("#addNewTaskPage");
  taskPage.remove();
  const newTaskBtn = document.querySelector("#addTask");
  enableOtherTabs(newTaskBtn);
  newTaskBtn.classList.remove("active-yellow");
}

//Listens to 'choose folder' button, add chosen option to the the folder input.
function assignFolderValueOnChange() {
  const dropDown = document.querySelector("#choosingFolder");
  const setFolder = document.querySelector("#setFolder");
  dropDown.addEventListener("change", () => {
    setFolder.value = dropDown.value;
  });
}
