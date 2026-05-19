import React, { useState } from 'react';

export default function Services({ 
  isDarkMode, 
  servicesData, 
  openServicePageId, 
  setOpenServicePageId, 
  requireAuth 
}) {
  const [viewMode, setViewMode] = useState('grid');
  const [inputValue, setInputValue] = useState('');

  // Backup protection: Agar backend se data na aa raha ho toh default structure maintain rahega
  const displayServices = servicesData && servicesData.length > 0 ? servicesData : [
    { id: '01', title: '2D Layout Plan', desc: 'Precision-engineered blueprints mapping architectural space configurations down to the millimeter.', color: 'border-[#148346]/40', numColor: 'text-[#148346]', formHeading: 'Request 2D Layout Blueprint Specifications', formPlaceholder: 'Enter your plot size...' },
    { id: '02', title: '3D Elevation', desc: 'High-end photorealistic external structures and interior renders visualizing forms before ground-breaking.', color: 'border-[#c85a32]/40', numColor: 'text-[#c85a32]', formHeading: 'Consultation for 3D External & Interior Renderings', formPlaceholder: 'Upload your rough sketch...' }
  ];

  const handleServiceClick = (id) => {
    // Click hote hi sabse pehle auth guard check hoga
    requireAuth(() => {
      // Agar user authorized hai, toh us specific service ka inquiry modal open hoga
      setOpenServicePageId(id);
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Inquiry Registered Successfully! Detail: ${inputValue}`);
    setInputValue('');
    setOpenServicePageId(null);
  };

  // Currently active service ka data popup ke liye dhoondhna
  const activeService = displayServices.find(s => s.id === openServicePageId);

  return (
    <div className="px-4 py-24 min-h-screen relative">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-8 border-l-4 border-[#c85a32] pl-3">
        <h2 className={`text-xl font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-black'}`}>
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

      {/* GRID VIEW (CONVERTED TO SECURE DYNAMIC BUTTONS) */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 gap-4 w-full">
          {displayServices.map((service) => (
            <button 
              key={`grid-${service.id}`}
              onClick={() => handleServiceClick(service.id)}
              className={`aspect-square p-4 border rounded-2xl shadow-lg flex flex-col justify-between text-left transition-all duration-300 active:scale-[0.97] focus:outline-none group ${service.color || 'border-zinc-800/40'}
                ${isDarkMode ? 'bg-[#121214] hover:bg-[#161619]' : 'bg-white border-zinc-200 hover:bg-zinc-50'}`}
            >
              <div className="w-full flex justify-between items-start">
                <div className={`text-xl font-bold ${service.numColor || 'text-zinc-400'} leading-none`}>
                  {service.id}
                </div>
                <span className="text-[9px] text-zinc-500 font-normal tracking-wide bg-zinc-500/10 px-1.5 py-0.5 rounded opacity-60 group-hover:opacity-100 transition-opacity">🔒 Gated</span>
              </div>
              
              <div className="mt-auto">
                <h3 className={`text-xs sm:text-sm font-bold tracking-wide transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  {service.title}
                </h3>
                <p className={`text-[10px] mt-1 leading-tight line-clamp-3 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {service.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* LIST VIEW (CONVERTED TO SECURE DYNAMIC BUTTONS) */}
      {viewMode === 'list' && (
        <div className="flex flex-col gap-3 w-full max-w-xl mx-auto">
          {displayServices.map((service) => (
            <button 
              key={`list-${service.id}`}
              onClick={() => handleServiceClick(service.id)}
              className={`w-full p-4 border rounded-xl shadow-md flex items-center gap-4 text-left transition-all duration-300 active:scale-[0.99] focus:outline-none group ${service.color || 'border-zinc-800/40'}
                ${isDarkMode ? 'bg-[#121214] hover:bg-[#161619]' : 'bg-white border-zinc-200 hover:bg-zinc-50'}`}
            >
              <div className={`text-lg font-bold ${service.numColor || 'text-zinc-400'} leading-none min-w-[24px]`}>
                {service.id}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`text-sm font-bold tracking-wide transition-colors duration-300 flex items-center justify-between ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  <span>{service.title}</span>
                  <span className="text-[9px] text-zinc-500 font-mono font-normal tracking-wider bg-zinc-500/10 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">🔒 UNLOCK FORM</span>
                </h3>
                <p className={`text-[11px] mt-0.5 leading-snug truncate ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {service.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 👑 PREMIUM DYNAMIC INQUIRY MODAL (ADMIN CONTROLLED POPUP) */}
      {openServicePageId && activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-md p-6 border rounded-2xl shadow-2xl transition-all duration-300 transform scale-100
            ${isDarkMode ? 'bg-[#111115] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'}`}>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase ${activeService.numColor || 'text-[#c85a32]'}`}>
                  SERVICE PIPELINE [{activeService.id}]
                </span>
                <h3 className="text-base font-bold tracking-wide mt-0.5">
                  {activeService.title}
                </h3>
              </div>
              <button 
                onClick={() => setOpenServicePageId(null)}
                className="text-zinc-500 hover:text-zinc-400 text-sm font-bold px-2 py-1 rounded-lg bg-zinc-500/10 active:scale-90 transition-all"
              >
                ✕
              </button>
            </div>

            <p className={`text-xs mb-6 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {activeService.desc}
            </p>

            {/* ADMIN CONTROLLED DYNAMIC FORM */}
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 border-t border-zinc-800/60 pt-4">
              <div>
                <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-2 uppercase">
                  {activeService.formHeading}
                </label>
                <input 
                  type="text" 
                  required
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={activeService.formPlaceholder}
                  className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none transition-all
                    ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-zinc-700' : 'bg-zinc-50 border-zinc-300 text-black focus:border-zinc-400'}`}
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 bg-[#c85a32] hover:bg-[#b04f2b] text-white text-xs font-bold rounded-xl active:scale-95 transition-all uppercase tracking-widest"
              >
                Submit Requirement Blueprint
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
