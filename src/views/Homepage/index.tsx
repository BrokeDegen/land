import React from 'react';
import Media from './ui/Media';
import Waitlist from './ui/Waitlist';
import Faq from './ui/Faq';
import Token from './ui/Token';

export const Homepage = () => {
  return (
    <div className='flex flex-col'>
      <Media />
      <Token />
      <Waitlist />
      <Faq />
    </div>
  );
};
