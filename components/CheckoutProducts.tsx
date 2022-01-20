/* eslint-disable @next/next/no-img-element */
import useCart from "@/hooks/useCart";
import { cartType, productType } from "@/types";
import { CheckoutNote } from "./SlideCartNote";

interface CartProductProps {
  product: productType;
}

function CartProduct({ product }: CartProductProps) {
  return (
    <div className="d-flex">
      <img src={product.images[0].file.url} alt={product.name} />
      <div className="details d-flex flex-column">
        <h2>{product.name}</h2>
        <div className="price-view">
          <div className="quantity d-flex flex-column">
            <p>Quantity</p>
            <input type="number" value={product.quantity} />
          </div>
          <div className="price d-flex flex-column justify-content-end">
            <h3>US $ {product.price}</h3>
            <a className="btn btn-link">Remove</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DiscountCoupon() {
  return (
    <div className="discount-coupon d-flex flex-column mt-5 justify-content-end">
      <p className="text-muted">Applied Discounts</p>
      <p>$50 Special Discount</p>
      <div className="discount-input d-flex align-items-center">
        <input className="border" placeholder="Enter discount coupon" />{" "}
        <button className="btn btn-success mx-2">ADD</button>
      </div>
      <div className="price-group">
        <p>US $ 8,000</p>
        <p className="text-danger">US $ 100</p>
        <b> US$ 7,900</b>
      </div>
    </div>
  );
}

export default function CheckoutProducts() {
  const { cart }: any = useCart();
  return (
    <div className="row">
      <div className="flex-column col-6 col-sm-12">
        <CheckoutNote />
        <div className="product-group d-flex flex-column mb-5">
          {cart.items.map((product: productType) => (
            <CartProduct key={product.id} product={product} />
          ))}
        </div>
        <DiscountCoupon />
      </div>
    </div>
  );
}
