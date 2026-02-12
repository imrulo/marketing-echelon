'use client';
import { Video, Camera, Check, X } from 'lucide-react';

export default function ContentPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold neon-text text-white">Content Strategy</h1>
      <p className="text-gray-400">Comparing In-House vs External production models.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* In-House */}
        <div className="glass-panel p-8 rounded-2xl border-t-4 border-primary relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-white">
                    <div className="p-3 bg-primary rounded-lg text-black"><Video size={24}/></div>
                    In-House Team
                </h2>
                <ul className="space-y-4 text-gray-200">
                    <li className="flex items-start gap-3"><Check className="text-primary mt-1 shrink-0"/> <span>Dedicated Videographer on-site</span></li>
                    <li className="flex items-start gap-3"><Check className="text-primary mt-1 shrink-0"/> <span>Real-time Stories & Reels (Immediate upload)</span></li>
                    <li className="flex items-start gap-3"><Check className="text-primary mt-1 shrink-0"/> <span>Full ownership of raw footage library</span></li>
                    <li className="flex items-start gap-3"><Check className="text-primary mt-1 shrink-0"/> <span>Cost: Fixed Monthly Salary (Lower per asset)</span></li>
                </ul>
                <div className="mt-8 p-4 bg-primary/20 rounded-lg border border-primary/30 text-center font-bold text-primary">
                    RECOMMENDED STRATEGY
                </div>
            </div>
        </div>

        {/* External Agency */}
        <div className="glass-panel p-8 rounded-2xl border-t-4 border-gray-600 opacity-80 hover:opacity-100 transition-opacity">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-300">
                <div className="p-3 bg-gray-700 rounded-lg text-white"><Camera size={24}/></div>
                External Agency
            </h2>
             <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3"><Check className="text-gray-500 mt-1 shrink-0"/> <span>High quality production value</span></li>
                <li className="flex items-start gap-3"><X className="text-red-500 mt-1 shrink-0"/> <span>Project-based fees (High cost)</span></li>
                <li className="flex items-start gap-3"><X className="text-red-500 mt-1 shrink-0"/> <span>Slower turnaround (3-5 days post-event)</span></li>
                <li className="flex items-start gap-3"><X className="text-red-500 mt-1 shrink-0"/> <span>Limited usage rights often apply</span></li>
            </ul>
        </div>
      </div>
    </div>
  )
}
