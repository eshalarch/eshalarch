import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 flex justify-between items-center z-50 shadow-lg">
      {/* Left Side: Option Menu Button */}
      <button className="flex flex-col gap-1.5 p-2 hover:bg-zinc-900 rounded-lg transition-all duration-300 group active:scale-95">
        <span className="w-6 h-0.5 bg-[#c85a32] group-hover:w-5 transition-all"></span>
        <span className="w-5 h-0.5 bg-[#148346] group-hover:w-6 transition-all"></span>
        <span className="w-6 h-0.5 bg-[#78281f] group-hover:w-4 transition-all"></span>
      </button>

      {/* Right Side: AKVAI Logo */}
      <div className="flex items-center h-full py-2">
        {/* Replace with your local path if you save it in assets, e.g., /akvai-logo.png */}
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" 
          alt="AKVAI ASSOCIATES" 
          className="h-12 object-contain"
        />
        <div className="hidden sm:block ml-2 text-right">
          <p className="text-xs font-bold tracking-widest text-white leading-none">AKVAI</p>
          <p className="text-[9px] text-[#c85a32] tracking-wider">ASSOCIATES</p>
        </div>
      </div>
    </header>
  );
}
