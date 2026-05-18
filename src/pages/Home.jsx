import React, { useState } from 'react';

export default function Home({ isDarkMode, requireAuth }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { id: 1, title: 'Luxury Modern Villa', location: 'Delhi, NCR', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', drawings: ['2D Layout Blueprint', 'Structural Beam Grid'], details: '4BHK premium ultra-luxury space designed with minimalist aesthetics.' },
    { id: 2, title: 'Minimalist Office Space', location: 'Mumbai', image: 'https://images.unsplash.com/photo-1600607687940-477a63bd3942', drawings: ['Electrical Wiring Map', '3D Ceiling Section'], details: 'Corporate commercial hub optimized for natural lighting and ventilation.' },
  ];

  return (
    <div className="px-4 py-24 min-h-screen transition-colors duration-300">
      <h2 className={`text-xl font-bold mb-6 tracking-wide border-l-4 border-[#148346] pl-3 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>DESIGN PORTFOLIO</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            // Auth check applied on grid card click event
            onClick={() => requireAuth(() => setSelectedProject(project))}
            className={`group rounded-2xl overflow-hidden border shadow-md cursor-pointer transition-all duration-300 
              ${isDarkMode ? 'bg-[#111] border-zinc-800' : 'bg-white border-zinc-200'}`}
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-4">
              <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{project.title}</h3>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{project.location}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className={`border rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl p-6 relative
            ${isDarkMode ? 'bg-[#0f0f12] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'}`}>
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center border bg-zinc-950 text-white">×</button>
            <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-48 object-cover rounded-2xl mb-4" />
            <h3 className="text-lg font-bold">{selectedProject.title}</h3>
            <p className="text-sm mt-4 leading-relaxed">{selectedProject.details}</p>
          </div>
        </div>
      )}
    </div>
  );
}
