# Website Backup - 20260311-134142

This backup contains the complete state of the NGE2026(NESS) website as of March 11, 2026 at 13:41:42.

## What's included:
- **src/**: All React components, hooks, contexts, and configuration
- **public/**: All static assets (fonts, icons, videos, images)
- **supabase/**: Database schema and migrations
- **package.json**: Dependencies and project configuration
- **tsconfig.json**: TypeScript configuration files
- **vite.config.ts**: Vite build configuration
- **tailwind.config.ts**: Tailwind CSS configuration
- **index.html**: Main HTML entry point
- **README.md**: Project documentation
- **.env.example**: Environment variable template

## How to restore:
1. Replace the current project files with the files from this backup
2. Run `npm install` to restore dependencies
3. Copy your `.env` file from the current project (not included in backup for security)

## Notes:
- Node modules and build artifacts are excluded (they can be regenerated)
- Environment files with sensitive data (.env, .env.production) are excluded for security
- This backup was created before making new changes to the website
