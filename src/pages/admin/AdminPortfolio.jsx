import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';

export default function AdminPortfolio({ isDarkMode, projectsData, refreshData }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [tag, setTag] = useState('');

  // Architect Core Style Logic
  const handleAddProject = async () => {
    if (!title || !location) return;
    
    const { error } = await supabase
      .from('projects')
      .insert([{ title, location, tag }]);

    if (error) {
      console.error("Architect Core Error:", error.message);
    } else {
      setTitle(''); setLocation(''); setTag('');
      refreshData();
    }
  };

  return (
    <div className={`min-h-screen p-8 transition-colors ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tighter mb-8 border-b pb-4">ADMIN PANEL</h1>
        
        {/* Architect Core Input Boxes */}
        <div className="space-y-4 mb-12">
          <input 
            className="w-full p-4 border border-gray-700 bg-transparent focus:outline-none"
            placeholder="PROJECT TITLE" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <input 
            className="w-full p-4 border border-gray-700 bg-transparent focus:outline-none"
            placeholder="LOCATION" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />
          <input 
            className="w-full p-4 border border-gray-700 bg-transparent focus:outline-none"
            placeholder="TAG" 
            value={tag} 
            onChange={(e) => setTag(e.target.value)} 
          />
          <button 
            onClick={handleAddProject}
            className="w-full py-4 bg-white text-black font-bold uppercase hover:opacity-80 transition-opacity"
          >
            Submit Project
          </button>
        </div>

        {/* Existing Data Grid */}
        <div className="grid gap-6">
          {projectsData.map((project) => (
            <div key={project.id} className="border-l-4 border-white pl-4 py-2">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="opacity-60">{project.location} • {project.tag}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
