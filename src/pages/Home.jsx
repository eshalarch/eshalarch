import React from 'react';

export default function Home({ isDarkMode }) {
  const portfolioItems = [
    { id: 1, title: 'Modern Villa Project', location: 'Ahmedabad', tag: '3D Elevation', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=60' },
    { id: 2, title: 'Commercial Complex Blueprint', location: 'Gandhinagar', tag: '2D Layout', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&auto=format&fit=crop&q=60' }
  ];

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {portfolioItems.map((item) => (
          <div 
            key={item.id} 
            className={`border rounded-2xl overflow-hidden shadow-xl transition-all duration-300
              ${isDarkMode ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200'}`}
          >
            <div className="h-48 w-full bg-zinc-800 relative overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 right-3 bg-[#c85a32] text-white text-[9px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-md uppercase">
                {item.tag}
              </span>
            </div>

            {/* STRICT OPPOSITE LOGIC: IF BLACK BG -> TEXT WHITE | IF WHITE BG -> TEXT BLACK */}
            <div className="p-5">
              <h3 className={`text-base font-bold tracking-wide transition-colors duration-300
                ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {item.title}
              </h3>
              <p className={`text-xs mt-1 font-medium transition-colors duration-300
                ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                📍 {item.location}, Gujarat
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
