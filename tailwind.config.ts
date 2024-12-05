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
        'smoky-black': '#1B1813ff',
        'marian-blue': '#373B87ff',
        'cobalt-blue': '#1746A3ff',
        'bistre': '#2F2618ff',
        'resolution-blue': '#1B3181ff',
      },
    },
  },
  plugins: [],
} satisfies Config;
