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
        blue: { background: '#007FBA' },
      },
    },
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/forms')],
})
