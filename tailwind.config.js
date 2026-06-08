/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberdark: '#0a0e27',
        cyberblack: '#050810',
        cybercyan: '#00d9ff',
        cyberpurple: '#a855f7',
        cybergreen: '#10b981',
        cyberred: '#ef4444',
        cyberyellow: '#fbbf24',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Courier New', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-cyber': 'pulse-cyber 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'slide-in': 'slide-in 0.6s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'attack-bounce': 'attack-bounce 0.3s ease-out',
      },
      keyframes: {
        'pulse-cyber': {
          '0%, 100%': { opacity: '1', textShadow: '0 0 10px rgba(0, 217, 255, 0.5)' },
          '50%': { opacity: '0.7', textShadow: '0 0 20px rgba(0, 217, 255, 0.8)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 217, 255, 0.3), 0 0 10px rgba(168, 85, 247, 0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 217, 255, 0.6), 0 0 30px rgba(168, 85, 247, 0.3)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'attack-bounce': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
