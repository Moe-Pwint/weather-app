//This is the logic for new project icon in the bottom left container.
//When clicked, it will call the tiny window where a new project can be made.
export { addNewProjectByIcon };

import { displayNewFolderWindow } from "./add-new-project.js";

function addNewProjectByIcon() {
  const newProjectBtn = document.querySelector("#addProjectIcon");
  newProjectBtn.addEventListener("click", () => {
    displayNewFolderWindow();
  });
}
