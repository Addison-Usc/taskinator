const express = require('express');
const router = express.Router();
const db = require('../db'); 
const authenticateToken = require('../authMiddleware');



router.get('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  try {
    const [comments] = await db.query(
      'SELECT c.*, u.username FROM comments c JOIN users u ON c.user_id = u.id WHERE c.task_id = ? ORDER BY c.created_at DESC',
      [taskId]
    );
    res.json({ comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});


router.post('/:taskId', authenticateToken, async (req, res) => {
  const { taskId } = req.params;
  const { content } = req.body;
  const userId = req.user?.id;

  if (!content) return res.status(400).json({ error: 'Comment content required' });

  try {
    await db.query(
      'INSERT INTO comments (task_id, user_id, content) VALUES (?, ?, ?)',
      [taskId, userId, content]
    );
    res.json({ message: 'Comment added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to post comment' });
  }
});

router.delete('/:commentId', authenticateToken, async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user?.id;

  try {
    const [rows] = await db.query(
      'DELETE FROM comments WHERE id = ? AND user_id = ?',
      [commentId, userId]
    );
    if (rows.affectedRows === 0) {
      return res.status(403).json({ error: 'Not authorized to delete this comment.' });
    }
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

module.exports = router;
