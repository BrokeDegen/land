import styles from './styles.module.scss';
import Image from 'next/image';
import Fox from './assets/fox.svg?url';
import Arrow from './assets/arrow.svg?url';
import Gradient from '@/shared/icons/Gradient.svg?url';

const Purchase = () => {
  return (
    <div className='outline-solid mx-auto flex max-w-[1440px] outline outline-1 outline-[#202736]'>
      <div className='outline-solid relative w-[930px] outline-1 outline-[#202736]'>
        <div>
          <p className={`${styles.bannerText}`}>FLIP</p>
          <p className={`${styles.bannerText} ${styles.foxText} ml-[192px]`}>
            FOX
          </p>
          <div className='absolute left-[190px] top-[10px]'>
            <Image src={Fox} alt='fox image' width={610} height={665} />

            <div className='absolute bottom-[0] left-[0] h-[120px] w-[550px] bg-[linear-gradient(0deg,_#10141C_0%,_rgba(16,_20,_28,_0)_100%)]' />
          </div>
        </div>
        <div
          className={`outline-solid relative mt-[80px] min-h-[222px] pt-[10px] text-[55px] font-semibold leading-[49px] outline outline-1 outline-[#202736]`}
        >
          <p className='relative z-10 ml-[60px] max-w-[645px]'>
            Prediction market made simple & with style
          </p>
          <div className='relative z-10 ml-[60px] mt-[28px] flex gap-[5px]'>
            <Image src={Arrow} alt='arrow icon' width={12} height={15} />
            <p className='text-[18px] font-normal leading-[25px]'>
              Hack the future. Predict like a boss
            </p>
          </div>
          <div className='absolute bottom-[-80px] left-[-215px] h-[470px] w-[1030px] blur-[85px] filter'>
            <Image
              layout='responsive'
              src={Gradient}
              alt='gradient'
              className='rotate-[3deg] object-cover opacity-[89%]'
            />
          </div>
        </div>
      </div>
      <div className='outline-solid outline-solid outline-red-500 w-[536px] outline outline-1 outline-[#202736]'>
        <div className='outline-solid outline-red-500 mx-auto mt-[50px] h-[605px] w-[437px] outline outline-1'>
          Форма
        </div>
      </div>
    </div>
  );
};

export default Purchase;
