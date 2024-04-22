import { withUt } from 'uploadthing/tw'

export default withUt({
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        app: 'minmax(18rem, 18rem) 1fr',
      },
      colors: {
        blue: { primary: '#007FBA', hover: '#005a87' },
        grey: { primary: '#455A64', secondary: '#37474F' },
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/forms')],
})
