import React from 'react';
import { Wallet, TrendingUp, PieChart, Plus } from 'lucide-react';
import { Currency } from '../types';

interface Props {
  balance: number;
  forecast: number | null;
  currency: Currency;
  isPredicting: boolean;
  onAdd: () => void;
  formatCurrency: (val: number) => string;
}

export const SummaryCards: React.FC<Props> = ({ 
  balance, forecast, currency, isPredicting, onAdd, formatCurrency 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      <div className="bg-[#3d4977] p-6 md:p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center space-x-2 text-slate-300">
            <Wallet className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Net Liquidity</span>
          </div>
          <div className="text-4xl md:text-5xl font-black truncate">{currency.symbol}{formatCurrency(balance)}</div>
          <div className="flex items-center space-x-2 text-green-400 font-bold text-xs">
            <TrendingUp className="w-4 h-4" />
            <span>Vault is healthy</span>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2rem] border shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-slate-400">
            <PieChart className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">ML Forecast</span>
          </div>
          {isPredicting ? (
            <div className="animate-spin w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full" />
          ) : (
            <div className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white">
              {forecast ? `${currency.symbol}${formatCurrency(forecast)}` : '---'}
            </div>
          )}
        </div>
      </div>
      <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-dashed flex flex-col justify-center items-center text-center space-y-4">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-[#3d4977] dark:text-blue-400">
          <Plus className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-slate-800 dark:text-white">New Record</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">Add an expense or income entry.</p>
        </div>
        <button onClick={onAdd} className="w-full py-3 bg-[#3d4977] text-white rounded-xl font-bold shadow-md">Create Entry</button>
      </div>
    </div>
  );
};