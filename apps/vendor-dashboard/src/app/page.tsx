'use client';

import { motion } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { AIHealthTile } from '../components/AIHealthTile';
import { RevenueChart } from '../components/RevenueChart';
import { ViewersTile } from '../components/ViewersTile';
import { AddProductTile } from '../components/AddProductTile';
import { RecentOrdersTile } from '../components/RecentOrdersTile';

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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-textMain flex font-sans">
      <Sidebar />

      <main className="flex-grow ml-64 p-10">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto bento-grid"
        >
          {/* Header Row */}
          <AIHealthTile />

          {/* Analytics Row */}
          <motion.div variants={item} className="col-span-8 glass-panel p-8">
            <div className="flex justify-between items-center">
               <div>
                 <h3 className="text-xl font-bold tracking-tight">Revenue Stream</h3>
                 <p className="text-textSub text-xs font-mono uppercase tracking-widest mt-1">7-Day Analysis // USD</p>
               </div>
               <div className="text-right">
                 <div className="text-2xl font-mono text-neonCyan font-bold">$12,492.00</div>
                 <div className="text-[10px] text-green-500 font-mono tracking-widest uppercase">+14.2% FROM LAST WEEK</div>
               </div>
            </div>
            <RevenueChart />
          </motion.div>

          <motion.div variants={item} className="col-span-4 glass-panel p-8">
            <ViewersTile />
          </motion.div>

          {/* Action Row */}
          <motion.div variants={item} className="col-span-4 glass-panel p-8">
            <AddProductTile />
          </motion.div>

          <motion.div variants={item} className="col-span-8 glass-panel p-8">
            <RecentOrdersTile />
          </motion.div>
          
        </motion.div>
      </main>
    </div>
  );
}
