import { League_Spartan, Unbounded, Kumbh_Sans, Poppins } from 'next/font/google';

export const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-league-spartan',
});

export const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-unbounded',
});

export const kumbhSans = Kumbh_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-kumbh-sans',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
});
