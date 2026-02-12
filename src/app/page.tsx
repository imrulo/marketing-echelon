'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Music, MapPin, Clock, Zap } from 'lucide-react';

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-full flex flex-col justify-center max-w-5xl mx-auto py-12">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-12"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center space-y-4">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase neon-text text-white">
            Club <span className="text-primary">Echelon</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
            Belgrade's Most Exclusive Nightlife Experience
          </p>
        </motion.div>

        {/* Info Grid */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/5 transition-colors group">
            <div className="p-3 rounded-full bg-secondary/10 mb-4 group-hover:bg-secondary/20 transition-colors">
                <Music className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-lg font-bold mb-2">The Sound</h3>
            <p className="text-sm text-gray-400">Afrobeat, Amapiano, Hip-Hop, Latino, Afrohouse</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/5 transition-colors group">
             <div className="p-3 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">The Location</h3>
            <p className="text-sm text-gray-400">Terazije 13, Belgrade, Serbia</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/5 transition-colors group">
            <div className="p-3 rounded-full bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                <Clock className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-bold mb-2">The Hours</h3>
            <p className="text-sm text-gray-400">Thu - Sun: 11:00 PM - 5:00 AM</p>
          </div>
        </motion.div>

        {/* Strategy Hub */}
        <motion.div variants={item} className="pt-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Zap className="text-primary" /> Explore Strategy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    { title: 'Marketing Strategy', path: '/marketing', desc: 'Social, Ads, Outreach', color: 'border-blue-500' },
                    { title: 'Event Management', path: '/events', desc: 'Planning & Execution', color: 'border-purple-500' },
                    { title: 'Content Creation', path: '/content', desc: 'Photo, Video, Live', color: 'border-pink-500' },
                    { title: 'Scenarios & ROI', path: '/scenarios', desc: 'Compensation Models', color: 'border-green-500' },
                    { title: 'Live Dashboard', path: '/dashboard', desc: 'Real-time Projections', color: 'border-yellow-500' },
                ].map((link) => (
                    <Link key={link.path} href={link.path}>
                        <motion.div 
                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-6 rounded-xl border-l-4 ${link.color} glass-panel cursor-pointer h-full flex flex-col justify-between`}
                        >
                            <div>
                                <h3 className="text-xl font-bold">{link.title}</h3>
                                <p className="text-gray-400 text-sm mt-1">{link.desc}</p>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <ArrowRight className="text-gray-500" />
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
