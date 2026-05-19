import React, { useState } from 'react';

const SUPABASE_URL = 'https://rkxwxkzqytzaajgrmloz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8vd5uZd2ivCwTEtkcdaj9g_EpSnevVC';

export default function AdminServices({ isDarkMode, servicesData, refreshData }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [formHeading, setFormHeading] = useState('');
  const [formPlaceholder, setFormPlaceholder] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !formHeading || !formPlaceholder) return alert("Saara maal sahi se bhar bhai!");
    setLoading(true);

    // Database structure match payload
    const payload = {
      title,
      desc_text: desc, // Column mapping
      form_heading: formHeading,
      form_placeholder: formPlaceholder
    };

    try {
      if (editingId) {
        // 🔄 UPDATE PIPELINE ON SUPABASE
        const response = await fetch(`${SUPABASE_URL}/rest/v1/services?id=eq.${editingId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(payload)
        });
        if (response.ok) {
          alert("Service blueprint modified!");
          setEditingId(null);
        }
      } else {
        // ➕ INSERT PIPELINE ON SUPABASE
        const nextNum = servicesData.length + 1;
        const formattedId = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
        
        const response = await fetch(`${SUPABASE_URL}/rest/v1/services`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ id: formattedId, ...payload })
        });
        if (response.ok) alert("New dynamic service deployed!");
      }

      setTitle(''); setDesc(''); setFormHeading(''); setFormPlaceholder('');
      if (refreshData) await refreshData();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (service) => {
    setEditingId(service.id);
    setTitle(service.title);
    setDesc(service.desc);
    setFormHeading(service.formHeading);
    setFormPlaceholder(service.formPlaceholder);
  };

  const deleteService = async (id) => {
    if (!window.confirm("Service ko pipeline se permanent delete karein? 🧨")) return;
    setLoading(true);

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/services?id=eq.${id}`, {
        method: 'DELETE',
        headers
      });
      if (response.ok) {
        alert("Service pipeline closed.");
        if (refreshData) await refreshData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`p-6 border rounded-2xl shadow-xl h-fit ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <h2 className="text-sm font-bold tracking-widest mb-4 text-[#148346] uppercase">
          {editingId ? `⚡ EDIT SERVICE PANEL [${editingId}]` : '➕ ADD NEW ARCHITECT SERVICE'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">SERVICE TITLE</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title..." className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
          </div>
          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">DESCRIPTION</label>
            <textarea rows="3" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Overview..." className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none resize-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`}></textarea>
          </div>
          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">POPUP MODAL HEADING</label>
            <input type="text" value={formHeading} onChange={(e) => setFormHeading(e.target.value)} placeholder="Heading..." className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
          </div>
          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">INPUT PLACEHOLDER</label>
            <input type="text" value={formPlaceholder} onChange={(e) => setFormPlaceholder(e.target.value)} placeholder="Placeholder..." className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-[#148346] text-white text-xs font-bold rounded-xl active:scale-95 transition-all uppercase tracking-widest disabled:opacity-50">
            {loading ? 'Processing DB...' : (editingId ? 'Update Service' : 'Activate Service')}
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 p-6 border rounded-2xl shadow-xl h-fit bg-transparent">
        <h2 className="text-sm font-bold tracking-widest mb-4 text-[#c85a32]">🛠️ LIVE SERVICES PIPELINE ({servicesData.length})</h2>
        <div className="flex flex-col gap-3">
          {servicesData.map((service) => (
            <div key={service.id} className={`p-4 border rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
              <div className="min-w-0">
                <h4 className="text-xs font-bold truncate">[{service.id}] {service.title}</h4>
                <p className="text-[11px] text-zinc-500 mt-1">{service.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <button onClick={() => startEdit(service)} className="px-3 py-1.5 bg-zinc-500/10 text-[10px] font-bold rounded-lg text-zinc-400">EDIT</button>
                <button onClick={() => deleteService(service.id)} className="px-3 py-1.5 bg-red-600/10 text-[10px] font-bold rounded-lg text-red-500">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
