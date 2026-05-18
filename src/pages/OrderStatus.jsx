import React from 'react';

export default function OrderStatus({ isDarkMode, requireAuth }) {
  return (
    <div className="px-4 py-24 min-h-screen">
      <div className={`p-5 border rounded-2xl max-w-md mx-auto shadow-md ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <input type="text" placeholder="AKVAI / ARCH / 2026 / 01" className="w-full border rounded-xl px-4 py-3 text-xs" />
        <button 
          onClick={() => requireAuth(() => alert('Fetching project logs...'))}
          className="w-full mt-4 py-3 bg-zinc-100 dark:bg-zinc-100 text-black text-xs font-bold tracking-widest rounded-xl"
        >
          FETCH STATUS
        </button>
      </div>
    </div>
  );
}
