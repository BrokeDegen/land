import TokenImage from './assets/Token.png';
import Image from 'next/image';
import Gradient from './assets/Gradient.svg?url';
import styles from './style.module.scss';
import { BenefitsSection } from './ui/BenefitsSection';
import { ListingInfo } from './ui/ListingInfo';

const Token = () => {
  return (
    <div className='mx-auto w-full max-w-[1440px] pb-[140px] pt-[140px] md:border-b md:border-[#202736] md:pb-[60px] md:pt-[110px]'>
      <div className='flex flex-col items-center pl-[67px] pr-[67px]'>
        <p className='text-[70px] font-bold uppercase leading-[77px] md:text-[48px] md:leading-[52px]'>
          Token
        </p>
        <div className='relative flex w-full flex-col items-center'>
          <p
            className={`mt-[16px] text-[250px] font-black uppercase leading-[236px] text-transparent md:mt-[0px] md:text-[140px] md:leading-[135px] ${styles.flox}`}
          >
            Flox
          </p>

          <div
            className={`via-red-500 h-[2px] w-full md:w-[90vw] sm:w-[100vw] ${styles.gradientX}`}
          />
          <div
            className={`via-red-500 relative h-[2px] w-[382px] ${styles.gradientY}`}
          />

          <Image
            src={TokenImage}
            alt='Token Image'
            className='absolute bottom-[-145px] left-1/2 right-0 z-10 -translate-x-1/2 transform md:bottom-[-85px] md:h-[156px] md:w-[236px]'
          />
          <Image
            src={Gradient}
            alt='Gradient'
            className='z-9 absolute bottom-[-180px] left-1/2 -translate-x-1/2 opacity-[.9] blur-[40px] md:bottom-[-110px] md:w-[270px]'
          />
        </div>
        <BenefitsSection />
        <ListingInfo />
      </div>
    </div>
  );
};

export default Token;
