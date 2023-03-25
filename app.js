// Get DOM elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Initialize task array
let tasks = [];

// Add event listener to add button
addBtn.addEventListener("click", () => {
  if (taskInput.value !== "") {
    addTask(taskInput.value);
    taskInput.value = "";
  }
});

// Add event listener to dark mode toggle
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});

// Add task to list and array
function addTask(taskText) {
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };
  tasks.push(task);
  renderTasks();
}

// Render tasks in list
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    li.innerHTML = `
      <input type="checkbox">
      <span>${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;
    if (task.completed) {
      li.classList.add("completed");
      li.querySelector("input[type='checkbox']").checked = true;
    }
    taskList.appendChild(li);

    // Add event listener to checkbox
    li.querySelector("input[type='checkbox']").addEventListener(
      "change",
      () => {
        toggleTaskCompleted(task.id);
      }
    );

    // Add event listener to delete button
    li.querySelector(".delete-btn").addEventListener("click", () => {
      deleteTask(task.id);
    });
  });
}

// Toggle task completed state
function toggleTaskCompleted(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
      if (task.completed) {
        const li = taskList.querySelector(`li[data-id='${id}']`);
        li.classList.add("fade-out");
        setTimeout(() => {
          deleteTask(id);
        }, 1000);
      }
    }
    return task;
  });
}

// Delete task from array and list
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Add event listener to task input
taskInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    // check if Enter key was pressed
    addTask(taskInput.value);
    taskInput.value = "";
  }
});
