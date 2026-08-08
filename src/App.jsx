import { useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SignIn, SignUp, UserProfile } from '@clerk/clerk-react';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Chatbot from './chatbot/Chatbot.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import ResumeGate from './components/ResumeGate/ResumeGate.jsx';

const Home = lazy(() => import('./pages/Home/Home.jsx'));
const Results = lazy(() => import('./pages/Results/Results.jsx'));
const Processing = lazy(() => import('./pages/Processing/Processing.jsx'));
const Careers = lazy(() => import('./pages/Careers/Careers.jsx'));
const Contacts = lazy(() => import('./pages/Contacts/Contacts.jsx'));
const FAQ = lazy(() => import('./pages/FAQ/FAQ.jsx'));
const About = lazy(() => import('./pages/About/About.jsx'));
const Terms = lazy(() => import('./pages/Legal/Terms.jsx'));
const Privacy = lazy(() => import('./pages/Legal/Privacy.jsx'));
const Cookies = lazy(() => import('./pages/Legal/Cookies.jsx'));
const SavedJobs = lazy(() => import('./pages/SavedJobs/SavedJobs.jsx'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'));

const clerkAppearance = {
  variables: {
    colorPrimary: '#1F47E0',
    borderRadius: '10px',
  },
  layout: {
    socialButtonsVariant: 'blockButton',
    socialButtonsPlacement: 'top',
  },
  elements: {
    socialButtonsBlockButtonOuter: {
      display: 'inline-flex',
      width: 'calc(50% - 4px)',
    },
    socialButtonsProviderIcon: {
      width: '20px',
      height: '20px',
    },
  },
};

export default function App() {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isProcessing = location.pathname === '/processing';
  const isAuth = location.pathname.startsWith('/auth');
  const hideChrome = isProcessing || isAuth;

  const isResults = location.pathname === '/results';
  const isSavedJobs = location.pathname === '/saved-jobs';
  const hideFooter = hideChrome || isResults || isSavedJobs;

  return (
    <div className="fade-in app-content">
      <ScrollToTop />
      {!isAuth && <ResumeGate />}
      {!hideChrome && <Navbar onProfileToggle={setProfileOpen} onMenuToggle={setMobileMenuOpen} />}
      <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route
          path="/auth/login/*"
          element={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
              <SignIn routing="path" path="/auth/login" signUpUrl="/auth/register" appearance={clerkAppearance} />
            </div>
          }
        />
        <Route
          path="/auth/register/*"
          element={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
              <SignUp routing="path" path="/auth/register" signInUrl="/auth/login" appearance={clerkAppearance} />
            </div>
          }
        />
        <Route
          path="/account-settings/*"
          element={
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'calc(var(--header-h) + 40px) 20px 40px', background: 'var(--bg)', minHeight: '100vh' }}>
              <UserProfile
                routing="path"
                path="/account-settings"
                appearance={{
                  ...clerkAppearance,
                  elements: {
                    ...clerkAppearance.elements,
                    profileSection__activeDevices: { display: 'none' },
                    profileSection__connectedAccounts: { display: 'none' },
                    profileSectionPrimaryButton__emailAddresses: { display: 'none' },
                    badge: { display: 'none' },
                  },
                }}
              />
            </div>
          }
        />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      {!hideFooter && <Footer />}
      {!hideChrome && !profileOpen && !mobileMenuOpen && <Chatbot />}
    </div>
  );
}
