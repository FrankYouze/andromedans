import { useState } from 'react';
import { Brain, Settings, Play, Pause, RotateCcw } from 'lucide-react';

const ModelTraining = () => {
  const [isTraining, setIsTraining] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Model Training</h1>
        <p className="text-space-400 mt-2">
          Configure hyperparameters and train your AI model for exoplanet classification
        </p>
      </div>

      {/* Training Controls */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Training Controls</h3>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsTraining(!isTraining)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isTraining
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isTraining ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isTraining ? 'Pause Training' : 'Start Training'}</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-space-700 hover:bg-space-600 text-white rounded-lg font-medium transition-colors">
              <RotateCcw className="h-4 w-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Model Type */}
          <div>
            <label className="block text-sm font-medium text-space-300 mb-2">
              Model Type
            </label>
            <select className="input-field">
              <option value="random_forest">Random Forest</option>
              <option value="xgboost">XGBoost</option>
              <option value="neural_network">Neural Network</option>
            </select>
          </div>

          {/* Learning Rate */}
          <div>
            <label className="block text-sm font-medium text-space-300 mb-2">
              Learning Rate
            </label>
            <input
              type="number"
              step="0.001"
              defaultValue="0.01"
              className="input-field"
            />
          </div>

          {/* Number of Estimators */}
          <div>
            <label className="block text-sm font-medium text-space-300 mb-2">
              Number of Estimators
            </label>
            <input
              type="number"
              defaultValue="100"
              className="input-field"
            />
          </div>

          {/* Max Depth */}
          <div>
            <label className="block text-sm font-medium text-space-300 mb-2">
              Max Depth
            </label>
            <input
              type="number"
              defaultValue="10"
              className="input-field"
            />
          </div>

          {/* Batch Size */}
          <div>
            <label className="block text-sm font-medium text-space-300 mb-2">
              Batch Size
            </label>
            <input
              type="number"
              defaultValue="32"
              className="input-field"
            />
          </div>

          {/* Epochs */}
          <div>
            <label className="block text-sm font-medium text-space-300 mb-2">
              Epochs
            </label>
            <input
              type="number"
              defaultValue="50"
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Training Progress */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-6">Training Progress</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-space-400">
            <span>Epoch 0 / 50</span>
            <span>ETA: 2m 30s</span>
          </div>
          <div className="w-full bg-space-700 rounded-full h-2">
            <div className="bg-primary-500 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">0.00</p>
              <p className="text-sm text-space-400">Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0.00</p>
              <p className="text-sm text-space-400">Loss</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0.00</p>
              <p className="text-sm text-space-400">Val Accuracy</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">0.00</p>
              <p className="text-sm text-space-400">Val Loss</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelTraining;
