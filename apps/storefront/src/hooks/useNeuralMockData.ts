import { useState, useEffect } from 'react';

export interface NeuralMockData {
  revenue: string;
  liveViewers: number;
  orders: number;
  latency: string;
  traffic: string;
  uptime: string;
}

export const useNeuralMockData = () => {
  const [data, setData] = useState<NeuralMockData>({
    revenue: '$24,599.00',
    liveViewers: 1420,
    orders: 342,
    latency: '4ms',
    traffic: '8.2tb/s',
    uptime: '99.9%',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        liveViewers: prev.liveViewers + Math.floor(Math.random() * 11) - 5,
        orders: prev.orders + Math.floor(Math.random() * 2), // Occasional new order
        latency: `${Math.floor(Math.random() * 3) + 3}ms`,
      }));
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return { data, isLoading };
};
