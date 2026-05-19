import React, { useState } from 'react';

const SUPABASE_URL = 'https://rkxwxkzqytzaajgrmloz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8vd5uZd2ivCwTEtkcdaj9g_EpSnevVC';

export default function AdminPortfolio({ isDarkMode, projectsData = [], refreshData }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [tag, setTag] = useState('3D Elevation');
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !location || !img) return alert("Bhai, saari details bhar!");
    
    setLoading(true);

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        // Ab hum id nahi bhej rahe, database khud generate karega
        body: JSON.stringify({ title, location, tag, img })
      });

      if (response.ok) {
        alert("Project Live ho gaya! ⚡");
        setTitle(''); setLocation(''); setImg('');
        if (refreshData) await refreshData();
      } else {
        const err = await response.json();
        alert("Error: " + err.message);
      }
    } catch (err) {
      console.error(err);
      alert("Network Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`p-6 border rounded-2xl ${isDarkMode ? 'bg-[#111115] border-zinc-800' : 'bg-white border-zinc-200'}`}>
      <h2 className="text-sm font-bold mb-4 text-[#c85a32]">ADD NEW PROJECT</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded bg-transparent" />
        <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-2 border rounded bg-transparent" />
        <select value={tag} onChange={e => setTag(e.target.value)} className="w-full p-2 border rounded bg-transparent">
          <option>3D Elevation</option>
          <option>2D Layout</option>
          <option>Interior View</option>
        </select>
        <input type="text" placeholder="Image URL" value={img} onChange={e => setImg(e.target.value)} className="w-full p-2 border rounded bg-transparent" />
        <button type="submit" className="bg-[#c85a32] p-2 rounded text-white font-bold">
          {loading ? 'Pushed...' : 'PUSH LIVE'}
        </button>
      </form>
    </div>
  );
}
