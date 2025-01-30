import Image from 'next/image';
import Plus from '../../assets/plus.svg?url';
import Minus from '../../assets/minus.svg?url';

export const FaqItemIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <>
      {isOpen ? (
        <Image
          src={Minus}
          alt='close answer button'
          className='h-[16px] w-[16px]'
        />
      ) : (
        <Image
          src={Plus}
          alt='open answer button'
          className='h-[16px] w-[16px]'
        />
      )}
    </>
  );
};
