import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import classNames from 'classnames';
import { BASE_DOMAIN, isDev } from '@/shared/constants/global';
import Script from 'next/script';
import { Providers } from './providers';
import { leagueSpartan } from '@/shared/fonts/fonts';

export const metadata: Metadata = {
  metadataBase: new URL('https://google.com'),
  title: '',
  description: '',
  ...(isDev && {
    robots: 'noindex, nofollow',
  }),
  openGraph: {
    images: [`${BASE_DOMAIN}/preview.jpg`],
    title: '',
    description: '',
  },
  alternates: {
    canonical: `https://arkada.gg/en`,
  },
  twitter: {
    images: [`${BASE_DOMAIN}/preview.jpg`],
    title: '',
    description: '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <Script
        async
        src='https://www.googletagmanager.com/gtag/js?id=G-123123123'
      ></Script>
      <Script id='analytics'>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-P1123123123');
        `}
      </Script>
      <Providers>
        <body className={classNames(leagueSpartan.className, 'bg-black')}>
          <Header />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
