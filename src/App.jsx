import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import SiteVisit from './pages/SiteVisit';
import OrderStatus from './pages/OrderStatus';
import Auth from './pages/Auth';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Auth State Lock
  const [triggerAuthScreen, setTriggerAuthScreen] = useState(false);

  // Jab koi action block hit hoga toh login screen call hogi
  const handleProtectedAction = (nextActionCallback) => {
    if (!isLoggedIn) {
      setTriggerAuthScreen(true);
    } else {
      nextActionCallback();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-zinc-900'}`}>
      
      <Header 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
        openAuth={() => setTriggerAuthScreen(true)}
      />

      <main className="pb-24">
        {triggerAuthScreen ? (
          <Auth isDarkMode={isDarkMode} onLoginSuccess={() => { setIsLoggedIn(true); setTriggerAuthScreen(false); }} />
        ) : (
          <>
            {activeTab === 'home' && <Home isDarkMode={isDarkMode} requireAuth={handleProtectedAction} />}
            {activeTab === 'services' && <Services isDarkMode={isDarkMode} />}
            {activeTab === 'site' && <SiteVisit isDarkMode={isDarkMode} requireAuth={handleProtectedAction} />}
            {activeTab === 'status' && <OrderStatus isDarkMode={isDarkMode} requireAuth={handleProtectedAction} />}
          </>
        )}
      </main>

      {!triggerAuthScreen && <Footer activeTab={activeTab} setActiveTab={setActiveTab} isDarkMode={isDarkMode} />}
    </div>
  );
}
