# Expense Pro

> A lightweight expense tracker web app with live charts, summary metrics, and a clean Tailwind UI.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open the local server URL shown in terminal (default: `http://localhost:5173`).

## ✨ Features

- Add, edit, remove transactions
- Income vs. expense classification and total balance
- Summary cards for current balance, income, expenses
- Interactive liquidity chart powered by `Recharts`
- Modal transaction form with instant updates
- Responsive design with Tailwind CSS

## 🧰 Tech stack

- React (Vite)
- TypeScript
- Tailwind CSS
- Recharts

## 📁 Project structure

```
src/
  main.tsx         # entry point
  App.tsx          # root application
  constants.ts     # UI/logic constants
  types.ts         # shared TYPE definitions
  utils.ts         # helper functions
  hooks/
    useFinance.ts  # transaction state management
  components/
    Header.tsx
    LiquidityChart.tsx
    SummaryCards.tsx
    TransactionList.tsx
    TransactionModal.tsx
```

## 🧪 Scripts

- `npm run dev`: start development server
- `npm run build`: production bundle
- `npm run preview`: preview production build

## 💡 Notes

- Currently data is in memory only; refresh resets state.
- Add persistence (localStorage or backend API) for real usage.
- Improve validation for amounts, dates, and categories.

## 🤝 Contributions

1. Fork it
2. Create your feature branch (`git checkout -b feature/...`)
3. Commit your changes (`git commit -m "feat: ..."`)
4. Push (`git push origin feature/...`)
5. Open a pull request

## 📄 License

MIT
