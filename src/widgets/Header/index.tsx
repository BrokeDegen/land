import classNames from 'classnames';
import MobileMenu from './MobileMenu';

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
    <div className='flex h-auto items-center gap-[120px] border-b border-border px-[16px] py-[20px] md:h-[70px] md:pl-[60px]'>
      <div className='text-white'>Flipfox logo</div>
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
