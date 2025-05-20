/**
 * Author: Addison Uscinowicz
 * -- Defines task-related API routes
 */

const express = require('express');
const router = express.Router();
const db = require('../db');
const verifyToken = require('../authMiddleware');

router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const [tasks] = await db.query(
      'SELECT * FROM tasks WHERE user_id = ?',
      [userId]
    );

    res.json({ tasks });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Server error retrieving tasks' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const { title, description, due_date, status, priority } = req.body;

  if (!title || !status) {
    return res.status(400).json({ error: 'Title and status are required.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO tasks (user_id, title, description, due_date, status, priority) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, title, description || '', due_date || null, status, priority || 'Normal']
    );

    await db.query(
      'INSERT INTO task_audit (task_id, user_id, action) VALUES (?, ?, ?)',
      [result.insertId, userId, `Created task: "${title}"`]
    );

    res.status(201).json({ message: 'Task created successfully!' });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Server error creating task' });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;
  const { title, description, due_date, status, priority } = req.body;

  try {
    const [currentTaskRows] = await db.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [taskId, userId]
    );

    const current = currentTaskRows[0];
    if (!current) return res.status(404).json({ error: 'Task not found or not yours.' });

    const [result] = await db.query(
      'UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ?, priority = ? WHERE id = ? AND user_id = ?',
      [title, description, due_date, status, priority, taskId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found or not yours.' });
    }

    let changes = [];
    const currentDue = current.due_date?.toISOString().split('T')[0];

    if (title !== current.title) changes.push(`title: "${current.title}" -> "${title}"`);
    if (description !== current.description) changes.push(`description: "${current.description}" -> "${description}"`);
    if (due_date !== currentDue) changes.push(`due_date: ${currentDue} -> ${due_date}`);
    if (status !== current.status) changes.push(`status: ${current.status} -> ${status}`);
    if (priority !== current.priority) changes.push(`priority: ${current.priority} -> ${priority}`);

    const actionText = `Updated task "${current.title}" -- ${changes.join(', ')}`;

    await db.query(
      'INSERT INTO task_audit (task_id, user_id, action) VALUES (?, ?, ?)',
      [taskId, userId, actionText]
    );

    res.json({ message: 'Task updated successfully!' });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Server error updating task' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const [rows] = await db.query(
      'SELECT title FROM tasks WHERE id = ? AND user_id = ?',
      [taskId, userId]
    );

    const task = rows[0];
    const taskTitle = task?.title || `Task ${taskId}`;

    await db.query(
      'INSERT INTO task_audit (task_id, user_id, action) VALUES (?, ?, ?)',
      [taskId, userId, `Deleted task "${taskTitle}"`]
    );

    const [result] = await db.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [taskId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found or not yours.' });
    }

    res.json({ message: 'Task deleted successfully!' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Server error deleting task' });
  }
});

module.exports = router;
