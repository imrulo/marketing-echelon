import { create } from 'zustand';

export type ScenarioType = 'base' | 'intermediate' | 'advanced';

interface SimulationState {
  // Inputs
  monthlyBudget: number;
  eventsPerMonth: number;
  socialPostsPerWeek: number;
  marketingScenario: ScenarioType;
  
  // Actions
  setMonthlyBudget: (budget: number) => void;
  setEventsPerMonth: (events: number) => void;
  setSocialPostsPerWeek: (posts: number) => void;
  setScenario: (scenario: ScenarioType) => void;
  
  // Getters for calculated values (can be computed in components or here)
  getProjections: () => {
    estimatedReach: number;
    estimatedAttendance: number;
    projectedRevenue: number;
    roi: number;
  };
}

const SCENARIO_DEFAULTS = {
  base: {
    budget: 2000,
    events: 4,
    posts: 3,
  },
  intermediate: {
    budget: 5000,
    events: 8,
    posts: 7,
  },
  advanced: {
    budget: 12000,
    events: 12,
    posts: 15,
  },
};

export const useSimulationStore = create<SimulationState>((set, get) => ({
  monthlyBudget: 2000,
  eventsPerMonth: 4,
  socialPostsPerWeek: 3,
  marketingScenario: 'base',

  setMonthlyBudget: (budget) => set({ monthlyBudget: budget }),
  setEventsPerMonth: (events) => set({ eventsPerMonth: events }),
  setSocialPostsPerWeek: (posts) => set({ socialPostsPerWeek: posts }),
  
  setScenario: (scenario) => {
    const defaults = SCENARIO_DEFAULTS[scenario];
    set({
      marketingScenario: scenario,
      monthlyBudget: defaults.budget,
      eventsPerMonth: defaults.events,
      socialPostsPerWeek: defaults.posts,
    });
  },

  getProjections: () => {
    const { monthlyBudget, eventsPerMonth, socialPostsPerWeek } = get();
    
    // Simple simulation logic (can be refined)
    // Reach = Base (1000) + (Budget * 0.5) + (Posts * 500)
    const estimatedReach = 1000 + (monthlyBudget * 0.8) + (socialPostsPerWeek * 800);
    
    // Attendance = Reach * Conversion Rate (1.5%) * Events Factor
    // Capped by capacity (e.g., 500 per event * events)
    const capacityPerEvent = 400;
    const maxAttendance = capacityPerEvent * eventsPerMonth;
    let rawAttendance = estimatedReach * 0.025;
    
    // Diminishing returns on high frequency
    if (eventsPerMonth > 8) {
        rawAttendance = rawAttendance * 0.9;
    }
    
    const estimatedAttendance = Math.min(Math.round(rawAttendance), maxAttendance);
    
    // Revenue = Attendance * Avg Spend (€30)
    const avgSpend = 30;
    const projectedRevenue = estimatedAttendance * avgSpend;
    
    const roi = monthlyBudget > 0 
      ? ((projectedRevenue - monthlyBudget) / monthlyBudget) * 100 
      : 0;

    return {
      estimatedReach: Math.round(estimatedReach),
      estimatedAttendance,
      projectedRevenue,
      roi: Math.round(roi),
    };
  },
}));
