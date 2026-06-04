# Setup Guide for Running on a New PC

This repository has been securely committed to git with sensitive credentials excluded.

## Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd kitchen-compass-voyage
```

### 2. Install Dependencies
Choose one based on what's installed on your system:

**Using pnpm (recommended):**
```bash
pnpm install
```

**Using npm:**
```bash
npm install
```

**Using bun:**
```bash
bun install
```

### 3. Configure Environment Variables

The project requires Firebase and Google Gemini API keys. These are **not** committed to git for security reasons.

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   (Windows PowerShell: `Copy-Item .env.example .env`)

2. Edit `.env` and add your actual API keys:
   - **Firebase:** Get from [Firebase Console](https://console.firebase.google.com/)
   - **Google Gemini API Key:** Get from [Google AI Studio](https://makersuite.google.com/app/apikey)

Your `.env` file will look like:
```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123...
VITE_GEMINI_API_KEY=AIza...
```

### 4. Run Development Server

```bash
pnpm dev
```
(or `npm run dev` / `bun run dev`)

Open **http://localhost:8080** in your browser.

### 5. Build for Production

```bash
pnpm build
```

Preview the build:
```bash
pnpm preview
```

## Security Notes

✅ **What's committed:**
- Source code (src/, public/)
- Configuration files (tsconfig.json, vite.config.ts, tailwind.config.ts, etc.)
- Package manifests (package.json, pnpm-lock.yaml)
- `.env.example` (template without real secrets)

❌ **What's NOT committed (in .gitignore):**
- `.env` (actual API keys)
- `node_modules/` (recreated via `pnpm install`)
- `dist/` (build output)
- Editor configs (`.vscode/`, `.idea/`)

## Troubleshooting

**"Cannot find API key"** → Make sure you created `.env` and filled in all values from `.env.example`

**Module not found errors** → Run `pnpm install` again to ensure all dependencies are installed

**Port 8080 already in use** → Vite will try the next available port automatically

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build locally
pnpm lint         # Run ESLint
```

---

**Last Updated:** June 4, 2026
