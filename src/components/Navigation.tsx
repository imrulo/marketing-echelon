'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mic, MicOff, Home, BarChart2, Calendar, Video, DollarSign, Activity } from 'lucide-react';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { clsx } from 'clsx';

export default function Navigation() {
  const pathname = usePathname();
  const { listening, startListening, stopListening, browserSupportsSpeechRecognition } = useVoiceCommands();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Marketing', path: '/marketing', icon: BarChart2 },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Content', path: '/content', icon: Video },
    { name: 'Scenarios', path: '/scenarios', icon: DollarSign },
    { name: 'Dashboard', path: '/dashboard', icon: Activity },
  ];

  if (!isClient) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto md:left-0 md:right-auto md:w-24 md:h-screen bg-black/80 backdrop-blur-lg border-t md:border-t-0 md:border-r border-white/10 flex md:flex-col justify-between items-center p-4">
      {/* Brand Icon (Mobile Hidden / Desktop Visible) */}
      <div className="hidden md:flex flex-col items-center mb-8 mt-4">
        <div className="w-10 h-10 rounded-full bg-primary neon-box flex items-center justify-center font-bold text-black">
          E
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex md:flex-col justify-around w-full md:w-auto gap-4 md:gap-8">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className="relative group flex flex-col items-center justify-center">
               <div
                className={clsx(
                  "p-3 rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-primary/20 text-primary neon-text" 
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                )}
              >
                <item.icon size={24} />
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-2 md:bottom-auto md:-right-2 w-1 h-1 md:w-1 md:h-8 bg-primary rounded-full shadow-[0_0_10px_var(--primary)]"
                />
              )}
              <span className="hidden md:block text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity absolute left-14 bg-black/80 px-2 py-1 rounded border border-white/10 whitespace-nowrap pointer-events-none">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Voice Control Toggle */}
      <div className="hidden md:flex flex-col items-center mt-auto mb-4">
        {browserSupportsSpeechRecognition ? (
            <button
            onClick={listening ? stopListening : startListening}
            className={clsx(
                "p-3 rounded-full transition-all duration-300",
                listening
                ? "bg-red-500/20 text-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                : "bg-gray-800 text-gray-400 hover:text-white"
            )}
            title="Toggle Voice Commands"
            >
            {listening ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
        ) : (
            <div className="text-gray-600" title="Voice not supported"><MicOff size={20} /></div>
        )}
      </div>
      
      {/* Mobile Voice Control (Absolute) */}
      <div className="md:hidden absolute -top-16 right-4">
         {browserSupportsSpeechRecognition && (
            <button
            onClick={listening ? stopListening : startListening}
            className={clsx(
                "p-4 rounded-full transition-all duration-300 shadow-lg border border-white/10 backdrop-blur-md",
                listening
                ? "bg-red-500/20 text-red-500 animate-pulse"
                : "bg-black/80 text-gray-400"
            )}
            >
            {listening ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
        )}
      </div>
    </nav>
  );
}
