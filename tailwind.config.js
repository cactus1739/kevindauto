/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Unbounded', 'system-ui', 'sans-serif'],
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Nền tối cao cấp (ink)
        ink: {
          950: '#07070d',
          900: '#0c0c16',
          850: '#10101d',
          800: '#161624',
          700: '#1e1e30',
          600: '#2a2a40',
          500: '#3a3a55',
        },
        // Màu thương hiệu chính - hồng điện (năng động)
        brand: {
          50: '#fff0f6',
          100: '#ffd6e7',
          200: '#ffadce',
          300: '#ff7aae',
          400: '#ff4d92',
          500: '#ff2d78',
          600: '#e60f5e',
          700: '#bd0a4d',
          800: '#900a3d',
        },
        // Xanh cyan điện
        cyan2: {
          300: '#5ef2ff',
          400: '#22d3ee',
          500: '#06b6d4',
        },
        // Vàng/gold "premium"
        gold: {
          300: '#ffd766',
          400: '#ffc93c',
          500: '#ffb020',
          600: '#f59008',
        },
        // Tím năng lượng
        violet2: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(255,45,120,0.45)',
        'glow-cyan': '0 0 40px -8px rgba(34,211,238,0.4)',
        'glow-gold': '0 0 40px -8px rgba(255,176,32,0.45)',
        card: '0 18px 50px -12px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 20% 20%, rgba(255,45,120,0.18), transparent 45%), radial-gradient(circle at 80% 30%, rgba(34,211,238,0.16), transparent 45%), radial-gradient(circle at 50% 90%, rgba(124,58,237,0.16), transparent 50%)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shine: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'marquee-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shine: 'shine 6s linear infinite',
        marquee: 'marquee-x 48s linear infinite',
      },
    },
  },
  plugins: [],
}
