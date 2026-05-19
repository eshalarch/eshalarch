import React, { useState, useEffect } from 'react';
import AdminPortfolio from './AdminPortfolio';
import AdminServices from './AdminServices';

export default function AdminPanel({ isDarkMode, servicesData, setServicesData, projectsData, setProjectsData, refreshData }) {
  // Refresh hone par bhi tab yaad rakhega
  const [adminTab, setAdminTab] = useState(() => {
    return localStorage.getItem('akvai_admin_tab') || 'portfolio';
  }); 

  useEffect(() => {
    localStorage.setItem('akvai_admin_tab', adminTab);
  }, [adminTab]);

  return (
    <div className="min-h-screen px-4 py-8">
      
      {/* HEADER CONTROLLER CARD */}
      <div className={`mb-10 p-6 border rounded-2xl shadow-xl transition-all duration-300
        ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl font-extrabold tracking-widest text-[#c85a32]">
              AKVAI MASTER CONTROL
            </h1>
            <p className="text-[11px] text-zinc-500 font-mono mt-0.5">ROLE: ADMINISTRATOR (SECURE OVERRIDE)</p>
          </div>
          <div className="flex items-center gap-2 bg-zinc-500/10 px-3 py-1.5 rounded-xl border border-zinc-500/20">
            <span className="w-2 h-2 rounded-full bg-[#148346] animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">Database Live Connection</span>
          </div>
        </div>

        {/* TAB BUTTONS */}
        <div className="flex flex-wrap gap-2 border-t pt-4 border-zinc-800">
          <button 
            onClick={() => setAdminTab('portfolio')}
            className={`px-4 py-2.5 text-xs font-bold tracking-wider rounded-xl transition-all active:scale-95
              ${adminTab === 'portfolio' 
                ? 'bg-[#c85a32] text-white shadow-md' 
                : (isDarkMode ? 'bg-black border border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-black')}`}
          >
            📂 MANAGE PORTFOLIO
          </button>

          <button 
            onClick={() => setAdminTab('services')}
            className={`px-4 py-2.5 text-xs font-bold tracking-wider rounded-xl transition-all active:scale-95
              ${adminTab === 'services' 
                ? 'bg-[#148346] text-white shadow-md' 
                : (isDarkMode ? 'bg-black border border-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-black')}`}
          >
            🛠️ MANAGE SERVICES
          </button>
        </div>
      </div>

      {/* DYNAMIC RENDERING PANEL */}
      <div className="animate-fade-in">
        {adminTab === 'portfolio' && (
          <AdminPortfolio 
            isDarkMode={isDarkMode} 
            projectsData={projectsData} 
            setProjectsData={setProjectsData} 
            refreshData={refreshData}
          />
        )}
        {adminTab === 'services' && (
          <AdminServices 
            isDarkMode={isDarkMode} 
            servicesData={servicesData} 
            setServicesData={setServicesData} 
            refreshData={refreshData}
          />
        )}
      </div>

    </div>
  );
}
