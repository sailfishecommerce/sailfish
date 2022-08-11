/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Script from "next/script";
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import Magnifier from "react-magnifier";
import "react-image-lightbox/style.css";

import { productType } from "@/types";
import { PaymentNote } from "./ProductView";

interface Props {
  product: productType;
  quickView?: boolean;
}

export default function ProductGallery({ product, quickView }: Props) {
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const activethumbnailImg = (index: number) =>
    activeImage === index ? "active" : "";

  function updateActiveImage(index: number) {
    setActiveImage(index);
  }

  const images = product?.images;
  const productImage: any = (index: number) =>
    typeof product?.images[0] === "string"
      ? product?.images[index]
      : product?.images[index].file.url;

  const onImgClick = () => {
    setLightBoxOpen(!lightBoxOpen);
  };

  const customStyles = {
    overlay: {
      zIndex: "5000",
    },
    bodyOpen: {
      position: "fixed",
    },
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/lightgallery.js@1.4.0/src/css/lightgallery.css"
        />
      </Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/lightgallery.js@1.4.0/lib/js/lightgallery.min.js"
        strategy="beforeInteractive"
      />
      <div className="col-lg-7 pe-lg-0 pt-lg-4">
        <div className="product-gallery">
          <div className="product-gallery-preview order-sm-2">
            <div
              onClick={onImgClick}
              className="product-gallery-preview-item active"
            >
              <Magnifier
                mgShowOverflow={false}
                mgWidth={2000}
                mgHeight={2000}
                className="img-fluid"
                src={productImage(activeImage)}
                zoomFactor={0.11}
              />
              <div className="image-zoom-pane"></div>
            </div>
            {lightBoxOpen && (
              <Lightbox
                mainSrc={productImage(activeImage)}
                nextSrc={productImage((activeImage + 1) % images.length)}
                prevSrc={productImage((activeImage - 1) % images.length)}
                onCloseRequest={() => setLightBoxOpen(false)}
                imageCaption={product.image_alt_text[activeImage]}
                onMovePrevRequest={() =>
                  setActiveImage(
                    (activeImage + images.length - 1) % images.length
                  )
                }
                onMoveNextRequest={() =>
                  setActiveImage((activeImage + 1) % images.length)
                }
                enableZoom={false}
                reactModalStyle={customStyles}
              />
            )}
          </div>
          <div className="product-gallery-thumblist order-sm-1">
            {images?.map((image: any, index) => {
              const productImage =
                typeof image === "string" ? image : image.file.url;
              return (
                <a
                  className={`product-gallery-thumblist-item ${activethumbnailImg(
                    index
                  )}`}
                  onClick={() => updateActiveImage(index)}
                  key={index}
                >
                  <img src={productImage} alt={product.image_alt_text[index]} />
                </a>
              );
            })}
          </div>
        </div>
        <style jsx>
          {`
            .product-gallery-thumblist.order-sm-1 {
              height: 500px;
              overflow-y: auto;
              width: 150px;
            }
            @media (max-width: 768px) {
              .product-gallery-thumblist.order-sm-1 {
                display: flex;
                flex-direction: row !important;
                width: 100%;
                height: unset;
                overflow-y: unset;
              }
            }
          `}
        </style>
      </div>
    </>
  );
}
