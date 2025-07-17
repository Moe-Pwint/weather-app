//this file keeps the projectObjects array and taskObjectsArray.
//It also has two classes to create a task object and a project object.
export {
  projectObjects,
  taskObjects,
  itemObjects,
  updateStorage,
  loadStorage,
  NewTask,
  NewProject,
  NewItem,
  createSampleTabs,
  updateAllTabs,
};

import {
  updateAllProjectsTabs,
  updateProjectTasksTabs,
} from "./all-projects-tabs.js";

let projectObjects = [];
let taskObjects = [];
let itemObjects = [];

function loadStorage() {
  const loadedProjectObjs = localStorage.getItem("projectObjs");
  if (loadedProjectObjs) {
    projectObjects = JSON.parse(loadedProjectObjs);
  }
  let loadedTaskObjs = localStorage.getItem("taskObjs");
  if (loadedTaskObjs) {
    taskObjects = JSON.parse(loadedTaskObjs);
    console.log("works!");
  }
  const loadedItemObjs = localStorage.getItem("itemObjs");
  if (loadedItemObjs) {
    itemObjects = JSON.parse(loadedItemObjs);
  }
}

function updateStorage() {
  localStorage.setItem("projectObjs", JSON.stringify(projectObjects));
  localStorage.setItem("taskObjs", JSON.stringify(taskObjects));
  localStorage.setItem("itemObjs", JSON.stringify(itemObjects));
}

function createSampleTabs() {
  const sampleProject = new NewProject("Sample Project");
  projectObjects.push(sampleProject);

  const sampleTask = new NewTask(
    "Sample Task",
    sampleProject.projectId,
    "Sample Description 07fc00eb-8a46-4cbf-b55f-762fa2658a35",
    "Sample Notes",
  );
  taskObjects.push(sampleTask);
  projectObjects[0].tasksList.push(sampleTask.taskId);

  // updateAllProjectsTabs(projectObjects[0]);
  // updateProjectTasksTabs(projectObjects[0].projectId, taskObjects[0]);
  // updateStorage();
}

function updateAllTabs() {
  for (let i = 0; i < projectObjects.length; i++) {
    updateAllProjectsTabs(projectObjects[i]);
  }

  taskObjects.forEach((obj) => {
    updateProjectTasksTabs(obj.projectFolder, obj);
  });
}

//This class takes the inputs from user and create a new task object.
class NewTask {
  constructor(taskName, projectFolder, description, notes) {
    this.taskName = taskName;
    this.projectFolder = projectFolder;
    this.description = description;
    this.notes = notes;
    this.taskId = crypto.randomUUID();
    this.itemsList = [];
  }
}

//This class takes the inputs from user and create a new project object.
class NewProject {
  constructor(projectName) {
    this.projectName = projectName;
    this.projectId = crypto.randomUUID();
    this.tasksList = [];
  }
}

class NewItem {
  constructor(
    itemName,
    itemDescription,
    itemDueDate,
    itemPriority,
    parentTaskId,
  ) {
    this.itemName = itemName;
    this.itemDescription = itemDescription;
    this.itemDueDate = itemDueDate;
    this.itemPriority = itemPriority;
    this.parentTaskId = parentTaskId;
    this.itemId = crypto.randomUUID();
    this._markStatus = false;
  }
  get markStatus() {
    return this._markStatus;
  }
  set markStatus(newStatus) {
    this._markStatus = newStatus;
  }
}
