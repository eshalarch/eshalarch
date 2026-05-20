import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import SiteVisit from './pages/SiteVisit';
import OrderStatus from './pages/OrderStatus';
import Admin from './pages/admin/AdminPanel'; 
import Auth from './pages/Auth';

const SUPABASE_URL = 'https://rkxwxkzqytzaajgrmloz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8vd5uZd2ivCwTEtkcdaj9g_EpSnevVC';

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

  useEffect(() => {
    localStorage.setItem('akvai_admin_auth', isAdminAuthenticated);
  }, [isAdminAuthenticated]);

  // FIX: Sahi Header format taaki 'No API key' error na aaye
  const fetchDatabaseData = async () => {
    try {
      setLoading(true);
      const myHeaders = {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      };

      const resProjects = await fetch(`${SUPABASE_URL}/rest/v1/projects?select=*&order=id.desc`, { 
        method: 'GET',
        headers: myHeaders 
      });
      const projects = await resProjects.json();
      setProjectsData(Array.isArray(projects) ? projects : []);

      const resServices = await fetch(`${SUPABASE_URL}/rest/v1/services?select=*&order=id.asc`, { 
        method: 'GET',
        headers: myHeaders 
      });
      const services = await resServices.json();
      
      const servicesArray = Array.isArray(services) ? services : [];
      const formattedServices = servicesArray.map(s => ({
        id: s.id,
        title: s.title,
        desc: s.desc_text, 
        formHeading: s.form_heading,
        formPlaceholder: s.form_placeholder,
        color: parseInt(s.id) % 2 === 0 ? 'border-[#c85a32]/40' : 'border-[#148346]/40',
        numColor: parseInt(s.id) % 2 === 0 ? 'text-[#c85a32]' : 'text-[#148346]'
      }));
      setServicesData(formattedServices);

    } catch (error) {
      console.error("Supabase load error:", error);
      setProjectsData([]);
      setServicesData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseData();
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    if (adminPasswordInput === 'akvai2026') { 
      setIsAdminAuthenticated(true);
      localStorage.setItem('akvai_admin_auth', 'true');
    } else {
      alert('Chor! Sahi password daal ❌');
      setAdminPasswordInput('');
    }
  };

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
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} user={user} handleLogout={handleLogout} setActiveTab={setActiveTab} />
      <main className="pt-24 pb-24">
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-xs font-mono tracking-widest text-[#c85a32] animate-pulse uppercase">Connecting to live network...</div>
          </div>
        ) : isUrlAdminRoute ? (
          !isAdminAuthenticated ? (
            <div className="px-4 py-32 min-h-screen flex items-center justify-center">
              <div className={`p-6 border rounded-2xl shadow-2xl max-w-sm w-full ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
                <h2 className="text-sm font-bold tracking-widest mb-2 text-[#c85a32]">🔒 ADMIN ACCESS LOCK</h2>
                <form onSubmit={handleAdminLoginSubmit} className="flex flex-col gap-3">
                  <input type="password" placeholder="Enter Secret Code" value={adminPasswordInput} onChange={(e) => setAdminPasswordInput(e.target.value)} className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
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
