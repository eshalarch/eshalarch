import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import SiteVisit from './pages/SiteVisit';
import OrderStatus from './pages/OrderStatus';
import Admin from './pages/Admin';
import Auth from './pages/Auth'; // Naya Auth Page Import kiya

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  
  // Real User State (Null matlab logged out, object matlab logged in)
  const [user, setUser] = useState(null); 
  
  // URL hash track karne ke liye state (#admin check karne ke liye)
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

  // Is hash checking #admin right now?
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

  // Central Central Locking System - Isko hum baaki pages me bhejenge
  const requireAuth = (successAction) => {
    if (!user) {
      // Agar user login nahi hai, to direct login tab par bhej do
      setActiveTab('auth');
    } else {
      // Agar login hai, to jo kaam karna tha wo karne do
      if (successAction) successAction();
    }
  };

  // Fake login success simulation
  const handleLoginSuccess = () => {
    setUser({ email: 'architect.user@gmail.com', user_metadata: { full_name: 'Client Partner' } });
    setActiveTab('home'); // Login hote hi home par bhejo
  };

  // Logout Trigger
  const handleLogout = () => {
    setUser(null);
    setActiveTab('home');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-zinc-900'}`}>
      
      {/* Header me user state, logout, aur auth navigation link kar di */}
      <Header 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        user={user} 
        handleLogout={handleLogout}
        // Agar header ka profile button click ho to direct auth tab khule
        navigate={(route) => { if(route === '/auth') setActiveTab('auth'); else setActiveTab('home'); }} 
      />

      <main className="pb-24">
        {isUrlAdminRoute ? (
          // IF SECRET URL VISITED
          !isAdminAuthenticated ? (
            /* SECURITY LOCK GATE */
            <div className="px-4 py-32 min-h-screen flex items-center justify-center">
              <div className={`p-6 border rounded-2xl shadow-2xl max-w-sm w-full ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
                <h2 className="text-sm font-bold tracking-widest mb-2 text-[#c85a32]">🔒 ADMIN ACCESS LOCK</h2>
                <p className="text-[10px] text-zinc-500 mb-4">This route is restricted to AKVAI Administrators only.</p>
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
            /* LOCKED AUTHENTICATED PANEL */
            <Admin isDarkMode={isDarkMode} servicesData={servicesData} setServicesData={setServicesData} />
          )
        ) : (
          // PUBLIC WEBSITE TABS WITH GATED CONTROLS
          <>
            {activeTab === 'home' && (
              <Home isDarkMode={isDarkMode} requireAuth={requireAuth} />
            )}
            
            {activeTab === 'services' && (
              <Services 
                isDarkMode={isDarkMode} 
                servicesData={servicesData} 
                openServicePageId={openServicePageId} 
                setOpenServicePageId={setOpenServicePageId} 
                requireAuth={requireAuth} 
              />
            )}
            
            {activeTab === 'site' && (
              <SiteVisit isDarkMode={isDarkMode} requireAuth={requireAuth} />
            )}
            
            {activeTab === 'status' && (
              <OrderStatus isDarkMode={isDarkMode} requireAuth={requireAuth} />
            )}

            {/* AUTH TABS INTERACTION */}
            {activeTab === 'auth' && (
              <Auth isDarkMode={isDarkMode} onLoginSuccess={handleLoginSuccess} />
            )}
          </>
        )}
      </main>

      {/* Public pages footer. Hidden inside the admin route */}
      {!isUrlAdminRoute && (
        <Footer 
          activeTab={activeTab === 'auth' ? 'home' : activeTab} // Auth screen par koi specific tab select na dikhe footer me
          setActiveTab={(tabId) => { setOpenServicePageId(null); setActiveTab(tabId); }} 
          isDarkMode={isDarkMode} 
        />
      )}
    </div>
  );
}
