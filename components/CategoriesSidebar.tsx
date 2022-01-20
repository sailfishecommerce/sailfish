import { useQuery } from "react-query";

import CategoryItem from "@/components/CategoryItem";
import useCategory from "@/hooks/useCategory";
import PriceSlider from "@/components/PriceSlider";
import FilterBySize from "@/components/FilterBySize";
import FilterByColor from "@/components/FilterByColor";
import LoadCategorySidebar from "@/components/CategorySidebarLoader";
import { attributeType, categorySlugType } from "@/types";
import useSwellProducts from "@/hooks/useSwellProducts";
import useFilter from "@/hooks/useFilter";

type categoryType = {
  name: string;
  id: string;
  topId?: string;
  slug: string;
};

interface CategoriesSidebar {
  categorySlug: categorySlugType;
}

export default function CategoriesSidebar({ categorySlug }: CategoriesSidebar) {
  const { filter, onChangeFilter } = useFilter();
  const { listAllCategory } = useCategory();
  const { getAllAttributes } = useSwellProducts();
  const { data: allCategories, status } = useQuery(
    "listAllCategory",
    listAllCategory
  );
  const { data: attributeData, status: attributeStatus } = useQuery(
    "getAllAttributes",
    getAllAttributes
  );
  const subCategories = allCategories?.results.filter(
    (category: any) => category.topId
  );
  const topCategories = allCategories?.results.filter(
    (category: any) => !category.topId
  );
  const validAttributes = attributeData?.results.filter(
    (result: any) => result.searchable
  );

  return (
    <aside className="col-lg-3">
      <div
        className="offcanvas offcanvas-collapse bg-white w-100 rounded-3 shadow-lg py-1"
        id="shop-sidebar"
      >
        <div className="offcanvas-header align-items-center shadow-sm">
          <h2 className="h5 mb-0">Filters</h2>
          <button
            className="btn-close ms-auto"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body py-grid-gutter px-lg-grid-gutter">
          <div className="widget widget-categories mb-4 pb-4 border-bottom">
            <h3 className="widget-title">Categories</h3>
            <div className="accordion mt-n1" id="shop-categories">
              {status === "error" ? (
                <p>Unable to fetch product categories</p>
              ) : status === "loading" ? (
                <LoadCategorySidebar />
              ) : (
                topCategories.map((category: categoryType) => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    categorySlug={categorySlug}
                    subCategories={subCategories}
                  />
                ))
              )}
            </div>
          </div>
          <PriceSlider onChangeFilter={onChangeFilter} />
          {validAttributes?.map((attribute: attributeType) =>
            attribute.name === "Size" ? (
              <FilterBySize
                attribute={attribute}
                onChangeFilter={onChangeFilter}
              />
            ) : (
              attribute.name === "Color" && (
                <FilterByColor attribute={attribute} />
              )
            )
          )}
        </div>
      </div>
    </aside>
  );
}
