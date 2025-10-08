document.addEventListener("DOMContentLoaded", loadTasks);

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ==== ADD TASK ====
function addTask() {
  let taskInput = document.getElementById("task");
  let taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Enter a task!");
    return;
  }

  let tasks = getTasksFromStorage();
  tasks.push({
    text: taskText,
    completed: false,
    date: new Date().toLocaleString(),
  });
  saveTasksToStorage(tasks);

  taskInput.value = "";
  loadTasks();
}

// ==== LOAD TASKS ====
function loadTasks(filterType = "all", searchText = "") {
  let taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  let tasks = getTasksFromStorage();

  tasks.forEach((task, index) => {
    if (filterType === "completed" && !task.completed) return;
    if (filterType === "pending" && task.completed) return;
    if (
      searchText &&
      !task.text.toLowerCase().includes(searchText.toLowerCase())
    )
      return;

    let li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
          <div class="task-info">
            <span>${task.text}</span>
            <span class="task-date">${task.date}</span>
          </div>
          <div class="actions">
            <button class="complete" onclick="toggleComplete(${index})">✔</button>
            <button class="edit" onclick="editTask(${index})">✏</button>
            <button class="delete" onclick="deleteTask(${index})">🗑</button>
          </div>
        `;
    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  let tasks = getTasksFromStorage();
  tasks[index].completed = !tasks[index].completed;
  saveTasksToStorage(tasks);
  loadTasks(
    document.getElementById("filter").value,
    document.getElementById("search").value
  );
}

// ==== EDIT TASK ====
function editTask(index) {
  let tasks = getTasksFromStorage();
  let newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasksToStorage(tasks);
    loadTasks();
  }
}

// ==== DELETE TASK ====
function deleteTask(index) {
  let tasks = getTasksFromStorage();
  tasks.splice(index, 1);
  saveTasksToStorage(tasks);
  loadTasks();
}

// ==== CLEAR ALL ====
function clearAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    localStorage.removeItem("tasks");
    loadTasks();
  }
}

// ==== SEARCH ====
function searchTasks() {
  let searchText = document.getElementById("search").value;
  loadTasks(document.getElementById("filter").value, searchText);
}

// ==== FILTER ====
function filterTasks() {
  let filterType = document.getElementById("filter").value;
  loadTasks(filterType, document.getElementById("search").value);
}

// ==== DARK MODE ====
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
