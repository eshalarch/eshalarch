import React from 'react';

export default function OrderStatus() {
  return (
    <div className="px-4 py-24 min-h-screen bg-[#050505]">
      <h2 className="text-xl font-bold text-white mb-6 tracking-wide border-l-4 border-orange-400 pl-3">TRACK PROJECT</h2>
      <div className="p-5 bg-zinc-900/40 border border-zinc-800 rounded-2xl max-w-md mx-auto">
        <p className="text-xs text-zinc-400 mb-4">Enter project reference number to view approval stage, drawing releases, and balance milestones.</p>
        <input type="text" placeholder="AKVAI / ARCH / 2026 / 01" className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white font-mono placeholder:text-zinc-600 focus:outline-none focus:border-orange-400 transition-colors" />
        <button className="w-full mt-4 py-3 bg-zinc-100 hover:bg-white text-black text-xs font-bold tracking-widest rounded-xl transition-all active:scale-95 shadow-md">FETCH STATUS</button>
      </div>
    </div>
  );
}
