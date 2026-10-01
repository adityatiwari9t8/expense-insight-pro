# Expense Insight Pro

An expense tracker that shows where your balance is heading. It starts with sample data, lets you add, edit and delete transactions in five currencies, and draws the running balance with a straight-line trend and a 30-day forecast. It runs entirely in the browser, with no backend.

## Features

- Add, edit and delete transactions (income or expense), with undo after a delete
- Summary cards for the balance and for income and spending over the last 30 days
- Five display currencies: USD, EUR, GBP, INR and JPY
- Running-balance line chart (Recharts) with a toggle for the trend line and forecast
- 30-day forecast card showing the daily trend, R² and how many transactions it used
- Search by description and filter by category
- "Reset to sample data" button
- Light and dark theme, saved in `localStorage` and defaulting to your system setting

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and production build into dist/
npm run preview  # serve the production build
```

Stack: Vite, React 18, TypeScript, Tailwind CSS 3, Recharts, lucide-react.

## Project structure

```
src/
  main.tsx              entry point, loads the fonts and global CSS
  App.tsx               shell: light/dark toggle plus the demo
  index.css             Tailwind layers, body colours, .accent, .custom-scrollbar
  demo/
    expense-pro/        the demo, copied unchanged from the portfolio
      ExpenseProDemo.tsx
      constants.ts      currencies, categories, sample data
      types.ts
      utils.ts          balance, history and forecast maths
  lib/
    useDialog.ts        dialog behaviour (Esc, focus trap, scroll lock) used by the demo
```

`src/demo/` is a plain copy of the demo folder from the portfolio. To update it, copy the folder over. The only edit after copying is the `useDialog` import in `ExpenseProDemo.tsx`, which points at `../../lib/useDialog`.

## Limits

- Exchange rates are fixed numbers in the code, not live rates.
- Data is stored in the browser only (`localStorage`). It is not synced and is lost if you clear site data.
- The forecast is a straight-line least-squares trend, not financial advice.
