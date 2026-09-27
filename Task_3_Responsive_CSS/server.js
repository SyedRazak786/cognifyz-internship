// Task 3: Advanced CSS Styling and Responsive Design
// The core work is in public/index.html + public/css/style.css
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Task 3 server running at http://localhost:${PORT}`);
});
