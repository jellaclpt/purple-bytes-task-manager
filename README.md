# Purple Bytes: Task Manager

A modern, client-side task management application built with React, TypeScript, and Tailwind CSS. All data is stored locally in the browser using localStorage - no backend or database required!

**🌐 Live Demo:** [https://purplebytes-taskmanager.vercel.app](https://purplebytes-taskmanager.vercel.app)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)

---

## Project Overview

Purple Bytes: Task Manager is a fully client-side task management application that allows users to create, organize, and track their tasks efficiently. The application features:

- **Modern UI** with dark mode support
- **Responsive design** that works on all devices
- **Client-side storage** using browser localStorage
- **No backend required** - works entirely in the browser
- **Clean component-based architecture** with TypeScript

### Key Highlights

- ✅ **Zero Setup** - No database or backend configuration needed
- ✅ **Fast & Lightweight** - All data stored locally in the browser
- ✅ **Privacy-First** - Your tasks never leave your device
- ✅ **Offline-First** - Works without an internet connection
- ✅ **Modern Stack** - Built with the latest React and TypeScript

---

## Features

### Task Management
- ✅ Create, edit, and delete tasks
- ✅ Set task status (To Do, In Progress, Done)
- ✅ Assign priorities (Low, Medium, High)
- ✅ Organize by categories (Work, Personal, Shopping, Health, Finance, Other)
- ✅ Set due dates with calendar picker
- ✅ Add descriptions to tasks

### User Interface
- ✅ **Dark mode** support with theme toggle
- ✅ **Responsive design** for mobile, tablet, and desktop
- ✅ **Search functionality** to quickly find tasks
- ✅ **Filtering** by status and category
- ✅ **Sorting** by date, priority, status, or title
- ✅ **Toast notifications** for user feedback
- ✅ **Empty states** for better UX

### Data Persistence
- ✅ **Browser localStorage** - Data persists across sessions
- ✅ **Automatic saving** - Changes are saved immediately
- ✅ **No data loss** - Tasks remain even after closing the browser

---

## Technologies Used

### Core Technologies
- **React 18.3.1** - UI library
- **TypeScript 5.6.3** - Type safety
- **Vite 5.4.20** - Build tool and dev server

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **tailwindcss-animate** - Animation utilities
- **@tailwindcss/typography** - Typography plugin

### Routing
- **React Router DOM 7.10.1** - Client-side routing

### UI Components
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Component library built on Radix UI
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

### State Management & Forms
- **TanStack Query (React Query) 5.60.5** - State management for mutations
- **React Hook Form 7.55.0** - Form state management
- **Zod 3.24.2** - Schema validation

### Data Storage
- **Browser localStorage** - Client-side data persistence
- **Custom localStorage service** - Type-safe data management

### Additional Libraries
- **date-fns** - Date utility functions
- **next-themes** - Theme management (dark mode)
- **clsx** & **tailwind-merge** - Conditional class utilities

---

## Project Structure

```
purple-bytes-task-manager/
├── public/               # Static assets
│   └── prplbyts.svg     # Logo/icon
├── src/
│   ├── assets/          # Images and other assets
│   ├── components/      # React components
│   │   ├── ui/         # Reusable UI components (shadcn/ui)
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── task-card.tsx
│   │   ├── task-form.tsx
│   │   ├── task-list.tsx
│   │   └── ...         # Other task-related components
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and configurations
│   │   ├── localStorage.ts  # localStorage service
│   │   ├── queryClient.ts   # React Query configuration
│   │   └── utils.ts
│   ├── pages/          # Page components
│   │   ├── dashboard.tsx
│   │   ├── tasks.tsx
│   │   └── not-found.tsx
│   ├── routes/         # Route configuration
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles and Tailwind imports
├── server/             # Express server (for dev server only)
│   ├── index.ts       # Express server setup
│   ├── static.ts      # Static file serving
│   └── vite.ts        # Vite dev server integration
├── shared/            # Shared types and schemas
│   └── schema.ts      # TypeScript types and Zod schemas
├── dist/              # Production build output
├── index.html         # HTML template
├── vercel.json        # Vercel deployment configuration
├── package.json       # Dependencies and scripts
├── vite.config.ts     # Vite configuration
├── tailwind.config.ts # Tailwind CSS configuration
├── postcss.config.js  # PostCSS configuration
└── tsconfig.json      # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Git** (optional, for cloning)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/purple-bytes-task-manager.git
   cd purple-bytes-task-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5000` (or the port shown in terminal)

The application will automatically reload when you make changes to the code.

### Building for Production

```bash
npm run build
```

The production build will be created in the `dist/public` directory.

### Running Production Build Locally

```bash
npm run start
```

This starts a production server on `http://localhost:5000`.

---

## Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build the application for production
- `npm run start` - Start production server (after build)
- `npm run check` - Run TypeScript type checking

---

## Deployment

### Deploying to Vercel

The application is configured for easy deployment to Vercel:

1. **Push your code to GitHub**

2. **Deploy via Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings:
     - **Framework Preset:** Vite
     - **Root Directory:** `.` (root)
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist/public`
     - **Install Command:** `npm install`

3. **Deploy via Vercel CLI (alternative):**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

### Vercel Configuration

- ✅ Automatic HTTPS
- ✅ Global CDN distribution
- ✅ Automatic deployments on every push
- ✅ Preview deployments for pull requests
- ✅ Custom domain support

**Note:** No environment variables or database setup required! The app works entirely client-side.

---

## How It Works

### Data Storage

All tasks are stored in the browser's `localStorage` using a custom service (`src/lib/localStorage.ts`). This means:

- **Data persists** across browser sessions
- **No server needed** - everything runs client-side
- **Privacy-focused** - data never leaves your device
- **Fast** - instant read/write operations
- **Offline-capable** - works without internet

### Data Structure

Tasks are stored as JSON in localStorage with the following structure:

```typescript
{
  id: string;
  title: string;
  description: string | null;
  status: "todo" | "in-progress" | "done";
  category: "work" | "personal" | "shopping" | "health" | "finance" | "other";
  priority: "low" | "medium" | "high";
  dueDate: Date | null;
  createdAt: Date;
}
```

### Limitations

- **Browser-specific** - Tasks are stored per browser/device
- **Storage limit** - localStorage typically has a 5-10MB limit
- **No sync** - Tasks don't sync across devices
- **No backup** - Clearing browser data will delete tasks

---

## Development

### Code Structure

- **Components** are organized by feature in `src/components/`
- **Pages** are in `src/pages/`
- **Utilities** and services are in `src/lib/`
- **Types** and schemas are in `shared/schema.ts`

### Adding New Features

1. Create components in `src/components/`
2. Add types to `shared/schema.ts` if needed
3. Update `src/lib/localStorage.ts` for new data operations
4. Add routes in `src/routes/index.tsx` if needed

### Styling

- Uses **Tailwind CSS** for all styling
- Custom theme colors defined in `tailwind.config.ts`
- Dark mode support via `next-themes`
- Responsive design with mobile-first approach

---

## License

MIT

---

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Deployed on [Vercel](https://vercel.com/)
- Icons from [Lucide](https://lucide.dev/)

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
