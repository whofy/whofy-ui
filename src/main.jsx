import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { HelmetProvider } from 'react-helmet-async';
import { SavedJobsProvider } from './context/SavedJobsContext.jsx';
import App from './App.jsx';
import './styles/index.css';

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ClerkProvider publishableKey={clerkKey}>
        <SavedJobsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SavedJobsProvider>
      </ClerkProvider>
    </HelmetProvider>
  </StrictMode>
);
