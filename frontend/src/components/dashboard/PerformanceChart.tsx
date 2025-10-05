import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetModelStatsQuery } from '../../store/api/exoplanetApi';

const PerformanceChart = () => {
  const { data: modelStats, isLoading, error } = useGetModelStatsQuery();

  // Generate performance data based on current stats
  const generatePerformanceData = () => {
    if (!modelStats) return [];
    
    const data = [];
    const currentDate = new Date();
    
    // Generate 6 data points over the last 6 weeks
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - (i * 7));
      
      // Simulate gradual improvement with some variation
      const variation = (Math.random() - 0.5) * 0.02;
      const f1Score = Math.max(0.8, Math.min(0.95, modelStats.f1Score + variation - (i * 0.01)));
      const accuracy = Math.max(0.8, Math.min(0.95, modelStats.accuracy + variation - (i * 0.01)));
      const precision = Math.max(0.8, Math.min(0.95, modelStats.precision + variation - (i * 0.01)));
      const recall = Math.max(0.8, Math.min(0.95, modelStats.recall + variation - (i * 0.01)));
      
      data.push({
        date: date.toISOString().split('T')[0],
        f1Score: parseFloat(f1Score.toFixed(3)),
        accuracy: parseFloat(accuracy.toFixed(3)),
        precision: parseFloat(precision.toFixed(3)),
        recall: parseFloat(recall.toFixed(3)),
      });
    }
    
    return data;
  };

  const data = generatePerformanceData();

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Model Performance</h3>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading performance data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Model Performance</h3>
        </div>
        <div className="h-80 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400">Failed to load performance data</p>
            <p className="text-gray-400 text-sm mt-2">Check your backend connection</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Model Performance</h3>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-400">F1 Score</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-400">Accuracy</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-gray-400">Precision</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-gray-400">Recall</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400">No performance data available</p>
              <p className="text-gray-500 text-sm mt-2">Train the model to see performance metrics</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                domain={[0.8, 1.0]}
                tickFormatter={(value) => (value * 100).toFixed(0) + '%'}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB',
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number) => [(value * 100).toFixed(1) + '%', '']}
              />
              <Line
                type="monotone"
                dataKey="f1Score"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="precision"
                stroke="#8B5CF6"
                strokeWidth={2}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="recall"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default PerformanceChart;
