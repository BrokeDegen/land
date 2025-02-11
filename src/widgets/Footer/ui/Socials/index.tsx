import Icon, { IconNames } from '@/shared/icons';
import Link from 'next/link';

export const Socials = () => {
  const socials = [
    { url: 'https://twitter.com', icon: IconNames.twitter },
    { url: 'https://telegram.com', icon: IconNames.telegram },
    { url: 'https://discord.com', icon: IconNames.discord },
  ];

  return (
    <div className={'flex flex-col gap-[10px] text-lg md:gap-0'}>
      <p className='mb-[20px] text-textSecondary md:text-[16px] md:font-normal'>
        Socials
      </p>
      <div className='flex gap-[14px] md:gap-[12px]'>
        {socials.map(({ url, icon }) => (
          <Link href={url} key={url} target='_blank'>
            <div className='relative flex h-[48px] w-[48px] items-center justify-center transition-all hover:brightness-125'>
              <SocialCircle className='absolute inset-0' />
              <Icon name={icon} className='mt-[3px] h-auto w-[22px]' />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const SocialCircle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width='49'
    height='50'
    viewBox='0 0 49 50'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M30.1977 1.375C39.2195 3.50408 46.3286 10.5777 48.5 19.5742M18.8023 1.375C9.78051 3.50408 2.6714 10.5777 0.5 19.5742M18.8023 49.375C9.78051 47.2459 2.6714 40.1723 0.5 31.1758M30.1977 49.375C39.2195 47.2459 46.3286 40.1723 48.5 31.1758'
      stroke='#FFB764'
      strokeLinecap='round'
    />
  </svg>
);
