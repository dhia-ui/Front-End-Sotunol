import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface ChequeStatusChartProps {
  data: Array<{
    status: string;
    count: number;
  }>;
}

const CHEQUE_COLORS = {
  pending: '#f59e0b',
  cashed: '#10b981',
  cancelled: '#ef4444'
};

const ChequeStatusChart: React.FC<ChequeStatusChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    ...item,
    color: COLORS[item.status as keyof typeof COLORS] || '#6b7280'
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="card bg-base-100 shadow-xl"
    >
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Cheque Status Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--b1))',
                  border: '1px solid hsl(var(--b3))',
                  borderRadius: '8px',
                  color: 'hsl(var(--bc))'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default ChequeStatusChart;
