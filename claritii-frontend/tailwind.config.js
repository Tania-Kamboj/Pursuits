/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 1. Brand Colors (From your image)
        primary: {
          DEFAULT: '#6366F1', // Indigo
          hover: '#4F46E5',
          light: '#E0E7FF',
        },
        secondary: {
          DEFAULT: '#8B5CF6', // Violet
          hover: '#7C3AED',
          light: '#F3E8FF',
        },
        tertiary: {
          DEFAULT: '#1E293B', // Slate
        },
        
        // 2. Semantic Backgrounds (Your specific request)
        background: '#F7F9FB', // Page Background
        surface: '#FFFFFF',    // Card Background
        
        // 3. Text Colors
        'text-main': '#0F172A',
        'text-muted': '#64748B',
        'text-inverse': '#FFFFFF',
        
        // 4. Borders & Outlines
        border: '#E2E8F0',
        'border-focus': '#6366F1',
      },
      
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      
      // Typography Scale
      fontSize: {
        'display': ['48px', { lineHeight: '1.1', fontWeight: '800' }],
        'h1': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.5' }],
        'label': ['14px', { lineHeight: '1.2', fontWeight: '600' }],
      },
      
      // Shapes (Generous Radii)
      borderRadius: {
        'card': '24px',      // For Cards
        'button': '12px',    // For Buttons/Inputs
        'pill': '9999px',
      },
      
      // Shadows (Ambient Depth)
      boxShadow: {
        'card': '0px 10px 25px -5px rgba(99, 102, 241, 0.08)',
        'card-hover': '0px 20px 40px -10px rgba(99, 102, 241, 0.15)',
        'button': '0px 4px 12px rgba(99, 102, 241, 0.2)',
      },
    },
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}