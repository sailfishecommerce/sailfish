/* eslint-disable @next/next/no-img-element */
import { PropsWithChildren } from "react";

import type { productType } from "@/types";
import ProductGallery from "@/components/Product/ProductGallery";
import ProductDetail from "@/components/Product/ProductDetail";

interface Props {
  product: productType;
}

interface containerProps {
  children: any;
}

function ProductGalleryDetailsContainer({
  children,
}: PropsWithChildren<containerProps>) {
  return (
    <div className="container bg-light shadow-lg rounded-3 px-4 py-3 mb-5">
      <div className="px-lg-3">
        <div className="row">{children}</div>
      </div>
    </div>
  );
}

export default function ProductGalleryDetails({ product }: Props) {
  return (
    <ProductGalleryDetailsContainer>
      <ProductGallery product={product} />
      <ProductDetail product={product} />
    </ProductGalleryDetailsContainer>
  );
}
