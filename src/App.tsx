import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import ExpenseProDemo from './demo/expense-pro/ExpenseProDemo';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // storage unavailable: fall through to the system preference
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore: the choice just won't persist
    }
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <>
      <button
        type="button"
        onClick={() => setTheme(next)}
        aria-label={`Switch to ${next} theme`}
        className="fixed right-4 top-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-[#161618] dark:text-slate-200 dark:hover:bg-[#222225]"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <main>
        <ExpenseProDemo />
      </main>
    </>
  );
}
