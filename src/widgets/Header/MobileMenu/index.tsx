'use client';

import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  text: string;
  url: string;
}

const MobileMenu = ({ menuItems }: { menuItems: MenuItem[] }) => {
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
    setIsOpen((prev) => !prev);
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
            className='fixed left-0 top-0 z-[100] flex h-screen w-full flex-col justify-between gap-[40px] overflow-hidden bg-black'
          >
            <div className='flex items-center justify-between p-[20px_16px]'>
              <div className='text-white'>Flipfox logo</div>
              <div onClick={toggleMenu} className='cursor-pointer'>
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
            <div className='mx-[10px] mb-[40px]'></div>
          </motion.div>
        )}
      </AnimatePresence>
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
