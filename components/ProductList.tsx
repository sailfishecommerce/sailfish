/* eslint-disable @next/next/no-img-element */
import { useCallback } from "react";
import Link from "next/link";

import Image from "@/components/Image";
import FormattedPrice from "@/lib/formatPrice";
import RatingStar from "@/components/RatingStar";
import { productType } from "@/types";
import useProduct from "@/hooks/useProduct";

interface ProductProps {
  product: productType;
}

export default function ProductList({ product }: ProductProps) {
  const {
    productViewEvent,
    addToCartHandler,
    quickViewHandler,
    optionHandler,
  } = useProduct(product);

  const labelBg = useCallback((name: string) => {
    const style = { backgroundColor: name.toLowerCase() };
    return style;
  }, []);

  return (
    <>
      <div className="card product-card product-list mb-3 border-bottom justify-content-center">
        <span className="badge bg-danger badge-shadow">Sale</span>
        <button
          className="btn-wishlist btn-sm"
          type="button"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Add to wishlist"
        >
          <i className="ci-heart"></i>
        </button>
        <div className="d-sm-flex align-items-center">
          <Link href={`/products/${product.slug}`} passHref>
            <a onClick={productViewEvent} className="product-list-thumb">
              <Image
                height={300}
                width={300}
                src={product.images[0]?.file?.url}
                alt={
                  product?.image_alt_text
                    ? product?.image_alt_text[0]
                    : product.name
                }
                className="productImage"
                placeholder="blur"
                blurDataURL={product.images[0]?.file?.url}
                loading="lazy"
              />
            </a>
          </Link>
          <div className="card-body py-2">
            <a className="product-meta d-block fs-xs pb-1">{product.vendor}</a>
            <h3 className="product-title fs-base">
              <Link href={`/products/${product.slug}`} passHref>
                <a onClick={productViewEvent}>{product.name}</a>
              </Link>
            </h3>
            <div className="d-flex justify-content-between">
              <div className="product-price d-flex align-items-baseline">
                <span className="text-accent">
                  <FormattedPrice price={product.price} />
                </span>
                {product.origPrice && (
                  <span className="small text-accent mx-2">
                    <del className="fs-sm text-muted">
                      <FormattedPrice price={product.origPrice} />
                    </del>
                  </span>
                )}
              </div>
              <RatingStar rate={product.rating} />
            </div>
            <div className="card-body card-body-hidden">
              <form onSubmit={addToCartHandler}>
                {product?.options && product?.options.length > 0 ? (
                  product?.options.map((option) => {
                    return option?.name === "Color" ? (
                      <div key={option.id} className="pb-2">
                        {option?.values.map(
                          (value: { name: string; id: string }) => (
                            <div
                              key={value.id}
                              className="form-check form-option form-check-inline mb-2"
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                value={value.name}
                                onChange={optionHandler}
                                name={option.name}
                                id={value.id}
                                required
                              />
                              <label
                                className="form-option-label rounded-circle"
                                htmlFor={value.id}
                              >
                                <span
                                  className="form-option-color rounded-circle"
                                  style={labelBg(value.name)}
                                ></span>
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    ) : option?.name === "Size" ? (
                      <div key={option.id} className="d-flex mb-2">
                        <select
                          className="form-select select-size form-select-sm me-2"
                          onChange={optionHandler}
                          name="Size"
                          required
                        >
                          <option value="">Select Size</option>
                          {option.values.map(
                            (value: { name: string; id: string }) => (
                              <option value={value.name} key={value.id}>
                                {value.name}
                              </option>
                            )
                          )}
                        </select>
                        <button
                          className="btn btn-primary btn-sm"
                          type="submit"
                        >
                          <i className="ci-cart fs-sm me-1"></i>
                          Add to Cart
                        </button>
                      </div>
                    ) : null;
                  })
                ) : (
                  <button
                    className="btn btn-primary btn-sm m-auto d-flex align-items-center"
                    type="submit"
                  >
                    <i className="ci-cart fs-sm me-1"></i>
                    Add to Cart
                  </button>
                )}
              </form>
              <div className="text-start">
                <a
                  className="nav-link-style fs-ms"
                  onClick={() => quickViewHandler(product)}
                  data-bs-toggle="quickViewModal"
                >
                  <i className="ci-eye align-middle me-1"></i>
                  Quick view
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .card-body.card-body-hidden {
            height: 100%;
          }
          .card.product-card {
            height: 250px;
          }
          .select.form-select.select-size {
            max-width: 14rem;
          }
        `}
      </style>
    </>
  );
}
