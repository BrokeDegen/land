'use client';

import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

const MobileMenu = ({
  menuItems,
}: {
  menuItems: Array<{ text: string; url: string }>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    [
      menuRef as React.RefObject<HTMLElement>,
      triggerRef as React.RefObject<HTMLElement>,
    ],
    () => {
      setIsOpen(false);
    },
  );

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='hidden lg:flex'>
      <div onClick={toggleMenu} ref={triggerRef} className='cursor-pointer'>
        <MenuIcon />
      </div>
      <div
        ref={menuRef}
        className={`fixed left-0 top-0 z-[100] flex h-screen w-[100vw] flex-col justify-between gap-[40px] overflow-y-hidden bg-black transition-[max-height,opacity] duration-500 ${
          isOpen ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='flex items-center justify-between p-[20px_16px]'>
          <div className='text-white'>Flipfox logo</div>
          <div onClick={toggleMenu}>
            <CloseIcon />
          </div>
        </div>

        <nav className='flex flex-col items-center justify-between gap-[40px] text-[20px] font-semibold tracking-wider text-white'>
          {menuItems.map(({ text, url }) => (
            <Link key={text} href={url} onClick={() => setIsOpen(false)}>
              {text}
            </Link>
          ))}
        </nav>
        <div className='mx-[10px] mb-[40px]'>
          {/* <Button className="p-[12px_20px] justify-center " showArrow>
            Sign In
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

const MenuIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect x='0.5' y='4' width='23' height='2' fill='white' />
    <rect x='0.5' y='11' width='23' height='2' fill='white' />
    <rect x='0.5' y='18' width='23' height='2' fill='white' />
  </svg>
);

const CloseIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M20 4L4 20'
      stroke='white'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M4 4L20 20'
      stroke='white'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
