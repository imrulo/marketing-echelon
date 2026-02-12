import { create } from 'zustand';

export type ScenarioType = 'base' | 'intermediate' | 'advanced';

interface SimulationState {
  // Inputs
  investmentLevel: number; // 0-100 scale (Effort/Resources)
  eventsPerMonth: number;
  socialPostsPerWeek: number;
  marketingScenario: ScenarioType;
  
  // Actions
  setInvestmentLevel: (level: number) => void;
  setEventsPerMonth: (events: number) => void;
  setSocialPostsPerWeek: (posts: number) => void;
  setScenario: (scenario: ScenarioType) => void;
  
  // Getters for calculated values
  getProjections: () => {
    estimatedReach: number;
    estimatedAttendance: number;
    capacityUtilization: number; // %
    brandScore: number; // 0-100 score
  };
}

const SCENARIO_DEFAULTS = {
  base: {
    investment: 20, // Low effort/resource
    events: 4,
    posts: 3,
  },
  intermediate: {
    investment: 50, // Medium effort/resource
    events: 8,
    posts: 7,
  },
  advanced: {
    investment: 90, // High effort/resource
    events: 12,
    posts: 15,
  },
};

export const useSimulationStore = create<SimulationState>((set, get) => ({
  investmentLevel: 20,
  eventsPerMonth: 4,
  socialPostsPerWeek: 3,
  marketingScenario: 'base',

  setInvestmentLevel: (level) => set({ investmentLevel: level }),
  setEventsPerMonth: (events) => set({ eventsPerMonth: events }),
  setSocialPostsPerWeek: (posts) => set({ socialPostsPerWeek: posts }),
  
  setScenario: (scenario) => {
    const defaults = SCENARIO_DEFAULTS[scenario];
    set({
      marketingScenario: scenario,
      investmentLevel: defaults.investment,
      eventsPerMonth: defaults.events,
      socialPostsPerWeek: defaults.posts,
    });
  },

  getProjections: () => {
    const { investmentLevel, eventsPerMonth, socialPostsPerWeek } = get();
    
    // LOGIC: Relative Impact
    
    // 1. Reach: Driven by Content Volume + Investment Level (Boosts/Quality)
    const baseReach = 1000;
    const contentImpact = socialPostsPerWeek * 300; // More content = more reach
    const investmentImpact = investmentLevel * 150; // Higher resource = better reach
    
    const estimatedReach = baseReach + contentImpact + investmentImpact;
    
    // 2. Attendance: Driven by Reach, Frequency, and "Hype" (Investment)
    // Capacity Cap: 400 people
    const venueCapacity = 400;
    const maxMonthlyAttendance = venueCapacity * eventsPerMonth;
    
    // Conversion Rate improves with Investment (Better ads, cooler content)
    // Base conversion 2%, max 5%
    const conversionRate = 0.02 + ((investmentLevel / 100) * 0.03); 
    
    // Diminishing returns if too many events without enough marketing (investment)
    let saturationFactor = 1;
    if (eventsPerMonth > 8 && investmentLevel < 50) {
        saturationFactor = 0.8; // Hard to fill if spamming events with low marketing
    }
    
    const rawAttendance = estimatedReach * conversionRate * saturationFactor;
    
    // Cap at physical capacity
    const estimatedAttendance = Math.min(Math.round(rawAttendance), maxMonthlyAttendance);
    
    // 3. Capacity Utilization (Average per event)
    const avgAttendancePerEvent = estimatedAttendance / eventsPerMonth;
    const capacityUtilization = Math.round((avgAttendancePerEvent / venueCapacity) * 100);

    // 4. Brand Score (0-100)
    // Composite of consistency (posts), activity (events), and quality (investment)
    const brandScore = Math.min(100, Math.round(
        (socialPostsPerWeek * 2) + (eventsPerMonth * 1.5) + (investmentLevel * 0.5)
    ));

    return {
      estimatedReach: Math.round(estimatedReach),
      estimatedAttendance,
      capacityUtilization,
      brandScore,
    };
  },
}));
