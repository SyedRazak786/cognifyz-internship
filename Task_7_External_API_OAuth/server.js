// Task 7: Advanced API Usage and External API Integration
// - OAuth-style client-credentials authentication
// - External API integration (official-joke-api, agify.io)
// - Rate limiting via express-rate-limit
// - Centralized error handling

const express = require('express');
const rateLimit = require('express-rate-limit');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const oauthRoutes = require('./routes/oauth');
const externalApiRoutes = require('./routes/externalApi');

const app = express();
const PORT = process.env.PORT || 3007;

app.use(express.json());

// Rate limiting: cap each IP to 30 requests per minute on the API surface
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again in a minute.' }
});

app.get('/', (req, res) => {
  res.json({
    message: 'Task 7 API running.',
    endpoints: [
      'POST /oauth/token  (get an access token)',
      'GET  /api/joke  (requires Bearer token)',
      'GET  /api/user-fact/:name  (requires Bearer token)'
    ]
  });
});

app.use('/oauth', oauthRoutes);
app.use('/api', apiLimiter, externalApiRoutes);

// 404 + centralized error handling (must be registered last)
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Task 7 server running at http://localhost:${PORT}`);
});
