// tailwind.config.js

module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      /* Add custom theme settings here */
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
