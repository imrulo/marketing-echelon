'use client';

import MarketingFlow from '@/components/marketing/MarketingFlow';

export default function MarketingPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-4xl font-bold mb-2 neon-text text-white">Marketing Strategy</h1>
        <p className="text-gray-400">Interactive workflow: From Outreach to Revenue.</p>
      </div>
      
      <div className="flex-1 min-h-0">
        <MarketingFlow />
      </div>
    </div>
  );
}
