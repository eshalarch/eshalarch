import React, { useState } from 'react';
import AdminPortfolio from './AdminPortfolio';
import AdminServices from './AdminServices';

export default function AdminPanel({ isDarkMode, servicesData, setServicesData, projectsData, setProjectsData }) {
  // By default portfolio control khulega
  const [adminTab, setAdminTab] = useState('portfolio'); 

  return (
    <div className="min-h-screen px-4 py-8">
      
      {/* 👑 ADMIN PREMIUM HEADER & NAVIGATION (LOOK MATCHES CLIENT APP) */}
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
            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">System Live</span>
          </div>
        </div>

        {/* ADMIN DYNAMIC NAVIGATION TABS */}
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

          {/* FUTURE CONTROL PLACEHOLDER BUTTON */}
          <button 
            disabled
            className={`px-4 py-2.5 text-xs font-bold tracking-wider rounded-xl opacity-40 cursor-not-allowed border border-dashed
              ${isDarkMode ? 'border-zinc-800 text-zinc-600' : 'border-zinc-300 text-zinc-400'}`}
          >
            ⚙️ NEXT MODULE (LOCKED)
          </button>
        </div>
      </div>

      {/* DYNAMIC ROUTING INNER CORE */}
      <div className="animate-fade-in">
        {adminTab === 'portfolio' && (
          <AdminPortfolio 
            isDarkMode={isDarkMode} 
            projectsData={projectsData} 
            setProjectsData={setProjectsData} 
          />
        )}
        {adminTab === 'services' && (
          <AdminServices 
            isDarkMode={isDarkMode} 
            servicesData={servicesData} 
            setServicesData={setServicesData} 
          />
        )}
      </div>

    </div>
  );
}
