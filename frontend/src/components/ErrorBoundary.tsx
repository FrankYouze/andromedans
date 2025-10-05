import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            <div className="card text-center">
              <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
              <p className="text-gray-400 mb-6">
                The application encountered an error and couldn't continue.
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={this.handleReload}
                  className="btn-primary flex items-center justify-center space-x-2 w-full"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Reload Page</span>
                </button>
                
                {this.state.error && (
                  <details className="text-left">
                    <summary className="text-sm text-gray-400 cursor-pointer hover:text-white">
                      Error Details
                    </summary>
                    <pre className="mt-2 text-xs text-red-400 bg-gray-800 p-3 rounded overflow-x-auto">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
