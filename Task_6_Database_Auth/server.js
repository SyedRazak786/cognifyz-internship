// Task 6: Database Integration and User Authentication
// - MongoDB integration via Mongoose
// - User authentication (register/login) with hashed passwords + JWT
// - Secured API endpoints via authorization middleware

const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require('./config');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Task 6 API is running.',
    endpoints: [
      'POST /auth/register',
      'POST /auth/login',
      'GET /api/tasks (auth required)',
      'POST /api/tasks (auth required)',
      'PUT /api/tasks/:id (auth required)',
      'DELETE /api/tasks/:id (auth required)'
    ]
  });
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Task 6 server running at http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    console.error('Make sure MongoDB is running and MONGO_URI in .env is correct.');
    process.exit(1);
  });
