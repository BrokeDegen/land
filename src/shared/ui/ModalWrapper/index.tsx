'use client';
import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  closable?: boolean;
}

const ModalWrapper = ({
  children,
  onClose,
  isOpen,
  className,
  closable = true,
}: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className='fixed left-0 top-0 z-40 h-full w-full bg-[#10140c66]'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center'
            initial={{ opacity: 0, y: '-110%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-110%' }}
            transition={{ duration: 0.3 }}
            onClick={() => closable && onClose && onClose()}
          >
            <div className={classNames('relative max-w-[410px]', className)}>
              <div onClick={(e) => e.stopPropagation()}>
                {closable && (
                  <button
                    className='absolute right-[30px] top-[30px] z-[60] cursor-pointer transition-all hover:text-gray-400'
                    name='close'
                    aria-label='close'
                    onClick={(e) => {
                      e.stopPropagation();
                      closable && onClose && onClose();
                    }}
                  >
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M15 15L1 1'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                      />
                      <path
                        d='M1 15L15 1'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                      />
                    </svg>
                  </button>
                )}
                <div className='relative z-50'>{children}</div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ModalWrapper;
