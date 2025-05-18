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
    await db.query(
  'INSERT INTO tasks (user_id, title, description, due_date, status, priority) VALUES (?, ?, ?, ?, ?, ?)',
  [userId, title, description || '', due_date || null, status, priority || 'Normal']
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
    const [result] = await db.query(
      'UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ?, priority = ? WHERE id = ? AND user_id = ?',
      [title, description, due_date, status, priority, taskId, userId] 
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Task not found or not yours.' });
    }

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
