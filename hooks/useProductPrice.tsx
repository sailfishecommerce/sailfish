import React from "react";
import useCurrency from "@/hooks/useCurrency";
import FormattedPrice, { HkdPrice } from "@/lib/formatPrice";

export default function useProductPrice(product: any) {
  const { currency } = useCurrency();
  const productPrice =
    currency === "HKD" ? product?.hkd_selling_price : product.price;

  function price() {
    return (
      <div className="price d-flex">
        {currency === "HKD" ? (
          <HkdPrice price={productPrice} />
        ) : (
          <FormattedPrice price={productPrice} />
        )}
      </div>
    );
  }
  function oldPrice() {
    return (
      <div className="price d-flex">
        {currency === "HKD" && (
          <del>
            <HkdPrice price={product?.hkd_compare_at_price} />
          </del>
        )}
      </div>
    );
  }

  return {
    price,
    oldPrice,
  };
}
