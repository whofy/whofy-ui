import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Chatbot from './components/Chatbot/Chatbot.jsx';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx';
import Home from './pages/Home/Home.jsx';
import Results from './pages/Results/Results.jsx';
import Processing from './pages/Processing/Processing.jsx';
import Careers from './pages/Careers/Careers.jsx';
import Contacts from './pages/Contacts/Contacts.jsx';
import FAQ from './pages/FAQ/FAQ.jsx';
import About from './pages/About/About.jsx';
import Terms from './pages/Legal/Terms.jsx';
import Privacy from './pages/Legal/Privacy.jsx';
import Cookies from './pages/Legal/Cookies.jsx';

export default function App() {
  const location = useLocation();
  const isProcessing = location.pathname === '/processing';

  return (
    <div className="fade-in app-content">
      <ScrollToTop />
      {!isProcessing && <Navbar />}
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
      </Routes>
      {!isProcessing && <Footer />}
      {!isProcessing && <Chatbot />}
    </div>
  );
}
