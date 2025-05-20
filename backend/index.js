/**
 * Author: Addison Uscinowicz
 * -- Main backend entry point. Sets up Express, middleware, and routes.
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/comments', require('./routes/comments'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
