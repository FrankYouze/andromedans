import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/types';
import { useGetModelStatsQuery, useGetSampleDataQuery } from '../store/api/exoplanetApi';
import MetricCard from '../components/dashboard/MetricCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import RecentPredictions from '../components/dashboard/RecentPredictions';
import QuickActions from '../components/dashboard/QuickActions';
import { TrendingUp, Target, Database, Brain } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: modelStats, isLoading: statsLoading } = useGetModelStatsQuery();
  const { data: sampleData, isLoading: dataLoading } = useGetSampleDataQuery();

  // Mock data for demonstration
  const mockStats = {
    f1Score: 0.91,
    precision: 0.89,
    recall: 0.93,
    accuracy: 0.91,
    totalPredictions: 15472,
    modelVersion: 'v2.1.0',
    lastTrained: '2025-10-04T10:30:00Z',
    trainingDataSize: 50000,
  };

  const metrics = [
    {
      title: 'F1 Score',
      value: mockStats.f1Score,
      change: '+2.3%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'text-green-400',
    },
    {
      title: 'Total Predictions',
      value: mockStats.totalPredictions.toLocaleString(),
      change: '+1,247',
      trend: 'up' as const,
      icon: Target,
      color: 'text-blue-400',
    },
    {
      title: 'Training Data',
      value: mockStats.trainingDataSize.toLocaleString(),
      change: '+5,000',
      trend: 'up' as const,
      icon: Database,
      color: 'text-purple-400',
    },
    {
      title: 'Model Version',
      value: mockStats.modelVersion,
      change: 'Latest',
      trend: 'neutral' as const,
      icon: Brain,
      color: 'text-orange-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Monitor your AI model performance and exoplanet classification system
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
            color={metric.color}
          />
        ))}
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <RecentPredictions />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};

export default Dashboard;
