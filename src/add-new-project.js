//This is the tiny window that opens up and you can create a new project folder.
export { displayNewFolderWindow };

import "./styles.css";
import {
  projectObjects,
  NewProject,
  updateStorage,
} from "./objects-n-classes.js";
import { createEle, createLabel, createInput } from "./helper-functions.js";
import { updateAllProjectsTabs } from "./all-projects-tabs.js";

function displayNewFolderWindow() {
  const container = createEle("div");
  container.id = "newProjectSetContainer";
  document.body.appendChild(container);

  const newFolderContainer = createEle("div");
  newFolderContainer.id = "newFolderContainer";
  container.appendChild(newFolderContainer);

  const backdrop = createEle("div");
  backdrop.id = "transparent-backdrop";
  container.appendChild(backdrop);

  const label = createLabel(
    "folder-name",
    "Please set the name of the project folder:",
  );
  newFolderContainer.appendChild(label);

  const input = createInput("text", "folder-name");
  input.setAttribute("placeholder", "Type the name here");
  newFolderContainer.appendChild(input);
  document.querySelector("#folder-name").focus();

  const mainActionBtnsContainer = createEle("div");
  mainActionBtnsContainer.setAttribute("class", "projectActionBtnsContainer");
  newFolderContainer.appendChild(mainActionBtnsContainer);

  const addProjectActionBtn = createEle("button");
  addProjectActionBtn.id = "addProjectActionBtn";
  addProjectActionBtn.addEventListener("click", clickNewProjectSubmit);
  addProjectActionBtn.setAttribute(
    "class",
    "mainActionBtns mainProjectActionBtn",
  );
  addProjectActionBtn.textContent = "Add project";
  mainActionBtnsContainer.appendChild(addProjectActionBtn);

  const newProjectCancelBtn = createEle("button");
  newProjectCancelBtn.addEventListener("click", cancelNewProject);
  newProjectCancelBtn.setAttribute("class", "mainActionBtns cancelActionBtn");
  newProjectCancelBtn.textContent = "Cancel project";
  mainActionBtnsContainer.appendChild(newProjectCancelBtn);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      clickNewProjectSubmit();
    }
  });
}

function clickNewProjectSubmit() {
  const objName = document.querySelector("#folder-name");

  if (objName.value === "") {
    alert("Please add the name of the new project folder.");
    return false;
  } else {
    const newProjectObj = new NewProject(objName.value);
    projectObjects.push(newProjectObj);
    removeProjectSettingContainer();
    updateAllProjectsTabs(newProjectObj);
    updateStorage();
    return true;
  }
}

function cancelNewProject() {
  removeProjectSettingContainer();
}

function removeProjectSettingContainer() {
  const projectSettingContainer = document.querySelector(
    "#newProjectSetContainer",
  );
  projectSettingContainer.remove();
}
