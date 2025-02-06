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
        slidesPerView={1}
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
          <Features activeIndex={insideSwiperActiveIndex} />
          <Swiper
            className='swiper-h'
            spaceBetween={0}
            modules={[Mousewheel]}
            onSwiper={setInsideSwiper}
            mousewheel={{
              enabled: false,
              thresholdTime: 1000,
              thresholdDelta: 10,
            }}
          >
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
            <SwiperSlide />
          </Swiper>
        </SwiperSlide>
        <SwiperSlide>
          <Media />
        </SwiperSlide>
      </Swiper>

      <Waitlist /> 
      <Faq />
    </>
  );
};
