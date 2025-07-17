export {
  changeProjectTabsColor,
  createEle,
  createLabel,
  createInput,
  createButton,
  checkInputFieldStatus,
  disableOtherTabs,
  enableOtherTabs,
  truncateString,
};

import plusPurple from "./svg/plusPurple.svg";
import editPurple from "./svg/editPurple.svg";
import disabledPlus from "./svg/disabledPlus.svg";
import disabledEdit from "./svg/disabledEdit.svg";

// function appendTransparentBackdrop() {
//     const backdrop = createEle('div');
//     backdrop.setAttribute('id', 'transparent-backdrop');
//     const leftContainer = document.querySelector('#leftContainer');
//     leftContainer.appendChild(backdrop);
// }

// function removeTransparentBackdrop() {
//     const backdrop = document.querySelector('#transparent-backdrop');
//     backdrop.remove();
// }

function createEle(ele) {
  return document.createElement(ele);
}

function createLabel(forValue, text) {
  const label = createEle("label");
  label.setAttribute("for", forValue);
  if (text) {
    label.textContent = text;
  }

  return label;
}

function createInput(typeValue, idValue, classValue, defaultText) {
  const input = createEle("input");
  if (typeValue) input.setAttribute("type", typeValue);
  if (typeValue) input.setAttribute("id", idValue);
  if (idValue) input.setAttribute("name", idValue);
  if (classValue) input.setAttribute("class", classValue);
  defaultText && input.setAttribute("placeholder", defaultText);

  return input;
}

function createButton(iconSrc, textValue, classValue) {
  const button = createEle("button");

  const icon = createEle("img");

  icon.src = iconSrc;
  button.appendChild(icon);

  if (textValue) {
    const text = createEle("p");
    text.textContent = textValue;
    button.appendChild(text);
  }

  if (classValue) {
    button.setAttribute("class", classValue);
  }

  return button;
}

function checkInputFieldStatus() {
  const inputBtns = document.querySelectorAll(".inputButton");
  const inputFields = document.getElementsByClassName("inputField");

  function focusInputFieldByBtn() {
    inputBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.previousElementSibling.focus();
      });
    });
  }

  function disableBtnWhenFocus() {
    for (const field of inputFields) {
      field.addEventListener("focus", () => {
        const btn = field.nextElementSibling;
        let newValues;
        if (field.value !== "") {
          newValues = replaceBtnContents(disabledEdit, "Edit");
        } else {
          newValues = replaceBtnContents(disabledPlus, "Add");
        }
        btn.replaceChildren(...newValues);
        btn.disabled = true;
      });
    }
  }

  function checkUnfocusStatus() {
    for (const field of inputFields) {
      field.addEventListener("focusout", () => {
        const btn = field.nextElementSibling;
        let newValues;
        if (field.value == "") {
          newValues = replaceBtnContents(plusPurple, "Add");
        } else {
          newValues = replaceBtnContents(editPurple, "Edit");
        }
        btn.disabled = !btn.disabled;
        btn.replaceChildren(...newValues);
      });
    }
  }

  focusInputFieldByBtn();
  disableBtnWhenFocus();
  checkUnfocusStatus();
}

function replaceBtnContents(iconSrc, textValue) {
  const icon = createEle("img");
  icon.src = iconSrc;
  const text = createEle("p");
  text.textContent = textValue;

  return [icon, text];
}

//TABS

function disableOtherTabs(mainTab) {
  const allTabs = document.querySelectorAll(".tabButton");
  for (const tab of allTabs) {
    if (tab !== mainTab) {
      tab.disabled = true;
    }
  }
}

function enableOtherTabs(mainTab) {
  const allTabs = document.querySelectorAll(".tabButton");
  for (const tab of allTabs) {
    if (tab !== mainTab) {
      tab.disabled = false;
    }
  }
}

function changeProjectTabsColor() {
  const container = document.querySelector("#leftContainer");
  container.addEventListener("click", (event) => {
    const tab = event.target.closest(".tabButton");

    const allTabs = document.querySelectorAll(".tabButton");
    for (const eachTab of allTabs) {
      if (eachTab.classList.contains("active-yellow")) {
        eachTab.classList.remove("active-yellow");
      }
    }

    if (tab && container.contains(tab)) {
      tab.classList.add("active-yellow");
    }
  });
}

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return [str.slice(0, maxLength - 3), "..."].join("");
  }
  return str;
}
