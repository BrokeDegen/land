import React from 'react';
import Media from './ui/Media';
import Waitlist from './ui/Waitlist';

export const Homepage = () => {
  return (
    <div className='flex flex-col'>
      <Media />
      <Waitlist />
    </div>
  );
};
