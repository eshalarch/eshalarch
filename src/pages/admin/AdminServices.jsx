import React, { useState } from 'react';

export default function AdminServices({ isDarkMode, servicesData, setServicesData }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [formHeading, setFormHeading] = useState('');
  const [formPlaceholder, setFormPlaceholder] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !desc || !formHeading || !formPlaceholder) {
      return alert("Saara maal sahi se bhar bhai! Koi field khali nahi honi chahiye.");
    }

    if (editingId) {
      // EDIT LOGIC: Purani service ko update karna
      setServicesData(servicesData.map(s => s.id === editingId ? {
        ...s,
        title,
        desc,
        formHeading,
        formPlaceholder
      } : s));
      setEditingId(null);
    } else {
      // CREATE LOGIC: Nayi unique service add karna
      const nextNum = servicesData.length + 1;
      const formattedId = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
      
      // Muted color logic for dynamic branding
      const dynamicColor = nextNum % 2 === 0 ? 'border-[#c85a32]/40' : 'border-[#148346]/40';
      const dynamicNumColor = nextNum % 2 === 0 ? 'text-[#c85a32]' : 'text-[#148346]';

      const newService = {
        id: formattedId,
        title,
        desc,
        color: dynamicColor,
        numColor: dynamicNumColor,
        formHeading,
        formPlaceholder
      };
      setServicesData([...servicesData, newService]);
    }

    // Reset Forms
    setTitle(''); setDesc(''); setFormHeading(''); setFormPlaceholder('');
  };

  const startEdit = (service) => {
    setEditingId(service.id);
    setTitle(service.title);
    setDesc(service.desc);
    setFormHeading(service.formHeading);
    setFormPlaceholder(service.formPlaceholder);
  };

  const deleteService = (id) => {
    if (window.confirm(`Kya tu sach me service ${id} ko pipeline se udaana chahta hai? 🧨`)) {
      setServicesData(servicesData.filter(s => s.id !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT PANEL: CREATE & EDIT DIGITAL ARCHITECTURE SERVICES */}
      <div className={`p-6 border rounded-2xl shadow-xl h-fit ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <h2 className="text-sm font-bold tracking-widest mb-4 text-[#148346] uppercase">
          {editingId ? `⚡ EDIT SERVICE PANEL [${editingId}]` : '➕ ADD NEW ARCHITECT SERVICE'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">SERVICE TITLE</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Interior Designing" className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
          </div>

          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">SERVICE OVERVIEW (DESCRIPTION)</label>
            <textarea rows="3" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Enter brief architectural purpose..." className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none resize-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`}></textarea>
          </div>

          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">GATED POPUP MODAL HEADING</label>
            <input type="text" value={formHeading} onChange={(e) => setFormHeading(e.target.value)} placeholder="e.g. Request Interior Design Blueprint Specifications" className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
          </div>

          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">FORM INPUT CUSTOM PLACEHOLDER</label>
            <input type="text" value={formPlaceholder} onChange={(e) => setFormPlaceholder(e.target.value)} placeholder="e.g. Enter your built-up area..." className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
          </div>

          <div className="flex gap-2 mt-2">
            <button type="submit" className="flex-1 py-3 bg-[#148346] text-white text-xs font-bold rounded-xl active:scale-95 transition-all uppercase tracking-widest">
              {editingId ? 'Update Service' : 'Activate Service'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setTitle(''); setDesc(''); setFormHeading(''); setFormPlaceholder(''); }} className="px-3 bg-zinc-600 text-white text-xs font-bold rounded-xl">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* RIGHT PANEL: LIVE ARCHITECTURE SERVICE TRACK INDEX */}
      <div className={`lg:col-span-2 p-6 border rounded-2xl shadow-xl h-fit ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <h2 className="text-sm font-bold tracking-widest mb-4 text-[#c85a32]">🛠️ LIVE SERVICES PIPELINE ({servicesData.length})</h2>

        <div className="flex flex-col gap-3">
          {servicesData.map((service) => (
            <div key={service.id} className={`p-4 border rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4
              ${isDarkMode ? 'bg-black border-zinc-800/60 hover:border-zinc-700' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'}`}>
              
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono font-bold ${service.numColor || 'text-zinc-400'}`}>[{service.id}]</span>
                  <h4 className="text-xs font-bold truncate tracking-wide uppercase">{service.title}</h4>
                </div>
                <p className="text-[11px] text-zinc-500 mt-1 font-medium">{service.desc}</p>
                <div className="mt-2 text-[9px] font-mono text-zinc-600 flex flex-col gap-0.5">
                  <span>↳ FORM HEADER: {service.formHeading}</span>
                  <span>↳ INPUT SPEC: {service.formPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center flex-shrink-0">
                <button onClick={() => startEdit(service)} className="px-3 py-1.5 bg-zinc-500/10 text-zinc-400 hover:text-white border border-zinc-500/20 text-[10px] font-bold rounded-lg transition-all active:scale-95">
                  EDIT
                </button>
                <button onClick={() => deleteService(service.id)} className="px-3 py-1.5 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-500/20 text-[10px] font-bold rounded-lg transition-all active:scale-95">
                  DELETE
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
