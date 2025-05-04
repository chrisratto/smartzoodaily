/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    // Background colors
    'bg-rose-50',
    'bg-rose-100',
    'bg-amber-50',
    'bg-amber-100',
    'bg-emerald-50',
    'bg-emerald-100',
    'bg-teal-50',
    'bg-teal-100',
    'bg-blue-50',
    'bg-blue-100',
    'bg-gray-50',
    'bg-gray-100',
    'bg-purple-50',
    'bg-indigo-50',
    
    // Text colors
    'text-rose-700',
    'text-amber-700',
    'text-emerald-700',
    'text-teal-700',
    'text-blue-700',
    'text-gray-700',
    'text-purple-700',
    'text-indigo-700',
    
    // Border colors
    'border-rose-200',
    'border-amber-200',
    'border-emerald-200',
    'border-teal-200',
    'border-blue-200',
    'border-gray-200',
    
    // Hover states
    'hover:bg-rose-100',
    'hover:bg-amber-100',
    'hover:bg-emerald-100',
    'hover:bg-teal-100',
    'hover:bg-blue-100',
    'hover:bg-gray-100',
    
    // Icon sizes
    'w-24',
    'h-24'
  ],
  plugins: [],
};