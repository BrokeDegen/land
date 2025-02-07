"use client";

import React from 'react';
import Media from './ui/Media';
import Waitlist from './ui/Waitlist';
import Faq from './ui/Faq';
import Purchase from './ui/Purchase';
import Features from './ui/Features';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import { useSwiper } from './useSwiper';
import 'swiper/css';
import './style.css';

export const Homepage = () => {
  const { setMainSwiper, setInsideSwiper, insideSwiperActiveIndex } = useSwiper();

  return (
    <>
      <Swiper
        direction='vertical'
        slidesPerView={'auto'}
        spaceBetween={0}
        mousewheel={{
          enabled: true,
          thresholdTime: 1000,
          thresholdDelta: 10,
        }}
        modules={[Mousewheel]}
        onSwiper={setMainSwiper}
      >
        <SwiperSlide>
          <Purchase />
        </SwiperSlide>
        <SwiperSlide>
          <Media />
        </SwiperSlide>
        <SwiperSlide className='swiper-slide-with-swiper'>
          <Features activeIndex={insideSwiperActiveIndex} />
          <Swiper
            className='inside-swiper swiper-h'
            spaceBetween={0}
            modules={[Mousewheel]}
            onSwiper={setInsideSwiper}
            mousewheel={{
              enabled: false,
              thresholdTime: 1000,
              thresholdDelta: 10,
              releaseOnEdges: true,
            }}
          >
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
          </Swiper>
        </SwiperSlide>
      </Swiper>
      <Waitlist /> 
      <Faq />
    </>
  );
};