// Task 2: Inline Styles, Basic Interaction, and Server-Side Validation
// - Extend HTML with more complex forms and user interactions
// - Inline JavaScript for client-side form validation
// - Server-side validation for submitted form data
// - Store validated data in temporary server-side storage

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Temporary server-side storage (in-memory)
const tempStorage = [];

function validate({ username, email, password, age }) {
  const errors = [];
  if (!username || username.trim().length < 3) {
    errors.push('Username must be at least 3 characters.');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('A valid email address is required.');
  }
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters.');
  }
  const ageNum = Number(age);
  if (!age || Number.isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
    errors.push('Age must be a number between 13 and 120.');
  }
  return errors;
}

app.get('/', (req, res) => {
  res.render('form', { errors: [], old: {} });
});

app.post('/submit', (req, res) => {
  const { username, email, password, age } = req.body;
  const errors = validate({ username, email, password, age });

  if (errors.length > 0) {
    // Server-side validation failed -> re-render form with errors
    return res.status(400).render('form', { errors, old: req.body });
  }

  // Store validated data temporarily (never store plaintext passwords in real apps)
  const record = {
    id: tempStorage.length + 1,
    username,
    email,
    age,
    createdAt: new Date().toISOString()
  };
  tempStorage.push(record);

  res.render('success', { record, total: tempStorage.length });
});

app.get('/storage', (req, res) => {
  res.json(tempStorage);
});

app.listen(PORT, () => {
  console.log(`Task 2 server running at http://localhost:${PORT}`);
});
