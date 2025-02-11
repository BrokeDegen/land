import { useContext, useEffect, useRef, useState } from 'react';
import {
  IPaymentMethod,
  IPaymentOption,
  PAYMENT_METHODS,
  SOLANA_METHOD,
} from './lib';
import { SupportedChainKey } from '../../../../entities/wagmi';
import Image from 'next/image';
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts';
import { useSignals } from '@preact/signals-react/runtime';
import { useTranslations } from 'next-intl';
import { Drawer } from 'vaul';
import { CurrentBlockchainContext } from '@/entities/currentBlockchain/providers';

interface NetworkSwitcherProps<TNetworks extends string = string> {
  paymentOption: IPaymentOption;
  setPaymentOption: (coin: IPaymentOption) => void;
  isBuying: boolean;
  isApproving: boolean;
  switchNetwork: (network: TNetworks) => Promise<void>;
  currentNetwork: TNetworks;
  evmAddress?: string;
  solAddress?: string;
  setIsMergeModalVisible: (isVisible: boolean) => void;
  profileMerged?: boolean;
}

export function NetworkSwitcher({
  switchNetwork,
  currentNetwork,
  paymentOption,
  isBuying,
  isApproving,
  setPaymentOption,
  evmAddress,
  solAddress,
  setIsMergeModalVisible,
  profileMerged,
}: NetworkSwitcherProps<SupportedChainKey>) {
  useSignals();
  const isMd = useMediaQuery('(max-width: 767px)');
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
  const { currentBlockchain, setCurrentBlockchain } = useContext(
    CurrentBlockchainContext,
  );

  const onPaymentMethodChange = async (
    method: IPaymentMethod<SupportedChainKey>,
  ) => {
    if (method.id === 'sol') {
      if (evmAddress && !profileMerged) {
        setIsMergeModalVisible(true);
      }

      setPaymentOption(method.options[0]);
      setMethodMenuVisible(false);
      await switchNetwork(method.id);
      setCurrentBlockchain?.('sol');
    } else if (method.id !== 'tron' && method.id !== 'card') {
      if (solAddress && !profileMerged) {
        setIsMergeModalVisible(true);
      }
      setCurrentBlockchain?.('eth');
    }
    if (method.id === 'tron' || method.id === 'card') {
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
      setPaymentOption(method?.options[0]);
    }
  }, [currentNetwork]);

  useEffect(() => {
    if (isApproving || isBuying) {
      setMethodMenuVisible(false);
      setOptionMenuVisible(false);
    }
  }, [isBuying, isApproving]);

  useEffect(() => {
    if (currentBlockchain === 'sol') {
      setPaymentMethod(SOLANA_METHOD);
      setPaymentOption(SOLANA_METHOD.options[0]);
    }
    if (currentBlockchain === 'eth' && paymentMethod.id === SOLANA_METHOD.id) {
      setPaymentMethod(PAYMENT_METHODS[1]);
      setPaymentOption(PAYMENT_METHODS[1].options[0]);
    }
  }, [currentBlockchain]);

  useOnClickOutside([methodMenuRef, methodTriggerRef], () => {
    setMethodMenuVisible(false);
  });
  useOnClickOutside([optionMenuRef, optionTriggerRef], () => {
    setOptionMenuVisible(false);
  });

  return (
    <div className='grid grid-cols-[calc(50%-1rem)_calc(50%-1rem)] items-center justify-between gap-[10px] text-[14px] md:grid-cols-[calc(50%-4px)_calc(50%-8px)]'>
      <div className='flex w-full flex-col'>
        <p className='uppercase text-[#929292]'>{t('selectMethod')}:</p>
        <Drawer.Root
          open={methodMenuVisible}
          onClose={() => setMethodMenuVisible(false)}
        >
          <div
            className={`z-[35] mt-[9px] flex h-[41px] cursor-pointer items-center gap-[12px] border-[2px] border-b-[rgba(17,17,17,0.3)] border-l-[rgba(255,255,255,0.3)] border-r-[rgba(17,17,17,0.3)] border-t-[rgba(255,255,255,0.3)] bg-[#2D2B37] px-[12px] py-[8px] ${
              methodMenuVisible && 'bg-[#303030]'
            } `}
            ref={methodTriggerRef}
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
            <ChevronIcon
              className={`ml-auto h-auto w-[12px] flex-shrink-0 transition-all ${
                methodMenuVisible && 'rotate-[180deg]'
              }`}
            />
          </div>
          {isMd ? (
            <Drawer.Portal>
              <Drawer.Overlay
                className='fixed inset-0 z-[100] bg-[#0F2430]/70'
                onClick={() => setMethodMenuVisible(false)}
              />
              <Drawer.Content className='fixed bottom-[33px] left-[30px] right-[30px] z-[200] outline-none'>
                <div className='flex flex-col'>
                  {PAYMENT_METHODS.map((method) => (
                    <div
                      className='z-[3] flex h-[41px] cursor-pointer items-center gap-[12px] border-[2px] border-b-[rgba(17,17,17,0.3)] border-l-[rgba(255,255,255,0.3)] border-r-[rgba(17,17,17,0.3)] border-t-[rgba(255,255,255,0.3)] bg-[#2D2B37] px-[12px] py-[8px] transition-all hover:bg-[#636363]'
                      key={method.id}
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
              </Drawer.Content>
            </Drawer.Portal>
          ) : (
            <div ref={methodMenuRef} className='relative'>
              <div
                className={`absolute left-0 right-0 top-0 z-[4] flex flex-col overflow-hidden transition-[max-height] duration-300 ${methodMenuVisible ? 'max-h-[400px]' : 'max-h-0'}`}
              >
                <div className='flex flex-col bg-[#3B3C3E]'>
                  {PAYMENT_METHODS.map((method) => (
                    <div
                      className='z-[3] flex h-[41px] cursor-pointer items-center gap-[12px] border-[2px] border-b-[rgba(17,17,17,0.3)] border-l-[rgba(255,255,255,0.3)] border-r-[rgba(17,17,17,0.3)] border-t-[rgba(255,255,255,0.3)] bg-[#2D2B37] px-[12px] py-[8px] transition-all hover:bg-[#636363]'
                      key={method.id}
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
              </div>
            </div>
          )}
        </Drawer.Root>
      </div>

      <div className='flex w-full flex-col'>
        <p className='uppercase text-[#929292]'>{t('selectToken')}:</p>
        <Drawer.Root
          open={optionMenuVisible}
          onClose={() => setOptionMenuVisible(false)}
        >
          <div
            className={`z-[35] mt-[9px] flex h-[41px] cursor-pointer items-center gap-[12px] border-[2px] border-b-[rgba(17,17,17,0.3)] border-l-[rgba(255,255,255,0.3)] border-r-[rgba(17,17,17,0.3)] border-t-[rgba(255,255,255,0.3)] bg-[#2D2B37] px-[12px] py-[8px] ${
              optionMenuVisible && 'bg-[#303030]'
            } `}
            ref={optionTriggerRef}
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
            <ChevronIcon
              className={`ml-auto h-auto w-[12px] flex-shrink-0 transition-all ${
                optionMenuVisible && 'rotate-[180deg]'
              }`}
            />
          </div>
          {isMd ? (
            <Drawer.Portal>
              <Drawer.Overlay
                className='fixed inset-0 z-[100] bg-[#0F2430]/70'
                onClick={() => setMethodMenuVisible(false)}
              />
              <Drawer.Content className='fixed bottom-[33px] left-[30px] right-[30px] z-[200] outline-none'>
                <div className='flex flex-col'>
                  {paymentMethod.options.map((option) => (
                    <div
                      className='z-[3] flex h-[41px] cursor-pointer items-center gap-[12px] border-[2px] border-b-[rgba(17,17,17,0.3)] border-l-[rgba(255,255,255,0.3)] border-r-[rgba(17,17,17,0.3)] border-t-[rgba(255,255,255,0.3)] bg-[#2D2B37] px-[12px] py-[8px] transition-all hover:bg-[#636363]'
                      key={option.id}
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
              </Drawer.Content>
            </Drawer.Portal>
          ) : (
            <div ref={optionMenuRef} className='relative'>
              <div
                className={`absolute left-0 right-0 top-0 z-[4] flex flex-col overflow-hidden transition-[max-height] duration-300 ${optionMenuVisible ? 'max-h-[40rem]' : 'max-h-0'}`}
              >
                <div className='flex flex-col bg-[#3B3C3E]'>
                  {paymentMethod.options.map((option) => (
                    <div
                      className='z-[3] flex h-[41px] cursor-pointer items-center gap-[12px] border-[2px] border-b-[rgba(17,17,17,0.3)] border-l-[rgba(255,255,255,0.3)] border-r-[rgba(17,17,17,0.3)] border-t-[rgba(255,255,255,0.3)] bg-[#2D2B37] px-[12px] py-[8px] transition-all hover:bg-[#636363]'
                      key={option.id}
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
              </div>
            </div>
          )}
        </Drawer.Root>
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
