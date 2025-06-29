function addTask() {
  const input = document.getElementById("todo-input");
  const text = input.value.trim();
  if (!text) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: text });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  showTasks();
}

function showTasks() {
  const list = document.getElementById("todo-list");
  if (!list) return;

  list.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

function resetTasks() {
  if (confirm("Delete all tasks?")) {
    localStorage.removeItem("tasks");
    showTasks();
  }
}

function saveNote() {
  const notesArea = document.getElementById("notes-area");
  localStorage.setItem("notes", notesArea.value);
  alert("✅ Note saved!");
}

function resetNotes() {
  if (confirm("Delete all notes?")) {
    localStorage.removeItem("notes");
    document.getElementById("notes-area").value = "";
  }
}

window.onload = function () {
  if (document.getElementById("todo-list")) showTasks();
  if (document.getElementById("notes-area"))
    document.getElementById("notes-area").value =
      localStorage.getItem("notes") || "";
};
