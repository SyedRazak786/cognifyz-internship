const express = require('express');
const jwt = require('jsonwebtoken');
const { REGISTERED_CLIENTS, OAUTH_SECRET } = require('../middleware/oauth');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// POST /oauth/token
// Simplified OAuth2 "client credentials" grant:
// exchanges a client_id/client_secret pair for a short-lived access token.
router.post('/token', asyncHandler(async (req, res) => {
  const { client_id, client_secret, grant_type } = req.body;

  if (grant_type && grant_type !== 'client_credentials') {
    const err = new Error('Unsupported grant_type. Use "client_credentials".');
    err.status = 400;
    throw err;
  }

  if (!client_id || !client_secret || REGISTERED_CLIENTS[client_id] !== client_secret) {
    const err = new Error('Invalid client_id or client_secret');
    err.status = 401;
    throw err;
  }

  const access_token = jwt.sign({ client_id }, OAUTH_SECRET, { expiresIn: '1h' });

  res.json({
    access_token,
    token_type: 'Bearer',
    expires_in: 3600
  });
}));

module.exports = router;
