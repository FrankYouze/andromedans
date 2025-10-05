import { useState } from 'react';
import { Info } from 'lucide-react';

interface CorrelationMatrixProps {
  data: { [key: string]: number }[];
  features: string[];
  title?: string;
}

const CorrelationMatrix = ({ data, features, title = "Feature Correlation Matrix" }: CorrelationMatrixProps) => {
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  // Calculate correlation matrix
  const calculateCorrelation = (x: number[], y: number[]) => {
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
    const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);
    const sumY2 = y.reduce((acc, yi) => acc + yi * yi, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return denominator === 0 ? 0 : numerator / denominator;
  };

  const correlationMatrix = features.map((_, i) =>
    features.map((_, j) => {
      if (i === j) return 1;
      const x = data.map(row => row[features[i]] || 0);
      const y = data.map(row => row[features[j]] || 0);
      return calculateCorrelation(x, y);
    })
  );

  const getColorIntensity = (value: number) => {
    const absValue = Math.abs(value);
    if (absValue >= 0.8) return 'bg-red-500';
    if (absValue >= 0.6) return 'bg-orange-500';
    if (absValue >= 0.4) return 'bg-yellow-500';
    if (absValue >= 0.2) return 'bg-green-500';
    return 'bg-gray-500';
  };

  const getTextColor = (value: number) => {
    const absValue = Math.abs(value);
    return absValue >= 0.5 ? 'text-white' : 'text-gray-900';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center space-x-2 text-sm text-space-400">
          <Info className="h-4 w-4" />
          <span>Hover for values</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Header Row */}
          <div className="flex">
            <div className="w-24 h-8"></div>
            {features.map((feature, index) => (
              <div
                key={index}
                className="w-20 h-8 flex items-center justify-center text-xs font-medium text-space-300 transform -rotate-45 origin-center"
                style={{ writingMode: 'vertical-rl' }}
              >
                {feature.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            ))}
          </div>

          {/* Matrix Rows */}
          {correlationMatrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {/* Row Label */}
              <div className="w-24 h-8 flex items-center justify-end pr-2 text-xs font-medium text-space-300">
                {features[rowIndex].replace(/([A-Z])/g, ' $1').trim()}
              </div>
              
              {/* Correlation Values */}
              {row.map((value, colIndex) => (
                <div
                  key={colIndex}
                  className={`w-20 h-8 flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                    getColorIntensity(value)
                  } ${getTextColor(value)} ${
                    hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex
                      ? 'ring-2 ring-white ring-opacity-50'
                      : ''
                  }`}
                  onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                  onMouseLeave={() => setHoveredCell(null)}
                  title={`${features[rowIndex]} vs ${features[colIndex]}: ${value.toFixed(3)}`}
                >
                  {hoveredCell?.row === rowIndex && hoveredCell?.col === colIndex
                    ? value.toFixed(3)
                    : value.toFixed(2)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Color Legend */}
      <div className="mt-6 flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-space-400">Strong (≥0.8)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="text-sm text-space-400">Moderate (0.6-0.8)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm text-space-400">Weak (0.4-0.6)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-space-400">Very Weak (0.2-0.4)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-500 rounded"></div>
          <span className="text-sm text-space-400">None (&lt;0.2)</span>
        </div>
      </div>
    </div>
  );
};

export default CorrelationMatrix;
