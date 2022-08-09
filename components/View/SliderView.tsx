/* eslint-disable @next/next/no-img-element */
import { PropsWithChildren } from "react";
import {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  Mousewheel,
  Keyboard,
} from "swiper";
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/mousewheel";

interface SliderProps {
  children: JSX.Element;
  autoplay: boolean;
  className: string;
  controls: {
    navigationNextRef: any;
    navigationPrevRef: any;
  };
  slidesPerView: number;
}

export default function SliderView({
  children,
  autoplay,
  className,
  controls,
  slidesPerView,
}: PropsWithChildren<SliderProps>) {
  const { navigationNextRef, navigationPrevRef } = controls;
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={30}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
      }}
      modules={[
        Autoplay,
        Navigation,
        Pagination,
        Mousewheel,
        Keyboard,
        EffectFade,
      ]}
      autoplay={autoplay}
      fadeEffect={{
        crossFade: true,
      }}
      loop={true}
      effect="fade"
      className={className}
      navigation={{
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
      }}
      pagination={true}
      mousewheel={true}
      keyboard={true}
    >
      {children}
    </Swiper>
  );
}
