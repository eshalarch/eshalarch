import React, { useState } from 'react';

function App() {
  // Category filter karne ke liye state
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories list
  const categories = ['All', 'Mehndi', 'Decoration', 'Photography', 'Music & Dhol', 'Makeup'];

  // Sample Workers Data (Unique Names aur Details)
  const workers = [
    {
      id: 1,
      name: 'Radhika Marwadi Mehndi',
      category: 'Mehndi',
      price: '₹5,000 onwards',
      rating: '4.9 ⭐',
      location: 'Ahmedabad / Surat',
      image: 'https://images.unsplash.com/photo-1610030469668-93535c17b6b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      tag: 'Tranding'
    },
    {
      id: 2,
      name: 'Vibrant Mandap & Lights',
      category: 'Decoration',
      price: '₹25,000 onwards',
      rating: '4.8 ⭐',
      location: 'Baroda / Rajkot',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      tag: 'Royal Look'
    },
    {
      id: 3,
      name: 'The Gujarati Wedding Filmers',
      category: 'Photography',
      price: '₹40,000/Day',
      rating: '5.0 ⭐',
      location: 'All Gujarat',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      tag: 'Cinematic'
    },
    {
      id: 4,
      name: 'Royal Rajputi Dhol Beats',
      category: 'Music & Dhol',
      price: '₹12,000/Event',
      rating: '4.7 ⭐',
      location: 'Mehsana / Anand',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      tag: 'High Energy'
    },
    {
      id: 5,
      name: 'Kavya Makeover Studio',
      category: 'Makeup',
      price: '₹15,000 onwards',
      rating: '4.9 ⭐',
      location: 'Surat',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      tag: 'Bridal Special'
    }
  ];

  // Filter logic
  const filteredWorkers = selectedCategory === 'All' 
    ? workers 
    : workers.filter(w => w.category === selectedCategory);

  return (
    <div className="min-h-screen bg-rose-50 text-slate-800 font-sans selection:bg-rose-400 selection:text-white">
      
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-rose-100 shadow-sm">
        <div className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
          ✨ UtsavHub
        </div>
        <button 
          onClick={() => window.history.back()}
          className="px-4 py-1.5 rounded-full border-2 border-rose-200 hover:bg-rose-500 hover:text-white transition-all text-sm font-semibold text-rose-500 shadow-sm"
        >
          ← Back
        </button>
      </nav>

      {/* Hero Intro */}
      <header className="text-center py-12 px-4 bg-gradient-to-b from-rose-100/50 to-rose-50/10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
          Gujarat's Premium <span className="text-rose-500">Function Marketplace</span> 🎉
        </h1>
        <p className="text-slate-600 mt-3 text-sm md:text-base max-w-xl mx-auto font-medium">
          Mehndi, Dhol, Decoration aur Photography... Sab kuch ek hi jagah par book karein aur apna function shaandaar banayein!
        </p>
      </header>

      {/* Category Filters Grid */}
      <section className="px-6 max-w-6xl mx-auto overflow-x-auto whitespace-nowrap scrollbar-hide py-2 flex gap-3 justify-start md:justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white scale-105'
                : 'bg-white text-slate-600 hover:bg-rose-100 border border-rose-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Workers / Services Listing */}
      <main className="px-6 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkers.map((worker) => (
            <div key={worker.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-rose-100 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden bg-slate-200">
                <img 
                  src={worker.image} 
                  alt={worker.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-rose-600 font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                  {worker.tag}
                </span>
                <span className="absolute bottom-3 right-3 bg-slate-950/70 text-white font-bold text-xs px-2.5 py-1 rounded-md">
                  {worker.rating}
                </span>
              </div>

              {/* Text Info Section */}
              <div className="p-5 flex-grow space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-orange-500">{worker.category}</p>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-500 transition-colors">{worker.name}</h3>
                <p className="text-sm text-slate-500 font-medium">📍 {worker.location}</p>
              </div>

              {/* Price & Action Button */}
              <div className="p-5 pt-0 border-t border-slate-50 flex items-center justify-between bg-slate-50/50">
                <div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase">Estimated Price</p>
                  <p className="text-base font-extrabold text-slate-800">{worker.price}</p>
                </div>
                <button 
                  onClick={() => alert(`Aapne ${worker.name} ke liye enquiry bheji hai!`)}
                  className="px-4 py-2 bg-slate-950 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm active:scale-95"
                >
                  Book Now
                </button>
              </div>

            </div>
          ))}
        </div>
      </main>

    </div>
  );
}

export default App;
