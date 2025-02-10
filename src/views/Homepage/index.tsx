import React from 'react';
import Media from './ui/Media';
import Waitlist from './ui/Waitlist';
import Faq from './ui/Faq';
import Token from './ui/Token';
import Purchase from './ui/Purchase';
import Roadmap from './ui/Roadmap';

export const Homepage = () => {
  return (
    <div className='flex flex-col'>
      <Purchase />
      <Roadmap />
      <Media />
      <Token />
      <Faq />
      <Waitlist />
    </div>
  );
};
