import Head from "next/head";
import Applayout from "@/layout/Applayout";
import ProductOverview from "@/components/ProductOverview";
import fetchAllSwellProducts from "@/lib/processPageproduct";

interface ProductPage {
  pageProduct: any;
}
export default function ProductPage({ pageProduct }: ProductPage) {
  const productDescription = pageProduct.description.replace(
    /<\/?[^>]+(>|$)/g,
    ""
  );
  return (
    <>
      <Applayout title={pageProduct.meta_title}>
        <Head>
          {pageProduct.tags && (
            <meta name="keywords" content={pageProduct.tags[0]} />
          )}
          <meta name="description" content={productDescription} />
          <meta
            property="og:title"
            content={pageProduct.meta_title}
            key="ogtitle"
          />
          <meta property="og:type" content="product" />
          <meta property="og:price:amount" content={pageProduct.price} />
          <meta
            property="og:url"
            content={`https://www.livehealthy.hk/products/${pageProduct.slug}`}
            key="ogurl"
          />
          <meta property="og:price:currency" content="USD" />
          <meta
            property="og:image"
            content={pageProduct.images[0].file.url}
            key="ogimage"
          />
          <meta
            property="og:image:secure_url"
            content={pageProduct.images[0].file.url}
            key="ogimage"
          />
          <meta
            property="og:site_name"
            content="Live healthy"
            key="ogsitename"
          />
          <meta
            property="og:description"
            content={productDescription}
            key="ogdesc"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={pageProduct.meta_title}
            key="ogtwtitle"
          />
          <meta name="twitter:description" content={productDescription} />
        </Head>
        <ProductOverview pageProduct={pageProduct} />
      </Applayout>
    </>
  );
}

type propsType = {
  params: { slug: string };
};

export async function getStaticProps({ params }: propsType) {
  const productData: any = await fetchAllSwellProducts();
  const results: any = await Promise.all(productData);

  const pageProduct = results[0].filter(
    (product: { slug: any }) => product?.slug === params.slug
  );

  return {
    props: {
      pageProduct: pageProduct[0],
    },
  };
}

export async function getStaticPaths() {
  const productData: any = await fetchAllSwellProducts();

  const results: any = await Promise.all(productData);

  return {
    paths:
      results[0].map((product: { slug: any }) => `/products/${product.slug}`) ||
      [],
    fallback: false,
  };
}
