# Airbnb app

## Deploy to Vercel

1. Push this project to its GitHub repository and import that repository in Vercel. Use the repository root as the project root.
2. Add `MONGODB_URI` and `SESSION_SECRET` to the Vercel project's Production environment variables (and Preview if needed). Do not commit either secret or put it in `vercel.json`.
3. Deploy. The Express app is exposed through `api/index.js`, and Vercel serves the EJS templates and public assets with the function.

The app connects to the `airbnb` MongoDB database. The Atlas URI can omit the database name because the app selects it explicitly.

Authentication sessions are stored in MongoDB so they persist across serverless invocations.

## Run locally

Copy `.env.example` to `.env`, set your MongoDB Atlas URI and a long random session secret, and start the app:

```powershell
Copy-Item .env.example .env
npm start
```

The app loads `.env` locally. Keep the secrets private; `.env` is git-ignored. On Vercel, add both values in the project's Environment Variables settings instead.
