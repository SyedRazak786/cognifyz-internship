# Cognifyz Technologies - Full Stack Development Internship
Submitted by: Syed Razak

This repository contains all 8 tasks from the Full Stack Development track, each as an
independent, runnable Node.js project (as requested: "a separate file of each level").

| Folder | Level | Task | Port |
|---|---|---|---|
| Task_1_HTML_Server | 1 - Beginner | HTML Structure & Basic Server Interaction | 3001 |
| Task_2_Validation | 1 - Beginner | Inline Styles, Basic Interaction, Server-Side Validation | 3002 |
| Task_3_Responsive_CSS | 2 - Intermediate | Advanced CSS Styling & Responsive Design | 3003 |
| Task_4_Dynamic_DOM | 2 - Intermediate | Complex Form Validation & Dynamic DOM Manipulation | 3004 |
| Task_5_REST_API | 3 - Advanced | API Integration & Front-End Interaction | 3005 |
| Task_6_Database_Auth | 3 - Advanced | Database Integration & User Authentication | 3006 |
| Task_7_External_API_OAuth | 4 - Expert | Advanced API Usage & External API Integration | 3007 |
| Task_8_Advanced_Server | 4 - Expert | Advanced Server-Side Functionality | 3008 |

That's 8/8 tasks (internship requires 80% / 5-of-8 minimum), so this exceeds the
requirement.

## Prerequisites
- Node.js v18+ (needed for Task 7's built-in `fetch`)
- MongoDB running locally, or a MongoDB Atlas connection string (Task 6 only)
- npm

## How to run each task
Each folder is a standalone project. From inside any `Task_X_...` folder:

```bash
npm install
npm start
```

Then open the printed `http://localhost:PORT` in your browser.

### Task 6 setup (needs MongoDB)
```bash
cd Task_6_Database_Auth
cp .env.example .env      # edit MONGO_URI / JWT_SECRET if needed
npm install
npm start
```
Test with curl or Postman:
```bash
curl -X POST http://localhost:3006/auth/register -H "Content-Type: application/json" \
  -d '{"username":"syed","email":"syed@example.com","password":"secret123"}'
```

### Task 7 quick test
```bash
cd Task_7_External_API_OAuth
npm install
npm start
curl -X POST http://localhost:3007/oauth/token -H "Content-Type: application/json" \
  -d '{"client_id":"demo","client_secret":"demo-secret"}'
# copy the access_token from the response, then:
curl http://localhost:3007/api/joke -H "Authorization: Bearer <access_token>"
```

## Submission checklist (per Cognifyz's instructions)
- [x] All source code included per task
- [x] Separate project/folder per level, as requested
- [ ] Zip this whole folder and upload via the official submission form
- [ ] (Optional) Record a short LinkedIn video demoing the tasks, tag
      #cognifyz #cognifyzTech #cognifyzTechnologies

## Tech stack used
HTML, CSS, JavaScript, Node.js, Express.js, EJS, MongoDB (Mongoose), JWT, bcrypt,
express-rate-limit, native `fetch` for external API calls.
