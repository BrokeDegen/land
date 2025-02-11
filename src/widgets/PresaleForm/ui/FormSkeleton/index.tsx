import Image from 'next/image';
import { TokenIcon } from '@/shared/icons/TokenIcon';
import { ProgressBar } from '../ProgressBar';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/Button';
import { BonusPoints } from '../BonusPoints';
import { MAX_STAGE } from '../../lib/presale';
import ethIcon from '@/assets/ethereum.svg';
import { StageBgIcon } from '../PresaleStageCard/assets/StageBgIcon';
import { PointerIcon } from '@/shared/icons/PointerIcon';

export const FormSkeleton: React.FC = () => {
  const t = useTranslations('form');
  return (
    <div className='flex h-full items-center'>
      <div
        className='relative my-auto flex w-full flex-col overflow-hidden p-[36px]'
        id='form'
      >
        <div className={`flex flex-col font-normal uppercase text-white`}>
          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <p>{t('totalRaised')}</p>
              <p className='text-[#FFB648]'>
                {t('stage')}
                <span className='inline-block h-[12px] w-[20px] animate-pulse bg-[#ffffff99]' />
                /{MAX_STAGE}
              </p>
            </div>
            <div className='mt-[12px] flex items-baseline gap-[6px]'>
              <span className='inline-block h-[40px] w-[140px] animate-pulse bg-[#ffffff99]' />

              <span className='text-[#929292] md:hidden'>/</span>
              <span className='inline-block h-[25px] w-[100px] animate-pulse bg-[#ffffff99]' />
            </div>
          </div>
          <div className='mt-[30px] flex items-center justify-between'>
            <div className='flex items-center gap-[4px] text-[15px] sm:flex-col sm:items-start'>
              <p className='text-center text-[#929292] md:text-wrap'>
                {t('currentPrice')}:
              </p>
              <div className='relative h-[22px] w-[78px]'>
                <StageBgIcon className='absolute inset-0' />
                <p className='absolute inset-0 left-[12px] h-[14px] w-[62px] text-black'>
                  $<span className='tracking-[-2px]'>0.</span>
                  <span className='inline-block h-[12px] w-[20px] animate-pulse bg-[#ffffff99]' />
                </p>
              </div>
            </div>
            <div className='flex items-center gap-[4px] text-[15px] sm:flex-col sm:items-start'>
              <p className='text-center text-[#929292] md:text-wrap'>
                {t('nextPrice')}:
              </p>
              <div className='relative h-[22px] w-[78px]'>
                <StageBgIcon className='absolute inset-0' fill='#2C2B33' />
                <p className='absolute inset-0 left-[12px] h-[14px] w-[62px] text-[#F3504D]'>
                  $<span className='tracking-[-2px]'>0.</span>
                  <span className='inline-block h-[12px] w-[20px] animate-pulse bg-[#ffffff99]' />
                </p>
              </div>
            </div>
          </div>

          <div className='my-[22px]'>
            <ProgressBar percent={50} />
          </div>
        </div>

        <div className='relative mt-[25px] flex flex-col'>
          <div className='grid grid-cols-[calc(50%-1rem)_calc(50%-1rem)] items-center justify-between gap-[10px] text-[14px] md:grid-cols-[calc(50%-4px)_calc(50%-8px)]'>
            <div className='flex w-full flex-col'>
              <p className='uppercase text-[#929292]'>{t('selectMethod')}:</p>

              <div
                className={`z-[35] mt-[9px] flex h-[41px] cursor-pointer items-center gap-[12px] border-[2px] border-b-[rgba(17,17,17,0.3)] border-l-[rgba(255,255,255,0.3)] border-r-[rgba(17,17,17,0.3)] border-t-[rgba(255,255,255,0.3)] bg-[#2D2B37] px-[12px] py-[8px]`}
              >
                <Image
                  src={ethIcon}
                  alt='ethIcon'
                  className='h-[24px] w-[24px]'
                />
                <p className='overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-white'>
                  Ethereum
                </p>
                <ChevronIcon
                  className={`ml-auto h-auto w-[12px] flex-shrink-0 transition-all`}
                />
              </div>
            </div>

            <div className='flex w-full flex-col'>
              <p className='uppercase text-[#929292]'>{t('selectToken')}:</p>
              <div
                className={`z-[35] mt-[9px] flex h-[41px] cursor-pointer items-center gap-[12px] border-[2px] border-b-[rgba(17,17,17,0.3)] border-l-[rgba(255,255,255,0.3)] border-r-[rgba(17,17,17,0.3)] border-t-[rgba(255,255,255,0.3)] bg-[#2D2B37] px-[12px] py-[8px]`}
              >
                <Image
                  src={ethIcon}
                  alt='ethIcon'
                  className='h-[24px] w-[24px]'
                />
                <p className='overflow-hidden text-ellipsis whitespace-nowrap text-[14px] text-white'>
                  Ethereum
                </p>
                <ChevronIcon
                  className={`ml-auto h-auto w-[12px] flex-shrink-0 transition-all`}
                />
              </div>
            </div>
          </div>
          <div className='mt-[18px] flex flex-col text-[14px]'>
            <div className='mb-[9px] flex justify-between uppercase'>
              <p className='text-[#929292]'>{t('youPay')}:</p>
              <div className='flex items-center gap-[3px]'></div>
            </div>
            <div
              className={`flex h-[41px] items-center gap-[12px] border-[2px] border-b-[rgba(17,17,17,0.3)] border-l-[rgba(255,255,255,0.3)] border-r-[rgba(17,17,17,0.3)] border-t-[rgba(255,255,255,0.3)] bg-[#2D2B37] px-[12px] py-[8px]`}
            >
              <Image
                src={ethIcon}
                alt='ethIcon'
                className='h-[24px] w-[24px]'
              />
              <div className='flex w-full items-center justify-between'>
                <div className='flex flex-col gap-[4px]'>
                  <input
                    id='pay-amount'
                    placeholder={`0.00 ETH`}
                    autoComplete='off'
                    maxLength={7}
                    type='number'
                    className={`mt-[1px] bg-[transparent] leading-[12.5px] text-white outline-none [appearance:textfield] placeholder:font-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-[18px] flex flex-col text-[14px]'>
            <div className='mb-[9px] flex justify-between uppercase'>
              <p className='text-[#929292]'>{t('youReceive')}:</p>
            </div>
            <div className='flex h-[41px] items-center gap-[12px] border-[2px] border-b-[rgba(17,17,17,0.3)] border-l-[rgba(255,255,255,0.3)] border-r-[rgba(17,17,17,0.3)] border-t-[rgba(255,255,255,0.3)] bg-[#2D2B37] px-[12px] py-[8px]'>
              <TokenIcon className='h-[24px] w-[24px]' />
              <input
                id='receive-amount'
                type='number'
                placeholder={'0.0 BEAR'}
                autoComplete='off'
                className={`bg-[transparent] text-white outline-none [appearance:textfield] placeholder:font-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
              />
            </div>
          </div>

          <div className='mt-[32px] flex items-start justify-between sm:flex-col sm:items-start sm:gap-[30px]'>
            <div className='flex flex-col items-start justify-between gap-[9px] uppercase text-[#929292] sm:flex-row'>
              <p className='flex-shrink-0'>{t('pointRewards')}</p>
              <BonusPoints usdTotal={0} />
            </div>
            <div className='flex flex-col sm:w-full'>
              <Button
                className='flex h-[46px] w-auto min-w-[210px] cursor-pointer items-center justify-center gap-[5px] whitespace-nowrap px-[25px] text-center !text-[18px] sm:w-full'
                mAuto={false}
              >
                <PointerIcon />

                {t('connect')}
                <PointerIcon className='rotate-180' />
              </Button>

              <a
                href='google.com'
                target='_blank'
                className='m-auto mt-[6px] cursor-pointer border-b-[2px] border-b-[#929292] text-center text-[13px] text-[#929292] transition-all hover:text-white'
              >
                {t('howToBuy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
