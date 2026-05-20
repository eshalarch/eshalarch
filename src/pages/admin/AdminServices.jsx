import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';

export default function AdminServices({ isDarkMode, servicesData = [], refreshData }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [formHeading, setFormHeading] = useState('');
  const [formPlaceholder, setFormPlaceholder] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const safeServices = Array.isArray(servicesData) ? servicesData : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !formHeading || !formPlaceholder) return alert("Saara maal sahi se bhar bhai!");
    setLoading(true);

    try {
      if (editingId) {
        const { error } = await supabase
          .from('services')
          .update({ title, desc_text: desc, form_heading: formHeading, form_placeholder: formPlaceholder })
          .eq('id', editingId);

        if (!error) {
          alert("Service update ho gayi!");
          setEditingId(null);
          setTitle(''); setDesc(''); setFormHeading(''); setFormPlaceholder('');
          if (refreshData) await refreshData();
        } else {
          alert("Error: " + error.message);
        }
      }
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  const startEdit = (service) => {
    setEditingId(service.id);
    setTitle(service.title);
    setDesc(service.desc_text || "");
    setFormHeading(service.form_heading || "");
    setFormPlaceholder(service.form_placeholder || "");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-white">
      <div className={`p-6 border rounded-2xl shadow-xl h-fit ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200 text-black'}`}>
        <h2 className="text-sm font-bold tracking-widest mb-4 text-[#148346]">{editingId ? 'EDIT SERVICE' : 'ADD NEW SERVICE'}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input className={`w-full border rounded-xl px-4 py-2.5 text-xs ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`} placeholder="TITLE" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className={`w-full border rounded-xl px-4 py-2.5 text-xs ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`} placeholder="DESCRIPTION" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <input className={`w-full border rounded-xl px-4 py-2.5 text-xs ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`} placeholder="FORM HEADING" value={formHeading} onChange={(e) => setFormHeading(e.target.value)} />
          <input className={`w-full border rounded-xl px-4 py-2.5 text-xs ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`} placeholder="PLACEHOLDER" value={formPlaceholder} onChange={(e) => setFormPlaceholder(e.target.value)} />
          <button type="submit" disabled={loading} className="w-full py-3 bg-[#148346] text-white text-xs font-bold rounded-xl active:scale-95 transition-all">
            {loading ? 'SAVING...' : (editingId ? 'UPDATE SERVICE' : 'SUBMIT')}
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 p-6 border rounded-2xl shadow-xl h-fit bg-transparent">
        <h2 className="text-sm font-bold tracking-widest mb-4 text-[#148346]">🛠️ LIVE SERVICES PIPELINE ({safeServices.length})</h2>
        <div className="flex flex-col gap-3">
          {safeServices.map((service) => (
            <div key={service.id} className={`p-4 border rounded-xl flex items-center justify-between ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200 text-black'}`}>
              <h4 className="text-xs font-bold">{service.title}</h4>
              <button onClick={() => startEdit(service)} className="px-3 py-1.5 bg-zinc-500/10 text-[10px] font-bold rounded-lg text-zinc-400">EDIT</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
