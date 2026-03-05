import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction, Currency } from '../types';

interface Props {
  transactions: Transaction[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currency: Currency;
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionList: React.FC<Props> = ({ 
  transactions, activeTab, setActiveTab, currency, onEdit 
}) => {
  const formatValue = (val: number) => (val * currency.rate).toLocaleString(undefined, { minimumFractionDigits: 2 });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
      <div className="p-8 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">Transaction History</h3>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Real-time update stream</p>
        </div>
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
          {['All', 'Tech', 'Income', 'Food'].map(cat => (
            <button key={cat} onClick={() => setActiveTab(cat)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === cat ? 'bg-white dark:bg-slate-800 text-[#3d4977] dark:text-white shadow-sm' : 'text-slate-400'}`}>{cat}</button>
          ))}
        </div>
      </div>
      <div className="divide-y divide-slate-50 dark:divide-slate-700">
        {transactions.map((t) => (
          <div key={t.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors group">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${t.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
                {t.type === 'income' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-white leading-tight">{t.name}</h4>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.cat} • {t.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className={`text-lg font-black ${t.type === 'income' ? 'text-green-500' : 'text-slate-800 dark:text-white'}`}>{t.type === 'income' ? '+' : '-'}{currency.symbol}{formatValue(t.amount)}</div>
              <button onClick={() => onEdit(t)} className="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};