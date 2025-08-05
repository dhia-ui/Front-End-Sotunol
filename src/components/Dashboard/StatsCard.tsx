import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color: string;
  index: number;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color,
  index
}) => {
  const changeColors = {
    positive: 'text-success',
    negative: 'text-error',
    neutral: 'text-base-content/60'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-base-content/60 mb-1">{title}</h3>
            <p className="text-3xl font-bold text-base-content">{value}</p>
            {change && (
              <p className={`text-sm mt-1 ${changeColors[changeType]}`}>
                {change}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color} group-hover:scale-110 transition-transform`}>
            <Icon size={24} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;