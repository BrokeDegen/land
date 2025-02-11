import Link from 'next/link';

export const Information = () => {
  return (
    <div
      className={
        'ml-auto flex flex-col gap-[10px] text-lg md:ml-0 md:gap-[8px]'
      }
    >
      <p className='mb-[20px] text-textSecondary md:mb-[12px] md:text-[16px] md:font-normal'>
        Information
      </p>
      <Link
        href='google.com'
        target='_blank'
        className='font-light md:text-[16px]'
      >
        Documentation
      </Link>
      <Link href='/terms' className='font-light md:text-[16px]'>
        Terms and Conditions
      </Link>
      <Link href='/terms' className='font-light md:text-[16px]'>
        Privacy Policy
      </Link>
    </div>
  );
};
