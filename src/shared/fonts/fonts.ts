import { League_Spartan, Unbounded } from 'next/font/google';

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