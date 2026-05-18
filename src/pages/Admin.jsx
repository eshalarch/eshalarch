import React, { useState } from 'react';

export default function Admin({ isDarkMode, servicesData, setServicesData }) {
  const [newService, setNewService] = useState({ title: '', desc: '', formHeading: '', formPlaceholder: '' });

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newService.title || !newService.desc) return;

    const nextId = String(servicesData.length + 1).padStart(2, '0');
    
    const colorOptions = [
      { color: 'border-[#148346]/40', numColor: 'text-[#148346]' },
      { color: 'border-[#c85a32]/40', numColor: 'text-[#c85a32]' },
      { color: 'border-[#78281f]/40', numColor: 'text-[#78281f]' }
    ];
    const pickedColor = colorOptions[servicesData.length % colorOptions.length];

    const updatedList = [
      ...servicesData,
      {
        id: nextId,
        title: newService.title,
        desc: newService.desc,
        color: pickedColor.color,
        numColor: pickedColor.numColor,
        // Naye page ka inner form data
        formHeading: newService.formHeading || `Inquiry for ${newService.title}`,
        formPlaceholder: newService.formPlaceholder || 'Enter your project details here...'
      }
    ];

    setServicesData(updatedList);
    setNewService({ title: '', desc: '', formHeading: '', formPlaceholder: '' });
    alert('Naya Service Button aur Uska Dedicated Page Successful Ban Gaya! ✓');
  };

  const handleDeleteService = (id) => {
    const filtered = servicesData.filter(item => item.id !== id);
    const reIndexed = filtered.map((item, idx) => ({
      ...item,
      id: String(idx + 1).padStart(2, '0')
    }));
    setServicesData(reIndexed);
  };

  return (
    <div className="px-4 py-24 min-h-screen transition-colors duration-300">
      
      <div className="border-l-4 border-[#c85a32] pl-3 mb-8">
        <h2 className={`text-xl font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          ARCHITECT CORE - EDITABLE PANEL
        </h2>
        <p className="text-[10px] text-zinc-500 font-mono mt-1">Create Buttons that Open Custom Inner Pages</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* FORM: CREATE NEW SERVICE BUTTON & INNER PAGE */}
        <div className={`p-6 border rounded-2xl shadow-xl transition-all ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <h3 className={`text-sm font-bold tracking-widest mb-4 uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>
            ➕ Create New Button & Page
          </h3>
          <form onSubmit={handleCreateService} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Service Button Title</label>
              <input 
                type="text" required placeholder="E.g., Interior Design" 
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-[#148346]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#148346]'}`} 
              />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Card Grid/List Description</label>
              <textarea 
                rows="2" required placeholder="Short brief for the main card list..." 
                value={newService.desc}
                onChange={(e) => setNewService({ ...newService, desc: e.target.value })}
                className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none resize-none ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-[#c85a32]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#c85a32]'}`} 
              />
            </div>

            <div className="border-t border-zinc-800 my-1 pt-3">
              <p className="text-[11px] font-bold text-[#c85a32] tracking-wider mb-2">📄 INNER NEW PAGE SETTINGS</p>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Naye Page Ki Heading</label>
              <input 
                type="text" placeholder="E.g., Consult with our Chief Interior Designer" 
                value={newService.formHeading}
                onChange={(e) => setNewService({ ...newService, formHeading: e.target.value })}
                className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-[#78281f]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#78281f]'}`} 
              />
            </div>
            <div>
              <label className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Form Input Box Placeholder Text</label>
              <input 
                type="text" placeholder="What should the user write in the form?" 
                value={newService.formPlaceholder}
                onChange={(e) => setNewService({ ...newService, formPlaceholder: e.target.value })}
                className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white focus:border-[#78281f]' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-[#78281f]'}`} 
              />
            </div>

            <button type="submit" className="w-full py-3 bg-[#148346] text-white text-xs font-bold tracking-widest rounded-xl shadow-md active:scale-95 transition-all hover:bg-[#148346]/90">
              BUILD LIVE SERVICE BUTTON
            </button>
          </form>
        </div>

        {/* LIST: EXISTING BUTTONS MANAGE */}
        <div className={`p-6 border rounded-2xl shadow-xl transition-all ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <h3 className={`text-sm font-bold tracking-widest mb-4 uppercase ${isDarkMode ? 'text-white' : 'text-zinc-800'}`}>
            📂 Configured Buttons ({servicesData.length})
          </h3>
          <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
            {servicesData.map((item) => (
              <div key={item.id} className={`p-3 border rounded-xl flex justify-between items-center ${isDarkMode ? 'bg-black/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                <div>
                  <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{item.id}. {item.title}</p>
                  <p className="text-[10px] text-zinc-400 truncate max-w-[200px]">{item.formHeading}</p>
                </div>
                <button 
                  onClick={() => handleDeleteService(item.id)}
                  className="px-2 py-1 bg-[#78281f]/20 hover:bg-[#78281f] text-[#78281f] hover:text-white text-[10px] font-bold rounded-lg transition-all"
                >
                  Delete 🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
