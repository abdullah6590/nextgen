'use client';

import React, { useState } from 'react';
import { TopNav } from '../components/neural/TopNav';
import { GlassSidebar } from '../components/neural/GlassSidebar';
import { CentralSearchHub } from '../components/neural/CentralSearchHub';
import { VisualSearch } from '../components/neural/VisualSearch';
import { TrendingProducts } from '../components/neural/TrendingProducts';
import { MonthlySpecial } from '../components/neural/MonthlySpecial';
import { NewAssets } from '../components/neural/NewAssets';
import { PopularVendors } from '../components/neural/PopularVendors';
import { FeaturedProduct } from '../components/neural/FeaturedProduct';
import { SystemMetrics } from '../components/neural/SystemMetrics';
import { Footer } from '../components/neural/Footer';
import { Chatbot } from '../components/neural/Chatbot';

export default function StorefrontHomePage() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <div className="bg-[#09090b] text-on-surface font-body selection:bg-primary/30 min-h-screen flex flex-col relative overflow-x-hidden">
      <TopNav />
      <GlassSidebar />
      
      <main className="pt-32 pb-24 px-4 sm:px-8 max-w-[1920px] mx-auto w-full flex-1 z-10">
        <div className="grid grid-cols-12 auto-rows-min gap-4 sm:gap-6 w-full">
          <CentralSearchHub />
          <VisualSearch onResults={handleSearchResults} />
          
          {/* Trending Products — Live API Data */}
          <TrendingProducts />

          {/* This Month Special — Live API Data */}
          <MonthlySpecial />

          <NewAssets />
          <SystemMetrics />
          <PopularVendors />
          
          {hasSearched ? (
            searchResults.length > 0 ? (
              searchResults.map(match => (
                <FeaturedProduct 
                  key={match.product._id}
                  title={match.product.name}
                  price={`$${match.product.price}`}
                  category={match.product.category}
                  matchScore={`${(match.score * 100).toFixed(1)}%`}
                  imageSrc={match.product.images?.[0] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60'}
                />
              ))
            ) : (
              <div className="col-span-12 lg:col-span-8 glass-panel border border-cyan-500/20 rounded-lg p-12 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-cyan-500/50 mb-4 block">search_off</span>
                <p className="text-cyan-500 font-mono text-sm tracking-widest uppercase mb-2">Neural Scan Complete</p>
                <h3 className="text-xl font-headline text-slate-300">No similar assets found in the network.</h3>
              </div>
            )
          ) : (
            <>
              {/* Featured Product 1 */}
              <FeaturedProduct 
                title="Iridescent Mesh Kit"
                price="2.4 ETH"
                category="Procedural Materials"
                matchScore="99.4%"
                imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuC0kL0OVc4DTI5hZ1_sYW3t4MxQrpudSwaD79qPf8w16b0gibEsdps4OaLyZEFW2eG5PjkjOjjAU8hKCvhFPo9lC77gQzEg0jOeKEFUuR3oUe7NASDiKZgRhcVU5q1TH2tgcbVU1kf_CayrCWEwEWxaXLOVpchGKMGhnC5kiiubSfvqi6GpMlHymLu9ufHq1FJVW5ewSBGsqoANc7DTaaLEx_eoyQCqDc1Kan0i87b9bc0lNfn6mrgBymgvaQzcRw62UqS_PgEjr5Zm"
              />

              {/* Featured Product 2 */}
              <FeaturedProduct 
                title="Neo-Tokyo Enviro"
                price="4.8 ETH"
                category="Real-time Scene Core"
                matchScore="98.1%"
                imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAnUssltF04v92j3XMPmRKSqs8u_bDolyYBBWuEXCfTkbIjHbSZKO8Gn7b3Of6GJVFTyo6sdIHOW_Y9FFLg5AENvJP3LHFSQ-iYF4l_JHDG9ERYmQEauipMqEjTBiIaklARI1lTRkwmfBp-FgJ6X6ai4QTQ2Xv09hApC6T9tujWSfvLtXPBc-ewuLdib9n8zI8FcTRzs_mxQ3IItWzbP2HvQALEbqwO095-ii94G-b1ExTlKQeyCuyRiQyMmIqUOjydrjpLqpW1nZLM"
                isQuickPurchase={true}
              />
            </>
          )}
        </div>
      </main>
      
      {/* AI Chatbot */}
      <Chatbot />
      <Footer />
    </div>
  );
}
