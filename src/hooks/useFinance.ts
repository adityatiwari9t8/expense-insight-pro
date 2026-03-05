import { useState, useMemo } from 'react';
import { Transaction, ChartPoint } from '../types';
import { CURRENCIES, STARTING_BALANCE } from '../constants';
import { calculatePrediction } from '../utils';

export const useFinance = () => {
  const [isPredicting, setIsPredicting] = useState(false);
  const [forecast, setForecast] = useState<number | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [activeTab, setActiveTab] = useState('All');
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [modalConfig, setModalConfig] = useState<{isOpen: boolean, mode: 'add' | 'edit', editId?: string}>({ isOpen: false, mode: 'add' });
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', name: 'AWS Cloud Services', cat: 'Tech', amount: 142.50, date: 'Today', timestamp: Date.now(), type: 'expense' },
    { id: '2', name: 'Stripe Payout', cat: 'Income', amount: 2450.00, date: 'Yesterday', timestamp: Date.now() - 86400000, type: 'income' },
    { id: '3', name: 'Github Copilot', cat: 'Tech', amount: 10.00, date: '3 days ago', timestamp: Date.now() - 3 * 86400000, type: 'expense' },
    { id: '4', name: 'Dribbble Pro', cat: 'Design', amount: 15.00, date: 'Last week', timestamp: Date.now() - 7 * 86400000, type: 'expense' },
  ]);

  const balance = useMemo(() => {
    return transactions.reduce((acc, curr) => curr.type === 'income' ? acc + curr.amount : acc - curr.amount, STARTING_BALANCE);
  }, [transactions]);

  const handlePredict = () => {
    setIsPredicting(true);
    setTimeout(() => {
      const { predictedBalance, newChartData } = calculatePrediction(transactions, STARTING_BALANCE);
      setChartData(newChartData);
      setForecast(predictedBalance);
      setIsPredicting(false);
    }, 1200);
  };

  return {
    transactions, balance, forecast, chartData, isPredicting, activeTab, 
    setActiveTab, currency, setCurrency, modalConfig, setModalConfig, 
    handlePredict, setChartData, setForecast, setTransactions
  };
};