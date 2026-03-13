/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // zinc-950
        surface: 'rgba(255, 255, 255, 0.05)',
        surfaceHover: 'rgba(255, 255, 255, 0.1)',
        neonCyan: '#00f0ff',
        neonBlue: '#3b82f6',
        neonPurple: '#8a2be2',
        textMain: '#ffffff',
        textSub: '#a1a1aa', // zinc-400
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'cyan-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.2), transparent 70%)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon-cyan': '0 0 15px rgba(0, 240, 255, 0.4)',
      }
    },
  },
  plugins: [],
};
