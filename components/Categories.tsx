import { CustomRangeSlider } from "./AlgoliaPriceRange";
import { VendorRefinementList } from "./VendorRefinementList";
import { CategoriesRefinementList } from "./CategoriesRefinementList";
import { RatingsList } from "./RatingsRefinementList";
import { MarketplaceCategoriesRefinementList } from "./MarketplaceCategoryRefinementList";
import { TagsRefinementList } from "./TagsRefinementList";

interface CategoriesProps {
  categoryMarketplace?: boolean;
}

export default function Categories({ categoryMarketplace }: CategoriesProps) {
  return (
    <aside className="col-lg-3">
      <div
        className="categoryCanvas offcanvas offcanvas-collapse bg-white w-100 rounded-3 shadow-lg py-1"
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
          {categoryMarketplace ? (
            <MarketplaceCategoriesRefinementList
              searchable={true}
              attribute="product_type"
            />
          ) : (
            <CategoriesRefinementList
              showMoreLimit={100}
              showMore={true}
              searchable={true}
              attribute="product_type"
            />
          )}
          <VendorRefinementList
            showMoreLimit={100}
            showMore={true}
            searchable={true}
            attribute="vendor"
          />
          <TagsRefinementList
            showMoreLimit={100}
            showMore={true}
            searchable={true}
            attribute="tags"
          />
          <CustomRangeSlider attribute="price" />
          <RatingsList attribute="rating" />
        </div>
      </div>
      <style jsx>
        {`
          .categoryCanvas {
            max-width: 22rem;
          }
        `}
      </style>
    </aside>
  );
}
