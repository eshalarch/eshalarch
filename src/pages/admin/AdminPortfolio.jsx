import React, { useState } from 'react';

const SUPABASE_URL = 'https://rkxwxkzqytzaajgrmloz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8vd5uZd2ivCwTEtkcdaj9g_EpSnevVC';

export default function AdminPortfolio({ isDarkMode, projectsData = [], setProjectsData, refreshData }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [tag, setTag] = useState('3D Elevation');
  const [img, setImg] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // SAFE CHECK: Agar projectsData array nahi hai toh khali array bna do taaki crash na ho
  const safeProjects = Array.isArray(projectsData) ? projectsData : [];

  const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !location || !img) return alert("Saara maal sahi se bhar bhai!");
    setLoading(true);

    try {
      if (editingId) {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/projects?id=eq.${editingId}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ title, location, tag, img })
        });
        if (response.ok) {
          alert("Project updated successfully! ⚡");
          setEditingId(null);
        }
      } else {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ title, location, tag, img })
        });
        if (response.ok) alert("New project pushed to database! 📁");
      }

      setTitle(''); setLocation(''); setImg('');
      if (refreshData) await refreshData();

    } catch (err) {
      console.error(err);
      alert("Database transfer crashed!");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setTitle(project.title || '');
    setLocation(project.location || '');
    setTag(project.tag || '3D Elevation');
    setImg(project.img || '');
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Sach me uda de is project ko? 🧨")) return;
    setLoading(true);

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/projects?id=eq.${id}`, {
        method: 'DELETE',
        headers
      });
      if (response.ok) {
        alert("Project deleted!");
        if (refreshData) await refreshData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-white">
      {/* FORM CARD */}
      <div className={`p-6 border rounded-2xl shadow-xl h-fit ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200 text-black'}`}>
        <h2 className="text-sm font-bold tracking-widest mb-4 text-[#c85a32] uppercase">
          {editingId ? '⚡ EDIT PROJECT' : '➕ CREATE NEW PROJECT'}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">PROJECT TITLE</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Modern Villa" className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
          </div>
          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">LOCATION</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Ahmedabad" className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
          </div>
          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">TAG</label>
            <select value={tag} onChange={(e) => setTag(e.target.value)} className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`}>
              <option value="3D Elevation">3D Elevation</option>
              <option value="2D Layout">2D Layout</option>
              <option value="Interior View">Interior View</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">IMAGE SOURCE URL</label>
            <input type="text" value={img} onChange={(e) => setImg(e.target.value)} placeholder="Paste link..." className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-[#c85a32] text-white text-xs font-bold rounded-xl active:scale-95 transition-all uppercase tracking-widest">
            {loading ? 'Processing...' : (editingId ? 'Update' : 'Push Live')}
          </button>
        </form>
      </div>

      {/* INDEX LIST */}
      <div className="lg:col-span-2 p-6 border rounded-2xl shadow-xl h-fit bg-transparent">
        <h2 className="text-sm font-bold tracking-widest mb-4 text-[#148346]">📁 LIVE PORTFOLIO INDEX ({safeProjects.length})</h2>
        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
          {safeProjects.length === 0 ? (
            <div className="text-xs font-mono text-zinc-500 py-4">Database table is currently empty. Add your first project!</div>
          ) : (
            safeProjects.map((project) => (
              <div key={project.id} className={`flex items-center justify-between p-3 border rounded-xl ${isDarkMode ? 'bg-[#111115] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'}`}>
                <div className="flex items-center gap-3 min-w-0">
                  <img src={project.img} alt="" className="w-12 h-12 object-cover rounded-lg bg-zinc-800" />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold truncate">{project.title}</h4>
                    <p className="text-[10px] text-zinc-500">📍 {project.location} | <span className="text-[#c85a32]">{project.tag}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => startEdit(project)} className="px-2.5 py-1.5 bg-zinc-500/10 text-[10px] font-bold rounded-lg text-zinc-400">EDIT</button>
                  <button onClick={() => deleteProject(project.id)} className="px-2.5 py-1.5 bg-red-600/10 text-[10px] font-bold rounded-lg text-red-500">DEL</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
