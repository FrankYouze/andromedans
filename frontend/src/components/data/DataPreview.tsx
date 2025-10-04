import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Filter } from 'lucide-react';

interface Exoplanet {
  id: string;
  name: string;
  orbitalPeriod: number;
  transitDuration: number;
  planetaryRadius: number;
  stellarRadius: number;
  classification: 'Confirmed' | 'Candidate' | 'False Positive';
  confidence: number;
}

const DataPreview = ({ datasetId }: { datasetId: string | null }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof Exoplanet>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Mock data
  const mockData: Exoplanet[] = [
    {
      id: '1',
      name: 'Kepler-452b',
      orbitalPeriod: 384.8,
      transitDuration: 2.5,
      planetaryRadius: 1.6,
      stellarRadius: 1.05,
      classification: 'Confirmed',
      confidence: 0.95,
    },
    {
      id: '2',
      name: 'TOI-715b',
      orbitalPeriod: 19.3,
      transitDuration: 1.2,
      planetaryRadius: 1.55,
      stellarRadius: 0.6,
      classification: 'Candidate',
      confidence: 0.78,
    },
    {
      id: '3',
      name: 'K2-18b',
      orbitalPeriod: 33.0,
      transitDuration: 2.1,
      planetaryRadius: 2.37,
      stellarRadius: 0.41,
      classification: 'Confirmed',
      confidence: 0.92,
    },
    {
      id: '4',
      name: 'TESS-1234b',
      orbitalPeriod: 12.4,
      transitDuration: 0.8,
      planetaryRadius: 0.8,
      stellarRadius: 0.9,
      classification: 'False Positive',
      confidence: 0.65,
    },
    {
      id: '5',
      name: 'Kepler-1649c',
      orbitalPeriod: 19.5,
      transitDuration: 1.1,
      planetaryRadius: 1.06,
      stellarRadius: 0.23,
      classification: 'Confirmed',
      confidence: 0.88,
    },
  ];

  const handleSort = (field: keyof Exoplanet) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...mockData].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
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

  if (!datasetId) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-space-400 mx-auto mb-4" />
          <p className="text-space-400">Select a dataset to preview</p>
          <p className="text-sm text-space-500 mt-2">
            Choose a dataset from the table above to view its contents
          </p>
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
              <tr className="border-b border-space-700">
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-space-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('name')}
                >
                  Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-space-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('orbitalPeriod')}
                >
                  Period (days) {sortField === 'orbitalPeriod' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-space-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('transitDuration')}
                >
                  Duration (hrs) {sortField === 'transitDuration' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-space-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('planetaryRadius')}
                >
                  Radius (R⊕) {sortField === 'planetaryRadius' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-space-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('stellarRadius')}
                >
                  Stellar (R☉) {sortField === 'stellarRadius' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-space-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('classification')}
                >
                  Classification {sortField === 'classification' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  className="text-left py-3 px-4 text-sm font-medium text-space-300 cursor-pointer hover:text-white"
                  onClick={() => handleSort('confidence')}
                >
                  Confidence {sortField === 'confidence' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((exoplanet) => (
                <tr key={exoplanet.id} className="border-b border-space-800 hover:bg-space-800/50">
                  <td className="py-3 px-4 font-medium text-white">{exoplanet.name}</td>
                  <td className="py-3 px-4 text-space-300">{exoplanet.orbitalPeriod.toFixed(1)}</td>
                  <td className="py-3 px-4 text-space-300">{exoplanet.transitDuration.toFixed(1)}</td>
                  <td className="py-3 px-4 text-space-300">{exoplanet.planetaryRadius.toFixed(2)}</td>
                  <td className="py-3 px-4 text-space-300">{exoplanet.stellarRadius.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClassificationColor(exoplanet.classification)}`}>
                      {exoplanet.classification}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-space-300">
                    {(exoplanet.confidence * 100).toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-space-700">
          <div className="text-sm text-space-400">
            Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} records
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-space-700 hover:bg-space-600 disabled:opacity-50 disabled:cursor-not-allowed text-space-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 py-2 text-sm text-space-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-space-700 hover:bg-space-600 disabled:opacity-50 disabled:cursor-not-allowed text-space-300"
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
