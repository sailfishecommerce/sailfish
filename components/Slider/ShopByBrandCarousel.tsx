/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "@/components/Image";
import brands from "@/json/brand.json";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import styles from "@/styles/ShopByBrandCarousel.module.css";

export default function ShopByBrandCarousel() {
  const tabWidth = useMediaQuery("(max-width:768px)");

  const responsiveConfig = {
    0: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    400: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },

    1200: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  };

  const imageSize = tabWidth
    ? { height: 40, width: 120 }
    : { height: 60, width: 200 };

  return (
    <section className="container py-lg-4 mb-4">
      <h2 className="h3 text-center pb-4">Shop by brand</h2>
      <div className="row brand-row">
        <Swiper
          spaceBetween={50}
          loop={true}
          className="d-flex"
          autoplay={true}
          slidesPerView={5}
          modules={[Autoplay, Navigation, Pagination]}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          breakpoints={responsiveConfig}
          navigation={true}
        >
          {brands.map((brand: any, index: number) => (
            <SwiperSlide key={index}>
              <div className={styles.brand}>
                <a
                  className={`${styles.brandLink} d-flex bg-white shadow-sm rounded-3 py-3 py-sm-4`}
                  href="#"
                >
                  <div className="brandContainer d-flex justify-content-center align-items-center mx-auto">
                    <Image
                      src={brand.img}
                      alt={brand.name}
                      height={imageSize.height}
                      width={imageSize.width}
                      layout="responsive"
                    />
                  </div>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style jsx>
        {`
          .brandContainer {
            width: 200px;
            height: 100px;
          }
        `}
      </style>
    </section>
  );
}
