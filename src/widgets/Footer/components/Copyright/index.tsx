import Image from 'next/image';
import Logo from '@/shared/icons/FooterLogo.svg?url';

export const Copyright = () => {
  return (
    <div className={'flex flex-col'}>
      <Image src={Logo} alt='FlipFox Logo' className='md:hidden' />
      <p className='mt-[36px] max-w-[400px] font-light text-textSecondary md:mt-[30px] md:text-[14px]'>
        Lorem ipsum dolor sit amet consectetur. Suscipit eu vitae lacus non
        aenean egestas. Adipiscing donec et tincidunt nunc cras tellus eu
        viverra. Lectus sed elementum velit lobortis at.
      </p>
      <p className='mt-[64px] text-[#6C7380] md:mt-[30px]'>
        ©2025 FlipFox. Design by <span className='text-white'>Pixpowder</span>
      </p>
    </div>
  );
};
