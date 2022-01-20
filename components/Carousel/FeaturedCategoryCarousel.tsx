/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { SwiperSlide } from "swiper/react";

import useMediaQuery from "@/hooks/useMediaQuery";
import useRequest from "@/hooks/useRequest";
import Category from "../Category";
import LoadCategory from "../CategoryLoader";
import SliderView from "../SliderView";

interface Props {
  controls: {
    navigationNextRef: any;
    navigationPrevRef: any;
  };
}

export default function FeaturedCategoryCarousel({ controls }: Props) {
  const [categoryArray, setCategoryArray] = useState<any[]>([]);
  const deviceWidth = useMediaQuery("(max-width:600px)");
  const { useCategories } = useRequest();
  const { categoryData, categoryStatus } = useCategories();
  const arrayType = deviceWidth ? 4 : 4;
  const gridStyle = deviceWidth ? "col-2" : "col-lg-6";

  let categoryArr: any[] = [];

  function batchCategories() {
    let categoryDataArray = categoryData.results.slice(12);
    for (let i = 0; i <= categoryDataArray.length; i = i + arrayType) {
      if (i <= categoryDataArray.length) {
        const catArr: any[] = categoryDataArray.slice(i, i + arrayType);
        categoryArr.push(catArr);
      }
      setCategoryArray(categoryArr);
    }
  }

  useEffect(() => {
    if (categoryStatus === "success") {
      batchCategories();
    }
  }, [categoryStatus]);

  return (
    <div className="col-md-7 pt-4 pt-md-0">
      {categoryStatus === "error" ? (
        "error loading categories"
      ) : categoryStatus === "loading" ? (
        <LoadCategory arrayType={arrayType} gridStyle={gridStyle} />
      ) : (
        <SliderView
          controls={controls}
          className="w-full"
          autoplay={false}
          slidesPerView={1}
        >
          <div>
            {categoryArray.map((categories, index) => {
              return categories.length > 0 ? (
                <SwiperSlide key={index}>
                  <div>
                    <div className="row mx-n2">
                      {categories.map((category: any) => (
                        <Category key={category.id} category={category} />
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ) : null;
            })}
          </div>
        </SliderView>
      )}
    </div>
  );
}
