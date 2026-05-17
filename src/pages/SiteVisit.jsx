import React from 'react';

export default function SiteVisit() {
  return (
    <div className="px-4 py-24 min-h-screen bg-[#050505] flex flex-col justify-center items-center text-center">
      <div className="w-16 h-16 rounded-full bg-[#78281f]/20 border border-[#78281f] flex items-center justify-center mb-4 text-[#78281f] text-xl font-bold">📍</div>
      <h2 className="text-xl font-bold text-white tracking-wide">SITE INSPECTION</h2>
      <p className="text-xs text-zinc-400 max-w-xs mt-2 leading-relaxed">Schedule physical technical verification or structural auditing by AKVAI Engineers.</p>
      <button className="mt-8 px-6 py-3 bg-[#78281f] hover:bg-[#78281f]/80 text-white text-xs font-bold tracking-widest rounded-xl transition-all shadow-lg active:scale-95">REQUEST SITE VISIT</button>
    </div>
  );
}
