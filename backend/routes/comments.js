const express = require('express');
const router = express.Router();

router.get('/test-comment', (req, res) => {
  res.send('Comments route working!');
});

module.exports = router;
