import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Filter } from 'lucide-react';
import type { Exoplanet as ApiExoplanet } from '../../types';

interface DataPreviewProps {
  data?: ApiExoplanet[];
  loading?: boolean;
  error?: any;
  datasetId: string | null;
}

const DataPreview = ({ data, loading, error, datasetId }: DataPreviewProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<string>('pl_name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Convert API data to display format
  const displayData = data ? data.map((exoplanet, index) => ({
    id: exoplanet.id || `exoplanet-${index}`,
    name: exoplanet.pl_name || `Exoplanet ${index + 1}`,
    orbitalPeriod: exoplanet.pl_orbper || 0,
    transitDuration: exoplanet.pl_trandur || 0,
    planetaryRadius: exoplanet.pl_rade || 0,
    stellarRadius: exoplanet.st_rad || 0,
    classification: exoplanet.disposition || 'Unknown',
    confidence: Math.random() * 0.4 + 0.6, // Simulate confidence score
  })) : [];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...displayData].sort((a, b) => {
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'Confirmed':
        return 'text-green-400 bg-green-400/10';
      case 'Candidate':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'False Positive':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Dataset Preview</h3>
        </div>
        <div className="card">
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex space-x-4 py-3 animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-1/6"></div>
                <div className="h-4 bg-gray-700 rounded w-1/6"></div>
                <div className="h-4 bg-gray-700 rounded w-1/6"></div>
                <div className="h-4 bg-gray-700 rounded w-1/6"></div>
                <div className="h-4 bg-gray-700 rounded w-1/6"></div>
                <div className="h-4 bg-gray-700 rounded w-1/6"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Dataset Preview</h3>
        </div>
        <div className="card">
          <div className="text-center py-8">
            <p className="text-red-400">Failed to load data preview</p>
            <p className="text-gray-400 text-sm mt-2">Check your backend connection</p>
          </div>
        </div>
      </div>
    );
  }

  if (!datasetId) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">Select a dataset to preview</p>
          <p className="text-sm text-gray-500 mt-2">
            Choose a dataset from the table above to view its contents
          </p>
        </div>
      </div>
    );
  }

  if (displayData.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Dataset Preview</h3>
        </div>
        <div className="card">
          <div className="text-center py-8">
            <p className="text-gray-400">No data available</p>
            <p className="text-gray-500 text-sm mt-2">Upload data to see preview</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Dataset Preview</h3>
        <button className="btn-secondary flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('name')}
                >
                  Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('orbitalPeriod')}
                >
                  Period (days) {sortField === 'orbitalPeriod' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('transitDuration')}
                >
                  Duration (hrs) {sortField === 'transitDuration' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('planetaryRadius')}
                >
                  Radius (R⊕) {sortField === 'planetaryRadius' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('stellarRadius')}
                >
                  Stellar (R☉) {sortField === 'stellarRadius' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('classification')}
                >
                  Classification {sortField === 'classification' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-gray-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('confidence')}
                >
                  Confidence {sortField === 'confidence' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((exoplanet) => (
                <tr key={exoplanet.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                  <td className="py-3 px-4 font-medium text-white">{exoplanet.name}</td>
                  <td className="py-3 px-4 text-gray-300">{exoplanet.orbitalPeriod.toFixed(1)}</td>
                  <td className="py-3 px-4 text-gray-300">{exoplanet.transitDuration.toFixed(1)}</td>
                  <td className="py-3 px-4 text-gray-300">{exoplanet.planetaryRadius.toFixed(2)}</td>
                  <td className="py-3 px-4 text-gray-300">{exoplanet.stellarRadius.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClassificationColor(exoplanet.classification)}`}>
                      {exoplanet.classification}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {(exoplanet.confidence * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} records
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 py-2 text-sm text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPreview;
