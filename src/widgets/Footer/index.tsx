'use client';
import { Socials } from './ui/Socials';
import { Information } from './ui/Information';
import { Copyright } from './ui/Copyright';
import { MobileIcon } from './ui/MobileIcon';
import { useWindowWidth } from '@/shared/hooks/useWindowWidth';
import { useMemo } from 'react';

export const Footer = () => {
  const width = useWindowWidth();

  const Content = useMemo(
    () => (width > 767 ? <FooterDesktop /> : <FooterMobile />),
    [width],
  );

  return <div className='relative bg-[#171B23]'>{Content}</div>;
};

const FooterDesktop = () => (
  <div className='flex max-w-[1440px] gap-[120px] px-[60px] py-[40px] md:w-full'>
    <Copyright />
    <Information />
    <Socials />
  </div>
);

const FooterMobile = () => (
  <div className='flex w-full flex-col px-[16px] py-[40px]'>
    <MobileIcon />
    <div className='mt-[30px] flex justify-between'>
      <Information />
      <Socials />
    </div>
    <Copyright />
  </div>
);
