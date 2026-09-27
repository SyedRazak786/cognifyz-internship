// Task 5: API Integration and Front-End Interaction
// - RESTful API endpoints for CRUD operations
// - Front-end interface interacting with our own API
// - Fetch and display data from the API

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory "tasks" resource
let tasks = [
  { id: 1, title: 'Learn Express.js', done: false },
  { id: 2, title: 'Build a REST API', done: false }
];
let nextId = 3;

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// GET single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// CREATE task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = { id: nextId++, title: title.trim(), done: false };
  tasks.push(task);
  res.status(201).json(task);
});

// UPDATE task
app.put('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  const { title, done } = req.body;
  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;
  res.json(task);
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  const removed = tasks.splice(index, 1);
  res.json(removed[0]);
});

app.listen(PORT, () => {
  console.log(`Task 5 server running at http://localhost:${PORT}`);
});
