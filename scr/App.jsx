import React from 'react';

function App() {
  return (
    <div className="min-h-screen text-white font-sans selection:bg-cyan-500">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6 bg-slate-900/50 backdrop-blur-md sticky top-0 border-b border-slate-800">
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          MyBrand
        </div>
        <button 
          onClick={() => window.history.back()}
          className="px-5 py-2 rounded-full border border-slate-700 hover:bg-slate-800 transition-all text-sm font-medium"
        >
          ← Back
        </button>
      </nav>

      {/* Hero Section / Header */}
      <main className="flex flex-col items-center justify-center pt-20 px-4">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Welcome to the <span className="text-cyan-400">Future</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl">
            Aapki nayi React + Tailwind website ab live hone ke liye taiyaar hai. 
            Vercel par connect kijiye aur magic dekhiye.
          </p>
          
          <div className="flex gap-4 justify-center pt-8">
            <button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg transition-all shadow-lg shadow-cyan-500/20">
              Get Started
            </button>
            <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Floating Design Element */}
        <div className="mt-20 w-full max-w-4xl h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl border border-slate-800 flex items-center justify-center">
          <p className="text-slate-500 italic">Sample UI Component Area</p>
        </div>
      </main>
    </div>
  );
}

export default App;
