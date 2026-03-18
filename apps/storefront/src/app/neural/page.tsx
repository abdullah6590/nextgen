'use client';

import React from 'react';
import { TopNav } from '../../components/neural/TopNav';
import { GlassSidebar } from '../../components/neural/GlassSidebar';
import { CentralSearchHub } from '../../components/neural/CentralSearchHub';
import { VisualSearch } from '../../components/neural/VisualSearch';
import { NewAssets } from '../../components/neural/NewAssets';
import { PopularVendors } from '../../components/neural/PopularVendors';
import { FeaturedProduct } from '../../components/neural/FeaturedProduct';
import { SystemMetrics } from '../../components/neural/SystemMetrics';
import { Footer } from '../../components/neural/Footer';

export default function NeuralMarketplacePage() {
  return (
    <div className="bg-[#09090b] text-on-surface font-body selection:bg-primary/30 min-h-screen flex flex-col relative overflow-x-hidden">
      <TopNav />
      <GlassSidebar />
      
      <main className="pt-32 pb-24 px-4 sm:px-8 max-w-[1920px] mx-auto w-full flex-1 z-10">
        <div className="grid grid-cols-12 auto-rows-min gap-4 sm:gap-6 w-full">
          <CentralSearchHub />
          <VisualSearch />
          <NewAssets />
          <SystemMetrics />
          <PopularVendors />
          
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
