import React from "react";
import useCurrency from "@/hooks/useCurrency";
import FormattedPrice from "@/lib/formatPrice";

export default function useProductPrice(product: any) {
  const { currency } = useCurrency();
  const productPrice = product.price;

  function price() {
    return (
      <div className="price d-flex">
        <FormattedPrice price={productPrice} />
      </div>
    );
  }
  function oldPrice() {
    return (
      <div className="price d-flex">
        <del>
          <FormattedPrice price={product?.hkd_compare_at_price} oldPrice/>
        </del>
      </div>
    );
  }

  return {
    price,
    oldPrice,
  };
}
