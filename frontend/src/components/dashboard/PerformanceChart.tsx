import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceChart = () => {
  // Mock data for performance over time
  const data = [
    { date: '2025-09-01', f1Score: 0.85, accuracy: 0.83, precision: 0.87, recall: 0.89 },
    { date: '2025-09-08', f1Score: 0.87, accuracy: 0.85, precision: 0.89, recall: 0.91 },
    { date: '2025-09-15', f1Score: 0.88, accuracy: 0.86, precision: 0.90, recall: 0.92 },
    { date: '2025-09-22', f1Score: 0.89, accuracy: 0.87, precision: 0.91, recall: 0.93 },
    { date: '2025-09-29', f1Score: 0.90, accuracy: 0.88, precision: 0.92, recall: 0.94 },
    { date: '2025-10-04', f1Score: 0.91, accuracy: 0.91, precision: 0.89, recall: 0.93 },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Model Performance</h3>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-space-400">F1 Score</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-space-400">Accuracy</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-space-400">Precision</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-space-400">Recall</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
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
      </div>
    </div>
  );
};

export default PerformanceChart;
