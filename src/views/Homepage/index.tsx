import React from 'react';
import Media from './ui/Media';
import Waitlist from './ui/Waitlist';
import Faq from './ui/Faq';
import Token from './ui/Token';
import Purchase from './ui/Purchase';

export const Homepage = () => {
  return (
    <div className='flex flex-col'>
      <Purchase />
      <Media />
      <Token />
      <Faq />
      <Waitlist />
    </div>
  );
};
