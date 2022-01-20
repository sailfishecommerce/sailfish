/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { cartType, itemType } from "@/types";
import FormattedPrice from "@/lib/formatPrice";

interface OrderdetailsProps {
  cart: cartType;
}

interface OrderdetailsItemProps {
  item: itemType;
}

function OrderdetailsItem({ item }: OrderdetailsItemProps) {
  return (
    <div className="d-sm-flex justify-content-between my-4 pb-3 border-bottom">
      <div className="d-sm-flex text-center text-sm-start">
        <Link href={`/products/${item.product.slug}`} passHref>
          <a className="d-inline-block flex-shrink-0 mx-auto me-sm-4">
            <img
              src={item.product.images[0].file.url}
              alt={item.product.name}
              width="160"
            />
          </a>
        </Link>
        <div className="pt-2">
          <h3 className="product-title fs-base mb-2">
            <Link href={`/products/${item.product.slug}`} passHref>
              <a>{item.product.name}</a>
            </Link>
          </h3>
          <div className="fs-sm">
            <span className="text-muted me-2">Brand:</span>
            Tommy Hilfiger
          </div>
          <div className="fs-sm">
            <span className="text-muted me-2">Color:</span>
            Khaki
          </div>
          <div className="fs-lg text-accent pt-2">
            <FormattedPrice price={item.price} />
          </div>
        </div>
      </div>
      <div className="QuantityView pt-2 pt-sm-0 ps-sm-3 mx-auto mx-sm-0 text-center text-sm-end">
        <p className="mb-0">
          <span className="text-muted fs-sm">Quantity:</span>
          <span>&nbsp;{item.quantity}</span>
        </p>
        <button className="btn btn-link px-0" type="button">
          <i className="ci-edit me-2"></i>
          <span className="fs-sm">Edit</span>
        </button>
      </div>
      <style jsx>
        {`
          .QuantityView {
            maxwidth: 9rem;
          }
        `}
      </style>
    </div>
  );
}

export default function Orderdetails({ cart }: OrderdetailsProps) {
  return (
    <div>
      <h2 className="h6 pt-1 pb-3 mb-3 border-bottom">Review your order</h2>
      {cart.items.map((item: itemType) => (
        <OrderdetailsItem key={item.productId} item={item} />
      ))}
    </div>
  );
}
