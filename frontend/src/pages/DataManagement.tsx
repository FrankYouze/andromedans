import { useState } from 'react';
import { Upload, Database, FileText, Download, Trash2, Eye } from 'lucide-react';
import DatasetUpload from '../components/forms/DatasetUpload';
import DatasetTable from '../components/data/DatasetTable';
import DataPreview from '../components/data/DataPreview';

const DataManagement = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'datasets' | 'preview'>('upload');
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);

  const tabs = [
    { id: 'upload', name: 'Upload Data', icon: Upload },
    { id: 'datasets', name: 'Manage Datasets', icon: Database },
    { id: 'preview', name: 'Data Preview', icon: Eye },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Data Management</h1>
        <p className="text-space-400 mt-2">
          Upload, manage, and preview exoplanet datasets for training and analysis
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
        {activeTab === 'upload' && <DatasetUpload />}
        {activeTab === 'datasets' && (
          <DatasetTable onSelectDataset={setSelectedDataset} />
        )}
        {activeTab === 'preview' && (
          <DataPreview datasetId={selectedDataset} />
        )}
      </div>
    </div>
  );
};

export default DataManagement;
