------------------------------------------------  Summary of each js file  ------------------------------------------------

1. index.js
        //This is the main js file.
                import "./styles.css";
                import "./main-ui.js";
                import "./add-new-task.js";

2. helper-functions.js
        //Universal functions shared across the js files are saved here.
                export { changeProjectTabsColor, createEle, createLabel, createInput, createButton, checkInputFieldStatus, disableOtherTabs, enableOtherTabs};

3. main-ui.js
        //This file generates all the beginning UI elements onto the page.
                import "./styles.css";
                import {changeProjectTabsColor, disableOtherTabs, createEle} from './helper-functions.js';
                import {addNewProjectByIcon} from './new-project-btn.js';
                import {createSampleTabs, projectObjects, taskObjects, itemObjects} from './objects-n-classes.js';
                import {createTaskDetailsBox} from './add-new-task.js';
                        //images import
                        import odinImage from "./images/odin.png";
                        import plus from "./svg/plus.svg";
                        import search from "./svg/search.svg";
                        import today from "./svg/today.svg";
                        import addProject from "./svg/addProject.svg";
                        import del from "./svg/del.svg";
                        import portraitDots from './svg/portraitDots.svg';

4.add-new-project.js
        //This is the tiny window that opens up and you can create a new project folder.
                export {displayNewFolderWindow};
                import './styles.css';
                import { projectObjects, NewProject } from "./objects-n-classes.js";
                import {createEle, createLabel, createInput} from "./helper-functions.js";
                import {updateAllProjectsTabs} from './all-projects-tabs.js';

5. add-new-task.js
        //When the top left tab "Add New Task" is clicked, this page is generated and a new task is created.
                export {loadChooseFolder,createTaskDetailsBox};
                import "./styles.css";
                import { projectObjects, taskObjects, NewTask, } from "./objects-n-classes.js";
                import { createEle, createLabel, createInput, createButton, checkInputFieldStatus, enableOtherTabs} from "./helper-functions.js";
                import { displayNewFolderWindow} from "./add-new-project.js";
                import {updateProjectTasksTabs} from "./all-projects-tabs.js";

6. all-projects-tabs.js
        //displaying and updating the projects and tasks tabs in the bottom left container.
        //When clicking these tabs, project/task page opens up on the right container.
        //Project tabs containers' ids are assigned their project's projectId number. 
        //Task tabs' ids are assigned their task's taskId number.
                export {updateAllProjectsTabs, updateProjectTasksTabs};
                import { createEle } from "./helper-functions";
                import './styles.css';
                import {openTaskPage} from "./open-task-page.js";
                import {openFolderPage} from "./open-folder-page.js";
                        //svg imports
                        import folder from "./svg/folder.svg";
                        import arrowDownRight from "./svg/arrow-down-right.svg";

7. new-project-btn.js
        //This is the logic for new project icon in the bottom left container.
        //When clicked, it will call the tiny window where a new project can be made.
                export {addNewProjectByIcon};
                import {displayNewFolderWindow} from './add-new-project.js';

8. objects-n-classes.js
        //this file keeps the projectObjects array and taskObjectsArray.
        //It also has two classes to create a task object and a project object.
                export {projectObjects, taskObjects, itemObjects, NewTask, NewProject, NewItem, createSampleTabs};
                import {updateAllProjectsTabs, updateProjectTasksTabs} from './all-projects-tabs.js';

9. open-task-page.js
        //When a task tab on the left bottom container is clicked, the task details are shown on the right container.
        //Task items can be added here.
        //Task object can be modified/deleted from this file.
                export {openTaskPage};
                import './styles.css';
                import {itemObjects, taskObjects} from'./objects-n-classes.js';
                import {createButton, createEle, createInput, createLabel} from './helper-functions.js';
                import {newItemDetails} from './new-item-details.js';
                import { createItemDisplay } from './items-display.js';
                import { loadChooseFolder } from './add-new-task.js';
                        //svg imports
                        import taskEdit from './svg/taskEdit.svg';
                        import plusWhite from './svg/plusWhite.svg';
                        import editPurple from './svg/editPurple.svg';
                        import newFolder from './svg/newFolder.svg';


