# Task & Project Management

A single-admin task and project management dashboard built with React, Vite, and Tailwind CSS.

## Pages

- **Login** — email & password entry (demo only, no backend: any valid-looking email + 4+ char password works)
- **Home** — welcome screen with task/project stats and recent activity
- **Admin Dashboard** — add and delete tasks, grouped by project

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Tech

- React 18
- Vite 5
- Tailwind CSS 3
- lucide-react (icons)

## Troubleshooting

If the page loads unstyled or buttons don't respond:

1. Make sure `npm install` finished with no errors.
2. Check the browser console (F12) for red error messages.
3. Confirm `node -v` is 18 or higher.
4. Delete `node_modules` and `package-lock.json`, then run `npm install` again.
