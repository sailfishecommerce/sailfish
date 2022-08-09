/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, memo } from "react";
import dynamic from "next/dynamic";

import Image from "@/components/Image";
import { ProductProps } from "@/types";
import useProduct from "@/hooks/useProduct";
import RatingStar from "./RatingStar";
import discountPrice from "@/lib/discountPrice";
import FormattedPrice from "@/lib/formatPrice";
import useMediaQuery from "@/hooks/useMediaQuery";
// import useAlgoliaEvents from "@/hooks/useAlgoliaEvents";

const DynamicProductViewForm = dynamic(
  () => import("../components/ProductViewForm")
);

const DynamicProductMetatags = dynamic(
  () => import("../components/ProductMeta")
);
declare function tcjs(trigger: string, type: string, name: string): any;

const MProduct = ({
  product,
  forCategory,
  algoliaEvent,
  className,
}: ProductProps) => {
  const { productViewEvent } = useProduct(product);
  const [inHover, setHover] = useState(false);
  const mobileDevice = useMediaQuery("(max-width:768px)");
  const smallerMobileDevice = useMediaQuery("(max-width:330px)");

  const productDimension = smallerMobileDevice
    ? { height: 200, width: 250 }
    : mobileDevice
    ? { height: 80, width: 80 }
    : { height: 300, width: 300 };

  console.log("product", product);

  const linkURL =
    algoliaEvent === "search"
      ? `/products/${product.slug}?query-id=${product.__queryID}`
      : `/products/${product.slug}?id=${product.id}`;

  const productImage =
    typeof product.images === "object" && typeof product.images[0] === "string"
      ? product.images[0]
      : inHover && product.images.length > 1
      ? product.images[1]?.file?.url
      : product.images[0]?.file?.url;

  const productClassName = className
    ? className
    : "col-md-4 col-6 mb-4 p-0 p-md-1";

  return (
    <div className={`${productClassName}  product`}>
      <DynamicProductMetatags product={product} />
      <div className="card product-card p-1 p-md-2">
        <div className="d-flex justify-content-between">
          {product.compare_at_price > 0 && (
            <div className="discount-price mt-2">
              {discountPrice(product)} %
            </div>
          )}
          <button
            className="btn-wishlist btn-sm"
            type="button"
            data-bs-toggle="tooltip"
            data-bs-placement="left"
            title="Add to wishlist"
          >
            <i className="ci-heart"></i>
          </button>
        </div>
        <Link href={linkURL} passHref>
          <a className="productLink card-img-top d-block overflow-hidden">
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="productImage"
            >
              <Image
                height={productDimension.height}
                width={productDimension.width}
                src={productImage}
                alt={product?.image_alt_text[0]}
                placeholder="blur"
                blurDataURL={productImage}
                loading="lazy"
              />
            </div>
          </a>
        </Link>
        <div className="card-body py-3">
          <Link href={`/collections/vendors/${product.vendor}`} passHref>
            <a className="product-meta d-block fs-xs pb-1">{product.vendor}</a>
          </Link>
          <h3 className="product-title fs-sm">
            <Link href={`/products/${product.slug}?id=${product.id}`} passHref>
              <a onClick={productViewEvent}>{product.name}</a>
            </Link>
          </h3>
          <div className="d-flex justify-content-between">
            <ul className="product-price d-flex flex-column align-items-baseline mb-0">
              <li className="text-accent fs-sm fs-lg">
                <FormattedPrice price={product.sale_price} />
              </li>
              {product.compare_at_price > 0 && (
                <del className="small text-accent fs-xs">
                  <FormattedPrice price={product.price} />
                </del>
              )}
            </ul>
            <div className="reviewRating d-flex flex-column">
              <RatingStar rate={product.rating} />
              {product.review_rating ? (
                <p className="widget-product-meta mb-0">
                  ({product.review_rating} reviews)
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <DynamicProductViewForm product={product} forCategory={forCategory} />
      </div>
      <hr className="d-sm-none" />
      <style jsx>
        {`
          .productImage {
            height: 220px;
            display: flex;
            margin: auto;
            align-items: center;
            justify-content: center;
          }
          .productImage img.productImage:hover {
            transform: scale(1.03) !important;
            transition: transform 300ms ease-in 0s !important;
          }
          .product-meta:hover {
            color: red;
          }
          .product-price {
            padding: 0px;
          }
          .product-price li {
            list-style: none;
            padding: 0px;
          }
          ul.product-price {
            font-size: 13px;
          }
          .discount-price {
            height: 35px;
            width: 50px;
            color: white;
            background-color: #fb696a;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
          }
          .reviewRating p {
            font-size: 12px;
          }
          @media (max-width: 768px) {
            .productLink img {
              margin: auto;
              display: flex;
            }
            h3.product-title {
              width: 150px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .productImage {
              height: unset;
            }
          }
          @media (max-width: 450px) {
            div.reviewRating.d-flex {
              display: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

const Product: any = memo(MProduct);
export default Product;

Product.whyDidYouRender = true;
