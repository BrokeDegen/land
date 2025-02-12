import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import BinanceImg from './assets/binance.svg?url';
import styles from './styles.module.scss';

const Media = () => {
  return (
    <div className='relative mx-auto max-w-[1440px] rounded-t-[45px] bg-black px-[40px] pb-[90px]'>
      <p className='py-[38px] text-center text-lg md:pb-[20px]'>
        Seen in Media
      </p>
      <Marquee className={styles.marquee} autoFill>
        <Image src={BinanceImg} alt='Binance' className='h-[50px] w-auto' />
        <Image src={BinanceImg} alt='Binance' className='h-[50px] w-auto' />
        <Image src={BinanceImg} alt='Binance' className='h-[50px] w-auto' />
        <Image src={BinanceImg} alt='Binance' className='h-[50px] w-auto' />
      </Marquee>
    </div>
  );
};

export default Media;
