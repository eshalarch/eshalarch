import React, { useState } from 'react';

export default function Services() {
  // viewMode state 'grid' ya 'list' track karegi
  const [viewMode, setViewMode] = useState('grid');

  const servicesData = [
    {
      id: '01',
      title: '2D Layout Plan',
      desc: 'Precision-engineered blueprints mapping architectural space configurations down to the millimeter.',
      color: 'border-[#148346]/40',
      numColor: 'text-[#148346]'
    },
    {
      id: '02',
      title: '3D Elevation',
      desc: 'High-end photorealistic external structures and interior renders visualizing forms before ground-breaking.',
      color: 'border-[#c85a32]/40',
      numColor: 'text-[#c85a32]'
    }
  ];

  return (
    <div className="px-4 py-24 min-h-screen bg-[#050505]">
      
      {/* Header Row: Title on Left, Grid/List Button on Right */}
      <div className="flex justify-between items-center mb-8 border-l-4 border-[#c85a32] pl-3">
        <h2 className="text-xl font-bold text-white tracking-wide">OUR SERVICES</h2>
        
        {/* Toggle View Button with Shadow and Border styling */}
        <button 
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-[11px] font-semibold tracking-wider text-zinc-300 hover:text-white hover:border-zinc-700 active:scale-95 transition-all shadow-md"
        >
          <span>Layout:</span>
          <span className="text-white font-bold uppercase text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded-md">
            {viewMode === 'grid' ? 'Grid ☰' : 'List ☷'}
          </span>
        </button>
      </div>
      
      {/* Dynamic Layout Container */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 gap-6' 
          : 'flex flex-col gap-4 max-w-xl mx-auto'
      }>
        {servicesData.map((service) => (
          <div 
            key={service.id}
            className={`p-6 bg-gradient-to-br from-zinc-900 to-black border rounded-2xl shadow-xl transition-all duration-300 group ${service.color}
              ${viewMode === 'list' ? 'flex gap-5 items-start sm:items-center' : ''}
            `}
          >
            <div className={`text-2xl font-bold ${service.numColor} ${viewMode === 'list' ? 'mb-0' : 'mb-2'}`}>
              {service.id}
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white tracking-wide group-hover:text-zinc-200 transition-colors">
                {service.title}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
