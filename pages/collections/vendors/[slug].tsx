import Metatag from "@/components/Metatag";
import Applayout from "@/layout/Applayout";
import VendorView from "@/components/Views/VendorView";
import styles from "@/styles/shop.module.css";
import filterProducts from "@/lib/filterProducts";

export default function Vendors({ vendorProducts, vendor }: any) {
  console.log("vendorProducts", vendorProducts);
  return (
    <Applayout title="Live healthy Store - Quality Australian Products - Free Shipping to HK">
      <Metatag />
      <div className={styles.shop}>
        <VendorView vendor={vendor} />
      </div>
    </Applayout>
  );
}

export async function getServerSideProps(context: any) {
  const vendor = context.query.slug;

  const vendorProducts = await filterProducts({ vendor: vendor });

  return {
    props: {
      vendorProducts: vendorProducts.results,
      vendor,
    },
  };
}
