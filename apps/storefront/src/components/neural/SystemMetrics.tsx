'use client';

import React from 'react';
import { BentoCard } from './BentoCard';
import { useNeuralMockData } from '../../hooks/useNeuralMockData';

export const SystemMetrics = () => {
  const { data, isLoading } = useNeuralMockData();

  return (
    <BentoCard className="col-span-12 lg:col-span-6 row-span-1 p-8 flex flex-col justify-between group" gradientHover>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline text-2xl font-bold uppercase tracking-tight text-on-surface">Global Nodes</h2>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
          <span className="text-[10px] font-label font-bold tracking-widest uppercase text-primary">System Nominal</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
        <MetricBox label="Latency" value={isLoading ? '--' : data.latency} />
        <MetricBox label="Traffic" value={isLoading ? '--' : data.traffic} />
        <MetricBox label="Uptime" value={isLoading ? '--' : data.uptime} />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
          <p className="text-[10px] font-label text-slate-500 uppercase tracking-widest mb-1">Live Revenue</p>
          <p className="text-xl sm:text-2xl font-bold font-headline text-primary">{isLoading ? '--' : data.revenue}</p>
        </div>
        <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 flex justify-between gap-2">
          <div>
            <p className="text-[10px] font-label text-slate-500 uppercase tracking-widest mb-1">Orders</p>
            <p className="text-xl sm:text-2xl font-bold font-headline text-secondary">{isLoading ? '--' : data.orders}</p>
          </div>
          <div>
            <p className="text-[10px] font-label text-slate-500 uppercase tracking-widest mb-1">Viewers</p>
            <p className="text-xl sm:text-2xl font-bold font-headline text-white">{isLoading ? '--' : data.liveViewers}</p>
          </div>
        </div>
      </div>
    </BentoCard>
  );
};

const MetricBox = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex flex-col p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 group-hover:border-primary/20 transition-colors">
    <span className="text-[10px] font-label text-slate-500 uppercase tracking-widest mb-1">{label}</span>
    <span className="text-lg sm:text-xl font-bold font-headline text-white">{value}</span>
  </div>
);
