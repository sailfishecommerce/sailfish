import SingleShopProductCarousel1 from "@/components/Carousel/SingleShopProductCarousel1";
import ProductBanner from "@/components/ProductBanner";
import ProductDescription from "@/components/ProductDescription";
import ProductGalleryDetails from "@/components/ProductGalleryDetails";
import ProductReview from "@/components/ProductReview";

interface ProductOverviewProps {
  pageProduct?: any;
}

export default function ProductOverview({ pageProduct }: ProductOverviewProps) {
  return (
    <div>
      <ProductBanner product={pageProduct} />
      <ProductGalleryDetails product={pageProduct} />
      <ProductDescription product={pageProduct} />
      <ProductReview rating={pageProduct?.rating} />
      {/* <SingleShopProductCarousel1
        product={pageProduct}
        otherProducts={products}
      /> */}
    </div>
  );
}
