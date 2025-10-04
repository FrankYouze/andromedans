import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color: string;
}

const MetricCard = ({ title, value, change, trend, icon: Icon, color }: MetricCardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-space-400';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-space-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-space-700 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      <div className="flex items-center mt-4">
        {getTrendIcon()}
        <span className={`text-sm font-medium ml-2 ${getTrendColor()}`}>
          {change}
        </span>
        <span className="text-sm text-space-400 ml-1">from last month</span>
      </div>
    </div>
  );
};

export default MetricCard;
