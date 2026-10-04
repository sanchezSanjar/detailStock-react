# DetailStock

Online shop for car detailing products, built with React 19, TypeScript, Redux Toolkit, MUI and Vite.

## Setup

```bash
npm install
cp .env.example .env   # set VITE_API_URL to the backend address
npm run dev            # http://localhost:3000
```

The backend (Express + MongoDB) must be running at `VITE_API_URL`.

## Scripts

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start the dev server           |
| `npm run build`   | Type-check and production build |
| `npm run lint`    | Run ESLint                     |
| `npm run preview` | Preview the production build   |

## Structure

```
src/
  app/
    components/   shared UI (navbar, basket, footer)
    screens/      pages, each with its own slice and selectors
    services/     API calls (axios)
    slices/       global state (auth, cart)
    css/
  lib/            types, enums, config, helpers
```
