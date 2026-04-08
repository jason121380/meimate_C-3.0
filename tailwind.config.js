module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        // 新設計系統
        'default-color': '#FAFAFA',
        'bos-blue-900': '#111827',

        // 品牌色 (GMB Orange 系列)
        'meimate-white': '#FAFAFA',
        'meimate-beige': '#FFF5F0',
        'meimate-yellow': '#C4A882',
        'meimate-green': '#10B981',
        'meimate-pink': '#FF6B2C',
        'meimate-blue': '#6366F1',

        // GMB Orange 系列
        'gmb-orange': {
          100: '#FFF5F0',
          200: '#FFE8D9',
          400: '#FF8A56',
          500: '#FF6B2C',
          600: '#E55A1F',
        },

        // 語義色
        'mm-primary': '#FF6B2C',
        'mm-primary-light': '#FFF5F0',
        'mm-primary-dark': '#E55A1F',
        'mm-accent': '#111827',
        'mm-bg': '#FFFFFF',
        'mm-text': '#111827',
        'mm-text-secondary': '#6B7280',
        'mm-text-muted': '#9CA3AF',
        'mm-border': '#F3F4F6',
        'mm-success': '#10B981',
        'mm-danger': '#EF4444',
      },
      borderRadius: {
        'mm': '0.75rem',
        'mm-sm': '0.5rem',
        'mm-lg': '1rem',
      },
      boxShadow: {
        'mm': '0 1px 3px rgba(0,0,0,0.04)',
        'mm-md': '0 4px 12px rgba(0,0,0,0.06)',
        'mm-lg': '0 8px 24px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        'sans': ['Inter', '"Noto Sans TC"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'reverse-spin-slow': 'reverseSpin 5s linear infinite',
        'spin-slow': 'spinSlow 1.5s cubic-bezier(.58,.32,.02,.79) infinite',
        'float': 'float 3s ease-in-out infinite',
        'reverse-float': 'reverseFloat 3s ease-out infinite',
        'shine': 'shine 2s infinite',
        'shine-yellow': 'shineYellow 1.5s infinite',
        'floatText-1': 'floatText 1s ease-in-out infinite alternate',
        'floatText-2': 'floatText 1s 0.1s ease-in-out infinite alternate',
        'floatText-3': 'floatText 1s 0.2s  ease-in-out infinite alternate',
        'floatText-4': 'floatText 1s 0.3s ease-in-out infinite alternate',
        'floatText-5': 'floatText 1s 0.4s ease-in-out infinite alternate',
        'floatText-6': 'floatText 1s 0.5s ease-in-out infinite alternate',
        'floatText-7': 'floatText 1s 0.6s ease-in-out infinite alternate',
        'cut': 'cut 1.5s linear infinite'
      },
      keyframes: {
        reverseSpin: {
          to: {
            transform: 'rotate(-360deg) translateZ(0)'
          }
        },
        spinSlow: {
          to: {
            transform: 'rotate(360deg) translateZ(0)'
          }
        },
        reverseFloat: {
          '0%, 100%': {
            transform: 'translate3d(0, 0px, 0)'
          },
          '50%': {
            transform: 'translate3d(0, -20px, 0)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translate3d(0, 0px, 0)'
          },
          '50%': {
            transform: 'translate3d(0, 20px, 0)'
          }
        },
        shine: {
          '0%, 100%': {
            'opacity': '1',
            'transform': 'scale(1) translateZ(0)',
            'box-shadow': '0px 0px 6px 5px rgba(196, 168, 130, 0.2)'
          },
          '50%': {
            'opacity': '0.5',
            'transform': 'scale(0.8) translateZ(0)',
            'box-shadow': '0px 0px 6px 5px rgba(196, 168, 130, 0.2)'
          }
        },
        shineYellow: {
          '0%, 100%': {
            'opacity': '1',
            'transform': 'scale(1) translateZ(0)',
            'box-shadow': '0px 0px 6px 5px rgba(254, 180, 1, 0.2)'
          },
          '50%': {
            'opacity': '0.5',
            'transform': 'scale(0.8) translateZ(0)',
            'box-shadow': '0px 0px 6px 5px rgba(254, 180, 1, 0.2)'
          }
        },
        floatText: {
          '0%, 100%': {
            'transform': 'translate3d(0, 0px, 0)'
          },
          '20%': {
            'transform': 'translate3d(0, -20px, 0)'
          }
        },
        cut: {
          '0%, 100%': { transform: 'rotate(-30deg) translateZ(0)' },
          '20%': { transform: 'rotate(-60deg) translateZ(0)' },
          '40%': { transform: 'rotate(-30deg) translateZ(0)' },
          '60%': { transform: 'rotate(-60deg) translateZ(0)' },
          '80%': { transform: 'rotate(-30deg) translateZ(0)' },
        }
      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
