import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  className: string;
  closable?: boolean;
}

const ModalWrapper = ({
  children,
  onClose,
  isOpen,
  className,
  closable = true,
}: Props) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    onClose && onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {isVisible && (
        <div
          className={`fixed left-0 top-0 z-40 h-full w-full bg-[#10140c66]`}
        />
      )}
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center transition-all duration-500 ${
          isVisible
            ? '!translate-y-0 !opacity-100'
            : '-translate-y-[110%] opacity-0'
        }`}
        onClick={() => closable && handleClose()}
      >
        <div className={classNames('relative max-w-[410px]', className)}>
          <div onClick={(e) => e.stopPropagation()}>
            <button
              className={`absolute right-[30px] top-[30px] z-[60] cursor-pointer transition-all hover:text-gray-400 ${
                !closable && 'hidden'
              }`}
              name='close'
              aria-label='close'
              onClick={() => closable && handleClose()}
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
            <div className='relative z-50'>{children}</div>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default ModalWrapper;
