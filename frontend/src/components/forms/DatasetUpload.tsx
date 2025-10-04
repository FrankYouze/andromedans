import { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const DatasetUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    const allowedTypes = ['text/csv', 'application/json', 'application/fits'];
    const allowedExtensions = ['.csv', '.json', '.fits'];
    
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension)) {
      setUploadedFile(file);
      setUploadStatus('idle');
    } else {
      setUploadStatus('error');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;
    
    setUploadStatus('uploading');
    
    // Simulate upload
    setTimeout(() => {
      setUploadStatus('success');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-primary-500 bg-primary-500/10'
            : 'border-space-600 hover:border-space-500'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv,.json,.fits"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <Upload className="h-12 w-12 text-space-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">
          Upload Exoplanet Dataset
        </h3>
        <p className="text-space-400 mb-4">
          Drag and drop your file here, or click to browse
        </p>
        <p className="text-sm text-space-500">
          Supported formats: CSV, JSON, FITS (Max 10MB)
        </p>
      </div>

      {/* File Preview */}
      {uploadedFile && (
        <div className="card">
          <div className="flex items-center space-x-4">
            <FileText className="h-8 w-8 text-primary-400" />
            <div className="flex-1">
              <p className="font-medium text-white">{uploadedFile.name}</p>
              <p className="text-sm text-space-400">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {uploadStatus === 'success' && (
                <CheckCircle className="h-5 w-5 text-green-400" />
              )}
              {uploadStatus === 'error' && (
                <AlertCircle className="h-5 w-5 text-red-400" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {uploadedFile && (
        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            disabled={uploadStatus === 'uploading'}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload Dataset'}
          </button>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Upload Guidelines</h3>
        <div className="space-y-3 text-sm text-space-300">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>CSV files should have headers in the first row</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Required columns: orbital_period, transit_duration, planetary_radius, stellar_radius</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Optional columns: stellar_mass, effective_temperature, stellar_metallicity</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Missing values will be automatically handled during preprocessing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetUpload;
