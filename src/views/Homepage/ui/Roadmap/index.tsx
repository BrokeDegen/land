'use client';
import styles from './styles.module.scss';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ArrowIcon from './assets/arrow.svg?url';
import Image from 'next/image';
import 'swiper/css';
import { roadmapBlocks } from './consts';
import { useWindowWidth } from '@/shared/hooks/useWindowWidth';
import classNames from 'classnames';
import { SwiperItem } from './ui/SwiperItem/SwiperItem';

const Roadmap = () => {
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const width = useWindowWidth();
  const isTablet = width > 768 && width <= 1100;
  const isMobile = width <= 768;

  return (
    <div className='md:outline-1px relative mx-auto mb-[100px] w-full max-w-[1440px] pb-[50px] pt-[60px] md:mb-[0px] md:outline md:outline-[#202736]'>
      <h2 className='text-center text-[70px] font-bold uppercase leading-[77px] md:text-[48px] md:leading-[52px]'>
        Roadmap
      </h2>

      <div className='relative h-[fit-content]'>
        <SwiperShadow isLeft={true} isMobile={isMobile} />
        <SwiperShadow isRight={true} isMobile={isMobile} />
        <Swiper
          spaceBetween={20}
          slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          loop={false}
          className='!ml-[40px] !mr-[40px] h-[fit-content] !pl-[3px] !pr-[3px] !pt-[80px] md:!ml-[16px] md:!mr-[16px] md:mt-[20px]'
        >
          {roadmapBlocks?.map((block: any, index: number) => (
            <SwiperSlide key={block?.id}>
              <SwiperItem
                block={block}
                type={block?.type}
                isLastSlide={roadmapBlocks?.length - 1 === index}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {!isBeginning && (
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={classNames(
            'absolute bottom-[-80px] left-[20%] z-10 md:hidden',
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
          'absolute bottom-[-80px] right-[20%] z-10 md:hidden',
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

const SwiperShadow = ({
  isMobile,
  isRight = true,
  isLeft,
}: {
  isMobile: boolean;
  isRight?: boolean;
  isLeft?: boolean;
}) => {
  return (
    <div
      className={classNames(
        styles.shadow,
        { hidden: isMobile },
        isRight &&
          classNames(
            'absolute right-0 top-1/2 -translate-y-1/2',
            styles.shadowRight,
          ),
        isLeft &&
          classNames(
            'absolute left-0 top-1/2 -translate-y-1/2',
            styles.shadowLeft,
          ),
      )}
    />
  );
};
