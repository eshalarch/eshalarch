import React, { useState } from 'react';

export default function AdminPortfolio({ isDarkMode, projectsData, setProjectsData }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [tag, setTag] = useState('3D Elevation');
  const [img, setImg] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !location || !img) return alert("Saara maal sahi se bhar bhai!");

    if (editingId) {
      // EDIT LOGIC: Purane project ko update karna
      setProjectsData(projectsData.map(p => p.id === editingId ? { id: editingId, title, location, tag, img } : p));
      setEditingId(null);
    } else {
      // CREATE LOGIC: Naya project add karna
      const newProject = { id: Date.now(), title, location, tag, img };
      setProjectsData([...projectsData, newProject]);
    }

    // Reset Form fields
    setTitle(''); setLocation(''); setImg('');
  };

  const startEdit = (project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setLocation(project.location);
    setTag(project.tag);
    setImg(project.img);
  };

  const deleteProject = (id) => {
    if (window.confirm("Sach me uda de is project ko? 🧨")) {
      setProjectsData(projectsData.filter(p => p.id !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT FORM BLOCK: ADD & EDIT GATE */}
      <div className={`p-6 border rounded-2xl shadow-xl h-fit ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <h2 className="text-sm font-bold tracking-widest mb-4 text-[#c85a32] uppercase">
          {editingId ? '⚡ EDIT PROJECT BLUEPRINT' : '➕ CREATE NEW PROJECT'}
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">PROJECT TITLE</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Modern Villa Project" className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
          </div>

          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">LOCATION (CITY)</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Ahmedabad" className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
          </div>

          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">RENDERING TAG TYPE</label>
            <select value={tag} onChange={(e) => setTag(e.target.value)} className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`}>
              <option value="3D Elevation">3D Elevation</option>
              <option value="2D Layout">2D Layout Plan</option>
              <option value="Interior View">Interior Blueprint</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono tracking-wider text-zinc-500 block mb-1">IMAGE SOURCE LINK (URL)</label>
            <input type="text" value={img} onChange={(e) => setImg(e.target.value)} placeholder="Paste Unsplash or Server image URL..." className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`} />
          </div>

          <div className="flex gap-2 mt-2">
            <button type="submit" className="flex-1 py-3 bg-[#c85a32] text-white text-xs font-bold rounded-xl active:scale-95 transition-all uppercase tracking-widest">
              {editingId ? 'Update Asset' : 'Push to Site'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setTitle(''); setLocation(''); setImg(''); }} className="px-3 bg-zinc-600 text-white text-xs font-bold rounded-xl">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* RIGHT DISPLAY TABLE: MANAGEMENT GRID */}
      <div className={`lg:col-span-2 p-6 border rounded-2xl shadow-xl h-fit ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <h2 className="text-sm font-bold tracking-widest mb-4 text-[#148346]">📁 LIVE PORTFOLIO INDEX ({projectsData.length})</h2>
        
        <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
          {projectsData.map((project) => (
            <div key={project.id} className={`flex items-center justify-between p-3 border rounded-xl transition-all
              ${isDarkMode ? 'bg-black border-zinc-800/60 hover:border-zinc-700' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'}`}>
              
              <div className="flex items-center gap-3 min-w-0">
                <img src={project.img} alt={project.title} className="w-12 h-12 object-cover rounded-lg bg-zinc-800 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold truncate">{project.title}</h4>
                  <p className="text-[10px] text-zinc-500 font-medium">📍 {project.location} | <span className="text-[#c85a32]">{project.tag}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                <button onClick={() => startEdit(project)} className="px-2.5 py-1.5 bg-zinc-500/10 text-zinc-400 hover:text-white border border-zinc-500/20 text-[10px] font-bold rounded-lg transition-all active:scale-95">
                  EDIT
                </button>
                <button onClick={() => deleteProject(project.id)} className="px-2.5 py-1.5 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-500/20 text-[10px] font-bold rounded-lg transition-all active:scale-95">
                  DEL
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
