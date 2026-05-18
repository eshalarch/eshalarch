import React from 'react';

export default function SiteVisit({ isDarkMode }) {
  return (
    <div className="px-4 py-24 min-h-screen flex flex-col justify-center items-center text-center transition-colors duration-300">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 text-xl font-bold border
        ${isDarkMode ? 'bg-[#78281f]/20 border-[#78281f] text-[#78281f]' : 'bg-[#78281f]/10 border-[#78281f]/40 text-[#78281f]'}`}>
        📍
      </div>
      <h2 className={`text-xl font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        SITE INSPECTION
      </h2>
      <p className={`text-xs max-w-xs mt-2 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        Schedule physical technical verification or structural auditing by AKVAI Engineers.
      </p>
      <button className="mt-8 px-6 py-3 bg-[#78281f] hover:bg-[#78281f]/80 text-white text-xs font-bold tracking-widest rounded-xl transition-all shadow-lg active:scale-95">
        REQUEST SITE VISIT
      </button>
    </div>
  );
}
