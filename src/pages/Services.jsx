import React from 'react';

export default function Services() {
  return (
    <div className="px-4 py-24 min-h-screen bg-[#050505]">
      <h2 className="text-xl font-bold text-white mb-6 tracking-wide border-l-4 border-[#c85a32] pl-3">OUR SERVICES</h2>
      
      <div className="flex flex-col gap-6">
        <div className="p-6 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl shadow-xl hover:border-[#148346]/40 transition-all group">
          <div className="text-2xl text-[#148346] font-bold mb-2">01</div>
          <h3 className="text-lg font-semibold text-white tracking-wide group-hover:text-[#148346] transition-colors">2D Layout Plan</h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">Precision-engineered blueprints mapping architectural space configurations down to the millimeter.</p>
        </div>

        <div className="p-6 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl shadow-xl hover:border-[#c85a32]/40 transition-all group">
          <div className="text-2xl text-[#c85a32] font-bold mb-2">02</div>
          <h3 className="text-lg font-semibold text-white tracking-wide group-hover:text-[#c85a32] transition-colors">3D Elevation</h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">High-end photorealistic external structures and interior renders visualizing forms before ground-breaking.</p>
        </div>
      </div>
    </div>
  );
}
