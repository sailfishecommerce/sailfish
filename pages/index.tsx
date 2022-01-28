/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import swell from "swell-node";

import swellNodeInit from "@/lib/swellNode";
import FeaturedCategory from "@/components/FeaturedCategory";
import InfoCards from "@/components/InfoCards";
import PopularCategories from "@/components/PopularCategories";
import Banners from "@/components/Banner";
import Applayout from "@/layout/Applayout";
import HomepageSlider from "@/components/HomepageSlider";
import useVbout from "@/hooks/useVbout";
import { useCart } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { createCartVbout } from "@/redux/integration-slice";
import Metatag from "@/components/Metatag";
import TrendingProducts from "@/components/TrendingProduct";
import ShopByBrandCarousel from "@/components/ShopByBrandCarousel";
import useUserToken from "@/hooks/useUserToken";
import { useQueryClient } from "react-query";
import usePrefetch from "@/hooks/usePrefetch";
import useShoppingCart from "@/hooks/useShoppingCart";

export default function Index({ products }: any) {
  const { createVboutCart } = useVbout();
  const { getShopCart } = useShoppingCart();
  const { getCategories, fetchCurrencies, getUserAccountDetails, getCart } =
    usePrefetch();

  getCategories();
  fetchCurrencies();
  getUserAccountDetails();
  getCart();

  const dispatch = useAppDispatch();
  const vboutSlice = useAppSelector((state) => state.integrations);
  const cart = getShopCart();

  const { generateUserToken, authorized } = useUserToken();
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   generateUserToken();
  // }, [authorized]);

  const vboutContent = {
    id: cart?.id,
    cartId: cart?.id,
    email: cart?.account?.email,
    customerInfo: {
      firstname: cart?.account?.firstname,
      lastname: cart?.account?.lastname,
    },
  };

  // useEffect(() => {
  //   if (cart !== null && !vboutSlice?.vbout.createCart) {
  //     dispatch(createCartVbout());
  //     createVboutCart(vboutContent);
  //   }
  // }, [cart]);

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
  });

  return {
    props: {
      products: products.results,
    },
  };
}
