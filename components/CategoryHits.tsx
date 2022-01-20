import { ProductHit, ProductHitList } from "@/components/ProductHit";
import useCategory from "@/hooks/useCategory";
import { useAppSelector } from "@/hooks/useRedux";
import { hitType } from "@/types";
import ShopLoader from "./ShopLoader";

interface Props {
  hits?: any;
}

export default function CategoryHits({ hits }: Props) {
  const { useCategoryProducts } = useCategory();
  const { data }: any = useCategoryProducts(hits.slug);
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
