import React from 'react';

export default function OrderStatus({ isDarkMode }) {
  return (
    <div className="px-4 py-24 min-h-screen transition-colors duration-300">
      <h2 className={`text-xl font-bold mb-6 tracking-wide border-l-4 border-orange-400 pl-3 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
        TRACK PROJECT
      </h2>
      <div className={`p-5 border rounded-2xl max-w-md mx-auto shadow-md transition-colors duration-300
        ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <p className={`text-xs mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Enter project reference number to view approval stage, drawing releases, and balance milestones.
        </p>
        <input 
          type="text" 
          placeholder="AKVAI / ARCH / 2026 / 01" 
          className={`w-full border rounded-xl px-4 py-3 text-xs font-mono placeholder:text-zinc-500 focus:outline-none transition-colors
            ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-orange-400' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-orange-500'}`} 
        />
        <button className={`w-full mt-4 py-3 text-xs font-bold tracking-widest rounded-xl transition-all active:scale-95 shadow-md
          ${isDarkMode ? 'bg-zinc-100 hover:bg-white text-black' : 'bg-zinc-900 hover:bg-black text-white'}`}>
          FETCH STATUS
        </button>
      </div>
    </div>
  );
}
