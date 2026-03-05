import React from 'react'; 
import { useFinance } from './hooks/useFinance';
import { Header } from './components/Header';
import { SummaryCards } from './components/SummaryCards';
import { LiquidityChart } from './components/LiquidityChart';
import { TransactionList } from './components/TransactionList';
import { TransactionModal } from './components/TransactionModal';
import { Transaction } from './types';

const App: React.FC = () => {
  const { 
    transactions, balance, forecast, chartData, isPredicting, activeTab, 
    setActiveTab, currency, setCurrency, modalConfig, setModalConfig, 
    handlePredict, setChartData, setForecast, setTransactions 
  } = useFinance();

  const filteredTransactions = activeTab === 'All' 
    ? transactions 
    : transactions.filter((t: Transaction) => t.cat === activeTab || (activeTab === 'Income' && t.type === 'income'));

  const formatCurrency = (val: number) => (val * currency.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleSubmitTransaction = (data: any) => {
    if (modalConfig.mode === 'add') {
      const tx: Transaction = { ...data, id: Date.now().toString(), amount: parseFloat(data.amount), date: 'Just now', timestamp: Date.now() };
      setTransactions([tx, ...transactions]);
    } else {
      setTransactions(transactions.map((t: Transaction) => t.id === modalConfig.editId ? { ...t, ...data, amount: parseFloat(data.amount) } : t));
    }
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto py-8 md:py-16 px-4 md:px-6 space-y-8 md:space-y-12">
        <Header 
          currency={currency} setCurrency={setCurrency} isPredicting={isPredicting} 
          hasChart={chartData.length > 0} onPredict={handlePredict} 
          onClear={() => { setChartData([]); setForecast(null); }} 
        />
        <SummaryCards 
          balance={balance} forecast={forecast} currency={currency} 
          isPredicting={isPredicting} onAdd={() => setModalConfig({ isOpen: true, mode: 'add' })} formatCurrency={formatCurrency} 
        />
        {chartData.length > 0 && <LiquidityChart data={chartData} currency={currency} />}
        <TransactionList 
          transactions={filteredTransactions} activeTab={activeTab} setActiveTab={setActiveTab} 
          currency={currency} onEdit={(tx: Transaction) => setModalConfig({ isOpen: true, mode: 'edit', editId: tx.id })} 
          onDelete={(id: string) => setTransactions(transactions.filter((t: Transaction) => t.id !== id))} 
        />
        <TransactionModal 
          isOpen={modalConfig.isOpen} mode={modalConfig.mode} editId={modalConfig.editId} 
          transactions={transactions} onClose={() => setModalConfig({ ...modalConfig, isOpen: false })} 
          onSubmit={handleSubmitTransaction} onDelete={(id: string) => setTransactions(transactions.filter((t: Transaction) => t.id !== id))} 
          currencySymbol={currency.symbol} 
        />
      </div>
    </div>
  );
};

export default App;