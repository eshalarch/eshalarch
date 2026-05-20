import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import SiteVisit from './pages/SiteVisit';
import OrderStatus from './pages/OrderStatus';
import Admin from './pages/admin/AdminPanel'; 
import Auth from './pages/Auth';
import { supabase } from './utils/supabase'; // Nayi import line

export default function App() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('akvai_active_tab') || 'home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => localStorage.getItem('akvai_admin_auth') === 'true');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [user, setUser] = useState(null); 
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  const [projectsData, setProjectsData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openServicePageId, setOpenServicePageId] = useState(null);

  const isUrlAdminRoute = currentHash === '#admin';

  useEffect(() => {
    localStorage.setItem('akvai_active_tab', activeTab);
  }, [activeTab]);

  // Yahan se tumhara fetchDatabaseData function hai
  const fetchDatabaseData = async () => {
    setLoading(true);
    try {
      const { data: projects } = await supabase.from('projects').select('*');
      if (projects) setProjectsData(projects);

      const { data: services } = await supabase.from('services').select('*');
      if (services) setServicesData(services);
    } catch (error) {
      console.error("Data fetch karne mein error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDatabaseData();
  }, []);

  // Baki ka purana code waisa ka waisa hi hai...
  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    localStorage.setItem('akvai_admin_auth', 'true');
  };

  const requireAuth = (callback) => {
    if (isAdminAuthenticated) callback();
    else alert("Access Denied!");
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#050505]' : 'bg-gray-50'}`}>
      {!isUrlAdminRoute && <Header activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {isUrlAdminRoute ? (
          !isAdminAuthenticated ? (
            <div className="flex justify-center items-center h-[80vh]">
              <div className="p-8 border border-zinc-800 bg-[#111115] rounded-2xl w-full max-w-sm">
                <h2 className="text-white text-lg font-bold mb-6">ADMIN ACCESS</h2>
                <form onSubmit={(e) => { e.preventDefault(); if (adminPasswordInput === '1234') handleLoginSuccess(); }}>
                  <input 
                    type="password" 
                    value={adminPasswordInput} 
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    className="w-full bg-black border border-zinc-800 p-3 rounded-xl text-white mb-4"
                    placeholder="PASSWORD"
                  />
                  <button type="submit" className="w-full py-2.5 bg-[#78281f] text-white text-xs font-bold rounded-xl active:scale-95 transition-all">UNLOCK PANEL</button>
                </form>
              </div>
            </div>
          ) : (
            <Admin 
              isDarkMode={isDarkMode} 
              servicesData={servicesData} 
              setServicesData={setServicesData} 
              projectsData={projectsData}
              setProjectsData={setProjectsData}
              refreshData={fetchDatabaseData} 
            />
          )
        ) : (
          <>
            {activeTab === 'home' && <Home isDarkMode={isDarkMode} requireAuth={requireAuth} projectsData={projectsData} />}
            {activeTab === 'services' && <Services isDarkMode={isDarkMode} servicesData={servicesData} openServicePageId={openServicePageId} setOpenServicePageId={setOpenServicePageId} requireAuth={requireAuth} />}
            {activeTab === 'site' && <SiteVisit isDarkMode={isDarkMode} requireAuth={requireAuth} />}
            {activeTab === 'status' && <OrderStatus isDarkMode={isDarkMode} requireAuth={requireAuth} />}
            {activeTab === 'auth' && <Auth isDarkMode={isDarkMode} onLoginSuccess={handleLoginSuccess} setActiveTab={setActiveTab} />}
          </>
        )}
      </main>
      {!isUrlAdminRoute && <Footer activeTab={activeTab === 'auth' ? 'home' : activeTab} setActiveTab={(tabId) => { setOpenServicePageId(null); setActiveTab(tabId); }} isDarkMode={isDarkMode} />}
    </div>
  );
}
