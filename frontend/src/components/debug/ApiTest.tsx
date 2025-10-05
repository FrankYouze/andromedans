import { useState } from 'react';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const ApiTest = () => {
  const [testResults, setTestResults] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  const testEndpoint = async (endpoint: string, name: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://5314b2b30c23.ngrok-free.app${endpoint}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setTestResults(prev => ({
        ...prev,
        [name]: {
          success: response.ok,
          status: response.status,
          data: data,
          error: response.ok ? null : `HTTP ${response.status}: ${response.statusText}`
        }
      }));
    } catch (error: any) {
      setTestResults(prev => ({
        ...prev,
        [name]: {
          success: false,
          status: 'Network Error',
          data: null,
          error: error.message
        }
      }));
    }
    setIsLoading(false);
  };

  const testAllEndpoints = async () => {
    setTestResults({});
    await testEndpoint('/api', 'Root');
    await testEndpoint('/api/stats', 'Stats');
    await testEndpoint('/api/data', 'Data');
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-white mb-4">API Connection Test</h3>
      
      <div className="space-y-4">
        <button
          onClick={testAllEndpoints}
          disabled={isLoading}
          className="btn-primary disabled:opacity-50"
        >
          {isLoading ? 'Testing...' : 'Test All Endpoints'}
        </button>

        {Object.entries(testResults).map(([name, result]) => (
          <div key={name} className="border border-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400" />
              )}
              <h4 className="font-medium text-white">{name}</h4>
              <span className={`text-sm px-2 py-1 rounded ${
                result.success ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
              }`}>
                {result.status}
              </span>
            </div>
            
            {result.error && (
              <p className="text-red-400 text-sm mb-2">{result.error}</p>
            )}
            
            {result.data && (
              <pre className="text-xs text-gray-300 bg-gray-800 p-2 rounded overflow-x-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiTest;
