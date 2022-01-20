/* eslint-disable @next/next/no-img-element */
import { productType } from "../types";
import ProductGallery from "@/components/ProductGallery";
import ProductPanel from "@/components/ProductPanel";
import ProductDetail from "@/components/ProductDetail";
import { ShareProductLink } from "@/components/ProductView";

interface Props {
  product: productType;
}

export default function ProductGalleryDetails({ product }: Props) {
  return (
    <div className="container bg-light shadow-lg rounded-3 px-4 py-3 mb-5">
      <div className="px-lg-3">
        <div className="row">
          <ProductGallery product={product} />
          <div className="col-lg-5 pt-4 pt-lg-0">
            <div className="product-details ms-auto pb-3">
              <ProductDetail product={product} />
              {product?.content?.productBenefits && (
                <ProductPanel product={product} />
              )}
              <ShareProductLink />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
