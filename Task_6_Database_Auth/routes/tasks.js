const express = require('express');
const Task = require('../models/Task');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// All routes below require a valid JWT (secured API endpoints)
router.use(requireAuth);

// GET /api/tasks - only the logged-in user's tasks
router.get('/', async (req, res) => {
  const tasks = await Task.find({ owner: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
});

// POST /api/tasks
router.post('/', async (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = await Task.create({ title: title.trim(), owner: req.userId });
  res.status(201).json(task);
});

// PUT /api/tasks/:id - only if it belongs to the logged-in user
router.put('/:id', async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, owner: req.userId });
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, done } = req.body;
  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;
  await task.save();
  res.json(task);
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.userId });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

module.exports = router;
