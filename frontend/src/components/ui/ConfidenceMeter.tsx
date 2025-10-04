import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface ConfidenceMeterProps {
  confidence: number;
  classification: 'Confirmed' | 'Candidate' | 'False Positive';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const ConfidenceMeter = ({ 
  confidence, 
  classification, 
  size = 'md',
  showLabel = true 
}: ConfidenceMeterProps) => {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return 'text-green-400';
    if (conf >= 0.6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceBgColor = (conf: number) => {
    if (conf >= 0.8) return 'bg-green-400';
    if (conf >= 0.6) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const getClassificationIcon = (classType: string) => {
    switch (classType) {
      case 'Confirmed':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'Candidate':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case 'False Positive':
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'w-16 h-16',
          text: 'text-xs',
          icon: 'h-3 w-3',
        };
      case 'lg':
        return {
          container: 'w-24 h-24',
          text: 'text-lg',
          icon: 'h-6 w-6',
        };
      default:
        return {
          container: 'w-20 h-20',
          text: 'text-sm',
          icon: 'h-4 w-4',
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const percentage = Math.round(confidence * 100);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`relative ${sizeClasses.container} flex items-center justify-center`}>
        {/* Circular Progress */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-space-700"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={getConfidenceColor(confidence)}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${confidence * 100}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`${sizeClasses.text} font-bold ${getConfidenceColor(confidence)}`}>
            {percentage}%
          </div>
        </div>
      </div>
      
      {showLabel && (
        <div className="flex items-center space-x-2">
          {getClassificationIcon(classification)}
          <span className={`text-sm font-medium ${getConfidenceColor(confidence)}`}>
            {classification}
          </span>
        </div>
      )}
    </div>
  );
};

export default ConfidenceMeter;
