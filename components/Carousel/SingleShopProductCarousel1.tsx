/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  EffectFade,
  Autoplay,
  Mousewheel,
  Keyboard,
} from "swiper";

import { productType } from "@/types";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/mousewheel";
import ProductCarouselView from "../ProductCarouselView";

interface Props {
  otherProducts: productType[];
  product: productType;
}

export default function SingleShopProductCarousel1({
  otherProducts,
  product,
}: Props) {
  const filterProduct = otherProducts?.filter((p) => p.id !== product.id);

  return (
    <div className="otherProductCarousel container py-5 my-md-3">
      <h2 className="h3 text-center pb-4">You may also like</h2>
      <Swiper
        spaceBetween={20}
        loop={true}
        autoplay={true}
        slidesPerView={2}
        breakpoints={{
          500: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 640px
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 4,
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
        pagination={true}
        mousewheel={true}
        keyboard={true}
        navigation={true}
      >
        {filterProduct.map((product: productType) => (
          <SwiperSlide key={product.id}>
            <ProductCarouselView product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
