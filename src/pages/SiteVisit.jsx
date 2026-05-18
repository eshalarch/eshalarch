import React from 'react';

export default function SiteVisit({ isDarkMode, requireAuth }) {
  return (
    <div className="px-4 py-24 min-h-screen flex flex-col justify-center items-center text-center">
      <h2 className={`text-xl font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>SITE INSPECTION</h2>
      <button 
        onClick={() => requireAuth(() => alert('Site visit booked successfully!'))}
        className="mt-8 px-6 py-3 bg-[#78281f] text-white text-xs font-bold tracking-widest rounded-xl shadow-lg active:scale-95"
      >
        REQUEST SITE VISIT
      </button>
    </div>
  );
}
