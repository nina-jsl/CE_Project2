import type { Config } from "tailwindcss";
// const plugin = require('@tailwindcss/scrollbar');


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glowing: '0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "smoky-black": "#1B1813ff",
        "marian-blue": "#373B87ff",
        "cobalt-blue": "#1746A3ff",
        bistre: "#2F2618ff",
        "resolution-blue": "#1B3181ff",
        "carrot-orange": "#E48D2Aff",
        gamboge: " #E9A12Eff",
        "rose-pompadour": "#E07791ff",
        gamboge2: "#E9A13Aff",
        "burnt-sienna": "#E2815Eff",
        sage: "#B3AE86ff",
        "harvest-gold": "#E8AF01ff",
        "hunter-green": "#4B6E50ff",
        "lapis-lazuli": "#01608Fff",
        "turqoise":"#bee9e8",
        "light-blue":"#cae9ff",
        "light-yellow":"#ffe45e",
        scrollbarTrack: 'rgba(255, 255, 255, 0.1)', // Track color
        scrollbarThumb: 'rgba(255, 204, 0, 0.6)', // Thumb color
      },
    },
  },
  plugins: [],
} satisfies Config;
