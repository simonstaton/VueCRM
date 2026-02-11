# Fanvue CRM

A minimal CRM UI for the Fanvue platform. Bootstrapped with Vite + React + TypeScript and [React Router](https://reactrouter.com/). All UI components come from [@fanvue/ui](https://www.npmjs.com/package/@fanvue/ui).

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview production build

## Structure

- **Dashboard** (`/`) – overview and quick links to Contacts and Creators
- **Contacts** (`/contacts`) – contact list and search (dumb UI only)
- **Creators** (`/creators`) – creators list and search (dumb UI only)

This app uses **@fanvue/ui** (React + Tailwind design system). Setup follows the [package README](https://www.npmjs.com/package/@fanvue/ui): `src/index.css` imports the theme and adds `@source` for Tailwind; Inter is loaded in `index.html`. Only `Button` is from the library; `Card` and `Input` are local in `src/components/ui.tsx` (not provided by @fanvue/ui).
