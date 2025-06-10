// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'bounce-fast': 'bounce 0.6s ease-in-out 1',
      },
    },
  },
  plugins: [],
};
