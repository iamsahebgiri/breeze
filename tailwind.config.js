const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: true,
    content: [
      './resources/views/**/*.edge',
      './resources/views/*.edge',
      './resources/**/*.js',
      './resources/**/*.jsx',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },

  plugins: [require('@tailwindcss/forms')],
}
