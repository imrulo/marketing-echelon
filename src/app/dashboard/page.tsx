'use client';

import { useSimulationStore } from '@/store/useSimulationStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity } from 'lucide-react';

export default function DashboardPage() {
  const { monthlyBudget, getProjections } = useSimulationStore();
  const projections = getProjections();

  // Simulate 6 months of growth based on current parameters
  const data = Array.from({ length: 6 }).map((_, i) => {
    const growthFactor = 1 + (i * 0.15); // 15% monthly growth
    return {
      name: `Month ${i + 1}`,
      Revenue: Math.round(projections.projectedRevenue * growthFactor),
      Cost: monthlyBudget,
      Profit: Math.round((projections.projectedRevenue * growthFactor) - monthlyBudget),
      Attendance: Math.round(projections.estimatedAttendance * growthFactor),
    };
  });

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-bold mb-2 neon-text text-white">Live Dashboard</h1>
        <p className="text-gray-400">Real-time financial and audience projections.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue vs Cost Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 h-[400px]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity className="text-primary" /> 6-Month Revenue Projection
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="Revenue" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Cost" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Growth Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 h-[400px]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity className="text-secondary" /> Audience Growth
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111', borderColor: '#333' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="Attendance" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
       {/* Summary Stats */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                <h4 className="text-gray-400 text-sm uppercase tracking-wide">Total 6-Mo Revenue</h4>
                <div className="text-3xl font-bold text-green-500 mt-2">
                    €{data.reduce((acc, curr) => acc + curr.Revenue, 0).toLocaleString()}
                </div>
            </div>
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
                <h4 className="text-gray-400 text-sm uppercase tracking-wide">Total 6-Mo Cost</h4>
                <div className="text-3xl font-bold text-red-500 mt-2">
                    €{data.reduce((acc, curr) => acc + curr.Cost, 0).toLocaleString()}
                </div>
            </div>
             <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <h4 className="text-gray-400 text-sm uppercase tracking-wide">Total Profit</h4>
                <div className="text-3xl font-bold text-blue-500 mt-2">
                    €{data.reduce((acc, curr) => acc + curr.Profit, 0).toLocaleString()}
                </div>
            </div>
       </div>
    </div>
  );
}
