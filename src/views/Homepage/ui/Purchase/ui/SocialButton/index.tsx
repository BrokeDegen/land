import Image from 'next/image';

type SocialButtonProps = {
  icon: string;
  link: string;
};

export const SocialButton = ({ icon = '', link = '' }: SocialButtonProps) => {
  return (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      className='flex h-[50px] w-[50px] items-center justify-center rounded-[12px] bg-white/10 md:h-[44px] md:w-[120px]'
    >
      <Image
        src={icon}
        alt='social icon'
        className='h-[24px] w-[24px] md:h-[16px] md:w-[16px]'
      />
    </a>
  );
};
