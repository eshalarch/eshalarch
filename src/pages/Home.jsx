import React from 'react';

export default function Home({ isDarkMode, requireAuth, projectsData }) {
  
  // Backback protection: Agar abhi backend se data nahi aa raha, toh default me ye dono projects dikhenge jo tumne diye the.
  const displayItems = projectsData && projectsData.length > 0 ? projectsData : [
    { id: 1, title: 'Modern Villa Project', location: 'Ahmedabad', tag: '3D Elevation', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60' },
    { id: 2, title: 'Commercial Complex Blueprint', location: 'Gandhinagar', tag: '2D Layout', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&auto=format&fit=crop&q=60' }
  ];

  const handleProjectClick = (projectId) => {
    // Agar user log in nahi hai to direct signup page open hoga
    requireAuth(() => {
      // Jab user logged in hoga tab ye code chalega (Details modal ya description view open karne ke liye)
      console.log("Opening locked project details for ID:", projectId);
      alert("Opening premium specifications and blueprint drawings for registered clients!");
    });
  };

  return (
    <div className="px-4 py-24 min-h-screen">
      
      <div className="text-center mb-16">
        <h1 className={`text-3xl font-extrabold tracking-tight mb-3 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          ARCHITECTS & ENGINEERS
        </h1>
        <p className={`text-sm max-w-md mx-auto ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          Crafting premium structural blueprints and high-end 3D spatial elevations with absolute technical precision.
        </p>
      </div>

      <div className="border-l-4 border-[#148346] pl-3 mb-8">
        <h2 className={`text-xl font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-black'}`}>
          FEATURED PORTFOLIO
        </h2>
      </div>

      {/* PORTFOLIO GRID AS BUTTON ACTION GATES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {displayItems.map((item) => (
          <button 
            key={item.id} 
            onClick={() => handleProjectClick(item.id)}
            className={`w-full text-left border rounded-2xl overflow-hidden shadow-xl transition-all duration-300 active:scale-[0.98] focus:outline-none block group
              ${isDarkMode ? 'bg-[#121214] border-zinc-800 hover:border-zinc-700' : 'bg-white border-zinc-200 hover:border-zinc-300'}`}
          >
            {/* Image Frame Area */}
            <div className="h-48 w-full bg-zinc-800 relative overflow-hidden">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <span className="absolute top-3 right-3 bg-[#c85a32] text-white text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-md uppercase">
                {item.tag}
              </span>
            </div>

            {/* STRICT OPPOSITE LOGIC TEXT PANEL */}
            <div className="p-5">
              <h3 className={`text-base font-bold tracking-wide transition-colors duration-300 flex items-center justify-between
                ${isDarkMode ? 'text-white' : 'text-black'}`}>
                <span>{item.title}</span>
                {/* Visual lock hint to show premium protection */}
                <span className="text-[10px] text-zinc-500 font-normal tracking-wide bg-zinc-500/10 px-2 py-0.5 rounded-md">🔒 View Blueprint</span>
              </h3>
              <p className={`text-xs mt-1 font-medium transition-colors duration-300
                ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                📍 {item.location}, Gujarat
              </p>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}
