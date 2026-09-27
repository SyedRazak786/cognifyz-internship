const express = require('express');
const { requireAccessToken } = require('../middleware/oauth');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// All external-API routes require a valid OAuth access token
router.use(requireAccessToken);

// GET /api/joke - integrates with a free public external API
router.get('/joke', asyncHandler(async (req, res) => {
  const response = await fetch('https://official-joke-api.appspot.com/random_joke');
  if (!response.ok) {
    const err = new Error('External joke API returned an error');
    err.status = 502;
    throw err;
  }
  const data = await response.json();
  res.json({
    source: 'official-joke-api.appspot.com',
    setup: data.setup,
    punchline: data.punchline
  });
}));

// GET /api/user-fact/:name - another free external API (age prediction), demonstrating
// passing parameters through to a third-party service
router.get('/user-fact/:name', asyncHandler(async (req, res) => {
  const { name } = req.params;
  const response = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`);
  if (!response.ok) {
    const err = new Error('External agify API returned an error');
    err.status = 502;
    throw err;
  }
  const data = await response.json();
  res.json({
    source: 'api.agify.io',
    name: data.name,
    estimatedAge: data.age,
    sampleSize: data.count
  });
}));

module.exports = router;
