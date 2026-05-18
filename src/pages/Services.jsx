import React, { useState } from 'react';

export default function Services({ isDarkMode }) {
  const [viewMode, setViewMode] = useState('grid'); // Default grid mode

  // Fixed static data for test run
  const servicesData = [
    { id: '01', title: '2D Layout Plan', desc: 'Precision-engineered blueprints mapping architectural space configurations down to the millimeter.', color: 'border-[#148346]/40', numColor: 'text-[#148346]' },
    { id: '02', title: '3D Elevation', desc: 'High-end photorealistic external structures and interior renders visualizing forms before ground-breaking.', color: 'border-[#c85a32]/40', numColor: 'text-[#c85a32]' }
  ];

  return (
    <div className="px-4 py-24 min-h-screen transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 border-l-4 border-[#c85a32] pl-3">
        <h2 className={`text-xl font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          OUR SERVICES
        </h2>
        
        {/* Toggle Button */}
        <button 
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className={`px-3 py-1.5 border rounded-xl text-[11px] font-semibold tracking-wider transition-all shadow-md active:scale-95
            ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'}`}
        >
          Layout: <span className="font-bold text-[10px]">{viewMode === 'grid' ? 'Grid ☷' : 'List ☰'}</span>
        </button>
      </div>

      {/* 1. LAYOUT GRID: AS PER YOUR DRAWING (Aaju-Baju 2 Square Boxes) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 gap-4 w-full">
          {servicesData.map((service) => (
            <div 
              key={`grid-${service.id}`}
              className={`aspect-square p-4 border rounded-2xl shadow-lg flex flex-col justify-between transition-all duration-300 ${service.color}
                ${isDarkMode ? 'bg-gradient-to-br from-zinc-900 to-black' : 'bg-white border-zinc-200'}`}
            >
              <div className={`text-xl font-bold ${service.numColor} leading-none`}>
                {service.id}
              </div>
              
              <div className="mt-auto">
                <h3 className={`text-xs sm:text-sm font-bold tracking-wide transition-colors duration-300
                  ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {service.title}
                </h3>
                <p className={`text-[10px] mt-1 leading-tight line-clamp-3 transition-colors duration-300
                  ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. LAYOUT LIST: AS PER YOUR DRAWING (Upar-Niche Rows) */}
      {viewMode === 'list' && (
        <div className="flex flex-col gap-3 w-full max-w-xl mx-auto">
          {servicesData.map((service) => (
            <div 
              key={`list-${service.id}`}
              className={`w-full p-4 border rounded-xl shadow-md flex items-center gap-4 transition-all duration-300 ${service.color}
                ${isDarkMode ? 'bg-gradient-to-br from-zinc-900 to-black' : 'bg-white border-zinc-200'}`}
            >
              <div className={`text-lg font-bold ${service.numColor} leading-none min-w-[24px]`}>
                {service.id}
              </div>
              
              <div className="flex-1">
                <h3 className={`text-sm font-bold tracking-wide transition-colors duration-300
                  ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                  {service.title}
                </h3>
                <p className={`text-[11px] mt-0.5 leading-snug transition-colors duration-300
                  ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
