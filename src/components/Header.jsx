import React, { useState } from 'react';

export default function Header({ isDarkMode, setIsDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 w-full h-20 px-6 flex justify-between items-center z-50 shadow-lg backdrop-blur-md border-b transition-colors duration-300
      ${isDarkMode ? 'bg-black/80 border-zinc-800' : 'bg-white/90 border-zinc-200'}`}>
      
      {/* Left Side: Option Button */}
      <div className="relative">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex flex-col gap-1.5 p-2 rounded-lg transition-all duration-300 group active:scale-95
            ${isDarkMode ? 'hover:bg-zinc-900' : 'hover:bg-zinc-100'}`}
        >
          <span className="w-6 h-0.5 bg-[#c85a32] group-hover:w-5 transition-all"></span>
          <span className="w-5 h-0.5 bg-[#148346] group-hover:w-6 transition-all"></span>
          <span className="w-6 h-0.5 bg-[#78281f] group-hover:w-4 transition-all"></span>
        </button>

        {/* Dropdown Preferences */}
        {isMenuOpen && (
          <div className={`absolute left-0 mt-3 w-48 border rounded-xl shadow-2xl p-2 z-50 transition-all
            ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
            <p className="text-[10px] font-bold text-zinc-500 tracking-widest px-3 py-1 uppercase">Preferences</p>
            
            <button 
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all
                ${isDarkMode ? 'text-zinc-200 hover:bg-zinc-900 hover:text-white' : 'text-zinc-800 hover:bg-zinc-100 hover:text-black'}`}
            >
              <span>Theme Mode</span>
              <span className="text-sm">{isDarkMode ? '🌙 Dark' : '☀️ Light'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Right Side: Logo */}
      <div className="flex items-center h-full py-2">
        <img src="/logo.png" alt="AKVAI ASSOCIATES" className="h-14 w-auto object-contain" />
      </div>

    </header>
  );
}
