'use client';

import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, PenTool, BarChart } from 'lucide-react';

// Initial Nodes
const initialNodes: Node[] = [
  { id: '1', type: 'input', data: { label: 'Marketing Strategy' }, position: { x: 250, y: 0 }, style: { background: '#d946ef', color: '#fff', border: 'none', fontWeight: 'bold' } },
  
  { id: '2', data: { label: 'Social Media' }, position: { x: 0, y: 100 } },
  { id: '3', data: { label: 'Web Presence' }, position: { x: 200, y: 100 } },
  { id: '4', data: { label: 'Paid Ads' }, position: { x: 400, y: 100 } },
  { id: '5', data: { label: 'Email/WhatsApp' }, position: { x: 600, y: 100 } },

  { id: '6', data: { label: 'TikTok Live' }, position: { x: -50, y: 200 } },
  { id: '7', data: { label: 'Reels/Shorts' }, position: { x: 50, y: 200 } },
  
  { id: '8', data: { label: 'Audience Reach' }, position: { x: 0, y: 300 }, style: { background: '#0ea5e9', color: '#fff', border: 'none' } },
  { id: '9', data: { label: 'Sales Impact' }, position: { x: 0, y: 400 }, style: { background: '#22c55e', color: '#fff', border: 'none' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e1-4', source: '1', target: '4', animated: true },
  { id: 'e1-5', source: '1', target: '5', animated: true },
  
  { id: 'e2-6', source: '2', target: '6' },
  { id: 'e2-7', source: '2', target: '7' },
  
  { id: 'e6-8', source: '6', target: '8', animated: true, style: { stroke: '#0ea5e9' } },
  { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#0ea5e9' } },
  
  { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: '#22c55e' } },
];

// Details Data
const nodeDetails: Record<string, { title: string; tasks: string[]; tools: string[]; outcome: string }> = {
  '2': {
    title: 'Social Media Strategy',
    tasks: ['Daily Stories', '3x Feed Posts/Week', 'Community Management'],
    tools: ['Meta Business Suite', 'TikTok Creative Center'],
    outcome: 'Consistent Brand Presence',
  },
  '3': {
    title: 'Web Presence',
    tasks: ['SEO Optimization', 'Event Calendar Integration', 'Table Booking System'],
    tools: ['Next.js', 'Vercel', 'Google Analytics'],
    outcome: 'Higher Organic Traffic & Direct Bookings',
  },
  '4': {
    title: 'Paid Ads',
    tasks: ['Retargeting Visitors', 'Event Promotion Ads', 'Influencer Boosts'],
    tools: ['Facebook Ads Manager', 'Google Ads'],
    outcome: '3x ROAS on Event Tickets',
  },
  '5': {
    title: 'Email/WhatsApp',
    tasks: ['VIP Lists', 'Weekly Newsletters', 'Birthday Promos'],
    tools: ['Mailchimp', 'WhatsApp Business API'],
    outcome: 'High Retention & Repeat Visits',
  },
  '6': {
    title: 'TikTok Live',
    tasks: ['DJ Sets Streaming', 'Behind the Scenes', 'Q&A with Staff'],
    tools: ['TikTok Live Studio', 'OBS'],
    outcome: 'Direct Audience Engagement',
  },
  '7': {
    title: 'Reels / Shorts',
    tasks: ['Event Highlights', 'Drink Making Videos', 'Crowd Reactions'],
    tools: ['CapCut', 'Adobe Premiere'],
    outcome: 'Viral Reach & Brand Awareness',
  },
  '8': {
    title: 'Audience Reach',
    tasks: ['Viral Loop Creation', 'Shareable Content'],
    tools: ['Analytics Dashboard'],
    outcome: '10k+ Weekly Impressions',
  },
  '9': {
    title: 'Sales Impact',
    tasks: ['Conversion Tracking', 'Table Reservations'],
    tools: ['CRM', 'POS Integration'],
    outcome: 'Increased Weekend Revenue',
  },
};

export default function MarketingFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    if (nodeDetails[node.id]) {
      setSelectedNode(node.id);
    }
  };

  return (
    <div className="h-[600px] md:h-[800px] w-full relative border border-white/10 rounded-xl overflow-hidden bg-black/50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Controls />
        <MiniMap nodeStrokeColor="#fff" nodeColor="#333" maskColor="rgba(0,0,0,0.5)" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedNode && nodeDetails[selectedNode] && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full md:w-80 bg-black/90 backdrop-blur-xl border-l border-white/10 p-6 z-10 shadow-2xl overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-primary">{nodeDetails[selectedNode].title}</h3>
              <button onClick={() => setSelectedNode(null)} className="p-2 hover:bg-white/10 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                  <CheckCircle size={16} /> Key Tasks
                </h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-gray-200">
                  {nodeDetails[selectedNode].tasks.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                  <PenTool size={16} /> Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {nodeDetails[selectedNode].tools.map((t, i) => (
                    <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs">{t}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="text-sm font-semibold text-primary mb-1 flex items-center gap-2">
                  <BarChart size={16} /> Expected Outcome
                </h4>
                <p className="text-sm text-white">{nodeDetails[selectedNode].outcome}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
