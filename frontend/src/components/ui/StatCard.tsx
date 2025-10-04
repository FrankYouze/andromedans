import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color?: string;
  description?: string;
}

const StatCard = ({ 
  title, 
  value, 
  change, 
  trend = 'neutral', 
  icon: Icon, 
  color = 'text-blue-400',
  description 
}: StatCardProps) => {
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
    <div className="card hover:bg-space-700/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-space-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white mb-2">{value}</p>
          {description && (
            <p className="text-xs text-space-500">{description}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-space-700 ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {change && (
        <div className="flex items-center mt-4">
          {getTrendIcon()}
          <span className={`text-sm font-medium ml-2 ${getTrendColor()}`}>
            {change}
          </span>
          <span className="text-sm text-space-400 ml-1">from last period</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
