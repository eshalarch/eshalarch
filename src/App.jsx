import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import SiteVisit from './pages/SiteVisit';
import OrderStatus from './pages/OrderStatus';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true); // Main Theme State

  return (
    // Is ek line se poori website ka background aur text color handle hoga
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-zinc-900'}`}>
      
      {/* Header ko state bhej rahe hain taaki wahan se theme change ho sake */}
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Dynamic Content Loader */}
      <main className="pb-24">
        {activeTab === 'home' && <Home isDarkMode={isDarkMode} />}
        {activeTab === 'services' && <Services isDarkMode={isDarkMode} />}
        {activeTab === 'site' && <SiteVisit isDarkMode={isDarkMode} />}
        {activeTab === 'status' && <OrderStatus isDarkMode={isDarkMode} />}
      </main>

      <Footer activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />
    </div>
  );
}
