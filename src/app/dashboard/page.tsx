'use client';

import { useSimulationStore } from '@/store/useSimulationStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, Settings2, Zap } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const { investmentLevel, getProjections, setInvestmentLevel } = useSimulationStore();
  const projections = getProjections();
  const [showControls, setShowControls] = useState(false);

  // Dynamic Growth Simulation
  const data = Array.from({ length: 6 }).map((_, i) => {
    // Growth curve affected by investment level
    const growthRate = 0.02 + (investmentLevel / 500); // 2-20% growth per month based on investment
    const growthFactor = Math.pow(1 + growthRate, i); 
    
    return {
      name: `Month ${i + 1}`,
      Impact: Math.min(100, Math.round(projections.brandScore * growthFactor)),
      Reach: Math.round(projections.estimatedReach * growthFactor),
      Attendance: Math.min(Math.round(projections.estimatedAttendance * growthFactor), 400 * 12),
      Engagement: Math.round(20 + (investmentLevel / 2) + (i * 2)), // Mock engagement rate
    };
  });

  return (
    <div className="space-y-8 pb-12 relative">
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-4xl font-bold mb-2 neon-text text-white">Performance Dashboard</h1>
            <p className="text-gray-400">Track impact, reach, and engagement over time.</p>
        </div>
        <button 
            onClick={() => setShowControls(!showControls)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium"
        >
            <Settings2 size={16} /> Quick Adjust
        </button>
      </div>

      {/* Quick Adjust Panel */}
      <AnimatePresence>
        {showControls && (
            <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-black/40 border border-white/10 rounded-xl"
            >
                <div className="p-6">
                    <label className="text-sm text-gray-400 block mb-2">Resource Investment: <span className="text-primary font-bold">{investmentLevel}%</span></label>
                    <input 
                        type="range" min="0" max="100" step="5" 
                        value={investmentLevel}
                        onChange={(e) => setInvestmentLevel(Number(e.target.value))}
                        className="w-full accent-primary h-2 bg-gray-700 rounded-lg appearance-none"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Lean Operation</span>
                        <span>Maximum Impact</span>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Brand Impact vs Investment */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 h-[400px]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="text-yellow-500" /> Brand Strength Progression
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
              <Area type="monotone" dataKey="Impact" stroke="#eab308" fillOpacity={1} fill="url(#colorImpact)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Reach vs Attendance */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 h-[400px]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity className="text-secondary" /> Reach & Conversion
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis yAxisId="left" stroke="#888" />
              <YAxis yAxisId="right" orientation="right" stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="Reach" stroke="#0ea5e9" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="Attendance" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
       {/* Summary Stats */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <h4 className="text-gray-400 text-sm uppercase tracking-wide">Avg Monthly Reach</h4>
                <div className="text-3xl font-bold text-blue-500 mt-2">
                    {Math.round(data.reduce((acc, curr) => acc + curr.Reach, 0) / 6).toLocaleString()}
                </div>
            </div>
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                <h4 className="text-gray-400 text-sm uppercase tracking-wide">Avg Attendance</h4>
                <div className="text-3xl font-bold text-green-500 mt-2">
                    {Math.round(data.reduce((acc, curr) => acc + curr.Attendance, 0) / 6).toLocaleString()}
                </div>
            </div>
             <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <h4 className="text-gray-400 text-sm uppercase tracking-wide">Growth Trajectory</h4>
                <div className="text-3xl font-bold text-yellow-500 mt-2">
                    +{Math.round(((data[5].Impact - data[0].Impact) / data[0].Impact) * 100)}%
                </div>
            </div>
       </div>
    </div>
  );
}
