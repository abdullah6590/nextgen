'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

interface SearchMatch {
  product: {
    _id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
  };
  score: number;
}

interface VisualSearchOverlayProps {
  onClose?: () => void;
  imageUrl?: string;
  isScanning?: boolean;
  results?: SearchMatch[];
}

export default function VisualSearchOverlay({ onClose, imageUrl, isScanning = true, results = [] }: VisualSearchOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hasResults = results.length > 0;
  const showResults = !isScanning && hasResults;
  const showNoResults = !isScanning && !hasResults;

  // Get best match for the "insight" panel
  const bestMatch = results[0];
  const avgScore = results.length > 0
    ? results.reduce((sum, r) => sum + r.score, 0) / results.length
    : 0;

  const handleScrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -280, behavior: 'smooth' });
  };
  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({ left: 280, behavior: 'smooth' });
  };

  // Color based on score
  const getScoreColor = (score: number) => {
    if (score >= 0.90) return 'text-primary border-primary/30';
    if (score >= 0.70) return 'text-secondary border-secondary/30';
    return 'text-on-surface-variant border-outline-variant/30';
  };

  const overlayContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-[999] bg-[#09090b]/60 backdrop-blur-[64px] flex flex-col items-center justify-center p-6 md:p-12"
      style={{ backdropFilter: "blur(64px)", WebkitBackdropFilter: "blur(64px)" }}
    >
      {/* Header Controls */}
      <div className="absolute top-24 left-8 right-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${
            isScanning
              ? 'bg-primary/10 border-primary/20'
              : showResults
                ? 'bg-green-500/10 border-green-500/20'
                : 'bg-red-500/10 border-red-500/20'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              isScanning ? 'bg-primary animate-pulse' : showResults ? 'bg-green-400' : 'bg-red-400'
            }`}></span>
            <span className={`font-headline text-xs tracking-widest uppercase font-bold ${
              isScanning ? 'text-primary' : showResults ? 'text-green-400' : 'text-red-400'
            }`}>
              {isScanning ? 'Aetheris AI Active' : showResults ? `${results.length} Matches Found` : 'No Matches'}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all group"
        >
          <span className="material-symbols-outlined text-on-surface group-hover:rotate-90 transition-transform duration-300">close</span>
        </button>
      </div>

      {/* Central Workspace */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">

        {/* Left: Scanning Module */}
        <div className="lg:col-span-7 relative group">
          <div className="relative bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10 shadow-[0_0_80px_-20px_rgba(76,215,246,0.15)] aspect-[4/3] flex items-center justify-center">
            {/* The Uploaded Asset */}
            <img
              alt="Uploaded Search Asset"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              src={imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuATfhH5Gel5p1mQciB21TKrkotDlMN0WtjnRNOM6pjtXn7VgBRwlOaT7iMbqvLeDJPXjj1VSfZEia-HgZuejdcpIIH00IwGeflqaV63koXaENCWVqGMJZN6Gs1XKCwhBxlrwrhUzYFFvkpSuYjc7IQs-Ql_1kJQyKnPPeOZcoizNgMLGDF-UTuJWJX-koTqCaSuFjni7rPKsLtr7XVWCN8i8oYMrmllzmvsUKz7puhPrTalA4B4O7g1TJh13lhjyxnUqv7SKQSh2NPW"}
            />

            {/* Scanning Overlay — only active while scanning */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(76, 215, 246, 0.1) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(76, 215, 246, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                ></div>

                {/* Horizontal Scanning Bar */}
                <motion.div
                  animate={{ translateY: [0, 450, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_2px_rgba(76,215,246,0.8)]"
                ></motion.div>

                {/* UI HUD elements */}
                <div className="absolute top-6 left-6 flex flex-col gap-1">
                  <span className="text-[10px] text-primary font-headline uppercase tracking-widest">Target_Acquired</span>
                  <span className="text-[10px] text-on-surface-variant font-body opacity-60">REF_ID: {Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                </div>

                <div className="absolute bottom-6 right-6">
                  <div className="bg-surface-container-highest/80 backdrop-blur-md px-4 py-2 rounded-md border-l-2 border-primary">
                    <span className="text-[10px] block text-on-surface-variant uppercase tracking-tighter mb-1">Processing Geometry</span>
                    <div className="w-32 h-1 bg-surface-container-lowest rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-2/3 animate-[pulse_2s_infinite]"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Results badge — when done scanning */}
            {showResults && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-6 left-6 bg-green-500/10 backdrop-blur-md px-4 py-2 rounded-lg border border-green-500/30"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
                  <span className="text-[10px] text-green-400 font-headline uppercase tracking-widest font-bold">Scan Complete</span>
                </div>
              </motion.div>
            )}

            {showNoResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-background/60 flex items-center justify-center"
              >
                <div className="text-center">
                  <span className="material-symbols-outlined text-4xl text-red-400/50 mb-2 block">search_off</span>
                  <p className="text-red-400 text-xs font-headline uppercase tracking-widest">No neural matches detected</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right: Semantic Insights — Real Data */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-2">Visual DNA Parsing</h2>
                <p className="text-on-surface-variant font-body leading-relaxed">Neural network is analyzing structural patterns, texture composition, and color matrices of your uploaded asset...</p>

                {/* Scanning skeleton */}
                <div className="mt-6 space-y-3">
                  <div className="h-3 bg-surface-container-high rounded-full animate-pulse w-3/4"></div>
                  <div className="h-3 bg-surface-container-high rounded-full animate-pulse w-1/2"></div>
                  <div className="h-3 bg-surface-container-high rounded-full animate-pulse w-2/3"></div>
                </div>
              </motion.div>
            ) : showResults ? (
              <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-2">
                  {results.length} Match{results.length > 1 ? 'es' : ''} Found
                </h2>
                <p className="text-on-surface-variant font-body leading-relaxed">
                  Best match: <span className="text-primary font-bold">{bestMatch?.product.name}</span> at{' '}
                  <span className="text-primary font-bold">{(bestMatch?.score * 100).toFixed(1)}%</span> similarity.
                </p>
              </motion.div>
            ) : (
              <motion.div key="noresults" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-2">No Matches</h2>
                <p className="text-on-surface-variant font-body leading-relaxed">
                  The neural network could not find any products with sufficient visual similarity. Try uploading a different image.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Real attribute tags from top match */}
          {showResults && bestMatch && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2">
              {bestMatch.product.category && (
                <span className="bg-secondary-container/30 text-secondary px-4 py-1.5 rounded-full text-xs font-bold border border-secondary/20 uppercase tracking-widest">
                  {bestMatch.product.category}
                </span>
              )}
              <span className="bg-primary-container/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold border border-primary/20 uppercase tracking-widest">
                ${bestMatch.product.price.toFixed(2)}
              </span>
              <span className="bg-surface-container-highest text-on-surface-variant px-4 py-1.5 rounded-full text-xs font-bold border border-outline-variant/30 uppercase tracking-widest">
                {results.length} results
              </span>
            </motion.div>
          )}

          {/* Match Data Grid — Real Metrics */}
          {showResults && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-5 rounded-lg border border-outline-variant/10">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Best Match</span>
                <span className="font-headline text-xl text-primary font-bold">
                  {(bestMatch.score * 100).toFixed(1)}<span className="text-xs text-on-surface-variant ml-1">%</span>
                </span>
              </div>
              <div className="bg-surface-container-low p-5 rounded-lg border border-outline-variant/10">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Avg. Similarity</span>
                <span className="font-headline text-xl text-secondary font-bold">
                  {(avgScore * 100).toFixed(1)}<span className="text-xs text-on-surface-variant ml-1">%</span>
                </span>
              </div>
            </motion.div>
          )}

          {/* Scanning progress indicators */}
          {isScanning && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-5 rounded-lg border border-outline-variant/10">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Feature Extraction</span>
                <div className="w-full h-1 bg-surface-container-lowest rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-primary animate-[pulse_1.5s_infinite] w-3/4 rounded-full"></div>
                </div>
              </div>
              <div className="bg-surface-container-low p-5 rounded-lg border border-outline-variant/10">
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Vector Matching</span>
                <div className="w-full h-1 bg-surface-container-lowest rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-secondary animate-[pulse_2s_infinite] w-1/2 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Similar Assets — Dynamic from Results */}
      <div className="absolute bottom-12 left-0 w-full px-8 lg:px-12 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-headline text-lg font-bold tracking-tighter uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">hub</span>
            {isScanning ? 'Searching Neural Network...' : showResults ? 'Neural Matches Found' : 'No Matches in Network'}
          </h3>
          {showResults && (
            <div className="flex gap-2">
              <button onClick={handleScrollLeft} className="p-2 rounded-full border border-outline-variant/20 hover:bg-surface-container-high text-on-surface-variant">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button onClick={handleScrollRight} className="p-2 rounded-full border border-outline-variant/20 hover:bg-surface-container-high text-on-surface-variant">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          )}
        </div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth">
          <AnimatePresence>
            {isScanning ? (
              // Skeleton cards while scanning
              [1, 2, 3, 4].map(i => (
                <motion.div key={`skel-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-none w-64">
                  <div className="rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/10">
                    <div className="aspect-square bg-surface-container-high animate-pulse"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-surface-container-high rounded animate-pulse w-3/4"></div>
                      <div className="h-2 bg-surface-container-high rounded animate-pulse w-1/2"></div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : showResults ? (
              // Real product cards from search results
              results.map((match, idx) => (
                <motion.div
                  key={match.product._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex-none w-64 group cursor-pointer"
                >
                  <Link href={`/product/${match.product._id}`} onClick={onClose}>
                    <div className="relative rounded-lg overflow-hidden bg-surface-container-low border border-outline-variant/10 hover:border-primary/50 transition-all duration-300">
                      <div className="aspect-square">
                        {match.product.images?.[0] ? (
                          <img
                            alt={match.product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            src={match.product.images[0]}
                          />
                        ) : (
                          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl text-outline/30">image</span>
                          </div>
                        )}
                      </div>
                      <div className={`absolute top-3 right-3 bg-background/80 backdrop-blur-md px-2 py-1 rounded border ${getScoreColor(match.score)}`}>
                        <span className={`text-[10px] font-bold font-headline ${getScoreColor(match.score).split(' ')[0]}`}>
                          {(match.score * 100).toFixed(1)}% MATCH
                        </span>
                      </div>
                      <div className="p-4 bg-gradient-to-t from-background to-transparent">
                        <h4 className="font-headline text-sm font-bold truncate uppercase">{match.product.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{match.product.category || 'Uncategorized'}</p>
                          <p className="text-xs font-mono font-bold text-primary">${match.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              // No results state
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-none w-full text-center py-8">
                <p className="text-on-surface-variant text-sm uppercase tracking-widest">No similar products found in the catalog. Try a different image.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  if (!mounted) return null;
  return createPortal(overlayContent, document.body);
}