10. new-item-details.js
        //This is the logic to create a new item in open-task-page.js. Then, item is saved in itemObjects array.
                export {newItemDetails, loadPrioritySelectOptions,  assignPriorityOnChange};
                import {itemObjects, NewItem } from "./objects-n-classes.js";
                import {createEle, createLabel, createInput, createButton, checkInputFieldStatus} from './helper-functions.js';
                import {createItemDisplay, createCheckbox, changeCircle, assignPriorityOnChange} from './items-display.js';
                        //svg imports
                        import plusPurple from './svg/plusPurple.svg';

11. items-display.js
        //When the open-task-page.js is loaded, items will be displayed using the logics in this file.
                export {createItemDisplay, createCheckbox, changeCircle};
                import { createEle, createButton, createLabel, createInput, checkInputFieldStatus } from "./helper-functions";
                import {loadPrioritySelectOptions, assignPriorityOnChange} from './new-item-details.js';
                        //svg imports
                        import portraitDots from './svg/portraitDots.svg';
                        import plusPurple from './svg/plusPurple.svg';
                        import editPurple from"./svg/editPurple.svg";

12. open-folder-page.js
        //When a folder tab is clicked from the left bottom container, folder contents will collapse.
                export {openFolderPage};
                import './styles.css';
                import { itemObjects, taskObjects, projectObjects } from './objects-n-classes';
                import {createEle, createButton, createLabel, createInput} from './helper-functions.js';
                        //svg imports
                        import projectEdit from './svg/taskEdit.svg';



------------------------------------------------Brainstorming App Structure------------------------------------------------

Let's think about how many modules we're gonna need.

------------CSS------------

- Main display on the left section module
        #Logo
        #Discover
        #Add a new task
        #Search task or project
        #Today

- Main display on left - projects section
        #My projects
        #Add new project icon
        #sample project folder
        #deleted tasks tab

        
- Main display on the right section module
        #Basically empty (default -Today task shown)



------------Logics------------

------------Logic for:------------

- Adding a new task
- Searching task or project
- Sorting Today due items from all projects and tasks
- clicking the task files in project folders

- 



------------Client can:------------

1. Add a new task

2. Search task or project

3. Check Today Due items

4. Click on made project folders

5. Select a task file from a project folder

6. Add and Edit Task:
        a. Add a new task details:
                #Add task name
                #choose project folder (OR) #create new project
                #add description
                #add notes
                #add task (OR) #cancel task

        b. Edit existing task details:
                #Edit task name
                #change project folder (OR) #create new project
                #add or edit description
                #add or edit notes
                #Save edits (OR) #cancel task


7. Manipulate ITEMS: 
        a. Add a new item in a task:
                see details
                #mark as done
                #Set item name
                #add description
                #pick due date
                #set priority
                #add item
                #cancel item adding

        b. Edit an existing unmarked item:
                #mark as done
                #click on details icon
                see details
                #edit item name
                #add or edit description
                #pick or edit due date
                #set or edit priority
                #save edit (OR) #delete item

        c. Edit a marked as done item:
                #Unmark
                #click on delete icon
                #click on details icon
                see details
                #edit item name
                #add or edit description
                #pick or edit due date
                #set or edit priority
                #save edit (OR) #delete item

8. Select empty project(s):
        #delete project
        #add new task

9. Select Deleted tasks:
        #See the deleted tasks
        #Recover the deleted task (and its parent folder if it's empty)






{
  "devDependencies": {
    "css-loader": "^7.1.2",
    "html-loader": "^5.1.0",
    "html-webpack-plugin": "^5.6.3",
    "style-loader": "^4.0.0",
    "svg-inline-loader": "^0.8.2",
    "webpack-cli": "^6.0.1",
    "webpack-dev-server": "^5.2.1",
    "webpack-merge": "^6.0.1"
  },
  "scripts": {
    "start": "webpack serve --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js",
    "deploy": "git subtree push --prefix dist origin gh-pages --force"
  }
}
