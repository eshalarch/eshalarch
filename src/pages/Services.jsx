import React, { useState } from 'react';

export default function Services() {
  // viewMode track karega ki user ne kya select kiya hai
  const [viewMode, setViewMode] = useState('grid');

  const servicesData = [
    {
      id: '01',
      title: '2D Layout Plan',
      desc: 'Precision-engineered blueprints mapping architectural space configurations down to the millimeter.',
      darkBorder: 'dark:border-[#148346]/40',
      lightBorder: 'border-zinc-200',
      numColor: 'text-[#148346]'
    },
    {
      id: '02',
      title: '3D Elevation',
      desc: 'High-end photorealistic external structures and interior renders visualizing forms before ground-breaking.',
      darkBorder: 'dark:border-[#c85a32]/40',
      lightBorder: 'border-zinc-200',
      numColor: 'text-[#c85a32]'
    }
  ];

  return (
    <div className="px-4 py-24 min-h-screen bg-[#050505] dark:bg-[#050505] transition-colors duration-300" id="services-page-bg">
      
      {/* Header Row: Title on Left, Button on Right */}
      <div className="flex justify-between items-center mb-8 border-l-4 border-[#c85a32] pl-3">
        <h2 className="text-xl font-bold text-white dark:text-white transition-colors duration-300" id="services-title">OUR SERVICES</h2>
        
        <button 
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 dark:border-zinc-800 text-[11px] font-semibold tracking-wider text-zinc-300 hover:text-white active:scale-95 transition-all shadow-md"
          id="toggle-view-btn"
        >
          <span>Layout:</span>
          <span className="text-white font-bold uppercase text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded-md">
            {viewMode === 'grid' ? 'Grid ☷' : 'List ☰'}
          </span>
        </button>
      </div>
      
      {/* Dynamic Layout Conditioner */}
      {viewMode === 'grid' ? (
        /* ASLI GRID LAYOUT (Side-by-Side Cards) */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {servicesData.map((service) => (
            <div 
              key={service.id}
              className={`p-6 bg-gradient-to-br from-zinc-900 to-black dark:from-zinc-900 dark:to-black border rounded-2xl shadow-xl transition-all duration-300 group ${service.darkBorder} ${service.lightBorder}`}
              id={`card-grid-${service.id}`}
            >
              <div className={`text-2xl font-bold ${service.numColor} mb-2`}>
                {service.id}
              </div>
              <h3 className="text-lg font-semibold text-white dark:text-white transition-colors group-hover:text-zinc-200">
                {service.title}
              </h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-400 mt-2 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      ) : (
        /* ASLI LIST LAYOUT (One Below Another in Single Line) */
        <div className="flex flex-col gap-4 max-w-xl mx-auto">
          {servicesData.map((service) => (
            <div 
              key={service.id}
              className={`p-6 bg-gradient-to-br from-zinc-900 to-black dark:from-zinc-900 dark:to-black border rounded-2xl shadow-xl transition-all duration-300 flex gap-5 items-start ${service.darkBorder} ${service.lightBorder}`}
              id={`card-list-${service.id}`}
            >
              <div className={`text-2xl font-bold ${service.numColor} pt-1`}>
                {service.id}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white dark:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-400 mt-1 leading-relaxed">
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
