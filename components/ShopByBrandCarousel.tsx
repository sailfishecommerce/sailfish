/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

import styles from "@/styles/ShopByBrandCarousel.module.css";

export default function ShopByBrandCarousel({
  brandLogo1,
  brandLogo2,
  brandLogo3,
  brandLogo4,
  brandLogo5,
  brandLogo6,
  brandLogo7,
  brandLogo8,
  brandLogo9,
  brandLogo10,
  brandLogo11,
  brandLogo12,
}: any) {
  const brandLogoImages = [
    brandLogo1,
    brandLogo2,
    brandLogo3,
    brandLogo4,
    brandLogo5,
    brandLogo6,
    brandLogo7,
    brandLogo8,
    brandLogo9,
    brandLogo10,
    brandLogo11,
    brandLogo12,
  ];

  const responsiveConfig = {
    0: {
      items: 2,
    },
    480: {
      items: 3,
    },
    768: {
      items: 4,
    },
    1200: {
      items: 5,
    },
  };

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
          navigation={true}
        >
          {brandLogoImages.map((brand: any, index: number) => (
            <SwiperSlide key={index}>
              <div className={styles.brand}>
                <a
                  className={`${styles.brandLink} d-flex bg-white shadow-sm rounded-3 py-3 py-sm-4`}
                  href="#"
                >
                  <div className="brandContainer d-flex mx-auto">{brand}</div>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style jsx>
        {`
          .brandContainer {
            width: 150px;
          }
        `}
      </style>
    </section>
  );
}
