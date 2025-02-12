import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useWindowWidth } from '@/shared/hooks/useWindowWidth';
import { useOnClickOutside } from '@/shared/hooks/useOnClickOutside';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IPaymentMethod,
  IPaymentOption,
  PAYMENT_METHODS,
} from '../../lib/paymentOptions';
import { SupportedChainKey } from '@/entities/wagmi';

interface NetworkSwitcherProps<TNetworks extends string = string> {
  paymentOption: IPaymentOption;
  setPaymentOption: (coin: IPaymentOption) => void;
  isBuying: boolean;
  isApproving: boolean;
  switchNetwork: (network: TNetworks) => Promise<void>;
  currentNetwork: TNetworks;
  address?: string;
}

export function NetworkSwitcher({
  switchNetwork,
  currentNetwork,
  paymentOption,
  isBuying,
  isApproving,
  setPaymentOption,
  address,
}: NetworkSwitcherProps<SupportedChainKey>) {
  const width = useWindowWidth();
  const isMd = width <= 767;
  const t = useTranslations('form');
  const [paymentMethod, setPaymentMethod] = useState<
    IPaymentMethod<SupportedChainKey>
  >(PAYMENT_METHODS[0]);
  const [methodMenuVisible, setMethodMenuVisible] = useState(false);
  const [optionMenuVisible, setOptionMenuVisible] = useState(false);

  const methodMenuRef = useRef<HTMLDivElement | null>(null);
  const methodTriggerRef = useRef<HTMLDivElement | null>(null);
  const optionMenuRef = useRef<HTMLDivElement | null>(null);
  const optionTriggerRef = useRef<HTMLDivElement | null>(null);

  const onPaymentMethodChange = async (
    method: IPaymentMethod<SupportedChainKey>,
  ) => {
    if (method.id === 'tron' || method.id === 'card' || method.id === 'sol') {
      setPaymentMethod(method);
    } else if (method.id === currentNetwork) {
      setPaymentMethod(method);
    } else if (method.id !== currentNetwork) {
      //@ts-ignore
      await switchNetwork(method.id);
      setPaymentMethod(method);
    }
    setMethodMenuVisible(false);
    setPaymentOption(method.options[0]);
  };

  const onPaymentOptionChange = (option: IPaymentOption) => {
    setPaymentOption(option);
    setOptionMenuVisible(false);
  };

  useEffect(() => {
    if (currentNetwork !== paymentMethod.id) {
      const method = PAYMENT_METHODS.find(
        (method) => method.id === currentNetwork,
      );
      if (!method) return;
      setPaymentMethod(method);
      setPaymentOption(method.options[0]);
    }
  }, [currentNetwork]);

  useEffect(() => {
    if (isApproving || isBuying) {
      setMethodMenuVisible(false);
      setOptionMenuVisible(false);
    }
  }, [isBuying, isApproving]);

  useOnClickOutside(
    [
      methodMenuRef as React.RefObject<HTMLElement>,
      methodTriggerRef as React.RefObject<HTMLElement>,
    ],
    () => {
      setMethodMenuVisible(false);
    },
  );
  useOnClickOutside(
    [
      optionMenuRef as React.RefObject<HTMLElement>,
      optionTriggerRef as React.RefObject<HTMLElement>,
    ],
    () => {
      setOptionMenuVisible(false);
    },
  );

  // Variants for desktop dropdowns
  const dropdownVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  };

  // Variants for mobile modal (overlay and content)
  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.7, transition: { duration: 0.3 } },
  };

  const modalContentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className='grid grid-cols-[calc(50%-1rem)_calc(50%-1rem)] items-center justify-between gap-[10px] text-[14px] md:grid-cols-[calc(50%-4px)_calc(50%-8px)]'>
      {/* Payment Method */}
      <div className='flex w-full flex-col'>
        <p className='uppercase text-white'>{t('selectMethod')}:</p>
        <div
          ref={methodTriggerRef}
          className={`z-[35] mt-[9px] flex h-[41px] cursor-pointer items-center gap-[12px] bg-black px-[12px] py-[8px] ${
            methodMenuVisible ? 'bg-black' : ''
          }`}
          onClick={() => setMethodMenuVisible(!methodMenuVisible)}
        >
          <Image
            src={paymentMethod.img}
            alt={paymentMethod.name}
            className='h-[24px] w-[24px]'
          />
          <p className='overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-white'>
            {paymentMethod.name}
          </p>
          <motion.div animate={{ rotate: methodMenuVisible ? 180 : 0 }}>
            <ChevronIcon className='ml-auto h-auto w-[12px] flex-shrink-0' />
          </motion.div>
        </div>

        {isMd ? (
          // Mobile modal version
          <AnimatePresence>
            {methodMenuVisible && (
              <>
                <motion.div
                  className='fixed inset-0 z-[100] bg-[#0F2430]'
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  variants={modalOverlayVariants}
                  onClick={() => setMethodMenuVisible(false)}
                />
                <motion.div
                  className='fixed bottom-[33px] left-[30px] right-[30px] z-[200] outline-none'
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  variants={modalContentVariants}
                >
                  <div className='flex flex-col'>
                    {PAYMENT_METHODS.map((method) => (
                      <div
                        key={method.id}
                        className='z-[3] flex h-[41px] cursor-pointer items-center gap-[12px] bg-black px-[12px] py-[8px] transition-all hover:bg-[#636363]'
                        onClick={() => onPaymentMethodChange(method)}
                      >
                        <Image
                          src={method.img}
                          alt={method.name}
                          className='w-[24px]'
                        />
                        <span className='text-white'>{method.name}</span>
                        {method.id === paymentMethod.id && (
                          <CheckedIcon className='ml-auto' />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        ) : (
          // Desktop dropdown version
          <div ref={methodMenuRef} className='relative'>
            <AnimatePresence>
              {methodMenuVisible && (
                <motion.div
                  initial='closed'
                  animate='open'
                  exit='closed'
                  variants={dropdownVariants}
                  className='absolute left-0 right-0 top-0 z-[4] flex flex-col overflow-hidden'
                >
                  <div className='flex flex-col bg-black'>
                    {PAYMENT_METHODS.map((method) => (
                      <div
                        key={method.id}
                        className='z-[3] flex h-[41px] cursor-pointer items-center gap-[12px] bg-black px-[12px] py-[8px] transition-all hover:bg-[#636363]'
                        onClick={() => onPaymentMethodChange(method)}
                      >
                        <Image
                          src={method.img}
                          alt={method.name}
                          className='w-[24px]'
                        />
                        <span className='text-white'>{method.name}</span>
                        {method.id === paymentMethod.id && (
                          <CheckedIcon className='ml-auto' />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Payment Option / Token */}
      <div className='flex w-full flex-col'>
        <p className='uppercase text-white'>{t('selectToken')}:</p>
        <div
          ref={optionTriggerRef}
          className={`z-[35] mt-[9px] flex h-[41px] cursor-pointer items-center gap-[12px] bg-black px-[12px] py-[8px] ${
            optionMenuVisible ? 'bg-black' : ''
          }`}
          onClick={() =>
            paymentMethod.id !== 'card' &&
            paymentMethod.id !== 'tron' &&
            setOptionMenuVisible(!optionMenuVisible)
          }
        >
          <Image
            src={paymentOption?.icon || ''}
            alt={paymentOption?.title || ''}
            className='h-[24px] w-[24px]'
          />
          <p className='overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-white'>
            {paymentOption.title}
          </p>
          <motion.div animate={{ rotate: optionMenuVisible ? 180 : 0 }}>
            <ChevronIcon className='ml-auto h-auto w-[12px] flex-shrink-0' />
          </motion.div>
        </div>

        {isMd ? (
          // Mobile modal version
          <AnimatePresence>
            {optionMenuVisible && (
              <>
                <motion.div
                  className='fixed inset-0 z-[100] bg-[#0F2430]'
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  variants={modalOverlayVariants}
                  onClick={() => setOptionMenuVisible(false)}
                />
                <motion.div
                  className='fixed bottom-[33px] left-[30px] right-[30px] z-[200] outline-none'
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                  variants={modalContentVariants}
                >
                  <div className='flex flex-col'>
                    {paymentMethod.options.map((option) => (
                      <div
                        key={option.id}
                        className='z-[3] flex h-[41px] cursor-pointer items-center gap-[12px] bg-black px-[12px] py-[8px] transition-all hover:bg-[#636363]'
                        onClick={() => onPaymentOptionChange(option)}
                      >
                        <Image
                          src={option.icon}
                          alt={option.title}
                          className='w-[24px]'
                        />
                        <span className='text-white'>{option.title}</span>
                        {option.id === paymentOption.id && (
                          <CheckedIcon className='ml-auto' />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        ) : (
          // Desktop dropdown version
          <div ref={optionMenuRef} className='relative'>
            <AnimatePresence>
              {optionMenuVisible && (
                <motion.div
                  initial='closed'
                  animate='open'
                  exit='closed'
                  variants={dropdownVariants}
                  className='absolute left-0 right-0 top-0 z-[4] flex flex-col overflow-hidden'
                >
                  <div className='flex flex-col bg-black'>
                    {paymentMethod.options.map((option) => (
                      <div
                        key={option.id}
                        className='z-[3] flex h-[41px] cursor-pointer items-center gap-[12px] bg-black px-[12px] py-[8px] transition-all hover:bg-[#636363]'
                        onClick={() => onPaymentOptionChange(option)}
                      >
                        <Image
                          src={option.icon}
                          alt={option.title}
                          className='w-[24px]'
                        />
                        <span className='text-white'>{option.title}</span>
                        {option.id === paymentOption.id && (
                          <CheckedIcon className='ml-auto' />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

const ChevronIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width='11'
    height='8'
    viewBox='0 0 11 8'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M1.22222 0.982666H0V2.20489H1.22222L1.22266 3.42706H2.44434V4.64971H3.66602V5.87042H4.88867V7.09258H6.11089V5.87036L7.33355 5.87042V4.64971H8.55621L8.55566 3.42706H9.77789V2.20489H10.9996V0.982666H8.55566V2.20483H7.33398L7.33355 3.42749H6.11133L6.11089 4.64819H4.88921V3.42749L3.66656 3.42706V2.20483H2.44488V0.982666H1.22222Z'
      fill='white'
    />
  </svg>
);

const CheckedIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width='24'
    height='25'
    viewBox='0 0 24 25'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M22 9.5V7.5H21V5.5H20V4.5H19V3.5H17V2.5H15V1.5H9V2.5H7V3.5H5V4.5H4V5.5H3V7.5H2V9.5H1V15.5H2V17.5H3V19.5H4V20.5H5V21.5H7V22.5H9V23.5H15V22.5H17V21.5H19V20.5H20V19.5H21V17.5H22V15.5H23V9.5H22ZM18 12.5H17V13.5H16V14.5H15V15.5H14V16.5H13V17.5H12V18.5H10V17.5H9V16.5H8V15.5H7V14.5H6V12.5H7V11.5H9V12.5H10V13.5H12V12.5H13V11.5H14V10.5H15V9.5H16V8.5H18V9.5H19V11.5H18V12.5Z'
      fill='white'
    />
  </svg>
);
