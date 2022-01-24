import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Mousewheel } from "swiper";
import Image from "next/image";
import topHeaderSlider from "@/json/topheaderslider.json";

import "swiper/css";
import "swiper/css/autoplay";

function TopHeaderSliderComponent() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={true}
        slidesPerView={1}
        modules={[Autoplay, Mousewheel, EffectFade]}
        effect={"fade"}
        mousewheel={true}
        navigation={false}
      >
        {topHeaderSlider.map((content, index) => (
          <SwiperSlide key={index}>
            <div
              key={content.text}
              className="item slider-container d-flex align-items-center m-auto justify-content-center"
            >
              <div className="icon-container">
                <Image
                  src={content.icon}
                  alt={content.text}
                  height={50}
                  width={50}
                />
              </div>
              <p className="text-white text-center mb-0">{content.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx>{`
        .slider-container {
          background-color: #373f50;
        }
        .icon-container {
          height: 50px;
          width: 60px;
          margin: 0px 10px;
        }
      `}</style>
    </>
  );
}

const TopHeaderSlider = memo(TopHeaderSliderComponent);

export default TopHeaderSlider;
