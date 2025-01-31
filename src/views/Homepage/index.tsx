import React from 'react';
import Media from './ui/Media';
import Waitlist from './ui/Waitlist';
import Tokenomics from './ui/Tokenomics';

export const Homepage = () => {
  return (
    <div className='flex flex-col'>
      <Media />
      <Tokenomics />
      <Waitlist />
    </div>
  );
};
