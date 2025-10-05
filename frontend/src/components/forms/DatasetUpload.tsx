import { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useUploadDatasetMutation } from '../../store/api/exoplanetApi';

const DatasetUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploadDataset, { isLoading }] = useUploadDatasetMutation();

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
    
    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setUploadStatus('error');
      setErrorMessage(`File size (${(file.size / 1024 / 1024).toFixed(2)} MB) exceeds the 10MB limit`);
      return;
    }
    
    if (allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension)) {
      setUploadedFile(file);
      setUploadStatus('idle');
      setErrorMessage('');
    } else {
      setUploadStatus('error');
      setErrorMessage(`Unsupported file type. Please upload a CSV, JSON, or FITS file.`);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setUploadStatus('idle');
    setErrorMessage('');
  };

  const handleUpload = async () => {
    if (!uploadedFile) return;
    
    setUploadStatus('uploading');
    setErrorMessage('');
    
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      
      console.log('Uploading file:', {
        name: uploadedFile.name,
        size: uploadedFile.size,
        type: uploadedFile.type
      });
      
      const result = await uploadDataset(formData).unwrap();
      console.log('Upload successful:', result);
      setUploadStatus('success');
      setErrorMessage('');
    } catch (error: any) {
      console.error('Upload failed:', error);
      console.error('Error details:', {
        status: error?.status,
        data: error?.data,
        message: error?.message
      });
      console.error('Full error object:', JSON.stringify(error, null, 2));
      
      // Log specific validation errors if available
      if (error?.data?.detail && Array.isArray(error.data.detail)) {
        console.error('Validation errors:', error.data.detail);
        error.data.detail.forEach((err: any, index: number) => {
          console.error(`Error ${index + 1}:`, err);
        });
      }
      setUploadStatus('error');
      
      // Extract detailed error message
      let errorMsg = '';
      
      if (error?.data?.detail) {
        // Handle different types of detail responses
        if (Array.isArray(error.data.detail)) {
          // If detail is an array of validation errors
          errorMsg = error.data.detail.map((err: any) => {
            if (typeof err === 'string') return err;
            if (err.msg) return err.msg;
            if (err.message) return err.message;
            return JSON.stringify(err);
          }).join(', ');
        } else if (typeof error.data.detail === 'string') {
          errorMsg = error.data.detail;
        } else if (typeof error.data.detail === 'object') {
          // Handle object with validation errors
          if (error.data.detail.msg) {
            errorMsg = error.data.detail.msg;
          } else if (error.data.detail.message) {
            errorMsg = error.data.detail.message;
          } else {
            errorMsg = JSON.stringify(error.data.detail);
          }
        }
      } else if (error?.data?.message) {
        errorMsg = error.data.message;
      } else if (error?.message) {
        errorMsg = error.message;
      } else if (error?.status) {
        switch (error.status) {
          case 400:
            errorMsg = 'Bad request. Please check your file format and try again.';
            break;
          case 413:
            errorMsg = 'File too large. Please upload a file smaller than 10MB.';
            break;
          case 415:
            errorMsg = 'Unsupported media type. Please upload a CSV, JSON, or FITS file.';
            break;
          case 422:
            errorMsg = 'File validation failed. Please check your CSV format and required columns.';
            break;
          case 500:
            errorMsg = 'Server error. Please try again later.';
            break;
          default:
            errorMsg = `Upload failed with status ${error.status}. Please try again.`;
        }
      } else {
        errorMsg = 'Upload failed. Please check your connection and try again.';
      }
      
      setErrorMessage(errorMsg || 'An unknown error occurred during upload');
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-gray-600 hover:border-gray-500'
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
        
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">
          Upload Exoplanet Dataset
        </h3>
        <p className="text-gray-400 mb-4">
          Drag and drop your file here, or click to browse
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: CSV, JSON, FITS (Max 10MB)
        </p>
      </div>

      {/* File Preview */}
      {uploadedFile && (
        <div className="card">
          <div className="flex items-center space-x-4">
            <FileText className="h-8 w-8 text-blue-400" />
            <div className="flex-1">
              <p className="font-medium text-white">{uploadedFile.name}</p>
              <p className="text-sm text-gray-400">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
              {errorMessage && (
                <p className="text-sm text-red-400 mt-1">
                  {typeof errorMessage === 'string' ? errorMessage : 'An error occurred during upload'}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {uploadStatus === 'success' && (
                <CheckCircle className="h-5 w-5 text-green-400" />
              )}
              {uploadStatus === 'error' && (
                <AlertCircle className="h-5 w-5 text-red-400" />
              )}
              <button
                onClick={clearFile}
                className="text-gray-400 hover:text-white transition-colors"
                title="Remove file"
              >
                ×
              </button>
            </div>
          </div>
          
        </div>
      )}

      {/* Upload Button */}
      {uploadedFile && (
        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            disabled={uploadStatus === 'uploading' || isLoading || uploadStatus === 'error'}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadStatus === 'uploading' || isLoading ? 'Uploading...' : 'Upload Dataset'}
          </button>
        </div>
      )}

      {/* Success Message */}
      {uploadStatus === 'success' && (
        <div className="card bg-green-900/20 border-green-500/50">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div>
              <p className="text-green-400 font-medium">Upload Successful!</p>
              <p className="text-green-300 text-sm">Your dataset has been uploaded and is being processed.</p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4">Upload Guidelines</h3>
         <div className="space-y-3 text-sm text-gray-300">
           <div className="flex items-start space-x-3">
             <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
             <p>Upload any CSV file - the backend will handle all validation</p>
           </div>
           <div className="flex items-start space-x-3">
             <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
             <p>Server will check required columns and data format</p>
           </div>
           <div className="flex items-start space-x-3">
             <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
             <p>Error messages will be displayed if validation fails</p>
           </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <p>Maximum file size: 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetUpload;
