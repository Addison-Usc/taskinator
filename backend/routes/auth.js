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
    //  Check if email already exists
    const [existingUser] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    await db.query(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Server error checking email.' });
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


router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'You accessed a protected route!',
    user: req.user // this contains the decoded token
  });
});



















module.exports = router;
