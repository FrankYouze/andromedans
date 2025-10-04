import { useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Prediction {
  id: string;
  name: string;
  classification: 'Confirmed' | 'Candidate' | 'False Positive';
  confidence: number;
  timestamp: string;
}

const RecentPredictions = () => {
  const [predictions] = useState<Prediction[]>([
    {
      id: '1',
      name: 'Kepler-452b',
      classification: 'Confirmed',
      confidence: 0.95,
      timestamp: '2025-10-04T14:30:00Z',
    },
    {
      id: '2',
      name: 'TOI-715b',
      classification: 'Candidate',
      confidence: 0.78,
      timestamp: '2025-10-04T14:25:00Z',
    },
    {
      id: '3',
      name: 'K2-18b',
      classification: 'Confirmed',
      confidence: 0.92,
      timestamp: '2025-10-04T14:20:00Z',
    },
    {
      id: '4',
      name: 'TESS-1234b',
      classification: 'False Positive',
      confidence: 0.65,
      timestamp: '2025-10-04T14:15:00Z',
    },
    {
      id: '5',
      name: 'Kepler-1649c',
      classification: 'Confirmed',
      confidence: 0.88,
      timestamp: '2025-10-04T14:10:00Z',
    },
  ]);

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

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Predictions</h3>
        <button className="text-sm text-primary-400 hover:text-primary-300">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {predictions.map((prediction) => (
          <div
            key={prediction.id}
            className="flex items-center justify-between p-4 bg-space-700 rounded-lg hover:bg-space-600 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {getClassificationIcon(prediction.classification)}
              <div>
                <p className="font-medium text-white">{prediction.name}</p>
                <p className="text-sm text-space-400">
                  {formatTime(prediction.timestamp)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getClassificationColor(
                  prediction.classification
                )}`}
              >
                {prediction.classification}
              </span>
              <div className="text-right">
                <p className="text-sm font-medium text-white">
                  {(prediction.confidence * 100).toFixed(0)}%
                </p>
                <p className="text-xs text-space-400">confidence</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPredictions;
