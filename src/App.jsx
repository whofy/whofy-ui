import { useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
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

const Login = lazy(() => import('./pages/Auth/Login.jsx'));
const Register = lazy(() => import('./pages/Auth/Register.jsx'));
const ForgotPassword = lazy(() => import('./pages/Auth/ForgotPassword.jsx'));
const ResetPassword = lazy(() => import('./pages/Auth/ResetPassword.jsx'));
const AuthCallback = lazy(() => import('./pages/Auth/AuthCallback.jsx'));
const AccountSettings = lazy(() => import('./pages/AccountSettings/AccountSettings.jsx'));

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
    <div className={`fade-in app-content${hideChrome ? ' no-header' : ''}`}>
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
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot" element={<ForgotPassword />} />
        <Route path="/auth/reset" element={<ResetPassword />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      {!hideFooter && <Footer />}
      {!hideChrome && !profileOpen && !mobileMenuOpen && <Chatbot />}
      <Analytics />
    </div>
  );
}
