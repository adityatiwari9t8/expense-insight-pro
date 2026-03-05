import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { Transaction } from '../types';

interface Props {
  isOpen: boolean;
  mode: 'add' | 'edit';
  editId?: string;
  transactions: Transaction[];
  onClose: () => void;
  onSubmit: (data: any) => void;
  onDelete: (id: string) => void;
  currencySymbol: string;
}

export const TransactionModal: React.FC<Props> = ({ 
  isOpen, mode, editId, transactions, onClose, onSubmit, onDelete, currencySymbol 
}) => {
  const [formData, setFormData] = useState({ name: '', amount: '', cat: 'Tech', type: 'expense' as 'income' | 'expense' });

  useEffect(() => {
    if (mode === 'edit' && editId) {
      const tx = transactions.find(t => t.id === editId);
      if (tx) setFormData({ name: tx.name, amount: tx.amount.toString(), cat: tx.cat, type: tx.type });
    } else {
      setFormData({ name: '', amount: '', cat: 'Tech', type: 'expense' });
    }
  }, [mode, editId, transactions, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-800 w-full max-w-lg rounded-[2.5rem] p-8 space-y-8 animate-in zoom-in duration-300">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">{mode === 'add' ? 'New Financial Record' : 'Edit Transaction'}</h3>
          <button onClick={onClose} className="text-slate-400"><X className="w-6 h-6" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-6">
          <div className="space-y-4">
            <input type="text" placeholder="Description" required className="w-full px-5 py-4 bg-slate-50 border rounded-2xl outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder={`Amount (${currencySymbol})`} required className="w-full px-5 py-4 bg-slate-50 border rounded-2xl outline-none" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
              <select className="w-full px-5 py-4 bg-slate-50 border rounded-2xl outline-none font-bold" value={formData.cat} onChange={(e) => setFormData({...formData, cat: e.target.value})}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className={`grid ${mode === 'edit' ? 'grid-cols-2 gap-3' : 'grid-cols-1'}`}>
            {mode === 'edit' && <button type="button" onClick={() => editId && onDelete(editId)} className="py-4 bg-rose-500 text-white font-black rounded-2xl shadow-lg">Delete</button>}
            <button type="submit" className="py-4 bg-slate-900 text-white font-black rounded-2xl shadow-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};