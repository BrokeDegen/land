'use client';
import styles from './styles.module.scss';
import Image from 'next/image';
import bgImg from './assets/bg.webp';
import { Button } from '@/shared/ui';
import { useState } from 'react';
import ArrowTransparent from './assets/ArrowTransparent.svg?url';
import ArrowVisible from './assets/ArrowVisible.svg?url';
import TapeImage from './assets/tape.svg?url';
import FoxImage from './assets/fox.png';
import { useWindowWidth } from '@/shared/hooks/useWindowWidth';
import MobileArrowVisible from './assets/AddaptiveArrowVisible.svg?url';
import MobileArrowMedium from './assets/AddaptiveArrowMedium.svg?url';
import MobileArrowTransparent from './assets/AddaptiveArrowTransparent.svg?url';
import classNames from 'classnames';
import ModalWrapper from '@/shared/ui/ModalWrapper';

const Waitlist = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const width = useWindowWidth();
  const isMobile = width <= 767;

  return (
    <>
      <div className='pt-[130px] md:hidden' />
      <div className='xd:pb-[140px] relative flex flex-col items-center py-[95px] md:overflow-hidden md:pb-[110px] md:pt-[120px]'>
        <Image
          src={FoxImage}
          alt='tape image'
          className='absolute bottom-[50%] hidden w-[238px] object-none md:block sm:bottom-[54%] xs:bottom-[57%]'
        />
        <Image
          src={TapeImage}
          alt='tape image'
          className='hidden w-full md:block'
        />
        <p className='text-center text-[100px] font-medium leading-[85px] tracking-[-0.02em] md:text-[52px] md:font-semibold md:leading-[57px] sm:mt-[30px]'>
          Wanna be the <br /> first to try?
        </p>
        <p className='mt-[40px] text-[23px] md:hidden'>
          Stay updated by signing up
        </p>
        <div className='relative mt-[32px] flex w-[fit-content] items-center gap-[3px]'>
          <DesktopArrowsLeft />
          <MobileArrowsLeft />
          <Button
            className='w-[292px] md:w-[358px]'
            onClick={() => setIsOpen(true)}
          >
            {isMobile ? 'Buy FLOX token' : 'Join Waitlist'}
          </Button>
          <DesktopArrowsRight />
          <MobileArrowsRight />
        </div>

        <Image
          src={bgImg}
          alt='bgImg'
          className='absolute top-0 z-[-1] h-auto w-[1440px] translate-y-[-52%] md:hidden'
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
        <MobileSquareGradientCenter />
        <MobileSquareGradientLeft />
        <MobileSquareGradientRight />
        <MobileEllipseGradients />
      </div>
    </>
  );
};

export default Waitlist;

const DesktopArrowsLeft = () => {
  return (
    <div className='md:hidden'>
      <Image
        src={ArrowTransparent}
        alt='arrow transparent'
        className='absolute bottom-[14px] left-[-64px] rotate-[180deg]'
      />
      <Image
        src={ArrowVisible}
        alt='arrow visible'
        className='absolute bottom-[14px] left-[-38px] rotate-[180deg]'
      />
    </div>
  );
};

const DesktopArrowsRight = () => {
  return (
    <div className='md:hidden'>
      <Image
        src={ArrowVisible}
        alt='arrow visible'
        className='absolute bottom-[14px] right-[-38px]'
      />
      <Image
        src={ArrowTransparent}
        alt='arrow transparent'
        className='absolute bottom-[14px] right-[-64px]'
      />
    </div>
  );
};

const MobileArrowsLeft = () => {
  return (
    <>
      <Image
        src={MobileArrowTransparent}
        alt='arrow'
        className='absolute left-[50px] hidden md:block'
      />
      <Image
        src={MobileArrowMedium}
        alt='arrow'
        className='absolute left-[70px] hidden md:block'
      />
      <Image
        src={MobileArrowVisible}
        alt='arrow'
        className='absolute left-[90px] hidden md:block'
      />
    </>
  );
};

const MobileArrowsRight = () => {
  return (
    <>
      <Image
        src={MobileArrowVisible}
        alt='arrow'
        className='absolute right-[90px] hidden rotate-[180deg] md:block'
      />
      <Image
        src={MobileArrowMedium}
        alt='arrow'
        className='absolute right-[70px] hidden rotate-[180deg] md:block'
      />
      <Image
        src={MobileArrowTransparent}
        alt='arrow'
        className='absolute right-[50px] hidden rotate-[180deg] md:block'
      />
    </>
  );
};

const MobileSquareGradientCenter = () => {
  return (
    <div
      className={classNames(
        'absolute bottom-[-18vw] left-1/2 hidden aspect-square w-[30vw] -translate-x-1/2 transform rounded-full blur-[35px] md:block sm:bottom-[-15vw]',
        styles.gradient,
      )}
    />
  );
};

const MobileSquareGradientLeft = () => {
  return (
    <div
      className={classNames(
        'absolute bottom-[-15vw] left-[-10vw] hidden h-[100px] w-[30vw] rounded-full blur-[50px] md:block sm:bottom-[-20vw] sm:left-[-7vw]',
        styles.gradientSide,
      )}
    />
  );
};

const MobileSquareGradientRight = () => {
  return (
    <div
      className={classNames(
        'absolute bottom-[-13vw] right-[-10vw] hidden h-[100px] w-[30vw] rounded-full blur-[50px] md:block sm:bottom-[-28vw] sm:right-[-7vw]',
        styles.gradientSide,
      )}
    />
  );
};

const MobileEllipseGradients = () => {
  return (
    <div
      className={classNames(
        'absolute bottom-[-90px] left-1/2 hidden h-[100px] w-[80vw] -translate-x-1/2 transform rounded-full blur-[50px] md:block sm:bottom-[-100px]',
        styles.gradient,
      )}
    />
  );
};
