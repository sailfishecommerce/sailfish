/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useRef } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";
import { useAppDispatch } from "@/hooks/useRedux";
import useRequest from "@/hooks/useRequest";
import { updateCategory } from "@/redux/category-slice";
import CategoryBanner from "./CategoryBanner";
import FeaturedCategoryCarousel from "./Carousel/FeaturedCategoryCarousel";

interface FeaturedCategoryProps {
  categoryImg?: string;
  categoryTitle: string;
  categoryCaption: string;
  bannerBgColor: string;
  local?: boolean;
}

export default function FeaturedCategory({
  categoryImg,
  categoryTitle,
  categoryCaption,
  bannerBgColor,
  local,
}: FeaturedCategoryProps) {
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
          categoryTitle={categoryTitle}
          categoryImg={categoryImg}
          categoryCaption={categoryCaption}
          bannerBgColor={bannerBgColor}
          local={local}
        />
        {/*<!-- Product grid (carousel)-->*/}
        <FeaturedCategoryCarousel controls={controlRef} />
      </div>
    </section>
  );
}
