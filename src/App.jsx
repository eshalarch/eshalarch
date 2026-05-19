import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import SiteVisit from './pages/SiteVisit';
import OrderStatus from './pages/OrderStatus';
import Admin from './pages/Admin';
import Auth from './pages/Auth';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [user, setUser] = useState(null); 
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [servicesData, setServicesData] = useState([
    { id: '01', title: '2D Layout Plan', desc: 'Precision-engineered blueprints mapping architectural space configurations down to the millimeter.', color: 'border-[#148346]/40', numColor: 'text-[#148346]', formHeading: 'Request 2D Layout Blueprint Specifications', formPlaceholder: 'Enter your plot size...' },
    { id: '02', title: '3D Elevation', desc: 'High-end photorealistic external structures and interior renders visualizing forms before ground-breaking.', color: 'border-[#c85a32]/40', numColor: 'text-[#c85a32]', formHeading: 'Consultation for 3D External & Interior Renderings', formPlaceholder: 'Upload your rough sketch...' }
  ]);

  const [openServicePageId, setOpenServicePageId] = useState(null);
  const isUrlAdminRoute = currentHash === '#admin';

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    if (adminPasswordInput === 'akvai2026') { 
      setIsAdminAuthenticated(true);
    } else {
      alert('Chor! Sahi password daal ❌');
      setAdminPasswordInput('');
    }
  };

  // Central Locking Gates for Buttons
  const requireAuth = (successAction) => {
    if (!user) {
      setActiveTab('auth');
    } else {
      if (successAction) successAction();
    }
  };

  const handleLoginSuccess = () => {
    setUser({ email: 'client@akvai.com', user_metadata: { full_name: 'Premium Client' } });
    setActiveTab('home'); 
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-zinc-900'}`}>
      
      {/* FIXED HEADER: Now strictly takes setActiveTab */}
      <Header 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        user={user} 
        handleLogout={handleLogout}
        setActiveTab={setActiveTab} 
      />

      <main className="pt-24 pb-24">
        {isUrlAdminRoute ? (
          !isAdminAuthenticated ? (
            <div className="px-4 py-32 min-h-screen flex items-center justify-center">
              <div className={`p-6 border rounded-2xl shadow-2xl max-w-sm w-full ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
                <h2 className="text-sm font-bold tracking-widest mb-2 text-[#c85a32]">🔒 ADMIN ACCESS LOCK</h2>
                <form onSubmit={handleAdminLoginSubmit} className="flex flex-col gap-3">
                  <input 
                    type="password" 
                    placeholder="Enter Secret Code"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`}
                  />
                  <button type="submit" className="w-full py-2.5 bg-[#78281f] text-white text-xs font-bold rounded-xl active:scale-95 transition-all">
                    UNLOCK PANEL
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <Admin isDarkMode={isDarkMode} servicesData={servicesData} setServicesData={setServicesData} />
          )
        ) : (
          <>
            {activeTab === 'home' && <Home isDarkMode={isDarkMode} requireAuth={requireAuth} />}
            {activeTab === 'services' && <Services isDarkMode={isDarkMode} servicesData={servicesData} openServicePageId={openServicePageId} setOpenServicePageId={setOpenServicePageId} requireAuth={requireAuth} />}
            {activeTab === 'site' && <SiteVisit isDarkMode={isDarkMode} requireAuth={requireAuth} />}
            {activeTab === 'status' && <OrderStatus isDarkMode={isDarkMode} requireAuth={requireAuth} />}
            {activeTab === 'auth' && <Auth isDarkMode={isDarkMode} onLoginSuccess={handleLoginSuccess} setActiveTab={setActiveTab} />}
          </>
        )}
      </main>

      {!isUrlAdminRoute && (
        <Footer 
          activeTab={activeTab === 'auth' ? 'home' : activeTab} 
          setActiveTab={(tabId) => { setOpenServicePageId(null); setActiveTab(tabId); }} 
          isDarkMode={isDarkMode} 
        />
      )}
    </div>
  );
}
