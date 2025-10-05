import { useState } from 'react';
import { Search, Upload, FileText, Zap } from 'lucide-react';
import { useClassifySingleMutation, useUploadDatasetMutation } from '../store/api/exoplanetApi';
import DatasetUpload from '../components/forms/DatasetUpload';

const Classification = () => {
  const [activeMode, setActiveMode] = useState<'single' | 'batch'>('single');
  const [formData, setFormData] = useState({
    orbitalPeriod: '',
    transitDuration: '',
    planetaryRadius: '',
    stellarRadius: '',
    stellarMass: '',
    effectiveTemperature: '',
    stellarMetallicity: '',
    stellarSurfaceGravity: '',
  });
  const [classifySingle, { isLoading: isClassifying }] = useClassifySingleMutation();
  const [uploadDataset, { isLoading: isUploading }] = useUploadDatasetMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await classifySingle(formData).unwrap();
      console.log('Classification result:', result);
      // Handle success - maybe show result in UI
    } catch (error) {
      console.error('Classification failed:', error);
      // Handle error - maybe show error message
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Classification</h1>
        <p className="text-space-400 mt-2">
          Classify exoplanet observations using AI-powered analysis
        </p>
      </div>

      {/* Mode Selection */}
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveMode('single')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeMode === 'single'
              ? 'bg-primary-950 text-white'
              : 'bg-space-700 text-space-300 hover:bg-space-600'
          }`}
        >
          <Search className="h-4 w-4" />
          <span>Single Observation</span>
        </button>
        <button
          onClick={() => setActiveMode('batch')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeMode === 'batch'
              ? 'bg-primary-950 text-white'
              : 'bg-space-700 text-space-300 hover:bg-space-600'
          }`}
        >
          <Upload className="h-4 w-4" />
          <span>Batch Processing</span>
        </button>
      </div>

      {/* Single Observation Mode */}
      {activeMode === 'single' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-6">Single Observation Classification</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-space-300 mb-2">
                  Orbital Period (days)
                </label>
                <input
                  type="number"
                  name="orbitalPeriod"
                  value={formData.orbitalPeriod}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 365.25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-space-300 mb-2">
                  Transit Duration (hours)
                </label>
                <input
                  type="number"
                  name="transitDuration"
                  value={formData.transitDuration}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-space-300 mb-2">
                  Planetary Radius (Earth radii)
                </label>
                <input
                  type="number"
                  name="planetaryRadius"
                  value={formData.planetaryRadius}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 1.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-space-300 mb-2">
                  Stellar Radius (Solar radii)
                </label>
                <input
                  type="number"
                  name="stellarRadius"
                  value={formData.stellarRadius}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 1.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-space-300 mb-2">
                  Stellar Mass (Solar masses)
                </label>
                <input
                  type="number"
                  name="stellarMass"
                  value={formData.stellarMass}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 1.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-space-300 mb-2">
                  Effective Temperature (K)
                </label>
                <input
                  type="number"
                  name="effectiveTemperature"
                  value={formData.effectiveTemperature}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 5778"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-space-300 mb-2">
                  Stellar Metallicity
                </label>
                <input
                  type="number"
                  name="stellarMetallicity"
                  value={formData.stellarMetallicity}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-space-300 mb-2">
                  Stellar Surface Gravity (log g)
                </label>
                <input
                  type="number"
                  name="stellarSurfaceGravity"
                  value={formData.stellarSurfaceGravity}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="e.g., 4.44"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isClassifying}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="h-4 w-4" />
                <span>{isClassifying ? 'Classifying...' : 'Classify Observation'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Batch Processing Mode */}
      {activeMode === 'batch' && (
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-6">Batch Processing</h3>
          <DatasetUpload />
        </div>
      )}

      {/* Results Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-6">Classification Results</h3>
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-space-400 mx-auto mb-4" />
          <p className="text-space-400">No classification results yet</p>
          <p className="text-sm text-space-500 mt-2">
            Submit an observation or upload a dataset to see results
          </p>
        </div>
      </div>
    </div>
  );
};

export default Classification;
