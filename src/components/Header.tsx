import React, { useState, useEffect } from 'react';
import { Coins, ChevronDown, Zap, Sun, Moon, X } from 'lucide-react'; 
import { CURRENCIES } from '../constants';
import { Currency } from '../types';

interface Props {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  isPredicting: boolean;
  hasChart: boolean;
  onPredict: () => void;
  onClear: () => void;
}

export const Header: React.FC<Props> = ({ 
  currency, setCurrency, isPredicting, hasChart, onPredict, onClear 
}) => {
  // Initialize from localStorage
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = window.document.documentElement; // Targets <html>
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Expense Insight Pro</h1>
        <p className="text-sm text-slate-500">Financial orchestration with multi-currency AI forecasting.</p>
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        {/* Toggle Button */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
        </button>

        {hasChart && (
          <button 
            onClick={onClear}
            className="p-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl shadow-sm hover:text-rose-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="relative flex items-center bg-white dark:bg-slate-800 border dark:border-slate-700 px-4 py-3 rounded-xl shadow-sm">
          <Coins className="w-4 h-4 text-amber-500 mr-2" />
          <select 
            value={currency.code}
            onChange={(e) => setCurrency(CURRENCIES.find(c => c.code === e.target.value) || CURRENCIES[0])}
            className="bg-transparent text-sm font-bold focus:outline-none appearance-none pr-8 dark:text-white cursor-pointer"
          >
            {CURRENCIES.map(c => <option key={c.code} value={c.code} className="dark:bg-slate-800">{c.code}</option>)}
          </select>
          <ChevronDown className="w-3 h-3 absolute right-4 pointer-events-none text-slate-400" />
        </div>

        <button 
          onClick={onPredict}
          disabled={isPredicting}
          className="flex-1 md:flex-none bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg transition-transform active:scale-95"
        >
          <Zap className={`w-4 h-4 fill-amber-400 text-amber-400 ${isPredicting ? 'animate-pulse' : ''}`} />
          <span className="text-sm uppercase font-black">{isPredicting ? 'Running...' : 'Predict'}</span>
        </button>
      </div>
    </div>
  );
};