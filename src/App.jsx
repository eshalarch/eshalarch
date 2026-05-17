import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import SiteVisit from './pages/SiteVisit';
import OrderStatus from './pages/OrderStatus';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Multi-page routing controller block
  return (
    <div className="bg-[#050505] min-h-screen text-white select-none">
      {/* Common Application Header */}
      <Header />

      {/* Dynamic Content Frame Loader */}
      <main className="pb-24">
        {activeTab === 'home' && <Home />}
        {activeTab === 'services' && <Services />}
        {activeTab === 'site' && <SiteVisit />}
        {activeTab === 'status' && <OrderStatus />}
      </main>

      {/* Persistent Bottom App Controller Navigation */}
      <Footer activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
