import React from 'react';
import Media from './ui/Media';
import Waitlist from './ui/Waitlist';
import Faq from './ui/Faq';

export const Homepage = () => {
  return (
    <div className='flex flex-col'>
      <Media />
      <Waitlist />
      <Faq />
    </div>
  );
};
