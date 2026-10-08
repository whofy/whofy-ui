import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext.jsx';
import { SavedJobsProvider } from './context/SavedJobsContext.jsx';
import { ToastProvider } from './components/Toast/ToastContext.jsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx';
import App from './App.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <ToastProvider>
          <AuthProvider>
            <SavedJobsProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SavedJobsProvider>
          </AuthProvider>
        </ToastProvider>
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
);
