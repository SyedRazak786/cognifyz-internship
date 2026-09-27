// Task 8: Advanced Server-Side Functionality
// - Middleware for request processing (logging, body parsing)
// - Background task/job processing (simple in-memory job queue)
// - Server-side caching for optimized performance

const express = require('express');
const { requestLogger } = require('./middleware/logger');
const cache = require('./utils/cache');
const jobQueue = require('./utils/jobQueue');

const app = express();
const PORT = process.env.PORT || 3008;

// --- Middleware ---
app.use(express.json());       // body parsing
app.use(requestLogger);        // custom request logging

app.get('/', (req, res) => {
  res.json({
    message: 'Task 8 server running.',
    endpoints: [
      'GET  /api/report  (cached, expensive endpoint demo)',
      'POST /api/jobs     (enqueue a background job)',
      'GET  /api/jobs     (check job queue status)'
    ]
  });
});

// --- Caching demo: an "expensive" endpoint cached for 10 seconds ---
app.get('/api/report', async (req, res) => {
  const cacheKey = 'report';
  const cached = cache.get(cacheKey);

  if (cached) {
    return res.json({ ...cached, cache: 'HIT' });
  }

  // Simulate an expensive computation (e.g., a heavy DB aggregation)
  await new Promise(resolve => setTimeout(resolve, 1500));
  const report = {
    generatedAt: new Date().toISOString(),
    totalUsers: Math.floor(Math.random() * 1000),
    revenue: (Math.random() * 10000).toFixed(2)
  };

  cache.set(cacheKey, report, 10000); // cache for 10 seconds
  res.json({ ...report, cache: 'MISS' });
});

// --- Background job queue demo ---
app.post('/api/jobs', (req, res) => {
  const { name, durationMs } = req.body;
  const id = jobQueue.add({ name: name || 'unnamed-job', durationMs: durationMs || 1500 });
  res.status(202).json({ message: 'Job queued', jobId: id });
});

app.get('/api/jobs', (req, res) => {
  res.json(jobQueue.getStatus());
});

app.listen(PORT, () => {
  console.log(`Task 8 server running at http://localhost:${PORT}`);
});
