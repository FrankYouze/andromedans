import { useNavigate } from 'react-router-dom';
import { Upload, Brain, Search, BarChart3, Plus, FileText } from 'lucide-react';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Upload Dataset',
      description: 'Upload new exoplanet data for training',
      icon: Upload,
      color: 'bg-blue-500',
      onClick: () => navigate('/data'),
    },
    {
      title: 'Train Model',
      description: 'Configure and train the AI model',
      icon: Brain,
      color: 'bg-purple-500',
      onClick: () => navigate('/train'),
    },
    {
      title: 'Classify Data',
      description: 'Classify exoplanet observations',
      icon: Search,
      color: 'bg-green-500',
      onClick: () => navigate('/classify'),
    },
    {
      title: 'View Analytics',
      description: 'Analyze model performance',
      icon: BarChart3,
      color: 'bg-orange-500',
      onClick: () => navigate('/analytics'),
    },
    {
      title: 'Add Observation',
      description: 'Manually input exoplanet data',
      icon: Plus,
      color: 'bg-indigo-500',
      onClick: () => navigate('/classify'),
    },
    {
      title: 'Export Results',
      description: 'Download classification results',
      icon: FileText,
      color: 'bg-pink-500',
      onClick: () => console.log('Export results'),
    },
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.title}
              onClick={action.onClick}
              className="flex items-start space-x-4 p-4 bg-space-700 rounded-lg hover:bg-space-600 transition-colors text-left group"
            >
              <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white group-hover:text-primary-300 transition-colors">
                  {action.title}
                </h4>
                <p className="text-sm text-space-400 mt-1">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
