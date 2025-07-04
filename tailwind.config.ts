import { heroui } from '@heroui/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        gifs: 'repeat(auto-fit, minmax(200px, 1fr))',
        gifsMd: 'repeat(auto-fit, minmax(250px, 1fr))',
      },
      gridAutoRows: {
        gifs: '200px',
        gifsMd: '250px',
      },
      scale: {
        101: '1.01',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
}
export default config
