import React, { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Jab page load hoga, hum default me dark mode active rakhenge
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-black/85 dark:bg-black/85 light-theme:bg-white/90 border-b border-zinc-800 dark:border-zinc-800 light-theme:border-zinc-200 px-6 flex justify-between items-center z-50 shadow-lg backdrop-blur-md transition-colors duration-300">
      
      {/* Left Side: Option Menu Button Container */}
      <div className="relative">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-1.5 p-2 hover:bg-zinc-900 dark:hover:bg-zinc-900 light-theme:hover:bg-zinc-100 rounded-lg transition-all duration-300 group active:scale-95"
        >
          <span className="w-6 h-0.5 bg-[#c85a32] group-hover:w-5 transition-all"></span>
          <span className="w-5 h-0.5 bg-[#148346] group-hover:w-6 transition-all"></span>
          <span className="w-6 h-0.5 bg-[#78281f] group-hover:w-4 transition-all"></span>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute left-0 mt-3 w-48 bg-[#111115] dark:bg-[#111115] light-theme:bg-white border border-zinc-800 dark:border-zinc-800 light-theme:border-zinc-200 rounded-xl shadow-2xl p-2 z-50">
            <p className="text-[10px] font-bold text-zinc-500 tracking-widest px-3 py-1 uppercase">Preferences</p>
            
            <button 
              onClick={() => {
                const currentMode = isDarkMode;
                setIsDarkMode(!currentMode);
                
                // Pure body ka background ek jhatke me badalne ka desi aur asardar tarika
                if (!currentMode) {
                  document.documentElement.classList.add('dark');
                  document.body.style.backgroundColor = '#050505';
                  document.body.style.color = '#ffffff';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.body.style.backgroundColor = '#ffffff';
                  document.body.style.color = '#000000';
                }
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold text-zinc-200 dark:text-zinc-200 light-theme:text-zinc-800 hover:bg-zinc-900 dark:hover:bg-zinc-900 light-theme:hover:bg-zinc-100 transition-all"
            >
              <span>Theme Appearance</span>
              <span className="text-sm font-bold">{isDarkMode ? '🌙 Dark' : '☀️ Light'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Right Side: AKVAI Logo */}
      <div className="flex items-center h-full py-2">
        <img 
          src="/logo.png" 
          alt="AKVAI ASSOCIATES" 
          className="h-14 w-auto object-contain"
        />
      </div>

    </header>
  );
}
