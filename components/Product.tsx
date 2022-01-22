/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, memo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { ProductProps } from "@/types";
import useProduct from "@/hooks/useProduct";
import RatingStar from "./RatingStar";
import { replaceSpaceWithHypen } from "@/lib/formatString";
import useCurrency from "@/hooks/useCurrency";
import discountPrice from "@/lib/discountPrice";
import useProductPrice from "@/hooks/useProductPrice";
import FormattedPrice from "@/lib/formatPrice";

const DynamicProductViewForm = dynamic(
  () => import("../components/ProductViewForm")
);

const DynamicProductMetatags = dynamic(
  () => import("../components/ProductMeta")
);
declare function tcjs(trigger: string, type: string, name: string): any;

const MProduct = ({ product, forCategory }: ProductProps) => {
  const { productViewEvent } = useProduct(product);
  const [inHover, setHover] = useState(false);

  const productImage =
    inHover && product.images.length > 1
      ? product.images[1]?.file?.url
      : product.images[0]?.file?.url;

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <DynamicProductMetatags product={product} />
      <div className="card product-card p-2">
        <div className="d-flex justify-content-between">
          {product.hkd_compare_at_price > 0 && (
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
        <Link href={`/products/${product.slug}`} passHref>
          <a
            onClick={productViewEvent}
            className="productLink card-img-top d-block overflow-hidden"
          >
            <div
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              className="productImage"
            >
              <Image
                height={300}
                width={300}
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
          <Link
            href={`/collections/vendors/${replaceSpaceWithHypen(
              product.vendor
            )}`}
            passHref
          >
            <a className="product-meta d-block fs-xs pb-1">{product.vendor}</a>
          </Link>
          <h3 className="product-title fs-sm">
            <Link href={`/products/${product.slug}`} passHref>
              <a onClick={productViewEvent}>{product.name}</a>
            </Link>
          </h3>
          <div className="d-flex justify-content-between">
            <ul className="product-price d-flex flex-column align-items-baseline">
              <li className="text-accent fs-lg">
                <FormattedPrice price={product.price} isProduct />
              </li>
              {product.hkd_compare_at_price > 0 && (
                <del className="small text-accent fs-ms">
                  <FormattedPrice
                    price={product.hkd_compare_at_price}
                    oldPrice
                    isProduct
                  />
                </del>
              )}
            </ul>
            <div className="reviewRating d-flex flex-column">
              <RatingStar rate={product.rating} />
              {product.review_rating ? (
                <p className="widget-product-meta">
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
          }
        `}
      </style>
    </div>
  );
};

const Product = memo(MProduct);
export default Product;

Product.whyDidYouRender = true;
