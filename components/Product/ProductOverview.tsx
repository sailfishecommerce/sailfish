import ProductBanner from "@/components/Product/ProductBanner";
import ProductDescription from "@/components/Product/ProductDescription";
import ProductGalleryDetails from "@/components/Product/ProductGalleryDetails";
import ProductReview from "@/components/Product/ProductReview";
import RelatedProducts from "@/components/RelatedProducts";

interface ProductOverviewProps {
  pageProduct?: any;
}

export default function ProductOverview({ pageProduct }: ProductOverviewProps) {
  return (
    <section>
      <ProductBanner product={pageProduct} />
      <ProductGalleryDetails product={pageProduct} />
      <ProductDescription product={pageProduct} />
      <ProductReview rating={pageProduct?.rating} />
      <RelatedProducts hit={pageProduct} />
    </section>
  );
}
