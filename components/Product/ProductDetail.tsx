import { useState } from "react";
import dynamic from "next/dynamic";

import {
  PaymentNote,
  ShareProductLink,
} from "@/components/Product/ProductView";
import ProductPanel from "@/components/Product/ProductPanel";
import { productType } from "@/types";
import FormattedPrice from "@/lib/formatPrice";
import Rating from "@/components/Rating";
import ProductForm from "@/components/Product/ProductForm";

interface Props {
  product: productType;
}

const DynamicContactModal = dynamic(
  () => import("@/components/ContactForMoreModal")
);

export default function ProductDetail({ product }: Props) {
  const [modal, setModal] = useState(false);

  function toggleModal() {
    setModal(!modal);
  }

  return (
    <div className="col-lg-5 pt-4 pt-lg-0">
      <div className="product-details ms-auto pb-3">
        <DynamicContactModal
          show={modal}
          onHide={toggleModal}
          productName={product.name}
        />
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Rating product={product} />
          <button
            className="btn-wishlist me-0 me-lg-n3"
            type="button"
            data-bs-toggle="tooltip"
            title="Add to wishlist"
          >
            <i className="ci-heart"></i>
          </button>
        </div>
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span className="h3 fw-normal text-accent me-1">
              <FormattedPrice price={product.sale_price} />
            </span>
            {product.compare_at_price > 0 && (
              <span className="h5 fw-normal text-accent mx-2">
                <del>
                  <FormattedPrice price={product.price} />
                </del>
              </span>
            )}
          </div>
          <span className="badge bg-danger badge-shadow align-middle mt-n2">
            Sale
          </span>
        </div>
        <ProductForm product={product} />
        <div className="d-flex flex-column flex-start align-items-start">
          <button
            onClick={toggleModal}
            className="notEnoughLink btn btn-link link-accent text-decoration-underline px-0"
          >
            Not enough? Contact us for more
          </button>
        </div>
        {product?.content?.productBenefits && (
          <ProductPanel product={product} />
        )}
        <ShareProductLink />
        <PaymentNote />
      </div>
      <style jsx>
        {`
          .notEnoughLink:hover {
            color: red;
          }
        `}
      </style>
    </div>
  );
}
