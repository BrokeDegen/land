'use client';
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Roadmap = () => {
  const swiperRef = useRef<any>(null);

  return (
    <div className='mx-auto w-full max-w-[1440px] pb-[50px] pt-[60px]'>
      <h2 className='text-[70px] font-bold uppercase leading-[77px]'>
        Roadmap
      </h2>

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        loop={false}
        className='h-[fit-content]'
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <SwiperSlide key={num}>
            <SwiperItem />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className='mt-4 rounded-lg bg-blue-500 px-6 py-2 text-white'
      >
        Next Slide
      </button>
    </div>
  );
};

export default Roadmap;

const SwiperItem = () => {
  return (
    <div className='flex h-[fit-content] w-full flex-col gap-[2px] outline outline-[1px] outline-red'>
      <div className='flex h-[120px] items-center rounded-[20px] outline outline-[1px] outline-red'>
        <p className='ml-[36px] text-[50px] font-normal uppercase leading-[55px]'>
          q2 2025
        </p>
      </div>
      <div className='rounded-[20px] outline outline-[1px] outline-red'>
        <div className='mb-[50px] ml-[36px] mt-[36px] flex flex-col gap-[14px]'>
          <div>
            {/* icon */}
            <p>Ai suggestions</p>
          </div>
          <div>
            {/* icon */}
            <p>Ai suggestions</p>
          </div>
          <div>
            {/* icon */}
            <p>Ai suggestions</p>
          </div>
        </div>
      </div>
    </div>
  );
};
