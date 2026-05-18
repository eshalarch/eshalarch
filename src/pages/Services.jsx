import React, { useState } from 'react';

export default function Services({ isDarkMode }) {
  const [viewMode, setViewMode] = useState('grid');

  const servicesData = [
    { id: '01', title: '2D Layout Plan', desc: 'Precision-engineered blueprints mapping architectural space configurations down to the millimeter.', color: 'border-[#148346]/40', numColor: 'text-[#148346]' },
    { id: '02', title: '3D Elevation', desc: 'High-end photorealistic external structures and interior renders visualizing forms before ground-breaking.', color: 'border-[#c85a32]/40', numColor: 'text-[#c85a32]' }
  ];

  return (
    <div className="px-4 py-24 min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-center mb-8 border-l-4 border-[#c85a32] pl-3">
        <h2 className={`text-xl font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>OUR SERVICES</h2>
        
        <button 
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className={`px-3 py-1.5 border rounded-xl text-[11px] font-semibold tracking-wider transition-all shadow-md active:scale-95
            ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'}`}
        >
          Layout: <span className="font-bold text-[10px]">{viewMode === 'grid' ? 'Grid ☷' : 'List ☰'}</span>
        </button>
      </div>
      
      {/* Structural Block Fix */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 gap-6" : "flex flex-col gap-4 max-w-xl mx-auto"}>
        {servicesData.map((service) => (
          <div 
            key={service.id}
            className={`p-6 border rounded-2xl shadow-xl transition-all duration-300 flex ${viewMode === 'list' ? 'flex-row gap-5 items-start' : 'flex-col gap-2'} ${service.color}
              ${isDarkMode ? 'bg-gradient-to-br from-zinc-900 to-black' : 'bg-white border-zinc-200'}`}
          >
            <div className={`text-2xl font-bold ${service.numColor} leading-none`}>{service.id}</div>
            <div className="flex-1">
              <h3 className={`text-base font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{service.title}</h3>
              <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
