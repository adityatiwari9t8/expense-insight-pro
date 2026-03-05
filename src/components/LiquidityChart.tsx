import React from 'react';
import { Activity } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { ChartPoint, Currency } from '../types';

interface Props {
  data: ChartPoint[];
  currency: Currency;
}

export const LiquidityChart: React.FC<Props> = ({ data, currency }) => {
  const formatCurrency = (val: number) => {
    return (val * currency.rate).toLocaleString(undefined, { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="flex items-center space-x-2 mb-8">
        <Activity className="w-5 h-5 text-blue-500" />
        <h3 className="font-bold text-lg text-slate-800 dark:text-white">Liquidity Trajectory</h3>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(value) => `${currency.symbol}${formatCurrency(value)}`} dx={-10} />
            <Tooltip />
            <Line type="monotone" name="Actual Balance" dataKey="balance" stroke="#3d4977" strokeWidth={3} dot={{ r: 4, fill: '#3d4977', stroke: '#fff' }} />
            <Line type="monotone" name="OLS Trend" dataKey="trend" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};