import React from 'react';
import Media from './ui/Media';
import Waitlist from './ui/Waitlist';
import Tokenomics from './ui/Tokenomics';
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
      <Tokenomics />
      <Waitlist />
      <Token />
      <Faq />
      <Waitlist />
    </div>
  );
};
