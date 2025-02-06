import { useEffect, useState } from 'react';
import { SwiperClass } from 'swiper/react';

const INSIDE_SLIDES_LENGTH = 5;
const INSIDE_SILDER_POSITION = 2;
const MAIN_SLIDER_START_INDEX = 0;
const INSIDE_SLIDER_START_INDEX = 0;
const INSIDE_SLIDER_END_INDEX = INSIDE_SLIDES_LENGTH - 1;

export const useSwiper = () => {
  const [mainSwiper, setMainSwiper] = useState<null | SwiperClass>(null);
  const [insideSwiper, setInsideSwiper] = useState<null | SwiperClass>(null);
  const [insideSwiperActiveIndex, setInsideSwiperActiveIndex] = useState(0);

  useEffect(() => {
    if (!mainSwiper || !insideSwiper) return;

    mainSwiper.on('slideChangeTransitionEnd', (swiper) => {
      if (swiper.activeIndex === MAIN_SLIDER_START_INDEX) swiper.allowSlideNext = true;
      if (swiper.activeIndex === INSIDE_SILDER_POSITION + 1) swiper.allowSlidePrev = true;

      if (swiper.activeIndex === INSIDE_SILDER_POSITION) {
        if (swiper.previousIndex === MAIN_SLIDER_START_INDEX) swiper.allowSlideNext = false;
        if (swiper.previousIndex === INSIDE_SILDER_POSITION + 1) swiper.allowSlidePrev = false;

        setTimeout(() => {
          insideSwiper.mousewheel.enable();
        }, 500);
      }
    });
  
    mainSwiper.on('slideChangeTransitionStart', (swiper) => {
      if (swiper.activeIndex === INSIDE_SILDER_POSITION + 1 || swiper.activeIndex === MAIN_SLIDER_START_INDEX) {
        insideSwiper.mousewheel.disable();
      }
    });
  
    mainSwiper.on('slideChange', (swiper) => {
      setTimeout(() => {
        if (typeof swiper.params.mousewheel === 'object') {
          swiper.params.mousewheel.releaseOnEdges = false;    
        }
      }, 500);
    });

    mainSwiper.on('reachEnd', (swiper) => {
      setTimeout(() => {
        if (typeof swiper.params.mousewheel === 'object') {
          swiper.params.mousewheel.releaseOnEdges = true;
        }
      }, 1500);
    });
  }, [mainSwiper, insideSwiper]);

  useEffect(() => {
    if (!mainSwiper || !insideSwiper) return;

    insideSwiper.on('slideChangeTransitionStart', (swiper) => {
      setInsideSwiperActiveIndex(swiper.activeIndex);
    });

    insideSwiper.on('slideChangeTransitionEnd', (swiper) => {
      if (swiper.activeIndex === INSIDE_SLIDER_START_INDEX) {
        mainSwiper.allowSlideNext = false;
        mainSwiper.allowSlidePrev = true;
      } else if (swiper.activeIndex === INSIDE_SLIDER_END_INDEX) {
        mainSwiper.allowSlideNext = true;
        mainSwiper.allowSlidePrev = false;
      } else {
        mainSwiper.allowSlideNext = false;
        mainSwiper.allowSlidePrev = false;
      }
    })
  }, [mainSwiper, insideSwiper])

  return {
    setMainSwiper,
    setInsideSwiper,
    insideSwiperActiveIndex,
  };
}
