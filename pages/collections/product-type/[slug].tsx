/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";

import Applayout from "@/layout/Applayout";
import { categoryType } from "@/types";
import CollectionMarketplace from "@/components/View/CollectionMarketplaceView";
import styles from "@/styles/shop.module.css";
import filterProducts from "@/lib/filterProducts";
import getAStoreCategory from "@/lib/getAStoreCategory";

interface collectionProps {
  collection: categoryType;
  productTypeProducts: any[];
  category: string;
}
export default function Category({
  productTypeProducts,
  category,
  collection,
}: collectionProps): JSX.Element {
  return (
    <Applayout
      title={`${collection.name} | Free Delivery to HK | Live healthy Online Store`}
    >
      <Head>
        <meta name="description" content={collection.meta_description} />
        <meta name="keywords" content={collection.name} />
        <meta name="description" content={collection.meta_description} />
        <meta
          property="og:title"
          content={collection.meta_title}
          key="ogtitle"
        />
        <meta property="og:type" content="collection" />
        <meta
          property="og:url"
          content={`https://www.livehealthy.hk/collections/${collection.slug}`}
          key="ogurl"
        />
        <meta
          property="og:image"
          content={collection.images[0].file.url}
          key="ogimage"
        />
        <meta
          property="og:image:secure_url"
          content={collection.images[0].file.url}
          key="ogimage"
        />
        <meta property="og:site_name" content="Live healthy" key="ogsitename" />
        <meta
          property="og:description"
          content={collection.meta_description}
          key="ogdesc"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={collection.meta_title}
          key="ogtwtitle"
        />
        <meta
          name="twitter:description"
          content={collection.meta_description}
        />
      </Head>
      <div className={styles.shop}>
        <CollectionMarketplace collection={collection} category={category} />
      </div>
    </Applayout>
  );
}

export async function getServerSideProps(context: any) {
  const productTypeName = context.query.slug;
  const categoryId = context.query.id;

  const productTypeProducts = await filterProducts({
    product_type_2: productTypeName,
  });

  const storeCategory: any[] = await getAStoreCategory(categoryId);

  return {
    props: {
      productTypeProducts,
      collection: storeCategory,
      category: productTypeName,
    },
  };
}
