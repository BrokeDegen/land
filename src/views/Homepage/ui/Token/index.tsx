import TokenImage from './assets/Token.png';
import Image from 'next/image';
import Gradient from './assets/Gradient.svg?url';
import styles from './style.module.scss';
import { BenefitsSection } from './components/BenefitsSection';
import { ListingInfo } from './components/ListingInfo';

const Token = () => {
  return (
    <div className='outline-solid mx-auto w-full max-w-[1440px] pb-[140px] pt-[140px] outline outline-red'>
      <div className='outline-solid flex flex-col items-center pl-[67px] pr-[67px] outline outline-red'>
        <p className='text-[70px] font-bold uppercase leading-[77px]'>Token</p>
        <div className='relative flex w-full flex-col items-center'>
          <p className='mt-[16px] bg-gradient-to-b from-[rgba(96,94,103,0.39)] to-[rgba(27,28,31,0)] bg-clip-text text-[250px] font-black uppercase leading-[236px] text-transparent'>
            Flox
          </p>

          <div className={`via-red-500 h-[2px] w-full ${styles.gradientX}`} />
          <div
            className={`via-red-500 absolute relative h-[2px] w-[382px] ${styles.gradientY}`}
          />

          <Image
            src={TokenImage}
            alt='Token Image'
            className='absolute bottom-[-145px] left-0 left-1/2 right-0 z-10 -translate-x-1/2 transform'
          />
          <Image
            src={Gradient}
            alt='Gradient'
            className='z-9 absolute bottom-[-180px] left-1/2 -translate-x-1/2 opacity-[.9] blur-[40px]'
          />
        </div>
        <BenefitsSection />
        <ListingInfo />
      </div>
    </div>
  );
};

export default Token;
