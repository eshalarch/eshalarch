import React, { useState } from 'react';

export default function Auth({ isDarkMode, onLoginSuccess, setActiveTab }) {
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between px-4 py-24 relative overflow-y-auto animate-fade-in">
      
      {/* BACK BUTTON (Direct Home tab par bhejega) */}
      <button 
        type="button"
        onClick={() => setActiveTab('home')} 
        className={`absolute top-24 left-4 z-50 flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl border shadow-sm transition-all active:scale-95
          ${isDarkMode ? 'border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:text-white' : 'border-zinc-200 bg-white/95 text-zinc-600 hover:text-black'}`}
      >
        ← Back
      </button>

      {/* TERA ASLI SIGNUP / LOGIN CARD */}
      <div className={`w-full max-w-md mx-auto my-auto p-6 border rounded-2xl shadow-2xl transition-colors duration-300
        ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
        
        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-700 mb-6">
          <button 
            type="button" 
            onClick={() => setIsSignup(false)} 
            className={`flex-1 pb-3 text-sm font-bold tracking-wider transition-all ${!isSignup ? 'text-[#c85a32] border-b-2 border-[#c85a32]' : 'text-zinc-500'}`}
          >
            LOGIN
          </button>
          <button 
            type="button" 
            onClick={() => setIsSignup(true)} 
            className={`flex-1 pb-3 text-sm font-bold tracking-wider transition-all ${isSignup ? 'text-[#148346] border-b-2 border-[#148346]' : 'text-zinc-500'}`}
          >
            SIGNUP
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isSignup && (
            <>
              <input type="text" placeholder="Full Name" required className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-[#148346]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#148346]'}`} />
              <input type="text" placeholder="Username" required className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-[#148346]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#148346]'}`} />
            </>
          )}
          <input type="email" placeholder="Email Address" required className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-[#c85a32]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#c85a32]'}`} />
          <input type="password" placeholder="Password" required className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-[#78281f]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#78281f]'}`} />
          
          {!isSignup && (
            <div className="text-right">
              <button type="button" className="text-[10px] text-zinc-500 hover:text-[#c85a32]">Forgot Password?</button>
            </div>
          )}

          <button type="submit" className={`w-full py-3 mt-2 text-xs font-bold tracking-widest text-white rounded-xl shadow-md active:scale-95 transition-all ${isSignup ? 'bg-[#148346] hover:bg-[#148346]/90' : 'bg-[#c85a32] hover:bg-[#c85a32]/90'}`}>
            {isSignup ? 'CREATE ACCOUNT' : 'SECURE LOGIN'}
          </button>
        </form>
      </div>

      {/* FOOTER NAVIGATION CONTROL PLACEHOLDER */}
      <div className={`w-full text-center text-[10px] tracking-widest font-mono uppercase mt-8 transition-colors duration-300
        ${isDarkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>
        Secure Architecture Platform © 2026
      </div>

    </div>
  );
}
