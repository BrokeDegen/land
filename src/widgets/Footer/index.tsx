import Icon, { IconNames } from '@/shared/icons';
import Link from 'next/link';

const socials = [
  { url: 'https://twitter.com', icon: IconNames.twitter },
  { url: 'https://telegram.com', icon: IconNames.telegram },
  { url: 'https://discord.com', icon: IconNames.discord },
];

export const Footer = () => {
  return (
    <div className='bg-[#171B23]'>
      <div className='m-auto flex max-w-[1440px] gap-[120px] px-[60px] py-[40px]'>
        <div className='flex flex-col'>
          <p>logo</p>
          <p className='text-textSecondary mt-[36px] max-w-[400px] font-light'>
            Lorem ipsum dolor sit amet consectetur. Suscipit eu vitae lacus non
            aenean egestas. Adipiscing donec et tincidunt nunc cras tellus eu
            viverra. Lectus sed elementum velit lobortis at.
          </p>
          <p className='mt-[64px] text-[#6C7380]'>©2025 FlipFox</p>
        </div>
        <div className='ml-auto flex flex-col gap-[10px] text-lg'>
          <p className='text-textSecondary mb-[20px]'>Information</p>
          <Link href='google.com' target='_blank' className='font-light'>
            Documentation
          </Link>
          <Link href='/terms' className='font-light'>
            Terms and Conditions
          </Link>
          <Link href='/terms' className='font-light'>
            Privacy Policy
          </Link>
        </div>
        <div className='flex flex-col gap-[10px] text-lg'>
          <p className='text-textSecondary mb-[20px]'>Socials</p>
          <div className='flex gap-[14px]'>
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
      stroke-linecap='round'
    />
  </svg>
);
