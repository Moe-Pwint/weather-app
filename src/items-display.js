import {
  itemObjects,
  taskObjects,
  updateStorage,
} from "./objects-n-classes.js";

//When the open-task-page.js is loaded, items will be displayed using the logics in this file.
export { createItemDisplay, createCheckbox, changeCircle };

import {
  createButton,
  createEle,
  createLabel,
  createInput,
  checkInputFieldStatus,
} from "./helper-functions.js";
import {
  loadPrioritySelectOptions,
  assignPriorityOnChange,
} from "./new-item-details.js";
//svg imports
import portraitDots from "./svg/portraitDots.svg";
import plusPurple from "./svg/plusPurple.svg";
import editPurple from "./svg/editPurple.svg";

function createItemDisplay(itemObj) {
  const itemsContainer = document.querySelector("#itemsContainer");

  const itemTab = createEle("div");
  itemTab.id = itemObj.itemId;
  itemTab.setAttribute("class", "item-tab");
  itemsContainer.appendChild(itemTab);

  const itemCircle = createEle("div");
  itemCircle.setAttribute("class", "circle");
  changeCircle(itemCircle, itemObj.itemPriority);
  itemTab.appendChild(itemCircle);

  const itemName = createEle("p");
  itemName.setAttribute("class", "item-display-name");
  itemName.textContent = itemObj.itemName;
  itemTab.appendChild(itemName);

  //checkbox section
  const checkbox = createCheckbox(itemObj.markStatus);

  checkbox.firstChild.addEventListener("change", () => {
    if (checkbox.firstChild.checked == true) {
      itemObj.markStatus = true;
      checkbox.lastChild.textContent = "Unmark";
    } else {
      itemObj.markStatus = false;
      checkbox.lastChild.textContent = "Mark as done";
    }
    updateStorage();
  });
  itemTab.appendChild(checkbox);

  //button to edit item
  const itemEditBtn = createButton(portraitDots);
  itemEditBtn.setAttribute("class", "allItemEditBtns");
  itemTab.appendChild(itemEditBtn);
  itemEditBtn.addEventListener("click", () => {
    editItem(itemObj, itemName, itemCircle);
    document.querySelectorAll(".allItemEditBtns").forEach((btn) => {
      btn.disabled = true;
    });
  });
}

function changeCircle(circleEle, priorityStatus) {
  if (priorityStatus == "Low") circleEle.style.backgroundColor = "var(--green)";
  if (priorityStatus == "Medium")
    circleEle.style.backgroundColor = "var(--yellow)";
  if (priorityStatus == "High") circleEle.style.backgroundColor = "var(--red)";
}

function createCheckbox(markStat) {
  const checkboxContainer = createEle("div");
  checkboxContainer.setAttribute("class", "checkboxContainer");
  const checkbox = createEle("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox");
  checkboxContainer.appendChild(checkbox);
  const checkboxText = createEle("p");
  if (markStat) {
    checkbox.checked = true;
    checkboxText.textContent = "Unmark";
  } else {
    checkbox.checked = false;
    checkboxText.textContent = "Mark as done";
  }
  checkboxContainer.appendChild(checkboxText);
  return checkboxContainer;
}

