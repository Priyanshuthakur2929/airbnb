# Airbnb app

## Deploy to Vercel

1. Push this project to its GitHub repository and import that repository in Vercel. Use the repository root as the project root.
2. In the Vercel project settings, add `MONGODB_URI` for Production (and Preview if needed). Set it to the MongoDB Atlas connection URI; do not commit the URI or put it in `vercel.json`.
3. Deploy. The Express app is exposed through `api/index.js`, and Vercel serves the EJS templates and public assets with the function.

Favorites and bookings are stored in MongoDB so updates persist across serverless invocations. Existing values in `data/favourite.json` and `data/bookings.json` are not automatically imported into MongoDB.

## Run locally

Copy `.env.example` to `.env`, replace the placeholder with your MongoDB Atlas connection URI, and start the app:

```powershell
Copy-Item .env.example .env
npm start
```

The app loads `.env` locally. Keep the real URI private; `.env` is git-ignored. On Vercel, add `MONGODB_URI` in the project's Environment Variables settings instead.
