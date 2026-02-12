'use client';

import { useSimulationStore, ScenarioType } from '@/store/useSimulationStore';
import { motion } from 'framer-motion';
import { Check, DollarSign, Users, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

const scenarios: { id: ScenarioType; title: string; price: string; features: string[] }[] = [
  {
    id: 'base',
    title: 'Base Model',
    price: '€2,000',
    features: ['4 Events/Month', '3 Posts/Week', 'Basic Ad Setup', 'Monthly Report'],
  },
  {
    id: 'intermediate',
    title: 'Growth Model',
    price: '€5,000',
    features: ['8 Events/Month', 'Daily Content', 'Advanced Ads & Retargeting', 'Video Production', 'Bi-weekly Strategy'],
  },
  {
    id: 'advanced',
    title: 'Domination Model',
    price: '€12,000',
    features: ['12+ Events/Month', 'Full Creative Team', 'Influencer Management', 'TikTok Live Series', 'Weekly Deep Dive'],
  },
];

export default function ScenariosPage() {
  const { 
    marketingScenario, 
    setScenario, 
    monthlyBudget, 
    eventsPerMonth, 
    socialPostsPerWeek,
    setMonthlyBudget,
    setEventsPerMonth,
    setSocialPostsPerWeek,
    getProjections
  } = useSimulationStore();

  const projections = getProjections();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-bold mb-2 neon-text text-white">Compensation Models</h1>
        <p className="text-gray-400">Choose a tier or customize the parameters to see the impact.</p>
      </div>

      {/* Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((s) => {
          const isActive = marketingScenario === s.id;
          return (
            <motion.div
              key={s.id}
              onClick={() => setScenario(s.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={clsx(
                "p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col",
                isActive 
                  ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(217,70,239,0.2)]" 
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              )}
            >
              {isActive && (
                <div className="absolute top-0 right-0 p-2 bg-primary text-black rounded-bl-xl font-bold text-xs">
                  ACTIVE
                </div>
              )}
              <h3 className="text-2xl font-bold mb-1">{s.title}</h3>
              <p className="text-xl text-gray-300 mb-4">{s.price}<span className="text-sm text-gray-500">/mo</span></p>
              
              <ul className="space-y-2 mb-6 flex-1">
                {s.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <Check size={14} className="text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Customization Controls */}
      <div className="glass-panel p-8 rounded-2xl border border-white/10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-secondary" /> Fine-Tune Strategy
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
                {/* Sliders */}
                <div>
                    <label className="flex justify-between mb-2 text-sm font-medium">
                        <span>Monthly Budget (€)</span>
                        <span className="text-primary font-bold">{monthlyBudget}</span>
                    </label>
                    <input 
                        type="range" 
                        min="500" 
                        max="20000" 
                        step="100" 
                        value={monthlyBudget} 
                        onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                        className="w-full accent-primary h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                <div>
                    <label className="flex justify-between mb-2 text-sm font-medium">
                        <span>Events Per Month</span>
                        <span className="text-secondary font-bold">{eventsPerMonth}</span>
                    </label>
                    <input 
                        type="range" 
                        min="1" 
                        max="20" 
                        step="1" 
                        value={eventsPerMonth} 
                        onChange={(e) => setEventsPerMonth(Number(e.target.value))}
                        className="w-full accent-secondary h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                <div>
                    <label className="flex justify-between mb-2 text-sm font-medium">
                        <span>Social Posts / Week</span>
                        <span className="text-accent font-bold">{socialPostsPerWeek}</span>
                    </label>
                    <input 
                        type="range" 
                        min="1" 
                        max="30" 
                        step="1" 
                        value={socialPostsPerWeek} 
                        onChange={(e) => setSocialPostsPerWeek(Number(e.target.value))}
                        className="w-full accent-accent h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            {/* Live Impact Preview */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex flex-col justify-center items-center text-center">
                    <Users className="text-secondary mb-2" />
                    <div className="text-2xl font-bold text-white">{projections.estimatedReach.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Est. Reach</div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex flex-col justify-center items-center text-center">
                    <Users className="text-primary mb-2" />
                    <div className="text-2xl font-bold text-white">{projections.estimatedAttendance.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Attendance</div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex flex-col justify-center items-center text-center">
                    <DollarSign className="text-green-500 mb-2" />
                    <div className="text-2xl font-bold text-green-500">€{projections.projectedRevenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Revenue</div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex flex-col justify-center items-center text-center">
                    <TrendingUp className={projections.roi > 0 ? "text-green-500" : "text-red-500"} />
                    <div className={`text-2xl font-bold ${projections.roi > 0 ? "text-green-500" : "text-red-500"}`}>
                        {projections.roi}%
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">ROI</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
