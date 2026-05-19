import React, { useState } from 'react';
import { User, LogOut } from 'lucide-react'; 

export default function Header({ isDarkMode, setIsDarkMode, user, handleLogout, setActiveTab }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getUserName = () => {
    if (!user) return '';
    if (user.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user.email) return user.email.split('@')[0];
    return 'User';
  };

  const handleProfileClick = () => {
    if (user) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      // Router ke bina direct state se auth page kholega
      setActiveTab('auth');
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full h-20 px-6 flex justify-between items-center z-50 shadow-lg backdrop-blur-md border-b transition-colors duration-300
      ${isDarkMode ? 'bg-black/80 border-zinc-800' : 'bg-white/90 border-zinc-200'}`}>
      
      {/* LEFT SIDE: MENU & PROFILE BUTTONS */}
      <div className="relative flex items-center gap-3">
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex flex-col gap-1.5 p-2 rounded-lg transition-all duration-300 group active:scale-95
            ${isDarkMode ? 'hover:bg-zinc-900' : 'hover:bg-zinc-100'}`}
        >
          <span className="w-6 h-0.5 bg-[#c85a32] group-hover:w-5 transition-all"></span>
          <span className="w-5 h-0.5 bg-[#148346] group-hover:w-6 transition-all"></span>
          <span className="w-6 h-0.5 bg-[#78281f] group-hover:w-4 transition-all"></span>
        </button>

        <button 
          onClick={handleProfileClick} 
          className={`px-3 py-2 rounded-xl border transition-all active:scale-95 flex items-center gap-2 text-xs font-bold
            ${isDarkMode ? 'border-zinc-800 bg-zinc-900/50 text-white' : 'border-zinc-200 bg-zinc-50 text-zinc-800'}`}
        >
          {user ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#148346] animate-pulse"></span>
              <span className="capitalize tracking-wide max-w-[100px] truncate">
                {getUserName()}
              </span>
            </>
          ) : (
            <>
              <User size={16} />
              <span className="text-[11px] font-medium">Login</span>
            </>
          )}
        </button>

        {isMenuOpen && (
          <div className={`absolute left-0 top-12 w-56 border rounded-xl shadow-2xl p-2 z-50 transition-all flex flex-col gap-1
            ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
            
            <p className="text-[10px] font-bold text-zinc-500 tracking-widest px-3 py-1 uppercase">Preferences</p>
            
            <button 
              onClick={() => { setIsDarkMode(!isDarkMode); setIsMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all
                ${isDarkMode ? 'text-zinc-200 hover:bg-zinc-900' : 'text-zinc-800 hover:bg-zinc-100'}`}
            >
              <span>Theme Mode</span>
              <span className="text-sm">{isDarkMode ? '🌙 Dark' : '☀️ Light'}</span>
            </button>

            {user && (
              <>
                <div className={`border-t my-1 ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}></div>
                <button 
                  onClick={() => {
                    if(handleLogout) handleLogout();
                    setIsMenuOpen(false);
                    setActiveTab('home');
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                >
                  <span>Logout Account</span>
                  <LogOut size={14} />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* RIGHT SIDE: LOGO */}
      <div className="flex items-center h-full py-2">
        <img src="/logo.png" alt="AKVAI ASSOCIATES" className="h-14 w-auto object-contain" />
      </div>

    </header>
  );
}
