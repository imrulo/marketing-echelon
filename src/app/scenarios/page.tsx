'use client';

import { useSimulationStore, ScenarioType } from '@/store/useSimulationStore';
import { motion } from 'framer-motion';
import { Check, BarChart2, Users, TrendingUp, Zap } from 'lucide-react';
import { clsx } from 'clsx';

const scenarios: { id: ScenarioType; title: string; subtitle: string; features: string[] }[] = [
  {
    id: 'base',
    title: 'Organic Focus',
    subtitle: 'Community Driven',
    features: ['Consistency over Intensity', 'Word-of-Mouth Growth', 'Standard Event Frequency', 'Basic Content Output'],
  },
  {
    id: 'intermediate',
    title: 'Growth Mode',
    subtitle: 'Active Expansion',
    features: ['Increased Event Cadence', 'Daily Social Presence', 'Targeted Promotions', 'Higher Production Quality'],
  },
  {
    id: 'advanced',
    title: 'Market Leader',
    subtitle: 'Maximum Impact',
    features: ['High-Frequency Events', 'Premium Content Team', 'Influencer Partnerships', 'Dominant Brand Presence'],
  },
];

export default function ScenariosPage() {
  const { 
    marketingScenario, 
    setScenario, 
    investmentLevel, 
    eventsPerMonth, 
    socialPostsPerWeek,
    setInvestmentLevel,
    setEventsPerMonth,
    setSocialPostsPerWeek,
    getProjections
  } = useSimulationStore();

  const projections = getProjections();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-4xl font-bold mb-2 neon-text text-white">Strategic Models</h1>
        <p className="text-gray-400">Define your resource allocation and see the projected impact.</p>
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
              <p className="text-lg text-gray-300 mb-4">{s.subtitle}</p>
              
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
            <TrendingUp className="text-secondary" /> Adjust Strategy Parameters
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
                {/* Sliders */}
                <div>
                    <label className="flex justify-between mb-2 text-sm font-medium">
                        <span>Resource Investment (Effort/Quality)</span>
                        <span className="text-primary font-bold">{investmentLevel}%</span>
                    </label>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="5" 
                        value={investmentLevel} 
                        onChange={(e) => setInvestmentLevel(Number(e.target.value))}
                        className="w-full accent-primary h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Lean</span>
                        <span>Intensive</span>
                    </div>
                </div>

                <div>
                    <label className="flex justify-between mb-2 text-sm font-medium">
                        <span>Event Frequency</span>
                        <span className="text-secondary font-bold">{eventsPerMonth}/mo</span>
                    </label>
                    <input 
                        type="range" 
                        min="1" 
                        max="16" 
                        step="1" 
                        value={eventsPerMonth} 
                        onChange={(e) => setEventsPerMonth(Number(e.target.value))}
                        className="w-full accent-secondary h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Exclusive</span>
                        <span>Frequent</span>
                    </div>
                </div>

                <div>
                    <label className="flex justify-between mb-2 text-sm font-medium">
                        <span>Content Volume</span>
                        <span className="text-accent font-bold">{socialPostsPerWeek}/wk</span>
                    </label>
                    <input 
                        type="range" 
                        min="1" 
                        max="20" 
                        step="1" 
                        value={socialPostsPerWeek} 
                        onChange={(e) => setSocialPostsPerWeek(Number(e.target.value))}
                        className="w-full accent-accent h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                     <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Minimal</span>
                        <span>Viral</span>
                    </div>
                </div>
            </div>

            {/* Live Impact Preview */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex flex-col justify-center items-center text-center">
                    <Users className="text-secondary mb-2" />
                    <div className="text-2xl font-bold text-white">{projections.estimatedReach.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Est. Digital Reach</div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex flex-col justify-center items-center text-center">
                    <Users className="text-primary mb-2" />
                    <div className="text-2xl font-bold text-white">{projections.estimatedAttendance.toLocaleString()}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Monthly Attendance</div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex flex-col justify-center items-center text-center">
                    <BarChart2 className="text-green-500 mb-2" />
                    <div className="text-2xl font-bold text-green-500">{projections.capacityUtilization}%</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Venue Utilization</div>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex flex-col justify-center items-center text-center">
                    <Zap className="text-yellow-500 mb-2" />
                    <div className="text-2xl font-bold text-yellow-500">
                        {projections.brandScore}/100
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Brand Strength</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
