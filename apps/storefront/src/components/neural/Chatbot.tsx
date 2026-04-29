'use client';

import React, { useState, useRef, useEffect } from 'react';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: 'Systems optimal. How can I assist you with the Neural Catalog today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          
          setMessages(prev => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              content: newMessages[lastIndex].content + chunk
            };
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Neural connection lost. Please ensure the backend matrix (Ollama) is active.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] group flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-[#131315]/95 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col h-[500px] animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-900/40 to-violet-900/40 p-4 border-b border-cyan-500/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-400">smart_toy</span>
              <span className="font-headline font-bold text-cyan-50 text-sm tracking-wider uppercase">Neural Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-50 rounded-tr-sm' 
                    : 'bg-surface-container-high border border-outline-variant/30 text-slate-300 rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm bg-surface-container-high border border-outline-variant/30 text-slate-300 rounded-tl-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-cyan-500/20 bg-surface-container-lowest">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Query neural network..."
                className="w-full bg-surface-container-high border border-cyan-500/30 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-cyan-500/20 text-cyan-400 rounded-full hover:bg-cyan-500/40 disabled:opacity-50 disabled:hover:bg-cyan-500/20 transition-all"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <>
          <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-xl animate-pulse group-hover:bg-secondary/40 transition-all z-0"></div>
          <button 
            onClick={() => setIsOpen(true)}
            className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-[#d0bcff] to-[#571bc1] shadow-[0_0_20px_rgba(208,188,255,0.4)] hover:scale-110 hover:rotate-12 transition-all animate-[pulse_2s_infinite]"
          >
            <span className="material-symbols-outlined text-white text-3xl">smart_toy</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-tertiary rounded-full border-2 border-background"></div>
          </button>
          
          <div className="absolute bottom-20 right-0 w-64 bg-surface-container-high border border-outline-variant/20 rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none translate-y-2 group-hover:translate-y-0 shadow-2xl backdrop-blur-lg z-20">
            <p className="text-xs text-on-surface leading-relaxed">
              <span className="text-secondary font-bold">AI_ASSISTANT:</span> Online and ready to assist with your neural augmentation queries.
            </p>
          </div>
        </>
      )}
    </div>
  );
};
