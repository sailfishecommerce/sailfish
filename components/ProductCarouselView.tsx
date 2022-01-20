/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import FormattedPrice from "@/lib/formatPrice";

import { productType } from "@/types";

interface ProductCarouselView {
  product: productType;
}

export default function ProductCarouselView({ product }: ProductCarouselView) {
  return (
    <Link href={`/products/${product.slug}`} passHref>
      <div className="card product-card card-static">
        <button
          className="btn-wishlist btn-sm"
          type="button"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Add to wishlist"
        >
          <i className="ci-heart"></i>
        </button>
        <a className="card-img-top d-block overflow-hidden" href="#">
          <img
            src={product.images[0].file.url}
            alt={product.name}
            className="productImage"
          />
        </a>
        <div className="card-body py-2">
          <a className="product-meta d-block fs-xs pb-1" href="#">
            Men’s Hoodie
          </a>
          <h3 className="product-title fs-sm">
            <a href="#">{product.name}</a>
          </h3>
          <div className="d-flex justify-content-between">
            <div className="product-price">
              <span className="text-accent">
                <FormattedPrice price={product.price} />
              </span>
            </div>
            <div className="star-rating">
              <i className="star-rating-icon ci-star-filled active"></i>
              <i className="star-rating-icon ci-star-filled active"></i>
              <i className="star-rating-icon ci-star-filled active"></i>
              <i className="star-rating-icon ci-star-half active"></i>
              <i className="star-rating-icon ci-star"></i>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .card-img-top img {
              height: 200px;
              width: 300px;
            }
            @media (max-width: 768px) {
              .card-img-top img {
                height: 150px;
                width: 300px;
              }
              .card-body {
                padding: 0px;
              }
              .product-title {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          `}
        </style>
      </div>
    </Link>
  );
}
