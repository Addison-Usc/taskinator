/**
 * Author: Addison Uscinowicz
 * -- Handles user registration, login, and token-based authentication logic.
 */

const express = require('express');
const router = express.Router();
const db = require('../db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../authMiddleware');


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const [existingUser] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    const userId = result.insertId;

    const token = jwt.sign(
      { id: userId, username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User registered successfully!', token });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Look up user by email
    const [userRows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (userRows.length === 0) {
      // No user
      return res.status(401).json({ error: 'Invalid email or password.' });
    }


    const user = userRows[0];
    console.log('✅ User found:', user);

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful!', token });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});


router.get('/protected', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, username, email FROM users WHERE id = ?', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });

    res.json({ user: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});



router.delete('/users/me', verifyToken, async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.user.id]);
    res.json({ message: 'User account deleted successfully.' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Server error deleting user.' });
  }
});

router.put('/users/me', verifyToken, async (req, res) => {
  const { username, email, password } = req.body;
  const updates = [];
  const values = [];

  if (username) {
    updates.push('username = ?');
    values.push(username);
  }

  if (email) {
    updates.push('email = ?');
    values.push(email);
  }

  if (password) {
    const hashed = await bcrypt.hash(password, 10);
    updates.push('password_hash = ?');
    values.push(hashed);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  values.push(req.user.id); 

  try {
    await db.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});








module.exports = router;
