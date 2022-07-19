export default function discountPrice(product: any) {
  const priceDifference = product.price - product.sale_price;
  const productPriceRatio = priceDifference / product.price;

  const productDiscount = Math.ceil(productPriceRatio * 100);
  return productDiscount;
}
