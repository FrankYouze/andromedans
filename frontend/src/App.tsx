import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import DataManagement from './pages/DataManagement';
import ModelTraining from './pages/ModelTraining';
import Classification from './pages/Classification';
import Analytics from './pages/Analytics';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <div className="min-h-screen bg-gray-900">
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/data" element={<DataManagement />} />
                <Route path="/train" element={<ModelTraining />} />
                <Route path="/classify" element={<Classification />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </Layout>
          </div>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;