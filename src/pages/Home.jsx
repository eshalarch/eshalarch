import React, { useState } from 'react';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    { id: 1, title: 'Luxury Modern Villa', location: 'Delhi, NCR', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', drawings: ['2D Layout Blueprint', 'Structural Beam Grid'], details: '4BHK premium ultra-luxury space designed with minimalist aesthetics.' },
    { id: 2, title: 'Minimalist Office Space', location: 'Mumbai', image: 'https://images.unsplash.com/photo-1600607687940-477a63bd3942', drawings: ['Electrical Wiring Map', '3D Ceiling Section'], details: 'Corporate commercial hub optimized for natural lighting and ventilation.' },
  ];

  return (
    <div className="px-4 py-24 min-h-screen bg-[#050505]">
      <h2 className="text-xl font-bold text-white mb-6 tracking-wide border-l-4 border-[#148346] pl-3">DESIGN PORTFOLIO</h2>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => setSelectedProject(project)}
            className="group relative rounded-2xl overflow-hidden bg-[#111] border border-zinc-800 shadow-md cursor-pointer transition-all duration-300 hover:border-[#c85a32]/50 hover:shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
            </div>
            <div className="p-4 bg-gradient-to-t from-black via-black/90 to-transparent">
              <h3 className="text-base font-semibold text-white tracking-wide">{project.title}</h3>
              <p className="text-xs text-zinc-400 mt-1">{project.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Details Popup Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0f0f12] border border-zinc-800 rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl p-6 relative">
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white text-lg font-bold bg-zinc-900 w-8 h-8 rounded-full flex items-center justify-center border border-zinc-800">×</button>
            
            <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-48 object-cover rounded-2xl mb-4 border border-zinc-800" />
            <h3 className="text-lg font-bold text-white tracking-wide">{selectedProject.title}</h3>
            <p className="text-xs text-[#c85a32] mt-1 font-medium">{selectedProject.location}</p>
            <p className="text-sm text-zinc-300 mt-4 leading-relaxed">{selectedProject.details}</p>
            
            <div className="mt-6 border-t border-zinc-800 pt-4">
              <h4 className="text-xs font-bold text-[#148346] tracking-widest uppercase mb-3">Technical Drawings & Specs</h4>
              <div className="flex flex-col gap-2">
                {selectedProject.drawings.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl hover:bg-zinc-900 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-[#c85a32]" />
                    <span className="text-xs text-zinc-200 font-mono">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
