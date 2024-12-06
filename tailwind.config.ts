import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [],
} satisfies Config;
