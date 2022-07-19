import Metatag from "@/components/Metatag";
import Applayout from "@/layout/Applayout";
import VendorView from "@/components/VendorView";
import styles from "@/styles/shop.module.css";
import filterProducts from "@/lib/filterProducts";

export default function Vendors({ vendorProducts }: any) {
  console.log("vendorProducts", vendorProducts);
  return (
    <Applayout title="Live healthy Store - Quality Australian Products - Free Shipping to HK">
      <Metatag />
      <div className={styles.shop}>
        <VendorView vendor={vendorProducts} />
      </div>
    </Applayout>
  );
}

export async function getServerSideProps(context: any) {
  const vendor = context.query.vendor;

  const vendorProducts = await filterProducts({ vendor: vendor });

  return {
    props: {
      vendorProducts,
    },
  };
}
