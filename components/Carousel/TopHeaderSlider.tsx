import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

export default function TopHeaderSlider({
  icon1,
  icon2,
  icon3,
  sliderText1,
  sliderText2,
  sliderText3,
}: any) {
  const sliderContent = [
    {
      icon: icon1,
      text: sliderText1,
    },
    {
      icon: icon2,
      text: sliderText2,
    },
    {
      icon: icon3,
      text: sliderText3,
    },
  ];
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
        {sliderContent.map((content, index) => (
          <SwiperSlide key={index}>
            <div
              key={content.text}
              className="item slider-container d-flex align-items-center m-auto justify-content-center"
            >
              <div className="icon-container">{content.icon}</div>
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
