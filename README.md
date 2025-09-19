# Custom DemoMM

A Vite + React + TypeScript setup wrapping your existing `App.tsx` and components.

## Run locally

1. Install dependencies

```powershell
npm install
```

2. Start the dev server

```powershell
npm run dev
```

Then open the URL printed in the terminal (usually http://localhost:5173/).

## Build for production

```powershell
npm run build
npm run preview
```

## Notes
- Tailwind is configured and global styles are imported from `styles/globals.css` in `src/main.tsx`.
- Some UI components depended on imports with inline version suffixes (e.g., `lucide-react@...`). These were normalized to standard package names and added as dependencies.
- If you add or remove components under `components/`, ensure paths are correct and supported packages are installed.# Custom DemoMM React App

This workspace contains your React + TypeScript app scaffolded with Vite under `TS/`.

## Run (Development)

Option A – from the root (recommended):

```powershell
cd "D:\New MM\Custom DemoMM"
npm run dev
```

Option B – directly in the Vite project:

```powershell
cd "D:\New MM\Custom DemoMM\TS"
npm run dev
```

Vite will start on an available port (default `5173`; if busy, it picks another, e.g., `5174`).

## Build (Production)

From the root:

```powershell
cd "D:\New MM\Custom DemoMM"
npm run build
```

Output is generated in `TS/dist`.

## Preview Production Build

From the root:

```powershell
cd "D:\New MM\Custom DemoMM"
npm run preview
```

## Notes
- Existing components in the repo (like `App.tsx` and files under `components/`) can be integrated into `TS/src` as needed.
- Styles from `styles/globals.css` can be imported into `TS/src/index.css` or a new global stylesheet.
- If port `5173` is in use, Vite will automatically choose another port and display it in the terminal.
