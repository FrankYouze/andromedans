import { Eye, Download, Trash2, Calendar, Database } from 'lucide-react';
import type { Exoplanet } from '../../types';

interface DatasetTableProps {
  data?: Exoplanet[];
  loading?: boolean;
  error?: any;
  onSelectDataset: (id: string) => void;
}

const DatasetTable = ({ data, loading, error, onSelectDataset }: DatasetTableProps) => {
  // Convert API data to dataset format
  const datasets = data ? data.map((exoplanet, index) => ({
    id: exoplanet.id || `exoplanet-${index}`,
    name: `${exoplanet.pl_name || `Exoplanet_${index + 1}`}.csv`,
    size: Math.random() * 5 + 0.5, // Simulate file size
    uploadDate: exoplanet.discovery_date || new Date().toISOString(),
    format: 'csv' as const,
    status: 'ready' as const,
    records: 1,
  })) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'text-green-400 bg-green-400/10';
      case 'processing':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'error':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB < 1) {
      return `${(sizeInMB * 1024).toFixed(0)} KB`;
    }
    return `${sizeInMB.toFixed(1)} MB`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Uploaded Datasets</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Database className="h-4 w-4" />
            <span>Loading...</span>
          </div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border border-gray-700 rounded-lg p-4 animate-pulse">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Uploaded Datasets</h3>
        </div>
        <div className="text-center py-8">
          <p className="text-red-400">Failed to load datasets</p>
          <p className="text-gray-400 text-sm mt-2">Check your backend connection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Uploaded Datasets</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Database className="h-4 w-4" />
          <span>{datasets.length} datasets</span>
        </div>
      </div>

      {datasets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">No datasets available</p>
          <p className="text-gray-500 text-sm mt-2">Upload data to see datasets</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Format</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Size</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Records</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Upload Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {datasets.map((dataset) => (
                <tr key={dataset.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                        <Database className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{dataset.name}</p>
                        <p className="text-sm text-gray-400">ID: {dataset.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs font-medium">
                      {dataset.format.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {formatFileSize(dataset.size)}
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {dataset.records.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dataset.status)}`}>
                      {dataset.status.charAt(0).toUpperCase() + dataset.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(dataset.uploadDate)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onSelectDataset(dataset.id)}
                        className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        className="p-1 hover:bg-gray-700 rounded text-red-400 hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DatasetTable;
