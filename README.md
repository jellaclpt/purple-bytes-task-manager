# Purple Bytes: Task Manager

A frontend-only task manager for keeping personal to-dos in one place. Add tasks, move them from To Do to Done, and see where everything stands on a simple dashboard. There is no account to create and no database: tasks are saved in your browser.

**Live demo:** [purplebytes-taskmanager.vercel.app](https://purplebytes-taskmanager.vercel.app)

## Features

**Dashboard**
- Counts of tasks in To Do, In Progress and Done
- The five most recently created tasks, with their due date, status, category and priority

**Tasks**
- Create, edit and delete tasks, with a confirmation before deleting
- Give each task a title, description, status, category, priority and due date
- Change a task's status from the menu on its card
- See at a glance which tasks are due today or overdue

**Finding tasks**
- Search by title or description
- Filter by status and category
- Sort by date created, due date, priority, status or title

**Settings**
- Dark mode switch, which follows your device's setting until you choose
- Install the app on your device and open it like a regular app

## How tasks are saved

Tasks are stored in your browser's `localStorage`, so they are never sent to a server. This also means:

- Tasks stay on the browser and device where you made them and do not sync to others.
- Clearing your browser data deletes them.
- New visitors start with an empty list.

After the first visit, the service worker lets the app open without an internet connection.

## Built with

| Area | Tools |
| --- | --- |
| Language and UI | TypeScript, React 18 |
| Build | Vite |
| Styling | Tailwind CSS, shadcn/ui (Radix UI), Lucide icons |
| Routing | React Router |
| Forms and validation | React Hook Form, Zod |
| Dates | date-fns, React Day Picker |
| Installable app | Web app manifest, service worker |
| Hosting | Vercel |

## Getting started

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
git clone https://github.com/jellaclpt/purple-bytes-task-manager.git
cd purple-bytes-task-manager
npm install
npm run dev
```

Then open [http://localhost:5000](http://localhost:5000). You do not need to set any environment variables.

The small Express server in `server/` only serves the app locally. It has no API and stores no data.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Builds the site to `dist/public` and the local server to `dist/index.cjs` |
| `npm run start` | Serves the production build (macOS and Linux shells only) |
| `npm run check` | Runs the TypeScript type check |

The app's service worker only runs in the production build.

## Project structure

```
public/              Logo, app icons, web app manifest and service worker
shared/schema.ts     Task types, options and validation rules
server/              Local Express server for development and previews
src/
  components/        Task cards, form, filters, header and settings menu
  components/ui/     shadcn/ui components
  hooks/             Shared React hooks
  lib/               localStorage service, install support and helpers
  pages/             Dashboard, Tasks and Not Found pages
  routes/            Page routes
```

## Deployment

The site is hosted on Vercel, using the settings in `vercel.json`: it runs `npm run build` and publishes `dist/public`. All page routes go to `index.html`, so links such as `/tasks` work when opened directly.

## License

MIT
