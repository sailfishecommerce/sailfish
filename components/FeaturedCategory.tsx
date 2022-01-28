/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";

import CategoryBanner from "./CategoryBanner";
import FeaturedCategoryCarousel from "./Carousel/FeaturedCategoryCarousel";

export default function FeaturedCategory() {
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
        <CategoryBanner controls={controlRef} />
        {/*<!-- Product grid (carousel)-->*/}
        <FeaturedCategoryCarousel controls={controlRef} />
      </div>
    </section>
  );
}

FeaturedCategory.whyDidYouRender = true;
