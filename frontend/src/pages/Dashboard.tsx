import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store/types';
import { useGetModelStatsQuery, useGetSampleDataQuery, useGetRootQuery } from '../store/api/exoplanetApi';
import MetricCard from '../components/dashboard/MetricCard';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import RecentPredictions from '../components/dashboard/RecentPredictions';
import QuickActions from '../components/dashboard/QuickActions';
import ApiTest from '../components/debug/ApiTest';
import { TrendingUp, Target, Database, Brain } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data: modelStats, isLoading: statsLoading, error: statsError } = useGetModelStatsQuery();
  const { data: sampleData, isLoading: dataLoading, error: dataError } = useGetSampleDataQuery();
  const { data: rootData, isLoading: rootLoading, error: rootError } = useGetRootQuery();

  // Debug logging
  useEffect(() => {
    console.log('Dashboard API Status:', {
      modelStats,
      statsLoading,
      statsError,
      sampleData,
      dataLoading,
      dataError,
      rootData,
      rootLoading,
      rootError
    });
    
    // Log the actual API calls being made
    console.log('API Base URL: https://5314b2b30c23.ngrok-free.app/api');
    console.log('Trying to fetch:');
    console.log('- GET https://5314b2b30c23.ngrok-free.app/api (root)');
    console.log('- GET https://5314b2b30c23.ngrok-free.app/api/stats');
    console.log('- GET https://5314b2b30c23.ngrok-free.app/api/data');
  }, [modelStats, statsLoading, statsError, sampleData, dataLoading, dataError, rootData, rootLoading, rootError]);

  // Use real API data with fallbacks or mock data when API is not available
  const metrics = modelStats ? [
    {
      title: 'F1 Score',
      value: modelStats.f1Score || 0,
      change: '+2.3%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'text-green-400',
    },
    {
      title: 'Total Predictions',
      value: (modelStats.totalPredictions || 0).toLocaleString(),
      change: '+1,247',
      trend: 'up' as const,
      icon: Target,
      color: 'text-blue-400',
    },
    {
      title: 'Training Data',
      value: (modelStats.trainingDataSize || 0).toLocaleString(),
      change: '+5,000',
      trend: 'up' as const,
      icon: Database,
      color: 'text-purple-400',
    },
    {
      title: 'Model Version',
      value: modelStats.modelVersion || 'Unknown',
      change: 'Latest',
      trend: 'neutral' as const,
      icon: Brain,
      color: 'text-orange-400',
    },
  ] : [
    // Fallback mock data when API is not available
    {
      title: 'F1 Score',
      value: '0.00',
      change: 'N/A',
      trend: 'neutral' as const,
      icon: TrendingUp,
      color: 'text-gray-400',
    },
    {
      title: 'Total Predictions',
      value: '0',
      change: 'N/A',
      trend: 'neutral' as const,
      icon: Target,
      color: 'text-gray-400',
    },
    {
      title: 'Training Data',
      value: '0',
      change: 'N/A',
      trend: 'neutral' as const,
      icon: Database,
      color: 'text-gray-400',
    },
    {
      title: 'Model Version',
      value: 'Offline',
      change: 'N/A',
      trend: 'neutral' as const,
      icon: Brain,
      color: 'text-gray-400',
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
        {statsError && (
          <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/50 rounded-lg">
            <p className="text-yellow-400 text-sm">
              ⚠️ Backend connection failed. Showing offline mode. 
              <span className="ml-2 text-yellow-300">
                Error: {statsError?.status || 'Unknown'} - {statsError?.data?.message || 'Check if backend is running'}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      {statsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
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
      )}

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <RecentPredictions 
          data={Array.isArray(sampleData) ? sampleData : []} 
          loading={dataLoading} 
          error={dataError} 
        />
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* API Test - Temporary for debugging */}
      <ApiTest />
    </div>
  );
};

export default Dashboard;
