/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useEffect } from "react";
import swell from "swell-node";
import swellNodeInit from "@/lib/swellNode";

import FeaturedCategory from "@/components/FeaturedCategory";
import InfoCards from "@/components/InfoCards";
import PopularCategories from "@/components/PopularCategories";
import Banners from "@/components/Banner";
import Applayout from "@/layout/Applayout";
import HomepageSlider from "@/previewComponents/HomepageSlider";
import useVbout from "@/hooks/useVbout";
import { useCart } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { createCartVbout } from "@/redux/integration-slice";
import Metatag from "@/components/Metatag";
import TrendingProducts from "@/components/TrendingProduct";

export default function Index({ products }: any) {
  const { createVboutCart } = useVbout();
  const dispatch = useAppDispatch();
  const vboutSlice = useAppSelector((state) => state.integrations);
  const { cart }: any = useCart();

  console.log("products", products);

  const vboutContent = {
    id: cart?.id,
    cartId: cart?.id,
    email: cart?.account?.email,
    customerInfo: {
      firstname: cart?.account?.firstname,
      lastname: cart?.account?.lastname,
    },
  };

  useEffect(() => {
    if (cart !== null && !vboutSlice?.vbout.createCart) {
      dispatch(createCartVbout());
      createVboutCart(vboutContent);
    }
  }, [cart]);

  return (
    <Applayout title="Live healthy Store - Quality Australian Products - Free Shipping to HK">
      <Metatag />
      <HomepageSlider
        bgColor1="#3aafd2"
        bgColor2="#f5b1b0"
        bgColor3="#eba170"
        sliderTitle1="Huge Summer Collection"
        sliderTitle2="Women Sportswear Sale"
        sliderTitle3="New Men Accessories"
        sliderCaption1="Has just arrived!"
        sliderCaption2="Hurry up! Limited time offer."
        sliderCaption3="Complete your look with"
        sliderDescription1="Swimwear, Tops, Shorts, Sunglasses &amp; much more..."
        sliderDescription2="Sneakers, Keds, Sweatshirts, Hoodies &amp; much more..."
        sliderDescription3="Hats &amp; Caps, Sunglasses, Bags &amp; much more..."
        sliderImg1="/img/home/hero-slider/01.jpg"
        sliderImg2="/img/home/hero-slider/02.jpg"
        sliderImg3="/img/home/hero-slider/03.jpg"
      />
      <PopularCategories />
      <TrendingProducts products={products} />
      <div className="text-center pt-5 mt-5">
        <Link href="/shop" passHref>
          <a className="btn btn-outline-accent">
            More products<i className="ci-arrow-right ms-1"></i>
          </a>
        </Link>
      </div>
      <FeaturedCategory
        categoryTitle="Shop for medicine"
        categoryCaption="Get started now"
        bannerBgColor="#F3C2CC"
        local
        categoryImg="/img/shop/featured_category_image.webp"
      />
      <Banners
        banner1Title="Hurry up! Limited time offer"
        banner2Title="Your Add Banner Here"
        banner1Caption="Converse All Star on Sale"
        banner2Caption="Hurry up to reserve your spot"
      />
      <InfoCards
        section1Title="Read the blog"
        section1Description="Latest store, fashion news and trends"
        section1BgColor="#FEF1F1"
        section2Title="Follow on Instagram"
        section2Description="Latest store, fashion news and trends"
        section2BgColor="#EFEFFB"
      />
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
