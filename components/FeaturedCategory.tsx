/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";
import { useAppDispatch } from "@/hooks/useRedux";
import useRequest from "@/hooks/useRequest";
import { updateCategory } from "@/redux/category-slice";
import CategoryBanner from "./CategoryBanner";
import FeaturedCategoryCarousel from "./Carousel/FeaturedCategoryCarousel";

export default function FeaturedCategory() {
  const deviceWidth = useMediaQuery("(max-width:600px)");
  const dispatch = useAppDispatch();
  const { useCategories } = useRequest();
  const { categoryData, categoryStatus } = useCategories();
  const arrayType = deviceWidth ? 4 : 6;

  let categoryArr: any[] = [];

  function batchCategories() {
    let categoryDataArray = categoryData?.results;
    for (let i = 0; i <= categoryDataArray.length; i = i + arrayType) {
      if (i <= categoryDataArray.length) {
        const catArr: any[] = categoryDataArray.slice(i, i + arrayType);
        categoryArr.push(catArr);
      }
    }
    dispatch(updateCategory(categoryArr));
  }

  useEffect(() => {
    if (categoryStatus === "success") {
      batchCategories();
    }
  }, [categoryStatus]);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const controlRef = {
    navigationNextRef,
    navigationPrevRef,
  };
  return (
    <section className="container mb-4 pb-3 pb-sm-0 mb-sm-5">
      <div className="row">
        {/*<!-- Banner with controls-->*/}
        <CategoryBanner
          controls={controlRef}
          categoryTitle="Shop for medicine"
          categoryImg="/img/shop/featured_category_image.webp"
          categoryCaption="Get started now"
          bannerBgColor="#F3C2CC"
          local
        />
        {/*<!-- Product grid (carousel)-->*/}
        <FeaturedCategoryCarousel controls={controlRef} />
      </div>
    </section>
  );
}

FeaturedCategory.whyDidYouRender = true;
