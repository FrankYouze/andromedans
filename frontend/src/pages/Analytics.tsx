import { useState } from 'react';
import { BarChart3, TrendingUp, Target, Database } from 'lucide-react';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState<'performance' | 'confusion' | 'features' | 'exploration'>('performance');

  const tabs = [
    { id: 'performance', name: 'Performance Metrics', icon: TrendingUp },
    { id: 'confusion', name: 'Confusion Matrix', icon: Target },
    { id: 'features', name: 'Feature Importance', icon: BarChart3 },
    { id: 'exploration', name: 'Data Exploration', icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Analytics</h1>
        <p className="text-space-400 mt-2">
          Analyze model performance and explore exoplanet data insights
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-space-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-400'
                    : 'border-transparent text-space-400 hover:text-space-300 hover:border-space-600'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">Accuracy Over Time</h3>
                <div className="h-64 bg-space-700 rounded-lg flex items-center justify-center">
                  <p className="text-space-400">Chart placeholder</p>
                </div>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">Model Comparison</h3>
                <div className="h-64 bg-space-700 rounded-lg flex items-center justify-center">
                  <p className="text-space-400">Chart placeholder</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'confusion' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-6">Confusion Matrix</h3>
            <div className="h-96 bg-space-700 rounded-lg flex items-center justify-center">
              <p className="text-space-400">Confusion matrix visualization placeholder</p>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-6">Feature Importance</h3>
            <div className="h-96 bg-space-700 rounded-lg flex items-center justify-center">
              <p className="text-space-400">Feature importance chart placeholder</p>
            </div>
          </div>
        )}

        {activeTab === 'exploration' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-white mb-4">Exoplanet Catalog Browser</h3>
              <div className="h-96 bg-space-700 rounded-lg flex items-center justify-center">
                <p className="text-space-400">Data exploration interface placeholder</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
