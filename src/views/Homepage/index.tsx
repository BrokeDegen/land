import React from 'react';
import Media from './ui/Media';
import Waitlist from './ui/Waitlist';
import Faq from './ui/Faq';
import Purchase from './ui/Purchase';
import Features from './ui/Features';
import 'swiper/css';
import './style.css';

export const Homepage = () => {
  return (
    <>
      <Purchase />
      <Media />
      <Features />
      <Waitlist /> 
      <Faq />
    </>
  );
};