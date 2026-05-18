import React from 'react';

export default function Footer({ activeTab, setActiveTab, isDarkMode }) {
  const navItems = [
    { id: 'home', label: 'Home / Portfolio' },
    { id: 'services', label: 'Services' },
    { id: 'site', label: 'Site Visit' },
    { id: 'status', label: 'Order Status' }
  ];

  return (
    <footer className={`fixed bottom-0 left-0 w-full pb-5 pt-3 px-4 z-50 transition-colors duration-300
      ${isDarkMode 
        ? 'bg-[#0a0a0c] border-t border-zinc-800 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]' 
        : 'bg-white border-t border-zinc-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]'}`}>
      
      <div className="max-w-md mx-auto flex justify-between items-center gap-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 py-2.5 px-1 rounded-xl text-center text-[11px] font-semibold tracking-wider transition-all duration-300 active:scale-95
                ${isActive 
                  ? 'bg-gradient-to-r from-[#c85a32]/10 to-[#148346]/10 border border-[#c85a32]/40 shadow-[0_4px_15px_rgba(200,90,50,0.15)] ' + 
                    (isDarkMode ? 'text-white' : 'text-zinc-900')
                  : (isDarkMode ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50' : 'text-zinc-500 hover:text-black hover:bg-zinc-100/60') + ' border border-transparent'
                }`}
            >
              {/* Top Dot Indicators with Brand Colors */}
              <div className={`w-1.5 h-1.5 mx-auto mb-1 rounded-full transition-all duration-300
                ${item.id === 'home' && 'bg-[#c85a32]'}
                ${item.id === 'services' && 'bg-[#148346]'}
                ${item.id === 'site' && 'bg-[#78281f]'}
                ${item.id === 'status' && 'bg-orange-400'}
                ${isActive ? 'scale-125 opacity-100 shadow-[0_0_8px_currentColor]' : 'opacity-40 scale-100'}
              `} />
              {item.label}
            </button>
          );
        })}
      </div>
    </footer>
  );
}
