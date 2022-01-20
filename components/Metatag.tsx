import Head from "next/head";

export default function Metatag() {
  return (
    <Head>
      <meta property="og:site_name" content="Live healthy" />
      <meta property="og:url" content="https://livehealthy.hk/" />
      <meta
        property="og:title"
        content="Live healthy Store - Quality Australian Products - Free Shipping to HK"
      />
      <meta property="og:type" content="website" />
      <meta
        name="description"
        content="No minimum orders and free shipping to Hong Kong. Quality imported products from Australia. Choose from over 10,000 genuine health, personal care, confectionery, beauty and baby care products. Get vitamins, health and food supplements, cosmetics, confectionery, quit smoking aids, hair colours, baby food and much more. Owned & operated by HK'ers."
      />

      <meta name="twitter:site" content="@https://" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Live healthy Store - Quality Australian Products - Free Shipping to HK"
      />
      <meta property="og:image:width" content="1000" />
      <meta property="og:image:height" content="1000" />
      <meta
        property="og:image"
        content="https://cdn.shopify.com/s/files/1/0040/1699/6481/files/Facebook_DP_97730035-fb01-4b92-930e-1e651e16b00b.png?v=1627736864"
      />
      <meta
        name="twitter:description"
        content="No minimum orders and free shipping to Hong Kong. Quality imported products from Australia. Choose from over 10,000 genuine health, beauty and baby care products. Get vitamins, health and food supplements, cosmetics, quit smoking aids, hair colours, baby food and much more. Owned &amp; operated by HK'ers."
      />
      <script type="application/ld+json">
        {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "url":"https://livehealthy.hk/",
            "logo": "//cdn.shopify.com/s/files/1/0040/1699/6481/files/Sailfish-logo.png?v=1626620681"
          }`}
      </script>
      <script type="application/ld+json">
        {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "url":"https://livehealthy.hk/",
            "logo": "//cdn.shopify.com/s/files/1/0040/1699/6481/files/Sailfish-logo.png?v=1626620681"
          }`}
      </script>
    </Head>
  );
}
