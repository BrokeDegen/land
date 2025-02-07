import Image from 'next/image';
import Fox from '../../assets/fox.svg?url';

export const FoxImage = () => {
  return (
    <div className='absolute left-[11%] top-[10px] xl:left-[20vw] md:left-1/2 md:top-[-10px] md:top-[-72px] md:h-[380px] md:w-[270px] md:-translate-x-1/2'>
      <Image src={Fox} alt='fox image' className='object-fill md:h-full' />

      <div className='absolute bottom-[0] left-[0] h-[120px] w-[550px] bg-[linear-gradient(0deg,_#10141C_0%,_rgba(16,_20,_28,_0)_100%)] md:h-[50px] md:w-[230px]' />
    </div>
  );
};
