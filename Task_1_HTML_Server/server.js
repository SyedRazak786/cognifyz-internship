// Task 1: HTML Structure and Basic Server Interaction
// - HTML structure with forms for user input
// - Simple Node.js server using Express
// - Server-side endpoints to handle form submissions
// - Server-side rendering (EJS) to dynamically generate HTML

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Parse form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory store to simulate persistence for this simple task
const submissions = [];

// GET / -> render the form
app.get('/', (req, res) => {
  res.render('form', { title: 'Task 1 - User Registration Form' });
});

// POST /submit -> handle form submission, render result via SSR
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  const entry = {
    id: submissions.length + 1,
    name,
    email,
    message,
    submittedAt: new Date().toLocaleString()
  };
  submissions.push(entry);

  res.render('result', { title: 'Submission Received', entry });
});

// GET /submissions -> view all submissions (demonstrates server-side rendering of a list)
app.get('/submissions', (req, res) => {
  res.render('list', { title: 'All Submissions', submissions });
});

app.listen(PORT, () => {
  console.log(`Task 1 server running at http://localhost:${PORT}`);
});
