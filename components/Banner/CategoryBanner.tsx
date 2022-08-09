/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "@/components/Image";

interface CategoryBannerProps {
  controls: {
    navigationNextRef: any;
    navigationPrevRef: any;
  };
}

export default function CategoryBanner({ controls }: CategoryBannerProps) {
  const { navigationNextRef, navigationPrevRef } = controls;

  return (
    <div className="col-md-5">
      <div className="categoryBannerColor d-flex flex-column h-100 overflow-hidden rounded-3">
        <div className="d-flex justify-content-between px-grid-gutter py-grid-gutter">
          <div>
            <h3 className="mb-1">Shop for medicine</h3>
            {/* <Link href="/shop" passHref> */}
            <a className="fs-md text-white">
              Get started now
              <i className="ci-arrow-right fs-xs align-middle ms-1"></i>
            </a>
            {/* </Link> */}
          </div>
          <div className="d-flex">
            <button className="control" ref={navigationPrevRef} type="button">
              <i className="ci-arrow-left"></i>
            </button>
            <button className="control" ref={navigationNextRef} type="button">
              <i className="ci-arrow-right"></i>
            </button>
          </div>
        </div>
        {/* <Link href="/shop" passHref> */}
        <a className="d-none d-md-block mt-auto">
          <div className="d-block w-100">
            <Image
              className="categoryBanner"
              src="/img/shop/featured_category_image.webp"
              alt="category banner"
              height={400}
              width={500}
            />
          </div>
        </a>
        {/* </Link> */}
      </div>
      <style jsx>
        {`
          .categoryBannerColor {
            background-color: #f3c2cc;
          }
          .categoryBanner {
            height: 100%;
            width: 100%;
          }
          button.control {
            height: 40px;
            width: 40px;
            margin: 10px;
            border: none;
            background-color: white;
            border-radius: 50%;
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          button.control:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </div>
  );
}
