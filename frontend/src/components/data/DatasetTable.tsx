import { useState } from 'react';
import { Eye, Download, Trash2, Calendar, Database } from 'lucide-react';

interface Dataset {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  format: 'csv' | 'json' | 'fits';
  status: 'processing' | 'ready' | 'error';
  records: number;
}

const DatasetTable = ({ onSelectDataset }: { onSelectDataset: (id: string) => void }) => {
  const [datasets] = useState<Dataset[]>([
    {
      id: '1',
      name: 'Kepler_Exoplanets_2025.csv',
      size: 2.5,
      uploadDate: '2025-10-04T10:30:00Z',
      format: 'csv',
      status: 'ready',
      records: 5000,
    },
    {
      id: '2',
      name: 'TESS_Candidates_2025.json',
      size: 1.8,
      uploadDate: '2025-10-03T15:45:00Z',
      format: 'json',
      status: 'ready',
      records: 3200,
    },
    {
      id: '3',
      name: 'K2_Observations_2025.fits',
      size: 4.2,
      uploadDate: '2025-10-04T09:15:00Z',
      format: 'fits',
      status: 'processing',
      records: 0,
    },
    {
      id: '4',
      name: 'TOI_Data_2025.csv',
      size: 0.8,
      uploadDate: '2025-10-02T14:20:00Z',
      format: 'csv',
      status: 'error',
      records: 0,
    },
  ]);

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Uploaded Datasets</h3>
        <div className="flex items-center space-x-2 text-sm text-space-400">
          <Database className="h-4 w-4" />
          <span>{datasets.length} datasets</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-space-700">
              <th className="text-left py-3 px-4 text-sm font-medium text-space-300">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-space-300">Format</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-space-300">Size</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-space-300">Records</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-space-300">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-space-300">Upload Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-space-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((dataset) => (
              <tr key={dataset.id} className="border-b border-space-800 hover:bg-space-800/50">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-space-700 rounded-lg flex items-center justify-center">
                      <Database className="h-4 w-4 text-space-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{dataset.name}</p>
                      <p className="text-sm text-space-400">ID: {dataset.id}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-space-700 text-space-300 rounded text-xs font-medium">
                    {dataset.format.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 px-4 text-space-300">
                  {formatFileSize(dataset.size)}
                </td>
                <td className="py-3 px-4 text-space-300">
                  {dataset.records.toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dataset.status)}`}>
                    {dataset.status.charAt(0).toUpperCase() + dataset.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 text-space-300">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(dataset.uploadDate)}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSelectDataset(dataset.id)}
                      className="p-1 hover:bg-space-700 rounded text-space-400 hover:text-white transition-colors"
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 hover:bg-space-700 rounded text-space-400 hover:text-white transition-colors"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    <button
                      className="p-1 hover:bg-space-700 rounded text-red-400 hover:text-red-300 transition-colors"
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
    </div>
  );
};

export default DatasetTable;
