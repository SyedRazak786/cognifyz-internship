const jwt = require('jsonwebtoken');

const OAUTH_SECRET = process.env.OAUTH_SECRET || 'dev_oauth_secret_change_me';

// Simplified mock "OAuth provider" credentials for demo purposes.
// In production, client_id/client_secret pairs would live in a database.
const REGISTERED_CLIENTS = {
  demo: 'demo-secret'
};

// Middleware that requires a valid access token issued by /oauth/token
function requireAccessToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const err = new Error('Missing bearer access token');
    err.status = 401;
    return next(err);
  }

  const token = authHeader.split(' ')[1];
  try {
    req.client = jwt.verify(token, OAUTH_SECRET);
    next();
  } catch (e) {
    const err = new Error('Invalid or expired access token');
    err.status = 401;
    next(err);
  }
}

module.exports = { REGISTERED_CLIENTS, OAUTH_SECRET, requireAccessToken };
