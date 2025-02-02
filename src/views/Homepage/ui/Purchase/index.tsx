import styles from './styles.module.scss';
import Image from 'next/image';
import Arrow from './assets/arrow.svg?url';
import Gradient from '@/shared/icons/Gradient.svg?url';
import { BuyTokenForm } from './components/Form';
import { FoxImage } from './components/FoxImage';

const Purchase = () => {
  return (
    <div className='outline-solid mx-auto flex w-[-webkit-fill-available] max-w-[1440px] outline outline-1 outline-[#202736] xl:flex-col'>
      <div className='outline-solid relative flex-1 outline-1 outline-[#202736]'>
        <div className='md:mt-[50px]'>
          <p className={`${styles.bannerText}`}>FLIP</p>
          <p
            className={`${styles.bannerText} ${styles.foxText} ml-[20%] xl:ml-auto xl:mr-[14%] xl:text-right md:mr-[10px]`}
          >
            FOX
          </p>
          <FoxImage />
        </div>
        <div className='outline-solid relative mt-[80px] min-h-[222px] pt-[10px] text-[55px] font-semibold leading-[49px] outline outline-1 outline-[#202736] md:mt-[30px] md:w-full md:pt-[30px] md:text-[34px] md:leading-[30px]'>
          <p className='relative z-10 ml-[60px] max-w-[645px] md:ml-[16px]'>
            Prediction market made <br /> simple & with style
          </p>
          <div className='relative z-10 ml-[60px] mt-[28px] flex gap-[5px] md:ml-[16px] md:mt-[16px]'>
            <Image src={Arrow} alt='arrow icon' width={12} height={15} />
            <p className='text-[18px] font-normal leading-[25px]'>
              Hack the future. Predict like a boss
            </p>
          </div>

          <div className='absolute bottom-[-80px] left-[-215px] h-[470px] w-[1030px] blur-[85px] filter lg:left-auto lg:right-[10%] md:bottom-[-50px] md:right-[20%] md:h-[450px] md:w-[725px] sm:bottom-[70px] sm:h-[250px] sm:w-[525px] sm:blur-[65px] xs:right-[10px] xs:blur-[40px]'>
            <Image
              layout='responsive'
              src={Gradient}
              alt='gradient'
              className='rotate-[3deg] object-cover'
            />
          </div>
        </div>
      </div>
      <BuyTokenForm />
    </div>
  );
};

export default Purchase;
