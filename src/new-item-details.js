//This is the logic to create a new item in open-task-page.js. Then, item is saved in itemObjects array.
export { newItemDetails, loadPrioritySelectOptions, assignPriorityOnChange };
import { itemObjects, NewItem, updateStorage } from "./objects-n-classes.js";
import {
  createEle,
  createLabel,
  createInput,
  createButton,
  checkInputFieldStatus,
} from "./helper-functions.js";
import {
  createItemDisplay,
  createCheckbox,
  changeCircle,
} from "./items-display.js";

//svg imports
import plusPurple from "./svg/plusPurple.svg";

function newItemDetails(taskObj) {
  createAddNewItemDetailsBox(taskObj);
}

//Create UI box to display details and edit options.
function createAddNewItemDetailsBox(taskObj) {
  document.querySelector("#addNewItemBtn").disabled = true;
  document
    .querySelectorAll(".allItemEditBtns")
    .forEach((btn) => (btn.disabled = true));
  const addNewItemContainer = createEle("div");
  addNewItemContainer.id = "addNewItemContainer";
  const openTaskContainer = document.querySelector("#openTaskContainer");
  openTaskContainer.appendChild(addNewItemContainer);
  //top section
  const addItemNameSection = createEle("div");
  addItemNameSection.setAttribute("class", "itemNameSection");
  addNewItemContainer.appendChild(addItemNameSection);

  const circle = createEle("div");
  circle.setAttribute("class", "circle");
  addItemNameSection.appendChild(circle);

  const itemNameText = createEle("p");
  itemNameText.textContent = "Add item name";
  itemNameText.setAttribute("class", "itemNameText");
  addItemNameSection.appendChild(itemNameText);

  const checkbox = createCheckbox();
  checkbox.firstChild.id = "checkboxId";
  checkbox.firstChild.addEventListener("change", () => {
    if (checkbox.firstChild.checked == true) {
      checkbox.lastChild.textContent = "Unmark";
    } else {
      checkbox.lastChild.textContent = "Mark as done";
    }
  });
  addItemNameSection.appendChild(checkbox);

  //body section
  const detailsText = createEle("p");
  detailsText.textContent = "Details:";
  detailsText.setAttribute("class", "itemDetailsContainers");
  addNewItemContainer.appendChild(detailsText);

  //item Name Section
  const itemNameContainer = createEle("div");
  itemNameContainer.setAttribute("class", "itemDetailsContainers");
  addNewItemContainer.appendChild(itemNameContainer);

  const itemNameLabel = createLabel("itemName", "*Item Name:");
  itemNameContainer.appendChild(itemNameLabel);

  const itemNameInput = createInput(
    "text",
    "itemName",
    "inputField",
    "Add item name",
  );
  itemNameContainer.appendChild(itemNameInput);
  itemNameInput.focus();

  const itemNameAddBtn = createButton(plusPurple, "Add", "inputButton");
  itemNameContainer.appendChild(itemNameAddBtn);
  itemNameAddBtn.disabled = true;

  //item description Section
  const itemDescriptionContainer = createEle("div");
  itemDescriptionContainer.setAttribute("class", "itemDetailsContainers");
  addNewItemContainer.appendChild(itemDescriptionContainer);

  const itemDescriptionLabel = createLabel("itemDescription", "Description:");
  itemDescriptionContainer.appendChild(itemDescriptionLabel);

  const itemDescriptionInput = createInput(
    "text",
    "itemDescription",
    "inputField",
  );
  itemDescriptionInput.value = "";
  itemDescriptionContainer.appendChild(itemDescriptionInput);

  const itemDescriptionAddBtn = createButton(plusPurple, "Add", "inputButton");
  itemDescriptionContainer.appendChild(itemDescriptionAddBtn);

  //item Date Picker Section
  const itemDateContainer = createEle("div");
  itemDateContainer.setAttribute("class", "itemDetailsContainers");
  addNewItemContainer.appendChild(itemDateContainer);

  const itemDateLabel = createLabel("itemDate", "Due date:");
  itemDateContainer.appendChild(itemDateLabel);

  const itemDateInput = createInput("date", "itemDate");
  itemDateContainer.appendChild(itemDateInput);

  //set priority section
  const priorityContainer = createEle("div");
  priorityContainer.setAttribute("class", "itemDetailsContainers");
  addNewItemContainer.appendChild(priorityContainer);

  const priorityLabel = createLabel("priority", "Priority:");
  priorityContainer.appendChild(priorityLabel);

  const priorityInput = createInput("text", "priorityInput");
  priorityInput.readOnly = true;
  priorityContainer.appendChild(priorityInput);

  const select = createEle("select");
  select.setAttribute("id", "selectingPriority");
  select.setAttribute("class", "inputButton");
  priorityContainer.appendChild(select);
  loadPrioritySelectOptions();
  select.addEventListener("change", () => changeCircle(circle, select.value));
  assignPriorityOnChange();

  //Main Action Buttons tab
  const mainActionBtnsContainer = createEle("div");
  mainActionBtnsContainer.setAttribute("class", "mainActionBtnsContainer");
  addNewItemContainer.appendChild(mainActionBtnsContainer);

  const addItemActionBtn = createEle("button");
  addItemActionBtn.addEventListener("click", () => clickNewItemSubmit(taskObj));
  addItemActionBtn.setAttribute("class", "mainActionBtns addActionBtn");
  addItemActionBtn.textContent = "Add new item";
  mainActionBtnsContainer.appendChild(addItemActionBtn);

  const newItemCancelBtn = createEle("button");
  newItemCancelBtn.setAttribute("class", "mainActionBtns cancelActionBtn");
  newItemCancelBtn.textContent = "Cancel item";
  mainActionBtnsContainer.appendChild(newItemCancelBtn);
  newItemCancelBtn.addEventListener("click", closeItemContainer);

  checkInputFieldStatus();

  document.querySelectorAll(".inputField").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        event.preventDefault();
        clickNewItemSubmit(taskObj);
      }
    });
  });
}

