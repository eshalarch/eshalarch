import React, { useState } from 'react';

export default function Services({ isDarkMode, servicesData, openServicePageId, setOpenServicePageId }) {
  const [viewMode, setViewMode] = useState('grid');

  // Find which specific page is currently triggered by user click
  const activeServicePage = servicesData.find(item => item.id === openServicePageId);

  // IF AN INNER CUSTOM PAGE IS OPENED: Render the Form Page
  if (activeServicePage) {
    return (
      <div className="px-4 py-24 min-h-screen transition-colors duration-300 max-w-xl mx-auto animate-fade-in">
        
        {/* Back Navigation Bar */}
        <button 
          onClick={() => setOpenServicePageId(null)}
          className={`mb-6 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide border shadow-sm transition-all active:scale-95
            ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white' : 'bg-white border-zinc-200 text-zinc-700 hover:text-black'}`}
        >
          <span>↩ Back to Services</span>
        </button>

        {/* Naye Page Ki Heading & Content Details */}
        <div className={`p-6 border rounded-2xl shadow-2xl transition-all ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xl font-mono font-bold ${activeServicePage.numColor}`}>{activeServicePage.id}</span>
            <h2 className={`text-lg font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              {activeServicePage.formHeading}
            </h2>
          </div>
          
          <p className={`text-xs mb-6 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {activeServicePage.desc}
          </p>

          {/* Service Dynamic Inner Form */}
          <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry details captured successfully! ✓'); setOpenServicePageId(null); }} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Your Full Name</label>
              <input type="text" required placeholder="John Doe" className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-[#148346]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#148346]'}`} />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Contact Phone Number</label>
              <input type="tel" required placeholder="+91 XXXXX XXXXX" className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-[#148346]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#148346]'}`} />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Project Technical Requirements</label>
              <textarea rows="4" required placeholder={activeServicePage.formPlaceholder} className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none resize-none ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-[#c85a32]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#c85a32]'}`} />
            </div>
            
            <button type="submit" className="w-full py-3 bg-[#c85a32] text-white text-xs font-bold tracking-widest rounded-xl shadow-lg hover:bg-[#c85a32]/90 active:scale-95 transition-all">
              SUBMIT SPECIFICATIONS
            </button>
          </form>
        </div>

      </div>
    );
  }

  // STANDARD VIEW: Render Grid/List List Cards
  return (
    <div className="px-4 py-24 min-h-screen transition-colors duration-300">
      
      <div className="flex justify-between items-center mb-8 border-l-4 border-[#c85a32] pl-3">
        <h2 className={`text-xl font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          OUR SERVICES
        </h2>
        
        <button 
          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          className={`px-3 py-1.5 border rounded-xl text-[11px] font-semibold tracking-wider transition-all shadow-md active:scale-95
            ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700'}`}
        >
          Layout: <span className="font-bold text-[10px]">{viewMode === 'grid' ? 'Grid ☷' : 'List ☰'}</span>
        </button>
      </div>
      
      {/* SECTION 1: ASLI GRID VIEW (Side-by-Side 2 Columns) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {servicesData.map((service) => (
            <div 
              key={`grid-${service.id}`}
              onClick={() => setOpenServicePageId(service.id)} // Trigger opening the new inner page
              className={`p-6 border rounded-2xl shadow-xl transition-all duration-300 flex flex-col gap-2 cursor-pointer group hover:scale-[1.01] ${service.color}
                ${isDarkMode ? 'bg-gradient-to-br from-zinc-900 to-black text-white hover:border-zinc-600' : 'bg-white border-zinc-200 text-zinc-900 hover:border-zinc-400'}`}
            >
              <div className={`text-2xl font-bold ${service.numColor} leading-none`}>{service.id}</div>
              <div>
                <h3 className="text-base font-bold tracking-wide group-hover:text-[#c85a32] transition-colors">{service.title}</h3>
                <p className={`text-xs mt-2 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{service.desc}</p>
                <span className="text-[10px] font-mono text-[#c85a32] block mt-4 font-bold tracking-widest group-hover:translate-x-1 transition-transform">OPEN PAGE →</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SECTION 2: ASLI LIST VIEW (Upar-Neeche Rows) */}
      {viewMode === 'list' && (
        <div className="flex flex-col gap-4 max-w-xl mx-auto w-full">
          {servicesData.map((service) => (
            <div 
              key={`list-${service.id}`}
              onClick={() => setOpenServicePageId(service.id)} // Trigger opening the new inner page
              className={`p-6 border rounded-2xl shadow-xl transition-all duration-300 flex flex-row gap-5 items-start cursor-pointer group hover:scale-[1.01] ${service.color}
                ${isDarkMode ? 'bg-gradient-to-br from-zinc-900 to-black text-white hover:border-zinc-600' : 'bg-white border-zinc-200 text-zinc-900 hover:border-zinc-400'}`}
            >
              <div className={`text-2xl font-bold ${service.numColor} leading-none pt-1`}>{service.id}</div>
              <div className="flex-1">
                <h3 className="text-base font-bold tracking-wide group-hover:text-[#c85a32] transition-colors">{service.title}</h3>
                <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{service.desc}</p>
                <span className="text-[10px] font-mono text-[#c85a32] block mt-3 font-bold tracking-widest group-hover:translate-x-1 transition-transform">OPEN PAGE →</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
