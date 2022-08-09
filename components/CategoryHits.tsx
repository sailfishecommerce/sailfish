import { useQuery } from "react-query";

import { ProductHit, ProductHitList } from "@/components/Product/ProductHit";
import useCategory from "@/hooks/useCategory";
import { useAppSelector } from "@/hooks/useRedux";
import { hitType } from "@/types";
import ShopLoader from "@/components/ShopLoader";

interface Props {
  hits?: any;
}

export default function CategoryHits({ hits }: Props) {
  const { getProductsInACategory } = useCategory();
  const { data, status } = useQuery("useCategoryProducts", () =>
    getProductsInACategory(hits.slug)
  );

  //   const filterHits = hits.filter((fhits) => fhits?.images.length !== 0);
  const { productView } = useAppSelector((state) => state.shop);

  console.log("data", data);
  return (
    <>
      {/* {filterHits && filterHits.length > 0 ? (
        <div className="ais-InfiniteHits">
          <ul className="ais-InfiniteHits-list">
            {productView === "grid" ? (
              <ProductHit hits={filterHits} />
            ) : (
              <ProductHitList hits={filterHits} />
            )}
          </ul>
          <style jsx>
            {`
              ul.ais-InfiniteHits-list {
                padding: 0px;
                list-style: none;
              }
            `}
          </style>
        </div>
      ) : (
        <ShopLoader />
      )} */}
    </>
  );
}
