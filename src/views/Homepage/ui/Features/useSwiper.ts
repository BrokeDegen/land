import { useState, useEffect, useRef } from 'react';
import { SwiperClass } from 'swiper/react';

const WHEEL_CONSTANTS = {
  VISIBILITY_THRESHOLD: 1,              // Порог для определения полной видимости
  PRECISE_BLOCK_TIMEOUT: 1000,         // Время блокировки слайдов после снаппинга (только для точных устройств)
  INERTIA_DELTA_THRESHOLD: 15,         // Минимальное значение deltaY для инерции
  INERTIA_TIME_THRESHOLD: 1000,        // Время для проверки инерции
  SLIDE_INTERVAL: 800,                 // Минимальный интервал между слайдами
  SLIDE_TRANSITION: 500,               // Время анимации слайда
  BASIC_WHEEL_DEBOUNCE: 100,          // Задержка для обычного колеса
  BOTTOM_THRESHOLD: 1,                 // Порог для определения нижней границы
  PRECISE_WHEEL_THRESHOLD: 50,         // Порог для определения точного колеса
} as const;

interface SwiperRefs {
  timeoutId: ReturnType<typeof setTimeout> | undefined;
  isAnimating: boolean;
  wasVisible: boolean;
  lastSlideTime: number;
  isProcessing: boolean;
  isSlidesBlocked: boolean;
  hasPreciseWheel: boolean;
}

interface VisibilityState {
  isFullyVisible: boolean;
  isPartiallyVisible: boolean;
}

interface SlideState {
  isLastSlide: boolean;
  isFirstSlide: boolean;
}

