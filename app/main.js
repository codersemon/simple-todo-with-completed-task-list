// task input selection
const task = document.querySelector(".add-form input");
// task add button selection
const addBtn = document.querySelector(".add-form button");
// pending task output selection
const pendingTaskWrap = document.querySelector(".pending-tasks ul");
// completed task output selection
const completedTaskWrap = document.querySelector(".completed-tasks ul");

let pendingTasks = getDataFromLS("pending_task");
let completedTasks = getDataFromLS("completed_task");

// add task on button click
addBtn.onclick = () => {
  addNewTask();
};

// add task on input enter
task.onkeypress = (e) => {
  if (e.key == "Enter") {
    addNewTask();
  }
};

// input css styling on keyup
task.onkeyup = () => {
  !task.value.trim()
    ? (task.style.borderColor = "red")
    : (task.style.borderColor = "green");
};

/**
 * Add new task
 */
function addNewTask() {
  // if task input not empty
  if (task.value.trim()) {
    pendingTasks.push(task.value);

    sendDataToLS("pending_task", pendingTasks);
    showPendingTasks();
  }

  // validation for input style
  !task.value.trim()
    ? (task.style.borderColor = "red")
    : (task.style.borderColor = "#ccc");

  // clear input
  task.value = "";
}

/**
 * Show Pending Tasks
 */
function showPendingTasks() {
  let pendingTaskHTML = "";
  pendingTasks.reverse().forEach((item) => {
    pendingTaskHTML += `<li class="d-flex"><p><i class="fa-regular fa-hourglass-end"></i> ${item}</p> <p class="action"><button class="btn complete-btn" onclick="completePendingTasks('${item}')"><i class="fa-regular fa-check"></i></button> <button class="btn delete-btn" onclick="deletePendingTasks('${item}')"><i class="fa-regular fa-trash"></i></button></p></li>`;
  });
  pendingTaskWrap.innerHTML = pendingTaskHTML;

  //   if pending task is empty
  if (pendingTasks.length == 0) {
    pendingTaskWrap.innerHTML = `<h5>No pending task available!</h5>`;
  }
}
showPendingTasks();

/**
 * Delete Pending Tasks
 */
function deletePendingTasks(deleteItem) {
  const updatedTasks = pendingTasks.filter((item) => item != deleteItem);
  pendingTasks = updatedTasks;
  sendDataToLS("pending_task", pendingTasks);
  showPendingTasks();
}

/**
 * Complete pending tasks
 */
function completePendingTasks(completeItem) {
  const newPendingTasks = pendingTasks.filter((item) => item != completeItem);
  pendingTasks = newPendingTasks;

  // update pending tasks on LS
  sendDataToLS("pending_task", pendingTasks);
  showPendingTasks();

  // add to completed task
  addCompletedTask(completeItem);
}

/**
 * Show Completed tasks
 */

function showCompletedTasks() {
  let completedTasksHTML = "";
  completedTasks.reverse().forEach((item) => {
    completedTasksHTML += `<li class="d-flex"><p><i class="fa-regular fa-check"></i> ${item}</p> <p class="action"><button class="btn delete-btn"><i class="fa-regular fa-trash" onclick="deleteCompletedTasks('${item}')"></i></button></p></li>`;
  });
  completedTaskWrap.innerHTML = completedTasksHTML;

  //   if completd task is empty
  if (completedTasks.length == 0) {
    completedTaskWrap.innerHTML = `<h5>No completed task available!</h5>`;
  }
}
showCompletedTasks();

/**
 * Delete Completed Task
 */
function deleteCompletedTasks(deleteItem) {
  const newCompleteTasks = completedTasks.filter((item) => item != deleteItem);
  completedTasks = newCompleteTasks;

  // update completed task on LS
  sendDataToLS("completed_task", completedTasks);
  showCompletedTasks();
}

/**
 * Add completed tasks
 */

function addCompletedTask(completedTask) {
  completedTasks.push(completedTask);

  // update completed task on LS
  sendDataToLS("completed_task", completedTasks);
  showCompletedTasks();
}
