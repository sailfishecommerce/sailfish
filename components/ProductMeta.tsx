import Head from "next/head";
import { productType } from "@/types";

interface Props {
  product: productType;
}

export default function ProductMeta({ product }: Props) {
  return (
    <Head>
      <script id="productLDJSon" type="application/ld+json">
        {`{
            "@context":"https://schema.org",
            "@type":"Product",
            "name":"${product.name}",
            "description":"${product.description}",      
            "image":"${product.images[0]?.file?.url}",
            "url":"https://livehealthy.hk/products/${product.slug}",        
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "${product.rating}",
              "reviewCount": "${product.review_rating}"
            },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue":"${product.rating}",
                "bestRating":"${product.review_rating}"
                },
              "author":{
                "@type":"Organization",
                "name":"Live healthy",
                "url":"https://livehealthy.hk/",
                "logo": "//cdn.shopify.com/s/files/1/0040/1699/6481/files/Sailfish-logo.png?v=1626620681"
              }
            },
            "brand":{
              "@type":"Brand",
              "name":"${product.name}"
            },                  
            "isbn":"${product.id}",
            "sku":"${product.id}",
            "offers": {
              "@type": "Offer",
              "url":"https://livehealthy.hk/products/${product.slug}",        
              "priceValidUntil": "2022-12-31",
              "availability": "https://schema.org/InStock",
              "price":"${product.price}",
              "priceCurrency": "USD"
            }
          }
        `}
      </script>
      <meta title={product.meta_title} />
      <meta name="description" content={product.description} />
    </Head>
  );
}
