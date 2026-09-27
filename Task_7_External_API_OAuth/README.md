# Task 7: Advanced API Usage and External API Integration

Demonstrates:
1. **OAuth-style authentication** - a simplified OAuth2 "client credentials" flow
   (`/oauth/token`) that issues a short-lived access token, used the same way a real
   OAuth provider (Google, GitHub, etc.) would be used.
2. **External API integration** - `/api/joke` and `/api/weather` call third-party
   public APIs and return normalized data.
3. **Rate limiting** - all `/api/*` routes are capped via `express-rate-limit`.
4. **Centralized error handling** - a single error-handling middleware catches and
   formats all errors consistently.

This project uses Node's built-in `fetch` (Node 18+), so no HTTP client dependency
is required.

## Try it
```
npm install
npm start
# Get a token:
curl -X POST http://localhost:3007/oauth/token -H "Content-Type: application/json" -d "{\"client_id\":\"demo\",\"client_secret\":\"demo-secret\"}"

# Use the token to call a protected external-API endpoint:
curl http://localhost:3007/api/joke -H "Authorization: Bearer <token>"
```
