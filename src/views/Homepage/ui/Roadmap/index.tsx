'use client';
import styles from './styles.module.scss';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import CircleIcon from './assets/circle-icon.svg?url';
import CheckIcon from './assets/check-icon.svg?url';
import ArrowIcon from './assets/arrow.svg?url';
import Image from 'next/image';
import 'swiper/css';
import { roadmapBlocks } from './consts';
import { useWindowWidth } from '@/shared/hooks/useWindowWidth';
import classNames from 'classnames';

const Roadmap = () => {
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const width = useWindowWidth();
  const isTablet = width > 768 && width <= 1100;
  const isMobile = width <= 768;

  return (
    <div className='relative mx-auto mb-[150px] w-full max-w-[1440px] pb-[50px] pt-[60px]'>
      <h2 className='text-center text-[70px] font-bold uppercase leading-[77px] md:text-[48px] md:leading-[52px]'>
        Roadmap
      </h2>

      <div className='relative mt-[70px] h-[fit-content] w-[full] md:mt-[58px]'>
        <SwiperShadow isMobile={isMobile} />

        <Swiper
          spaceBetween={20}
          slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          loop={false}
          className='!ml-[40px] !mr-[40px] h-[fit-content] md:!ml-[16px] md:!mr-[16px]'
        >
          {roadmapBlocks?.map((block: any) => (
            <SwiperSlide key={block?.id}>
              <SwiperItem block={block} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {!isBeginning && (
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={classNames(
            'absolute bottom-[-80px] left-[20%] z-10',
            styles.btn,
          )}
        >
          <Image
            src={ArrowIcon}
            alt='arrow icon'
            className='absolute inset-0 m-auto rotate-180'
          />
        </button>
      )}

      <button
        onClick={() => swiperRef.current?.slideNext()}
        disabled={isEnd}
        className={classNames(
          styles.btn,
          'absolute bottom-[-80px] right-[20%] z-10',
          {
            'cursor-not-allowed opacity-50': isEnd,
          },
        )}
      >
        <Image
          src={ArrowIcon}
          alt='arrow icon'
          className='absolute inset-0 m-auto'
        />
      </button>
    </div>
  );
};

export default Roadmap;

const SwiperItem = ({ block }: any) => {
  return (
    <div className='flex h-[fit-content] w-full flex-col gap-[2px]'>
      <div className='flex h-[120px] items-center rounded-[20px] bg-[#171B23] md:h-[90px]'>
        <p className='ml-[36px] text-[50px] font-normal uppercase leading-[55px] md:ml-[26px] md:text-[45px] md:leading-[50px]'>
          {block?.title}
        </p>
      </div>
      <div className='rounded-[20px] bg-[#171B23]'>
        <div className='mb-[50px] ml-[36px] mt-[36px] flex flex-col gap-[14px] text-[22px] font-normal leading-[31px] md:mb-[45px] md:ml-[28px] md:mr-[10px]'>
          {block?.items?.map((item: any) => {
            return (
              <div key={item?.id} className='flex items-center gap-[14px]'>
                <div className='relative h-[36px] w-[36px]'>
                  <Image src={CircleIcon} alt='circle icon' />
                  <Image
                    src={CheckIcon}
                    alt='check icon'
                    className='absolute inset-0 m-auto'
                  />
                </div>
                <p>{item?.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SwiperShadow = ({ isMobile }: { isMobile: boolean }) => {
  return <div className={classNames(styles.shadow, { hidden: isMobile })} />;
};
