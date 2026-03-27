# Expense Pro

A lightweight expense tracker web app built with React/TypeScript and Tailwind CSS.

## Features

- Add, edit, delete transactions
- View transactions list with income/expense classification
- Display summary cards (balance, income, expenses)
- Interactive liquidity chart
- Modal form for transaction entry

## Tech stack

- React (Vite)
- TypeScript
- Tailwind CSS

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start dev server:
   ```bash
   npm run dev
   ```

3. Open in browser:
   - `http://localhost:5173` (or the URL shown in terminal)

## Project structure

- `src/main.tsx`: app entry
- `src/App.tsx`: root component
- `src/components`: UI components
- `src/hooks/useFinance.ts`: finance state logic
- `src/utils.ts`, `src/constants.ts`, `src/types.ts`: shared utilities/types

## Build

```bash
npm run build
```

## Notes

- Data is stored in local state only (no backend persistence).
- For production, connect to a database or local storage and add validation.
