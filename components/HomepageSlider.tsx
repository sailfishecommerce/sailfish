/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import dynamic from "next/dynamic";

import Image from "@/components/Image";
import sliderContent from "@/json/homepage-slider.json";
import styles from "@/styles/homepageslider.module.css";

const TinySlider: any = dynamic(() => import("tiny-slider-react"), {
  ssr: false,
});

export default function HomepageSlider() {
  const settings = {
    controlsText: [
      '<i class="ci-arrow-left"></i>',
      '<i class="ci-arrow-right"></i>',
    ],
    nav: false,
    mouseDrag: true,
    speed: 500,
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayButtonOutput: false,
  };

  return (
    <section
      className={`${styles.tnsCarousel} tns-carousel tns-controls-lg mb-4 mb-lg-5 w-100`}
    >
      <TinySlider settings={settings}>
        {sliderContent.map((item, index) => (
          <div
            style={{
              height: "680px",
            }}
            className="tinySlider"
            key={index}
          >
            <div className="px-lg-5 sliderItem">
              <div
                className={`${styles.imageContainer} justify-content-between align-items-center ps-lg-4 d-block order-lg-2 me-lg-5`}
              >
                <Image
                  src={item.sliderImg}
                  height={300}
                  width={400}
                  className={`${styles.carouselImg} d-block order-lg-2 me-lg-n5 flex-shrink-0`}
                  alt="Summer Collection"
                  layout="responsive"
                />
              </div>
              <div className="position-relative position-relative  ms-lg-5 py-5 px-4 mb-lg-5 order-lg-1">
                <div className="pb-lg-5 mb-lg-5 text-center text-lg-start text-lg-nowrap">
                  <h3 className="h2 text-light fw-light pb-1 from-start">
                    {item.sliderCaption}
                  </h3>
                  <h2 className="text-light display-5 from-start delay-1">
                    {item.sliderTitle}
                  </h2>
                  <p className="fs-lg text-light pb-3 from-start delay-2">
                    {item.sliderDescription}
                  </p>
                  <div className="d-table scale-up delay-4 mx-auto mx-lg-0">
                    <Link href="/shop" passHref>
                      <a className="btn btn-primary">
                        Shop Now
                        <i className="ci-arrow-right ms-2 me-n1"></i>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <style jsx>{`
              .tinySlider {
                background-color: #3aafd2;
              }
              .sliderItem {
                background-color: ${item.bgColor};
                height: 680px;
                display: flex;
                align-items: center;
                justify-content: space-around;
              }
              .sliderWidth {
                max-width: 42rem;
                z-index: 10;
              }
              @media (max-width: 768px) {
                .carouselImg {
                  height: 100%;
                  width: 100%;
                }
                .sliderText h3 {
                  font-size: 20px;
                }
                .sliderText h2 {
                  font-size: 24px;
                }
                .sliderText p {
                  font-size: 16px;
                }
              }
            `}</style>
          </div>
        ))}
      </TinySlider>
    </section>
  );
}
