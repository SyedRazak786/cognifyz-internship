// Task 4: Complex Form Validation and Dynamic DOM Manipulation
// Static server - logic lives in public/app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Task 4 server running at http://localhost:${PORT}`);
});
