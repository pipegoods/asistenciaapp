import { Poppins } from 'next/font/google'

export const fontSans = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
})
