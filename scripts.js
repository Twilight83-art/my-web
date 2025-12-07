const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

// Load tasks on page start
document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(text => addTask(text));
});

// Add new task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;
  addTask(text);
  saveTasks();
  taskInput.value = "";
});

// Create task element
function addTask(text) {
  const li = document.createElement("li");

  const spanText = document.createElement("span");
  spanText.textContent = text;

  const del = document.createElement("span");
  del.textContent = "✖";
  del.className = "delete";
  del.onclick = () => { li.remove(); saveTasks(); };

  li.appendChild(spanText);
  li.appendChild(del);
  taskList.appendChild(li);
}

// Save tasks
function saveTasks() {
  const tasks = [...taskList.querySelectorAll("li span:first-child")]
    .map(span => span.textContent);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}