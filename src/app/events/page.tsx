'use client';
import { Calendar, Users, Music } from 'lucide-react';

export default function EventsPage() {
  const events = [
    { title: 'Afrobeat Fridays', type: 'Weekly', audience: 400, vibe: 'High Energy' },
    { title: 'Latino Heat', type: 'Themed', audience: 500, vibe: 'Dance' },
    { title: 'Exclusive Guest DJ', type: 'Special', audience: 600, vibe: 'Premium' },
    { title: 'R&B Sundays', type: 'Chill', audience: 350, vibe: 'Lounge' },
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold neon-text text-white">Event Management</h1>
      <p className="text-gray-400">Upcoming schedule and performance metrics.</p>
      
      <div className="grid gap-4">
        {events.map((e, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl flex justify-between items-center hover:bg-white/5 cursor-pointer transition-colors border-l-4 border-transparent hover:border-secondary">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/10 rounded-full text-secondary"><Calendar /></div>
                    <div>
                        <h3 className="text-xl font-bold">{e.title}</h3>
                        <p className="text-gray-400">{e.type}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-2 text-white font-bold justify-end"><Users size={16} className="text-primary"/> {e.audience}</div>
                    <div className="text-sm text-gray-500">{e.vibe}</div>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}