export const useSwiper = () => {
  const [swiper, setSwiper] = useState<null | SwiperClass>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [hasReachedStart, setHasReachedStart] = useState(false);
  const refs = useRef<SwiperRefs>({
    timeoutId: undefined,
    isAnimating: false,
    wasVisible: false,
    lastSlideTime: 0,
    isProcessing: false,
    isSlidesBlocked: false,
    hasPreciseWheel: false,
  });

  const checkVisibility = (rect: DOMRect): VisibilityState => ({
    isFullyVisible: Math.abs(rect.top) < WHEEL_CONSTANTS.VISIBILITY_THRESHOLD && 
                    Math.abs(rect.bottom - window.innerHeight) < WHEEL_CONSTANTS.BOTTOM_THRESHOLD,
    isPartiallyVisible: rect.top < window.innerHeight && rect.bottom > 0
  });

  const updateVisibilityState = (isFullyVisible: boolean, isPartiallyVisible: boolean) => {
    if (isFullyVisible) {
      refs.current.wasVisible = true;
    }
    if (refs.current.wasVisible && !isPartiallyVisible) {
      refs.current.wasVisible = false;
      setHasReachedEnd(false);
      setHasReachedStart(false);
    }
  };

  const getSlideState = (swiper: SwiperClass): SlideState => ({
    isLastSlide: activeIndex === swiper.slides.length - 1,
    isFirstSlide: activeIndex === 0
  });

  const handleSlideChange = (deltaY: number, slideState: SlideState) => {
    const { isLastSlide, isFirstSlide } = slideState;

    if (deltaY > 0 && !isLastSlide) {
      swiper?.slideNext();
    } else if (deltaY < 0 && !isFirstSlide) {
      swiper?.slidePrev();
    }

    if (deltaY > 0 && isLastSlide) {
      setTimeout(() => setHasReachedEnd(true), WHEEL_CONSTANTS.SLIDE_TRANSITION);
    }
    if (deltaY < 0 && isFirstSlide) {
      setTimeout(() => setHasReachedStart(true), WHEEL_CONSTANTS.SLIDE_TRANSITION);
    }
  };

  const handleSnapToView = (rect: DOMRect, e: WheelEvent, isPrecise: boolean) => {
    e.preventDefault();

    if (isPrecise) {
      refs.current.isSlidesBlocked = true;
      setTimeout(() => {
        refs.current.isSlidesBlocked = false;
      }, WHEEL_CONSTANTS.PRECISE_BLOCK_TIMEOUT);
    }

    window.scrollTo({
      top: window.scrollY + rect.top,
      behavior: 'smooth'
    });
  };

  const shouldPreventSlideChange = (now: number, e: WheelEvent) => {
    return refs.current.isSlidesBlocked || 
           swiper?.animating || 
           refs.current.isAnimating || 
           refs.current.isProcessing ||
           (Math.abs(e.deltaY) < WHEEL_CONSTANTS.INERTIA_DELTA_THRESHOLD && 
            now - refs.current.lastSlideTime < WHEEL_CONSTANTS.INERTIA_TIME_THRESHOLD) ||
           now - refs.current.lastSlideTime < WHEEL_CONSTANTS.SLIDE_INTERVAL;
  };

  const handlePreciseWheel = (e: WheelEvent) => {
    if (!swiper?.el) return;
    
    const now = Date.now();
    const rect = swiper.el.getBoundingClientRect();
    const visibility = checkVisibility(rect);
    const slideState = getSlideState(swiper);

    updateVisibilityState(visibility.isFullyVisible, visibility.isPartiallyVisible);

    if ((e.deltaY > 0 && slideState.isLastSlide && hasReachedEnd) || 
        (e.deltaY < 0 && slideState.isFirstSlide && hasReachedStart)) return;

    if (visibility.isPartiallyVisible && !visibility.isFullyVisible) {
      handleSnapToView(rect, e, true);
      return;
    }

    if (visibility.isFullyVisible) {
      e.preventDefault();

      if (shouldPreventSlideChange(now, e)) return;

      refs.current.isProcessing = true;
      refs.current.isAnimating = true;
      refs.current.lastSlideTime = now;

      handleSlideChange(e.deltaY, slideState);

      setTimeout(() => {
        refs.current.isAnimating = false;
        refs.current.isProcessing = false;
      }, WHEEL_CONSTANTS.SLIDE_INTERVAL);
    }
  };

  const handleBasicWheel = (e: WheelEvent) => {
    if (!swiper?.el) return;

    const rect = swiper.el.getBoundingClientRect();
    const visibility = checkVisibility(rect);
    const slideState = getSlideState(swiper);

    updateVisibilityState(visibility.isFullyVisible, visibility.isPartiallyVisible);

    if ((e.deltaY > 0 && slideState.isLastSlide && hasReachedEnd) || 
        (e.deltaY < 0 && slideState.isFirstSlide && hasReachedStart)) return;

    if (visibility.isPartiallyVisible && !visibility.isFullyVisible) {
      handleSnapToView(rect, e, false);
      return;
    }

    if (visibility.isFullyVisible) {
      e.preventDefault();

      if (refs.current.isSlidesBlocked || refs.current.isAnimating) return;

      clearTimeout(refs.current.timeoutId);
      refs.current.timeoutId = setTimeout(() => {
        refs.current.isAnimating = true;
        handleSlideChange(e.deltaY, slideState);
        setTimeout(() => {
          refs.current.isAnimating = false;
        }, WHEEL_CONSTANTS.SLIDE_TRANSITION);
      }, WHEEL_CONSTANTS.BASIC_WHEEL_DEBOUNCE);
    }
  };

  useEffect(() => {
    const detectPreciseWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < WHEEL_CONSTANTS.PRECISE_WHEEL_THRESHOLD) {
        refs.current.hasPreciseWheel = true;
        document.removeEventListener('wheel', detectPreciseWheel);
      }
    };

    document.addEventListener('wheel', detectPreciseWheel, { passive: true });
    return () => document.removeEventListener('wheel', detectPreciseWheel);
  }, []);

  useEffect(() => {
    if (!swiper) return;

    const handleWheel = (e: WheelEvent) => {
      if (refs.current.hasPreciseWheel) {
        handlePreciseWheel(e);
      } else {
        handleBasicWheel(e);
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      document.removeEventListener('wheel', handleWheel);
      if (refs.current.timeoutId) clearTimeout(refs.current.timeoutId);
    };
  }, [swiper, activeIndex, hasReachedEnd, hasReachedStart]);

  useEffect(() => {
    if (!swiper) return;

    swiper.on('slideChange', (swiper) => setActiveIndex(swiper.activeIndex));
    swiper.on('slideChangeTransitionEnd', (swiper) => {
      setHasReachedEnd(swiper.activeIndex === swiper.slides.length - 1);
      setHasReachedStart(swiper.activeIndex === 0);
    });

    swiper.mousewheel.disable();
  }, [swiper]);

  return { setSwiper, activeIndex };
};