import Image from 'next/image';
import classNames from 'classnames';
import MobileMenu from './MobileMenu';
import Logo from '@/shared/icons/GenjiLogo.svg?url';

const menuItems = [
  {
    text: 'About',
    url: '#about',
  },
  {
    text: 'Roadmap',
    url: '#roadmap',
  },
  {
    text: 'Tokenomics',
    url: '#tokenomics',
  },
  {
    text: 'Join Waitlist',
    url: '#waitlist',
  },
  {
    text: 'FAQs',
    url: '#waitlist',
  },
];

export const Header = () => {
  return (
    <div className='fixed w-full z-10 bg-black flex h-[70px] items-center gap-[120px] border-b border-border py-[20px] pl-[60px] lg:border-none lg:pr-[60px] md:h-auto md:px-[16px]'>
      <Image src={Logo} alt='logo' />
      <ul className='flex items-center gap-11 lg:hidden'>
        {menuItems.map(({ text, url }) => (
          <li key={text}>
            <a
              href={url}
              className={classNames('link-hover-gradient text-white')}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
      <div className='w-[100px] lg:hidden'>
        {/* <Button className="p-[12px_20px]" showArrow>
          Sign In
        </Button> */}
      </div>
      <div className='ml-auto'>
        <MobileMenu menuItems={menuItems} />
      </div>
    </div>
  );
};
