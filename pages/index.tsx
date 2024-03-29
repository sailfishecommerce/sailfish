/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import swell from "swell-node";

import swellNodeInit from "@/lib/swellNode";
import FeaturedCategory from "@/components/Category/FeaturedCategory";
import InfoCards from "@/components/Cards/InfoCards";
import PopularCategories from "@/components/Category/PopularCategories";
import Banners from "@/components/Banner";
import Applayout from "@/layout/Applayout";
import HomepageSlider from "@/components/Slider/HomepageSlider";
import Metatag from "@/components/Metatag";
import TrendingProducts from "@/components/Product/TrendingProduct";
import ShopByBrandCarousel from "@/components/Slider/ShopByBrandCarousel";
import useUserToken from "@/hooks/useUserToken";

export default function Index({ products }: any) {
  const { generateUserToken, authorized } = useUserToken();

  useEffect(() => {
    generateUserToken();
  }, [authorized]);

  return (
    <Applayout title="Live healthy Store - Quality Australian Products - Free Shipping to HK">
      <Metatag />
      <HomepageSlider />
      <PopularCategories />
      <TrendingProducts products={products} />
      <FeaturedCategory />
      <Banners />
      <ShopByBrandCarousel />
      <InfoCards />
      <style jsx>
        {`
          @media (min-width: 800px) {
            .reviewBadge {
              width: 400px;
            }
          }
          @media (max-width: 768px) {
            .reviewBadge {
              display: none;
            }
          }
        `}
      </style>
    </Applayout>
  );
}

export async function getStaticProps() {
  swellNodeInit();
  const products: any = await swell.get("/products", {
    where: { select_store: "livehealthy" },
    limit: 16,
  });

  return {
    props: {
      products: products.results,
    },
  };
}
