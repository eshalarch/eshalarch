import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';

export default function AdminPortfolio({ isDarkMode, projectsData = [], refreshData }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [tag, setTag] = useState('');
  const [img, setImg] = useState(''); // Naya state
  const [loading, setLoading] = useState(false);

  const handleAddProject = async () => {
    if (!title || !location) return alert("Title aur Location zaruri hai!");
    setLoading(true);
    
    // Ab 'img' bhi sath mein jaa raha hai
    const { error } = await supabase
      .from('projects')
      .insert([{ title, location, tag, img }]);

    if (error) {
      console.error("Error:", error.message);
      alert("Database Error: " + error.message);
    } else {
      setTitle(''); setLocation(''); setTag(''); setImg('');
      alert("Project Save ho gaya!");
      if (refreshData) await refreshData();
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-white">
      <div className={`p-6 border rounded-2xl shadow-xl h-fit ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200 text-black'}`}>
        <h2 className="text-sm font-bold tracking-widest mb-4 text-[#c85a32] uppercase">➕ ADD NEW PROJECT</h2>
        
        <div className="flex flex-col gap-4">
          <input 
            className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`}
            placeholder="PROJECT TITLE" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <input 
            className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`}
            placeholder="LOCATION" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />
          <input 
            className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`}
            placeholder="TAG" 
            value={tag} 
            onChange={(e) => setTag(e.target.value)} 
          />
          {/* YE HAI WO IMAGE LINK BOX */}
          <input 
            className={`w-full border rounded-xl px-4 py-2.5 text-xs focus:outline-none ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300'}`}
            placeholder="IMAGE URL (Required)" 
            value={img} 
            onChange={(e) => setImg(e.target.value)} 
          />
          
          <button 
            onClick={handleAddProject}
            disabled={loading}
            className="w-full py-3 bg-[#c85a32] text-white text-xs font-bold rounded-xl active:scale-95 transition-all"
          >
            {loading ? 'ADDING...' : 'SUBMIT PROJECT'}
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 p-6 border rounded-2xl shadow-xl h-fit bg-transparent">
        <h2 className="text-sm font-bold tracking-widest mb-4 text-[#c85a32]">📂 CURRENT PORTFOLIO ({(projectsData || []).length})</h2>
        <div className="flex flex-col gap-3">
          {(projectsData || []).map((project) => (
            <div key={project.id || Math.random()} className={`p-4 border rounded-xl flex items-center justify-between ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200 text-black'}`}>
              <div>
                <h4 className="text-xs font-bold">{project.title}</h4>
                <p className="text-[11px] text-zinc-500 mt-1">{project.location} • {project.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
