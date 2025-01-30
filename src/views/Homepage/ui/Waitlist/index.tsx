'use client';
import Image from 'next/image';
import bgImg from './assets/bg.webp';
import { Button } from '@/shared/components';
import ModalWrapper from '@/widgets/ModalWrapper';
import { useState } from 'react';

const Waitlist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <>
      <div className='pt-[400px]' />
      <div className='relative flex flex-col items-center py-[95px]'>
        <p className='text-center text-[100px] font-medium leading-[85px] tracking-[-0.02em]'>
          Wanna be the <br /> first to try?
        </p>
        <p className='mt-[40px] text-[23px]'>Stay updated by signing up</p>
        <Button className='mt-[32px] w-[300px]' onClick={() => setIsOpen(true)}>
          Join Waitlist
        </Button>
        <Image
          src={bgImg}
          alt='bgImg'
          className='absolute top-0 z-[-1] h-auto w-[1440px] translate-y-[-52%]'
        />
        <ModalWrapper
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
          className='w-full rounded-[20px] bg-black p-[30px]'
        >
          <p className='text-2xl font-semibold text-[#FCFCFC]'>Join Waitlist</p>
          <div className='my-[40px] flex flex-col gap-[20px]'>
            <div>
              <label
                htmlFor='name'
                className='text-sm font-semibold text-[#9CA4B2]'
              >
                Name:
              </label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='mt-1 h-[54px] w-full rounded-[14px] bg-[#1A1E26] px-[16px] outline-none'
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='text-sm font-semibold text-[#9CA4B2]'
              >
                Email:
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='mt-1 h-[54px] w-full rounded-[14px] bg-[#1A1E26] px-[16px] outline-none'
              />
            </div>
          </div>
          <Button className='w-full'>Join Waitlist</Button>
        </ModalWrapper>
      </div>
    </>
  );
};

export default Waitlist;
