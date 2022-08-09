import Applayout from "@/layout/Applayout";
import ProductOverview from "@/components/Product/ProductOverview";
import ProductMetatag from "@/components/Product/ProductMetatag";
import getAProduct from "@/lib/getAProduct";

interface ProductPage {
  pageProduct: any;
}
export default function ProductPage({ pageProduct }: ProductPage) {
  return (
    <Applayout title={pageProduct.meta_title}>
      <ProductMetatag pageProduct={pageProduct} />
      <ProductOverview pageProduct={pageProduct} />
    </Applayout>
  );
}

export async function getServerSideProps(context: any) {
  const productData: any = await getAProduct(context.query.id);

  return {
    props: {
      pageProduct: productData,
    },
  };
}
