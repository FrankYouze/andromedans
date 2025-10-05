import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Exoplanet } from '../../types';

interface RecentPredictionsProps {
  data?: Exoplanet[];
  loading?: boolean;
  error?: any;
}

const RecentPredictions = ({ data, loading, error }: RecentPredictionsProps) => {
  // Debug logging
  console.log('RecentPredictions received data:', {
    data,
    dataType: typeof data,
    isArray: Array.isArray(data),
    loading,
    error
  });

  const getClassificationIcon = (classification: string) => {
    switch (classification) {
      case 'Confirmed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'Candidate':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'False Positive':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Confirmed':
        return 'text-green-400 bg-green-400/10';
      case 'Candidate':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'False Positive':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Predictions</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-600 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-600 rounded w-16"></div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-6 bg-gray-600 rounded-full w-20"></div>
                <div className="text-right">
                  <div className="h-4 bg-gray-600 rounded w-12 mb-1"></div>
                  <div className="h-3 bg-gray-600 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Predictions</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-red-400">Failed to load predictions</p>
          <p className="text-gray-400 text-sm mt-2">Check your backend connection</p>
        </div>
      </div>
    );
  }

  // Ensure data is an array and handle edge cases
  const predictions = Array.isArray(data) ? data : [];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Predictions</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {predictions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No predictions available</p>
            <p className="text-gray-500 text-sm mt-2">Upload data to see predictions</p>
          </div>
        ) : (
          predictions.slice(0, 5).map((exoplanet, index) => (
            <div
              key={exoplanet.id || index}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {getClassificationIcon(exoplanet.disposition || 'Unknown')}
                <div>
                  <p className="font-medium text-white">{exoplanet.pl_name || `Exoplanet ${index + 1}`}</p>
                  <p className="text-sm text-gray-400">
                    {exoplanet.discovery_date ? formatTime(exoplanet.discovery_date) : 'Unknown date'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getClassificationColor(
                    exoplanet.disposition || 'Unknown'
                  )}`}
                >
                  {exoplanet.disposition || 'Unknown'}
                </span>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">
                    {exoplanet.pl_orbper ? `${exoplanet.pl_orbper.toFixed(1)} days` : 'N/A'}
                  </p>
                  <p className="text-xs text-gray-400">orbital period</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentPredictions;
