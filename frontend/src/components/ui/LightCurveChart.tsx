import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LightCurveData {
  time: number;
  flux: number;
  error: number;
}

interface LightCurveChartProps {
  data: LightCurveData[];
  period?: number;
  depth?: number;
  duration?: number;
  title?: string;
}

const LightCurveChart = ({ 
  data, 
  period = 1, 
  depth = 0.01, 
  duration = 0.1, 
  title = "Light Curve" 
}: LightCurveChartProps) => {
  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <div className="flex space-x-6 text-sm text-space-400">
          <div>
            <span className="font-medium">Period:</span> {period.toFixed(2)} days
          </div>
          <div>
            <span className="font-medium">Depth:</span> {(depth * 100).toFixed(3)}%
          </div>
          <div>
            <span className="font-medium">Duration:</span> {(duration * 100).toFixed(1)}%
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              fontSize={12}
              label={{ value: 'Time (days)', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              label={{ value: 'Relative Flux', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB',
              }}
              formatter={(value: number, name: string) => [
                value.toFixed(6),
                name === 'flux' ? 'Flux' : 'Error'
              ]}
              labelFormatter={(value) => `Time: ${value.toFixed(3)} days`}
            />
            <Line
              type="monotone"
              dataKey="flux"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="error"
              stroke="#EF4444"
              strokeWidth={1}
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LightCurveChart;
