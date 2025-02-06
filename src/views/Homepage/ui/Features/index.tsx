import { features } from './constants/features';
import glass from './assets/glass.png';
import Image from 'next/image';
import FloatBlocks from './components/FloatBlocks';
import styles from './styles.module.scss';

interface FeaturesProps {
  activeIndex: number;
}

const baseTranslate = 340;
const textBlockTranslateValue: Record<number, number> = {
  0: 0,
  1: baseTranslate + 20,
  2: baseTranslate * 2 + 70,
  3: baseTranslate * 3 + 30,
  4: baseTranslate * 4 + 35,
}
const mobileTextWidth = 236;
const mobileTextGap = 10;

const Features = ({ activeIndex }: FeaturesProps) => {
  return (
    <>
      <div className='max-w-[1145px] absolute left-[50%] translate-x-[-50%] w-full h-[100vh] mx-auto lg:flex lg:flex-col'>
        <div
          className={`${styles.left} absolute left-[0] px-[60px] pt-[155px] transition-transform duration-300 lg:relative lg:px-[0] lg:mb-[40px]`}
          style={{ transform: `translateY(-${textBlockTranslateValue[activeIndex] || 0}px)` }}
        >
          <div className='text-[80px] font-semibold uppercase mb-[80px] lg:mb-[15px] lg:text-[48px] lg:text-center'>
            flipfox
          </div>

          <div
            className={`${styles.textsWrapper} lg:inline-flex lg:left-[50%] lg:relative lg:translate-x-[-${mobileTextWidth / 2}px] transition-transform lg:gap-[${mobileTextGap}px] duration-300`}
            style={{ transform: `translateX(-${activeIndex * mobileTextWidth + mobileTextWidth / 2}px)`}}
          >
            {features.map((f, i) => {
              const isActive = i === activeIndex;

              return (
                <div
                  key={f.text}
                  className={`${styles.featureTexts} transition-margin duration-300 lg:text-center lg:flex lg:flex-col lg:items-center lg:w-[${mobileTextWidth}px] ${isActive ? '' : 'lg:opacity-[.2]'}`}
                  style={{
                    marginTop: `${isActive ? 66 : 140}px`
                  }}
                >
                  <div className={`text-[70px] font-semibold leading-[89%] tracking-[-1.5px] mb-[30px] lg:mb-[15px] lg:text-[36px] lg:tracking-[-1px]`}>
                    <span className={`text-[#F5B88C] ${i === 4 ? '' : 'block'} lg:inline`}>{f.titleFirstPart}</span>{f.titleSecondPart}
                  </div>
                  <div className={`${styles.featureText} text-[22px] leading-[23px] w-[284px] font-light opacity-${i === activeIndex ? '100' : '0'} transition-opacity duration-300 lg:text-[16px] lg:leading-[120%] lg:opacity-100 lg:max-w-[236px]`}>
                    {f.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`absolute right-[145px] top-[142px] lg:relative lg:w-[210px] lg:mx-auto lg:top-auto lg:right-auto lg:flex lg:justify-center lg:items-center lg:pl-[0px]`}>
          <Image
            src={glass}
            alt="bgImg"
            className={`
              w-[400px] lg:w-[210px]
              transition-transform duration-300
              ${activeIndex % 2 === 0
                ? `scale-x-[-1] ${activeIndex > 0 ? 'translate-x-[15px]' : ''}`
                : 'scale-x-[1] translate-x-[20px]'}`
            }
          />

          <FloatBlocks activeIndex={activeIndex} />
        </div>
      </div>

      <div className="absolute w-full h-[194px] top-[0] bg-[linear-gradient(360deg,_rgba(16,_20,_28,_0)_0%,_#10141C_60%)]" />
      <div className="absolute w-full bottom-[0] top-[652px] bg-[linear-gradient(360deg,_#10141C_0%,_rgba(16,_20,_28,_0)_100%)]" />
    </>
  );
};

export default Features;