function editItem(itemObj, itemNameTop, circle) {
  document.querySelector("#addNewItemBtn").disabled = true;
  const editItemContainer = createEle("div");
  editItemContainer.id = "editItemContainer";
  const targetItem = document.getElementById(itemObj.itemId);
  targetItem.appendChild(editItemContainer);
  // targetItem.insertAdjacentElement("afterend", editItemContainer);

  //body section
  const detailsText = createEle("p");
  detailsText.textContent = "Details:";
  detailsText.setAttribute("class", "itemDetailsContainers");
  editItemContainer.appendChild(detailsText);

  //item Name Section
  const itemNameContainer = createEle("div");
  itemNameContainer.setAttribute("class", "itemDetailsContainers");
  editItemContainer.appendChild(itemNameContainer);

  const itemNameLabel = createLabel("itemName", "*Item Name:");
  itemNameContainer.appendChild(itemNameLabel);

  const itemNameInput = createInput(
    "text",
    "itemName",
    "inputField",
    "Add item name",
  );
  itemNameInput.value = itemObj.itemName;
  itemNameContainer.appendChild(itemNameInput);

  if (itemNameInput.value) {
    const itemNameAddBtn = createButton(editPurple, "Edit", "inputButton");
    itemNameContainer.appendChild(itemNameAddBtn);
  } else {
    const itemNameAddBtn = createButton(plusPurple, "Add", "inputButton");
    itemNameContainer.appendChild(itemNameAddBtn);
  }

  itemNameInput.addEventListener("input", (event) => {
    itemNameTop.textContent = event.target.value;
  });

  //item description Section
  const itemDescriptionContainer = createEle("div");
  itemDescriptionContainer.setAttribute("class", "itemDetailsContainers");
  editItemContainer.appendChild(itemDescriptionContainer);

  const itemDescriptionLabel = createLabel("itemDescription", "Description:");
  itemDescriptionContainer.appendChild(itemDescriptionLabel);

  const itemDescriptionInput = createInput(
    "text",
    "itemDescription",
    "inputField",
  );
  itemDescriptionInput.value = itemObj.itemDescription;
  itemDescriptionContainer.appendChild(itemDescriptionInput);

  if (itemDescriptionInput.value) {
    const itemDescriptionAddBtn = createButton(
      editPurple,
      "Edit",
      "inputButton",
    );
    itemDescriptionContainer.appendChild(itemDescriptionAddBtn);
  } else {
    const itemDescriptionAddBtn = createButton(
      plusPurple,
      "Add",
      "inputButton",
    );
    itemDescriptionContainer.appendChild(itemDescriptionAddBtn);
  }

  //item Date Picker Section
  const itemDateContainer = createEle("div");
  itemDateContainer.setAttribute("class", "itemDetailsContainers");
  editItemContainer.appendChild(itemDateContainer);

  const itemDateLabel = createLabel("itemDate", "Due date:");
  itemDateContainer.appendChild(itemDateLabel);

  const itemDateInput = createInput("date", "itemDate");
  itemDateInput.value = itemObj.itemDueDate;
  itemDateContainer.appendChild(itemDateInput);

  //set priority section
  const priorityContainer = createEle("div");
  priorityContainer.setAttribute("class", "itemDetailsContainers");
  editItemContainer.appendChild(priorityContainer);

  const priorityLabel = createLabel("priority", "Priority:");
  priorityContainer.appendChild(priorityLabel);

  const priorityInput = createInput("text", "priorityInput");
  priorityInput.readOnly = true;
  priorityInput.value = itemObj.itemPriority;
  priorityContainer.appendChild(priorityInput);

  const select = createEle("select");
  select.setAttribute("id", "selectingPriority");
  select.setAttribute("class", "inputButton");
  priorityContainer.appendChild(select);
  loadPrioritySelectOptions();
  select.value = itemObj.itemPriority;
  //select.addEventListener('focus', loadPrioritySelectOptions);
  select.addEventListener("change", () => changeCircle(circle, select.value));
  assignPriorityOnChange();
  checkInputFieldStatus();

  //Main Action Buttons tab
  const mainActionBtnsContainer = createEle("div");
  mainActionBtnsContainer.setAttribute("class", "mainActionBtnsContainer");
  editItemContainer.appendChild(mainActionBtnsContainer);

  const editItemActionBtn = createEle("button");
  editItemActionBtn.addEventListener("click", () => saveItemSubmit(itemObj));
  editItemActionBtn.setAttribute("class", "mainActionBtns editItemActionBtn");
  editItemActionBtn.textContent = "Save and Close";
  mainActionBtnsContainer.appendChild(editItemActionBtn);

  const itemDelBtn = createEle("button");
  itemDelBtn.setAttribute("class", "mainActionBtns delActionBtn");
  itemDelBtn.textContent = "Delete Item";
  mainActionBtnsContainer.appendChild(itemDelBtn);
  itemDelBtn.addEventListener("click", () => deleteItem(itemObj));

  document.querySelectorAll(".inputField").forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        event.preventDefault();
        saveItemSubmit(itemObj);
      }
    });
  });
}

function saveItemSubmit(itemObj) {
  const itemName = document.querySelector("#itemName").value;
  const itemDescription = document.querySelector("#itemDescription").value;
  const itemDate = document.querySelector("#itemDate").value;
  const itemPriority = document.querySelector("#priorityInput").value;

  if (!itemName) {
    alert("Please add the name of the task item.");
  } else {
    itemObj.itemName = itemName;
    itemObj.itemDescription = itemDescription;
    itemObj.itemDueDate = itemDate;
    itemObj.itemPriority = itemPriority;
    updateStorage();
    closeItemContainer();
  }
}

function closeItemContainer() {
  const container = document.querySelector("#editItemContainer");
  document.querySelector("#addNewItemBtn").disabled = false;
  container.remove();
  document
    .querySelectorAll(".allItemEditBtns")
    .forEach((btn) => (btn.disabled = false));
}

function deleteItem(itemObj) {
  const itemId = itemObj.itemId;
  document.getElementById(itemId).remove();
  const parentTask = taskObjects.find((obj) => obj.itemsList.includes(itemId));
  parentTask.itemsList.splice(parentTask.itemsList.indexOf(itemId), 1);
  const index = itemObjects.indexOf(itemObj);
  itemObjects.splice(index, 1);
  document
    .querySelectorAll(".allItemEditBtns")
    .forEach((btn) => (btn.disabled = false));
  document.querySelector("#addNewItemBtn").disabled = false;
  updateStorage();
}
