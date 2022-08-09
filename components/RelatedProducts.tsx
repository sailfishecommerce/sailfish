/* eslint-disable no-nested-ternary */
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

import useSwellProduct from "@/hooks/useSwellProduct";
import type { hitType } from "@/types";

const ProductSlider = dynamic(
  () =>
    import(
      /* webpackChunkName: 'ProductSlider' */ "@/components/Carousel/ProductSlider"
    )
);

interface Props {
  hit: hitType;
}

export default function RelatedProducts({ hit }: Props) {
  const { getVendorProduct } = useSwellProduct();
  const { data, status } = useQuery(`get-vendor-${hit?.slug}`, () =>
    getVendorProduct(hit?.vendor)
  );

  let relatedProducts = [];
  let alsoBoughtProducts = [];
  const productData = data?.data?.results;

  if (status === "success") {
    relatedProducts = productData.slice(0, 15);
    alsoBoughtProducts = productData.slice(15, 30);
  }

  return (
    <>
      <div className="mt-6 px-0 mx-0" />
      {status === "error" ? (
        "unable to load related products"
      ) : status === "loading" ? (
        "loading..."
      ) : (
        <>
          <ProductSlider
            products={relatedProducts}
            title="Customers also purchased"
            productClassName="border border-gray-200 mr-6 rounded-lg"
          />
          {productData.length > 15 && (
            <ProductSlider
              title="Popular with"
              productName={hit?.name}
              products={alsoBoughtProducts}
              productClassName="border border-gray-200 mr-6 rounded-lg"
            />
          )}
        </>
      )}
    </>
  );
}