function loadPrioritySelectOptions() {
  const selectingPriority = document.querySelector("#selectingPriority");
  if (!selectingPriority.hasChildNodes()) {
    const defaultOption = createEle("option");
    defaultOption.value = "";
    defaultOption.textContent = "Set priority";
    defaultOption.style.textAlign = "center";
    selectingPriority.appendChild(defaultOption);

    const lowOption = createEle("option");
    lowOption.value = "Low";
    lowOption.textContent = "Low";
    selectingPriority.appendChild(lowOption);

    const midOption = createEle("option");
    midOption.value = "Medium";
    midOption.textContent = "Medium";
    selectingPriority.appendChild(midOption);

    const highOption = createEle("option");
    highOption.value = "High";
    highOption.textContent = "High";
    selectingPriority.appendChild(highOption);
  }
}

//Listens to 'selectingPriority', add chosen option to the the priorityInput.
function assignPriorityOnChange() {
  const dropDown = document.querySelector("#selectingPriority");
  const priorityInput = document.querySelector("#priorityInput");
  dropDown.addEventListener("change", () => {
    priorityInput.value = dropDown.value;
  });
}

//When New Item Action Button is clicked, this function calls class NewItem() and return object's values.
//Then call function removeItemPage and function resetAddItemTab.
function clickNewItemSubmit(taskObj) {
  const itemName = document.querySelector("#itemName").value;
  const itemDescription = document.querySelector("#itemDescription").value;
  const itemDate = document.querySelector("#itemDate").value;
  const itemPriority = document.querySelector("#priorityInput").value;
  const parentTask = taskObj.taskId;
  const checkbox = document.querySelector("#checkboxId");

  if (!itemName) {
    alert("Please add the name of the task item.");
  } else {
    let dueDate;
    if (!itemDate) {
      dueDate = "";
    } else {
      dueDate = itemDate;
    }
    const newItem = new NewItem(
      itemName,
      itemDescription,
      dueDate,
      itemPriority,
      parentTask,
    );
    if (checkbox.checked) {
      newItem.markStatus = true;
    }
    taskObj.itemsList.push(newItem.itemId);
    itemObjects.push(newItem);
    createItemDisplay(newItem);
    updateStorage();
    closeItemContainer();
  }
}

function closeItemContainer() {
  const container = document.querySelector("#addNewItemContainer");
  container.remove();
  document
    .querySelectorAll(".allItemEditBtns")
    .forEach((btn) => (btn.disabled = false));
  document.querySelector("#addNewItemBtn").disabled = false;
}
