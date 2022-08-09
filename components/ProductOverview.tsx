import ProductBanner from "@/components/ProductBanner";
import ProductDescription from "@/components/ProductDescription";
import ProductGalleryDetails from "@/components/ProductGalleryDetails";
import ProductReview from "@/components/ProductReview";
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
