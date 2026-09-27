// Task 5: Front-end that fetches, creates, updates, and deletes tasks
// via our own RESTful API at /api/tasks

const listEl = document.getElementById('taskList');
const statusEl = document.getElementById('status');
const newTitleInput = document.getElementById('newTitle');
const addBtn = document.getElementById('addBtn');

async function loadTasks() {
  statusEl.textContent = 'Loading tasks...';
  try {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    renderTasks(tasks);
    statusEl.textContent = `${tasks.length} task(s) loaded from API.`;
  } catch (err) {
    statusEl.textContent = 'Failed to load tasks: ' + err.message;
  }
}

function renderTasks(tasks) {
  listEl.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.done ? 'done' : '';

    const span = document.createElement('span');
    span.textContent = task.title;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'btn-toggle';
    toggleBtn.textContent = task.done ? 'Undo' : 'Done';
    toggleBtn.addEventListener('click', () => toggleTask(task));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    actions.appendChild(toggleBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actions);
    listEl.appendChild(li);
  });
}

async function addTask() {
  const title = newTitleInput.value.trim();
  if (!title) return;
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  if (res.ok) {
    newTitleInput.value = '';
    loadTasks();
  } else {
    const err = await res.json();
    alert(err.error || 'Failed to add task');
  }
}

async function toggleTask(task) {
  await fetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done: !task.done })
  });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

addBtn.addEventListener('click', addTask);
newTitleInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

loadTasks();
