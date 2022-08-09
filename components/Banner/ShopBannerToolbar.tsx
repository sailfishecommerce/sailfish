import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateProductView } from "@/redux/shop-slice";
import AlgoliaSortby from "@/components/AlgoliaWidgets/AlgoliaSortby";

export default function ShopBannerToolbar() {
  const dispatch = useAppDispatch();
  const { productView } = useAppSelector((state) => state.shop);

  const gridStyle = productView === "grid" ? "bg-light" : "nav-link-light";
  const listStyle = productView === "list" ? "bg-light" : "nav-link-light";

  function updateView(viewType: "grid" | "list") {
    dispatch(updateProductView(viewType));
  }
  return (
    <div className="ShopBannerToolbar d-flex justify-content-center justify-content-sm-between align-items-center pt-2 pb-4 pb-sm-5">
      <AlgoliaSortby
        defaultRefinement="LIVEHEALTHY_PRODUCTION_INDEX"
        items={[
          { value: "LIVEHEALTHY_PRODUCTION_INDEX", label: "Featured" },
          { value: "LIVEHEALTHY_PRODUCTION_INDEX_a-z", label: "Name A-Z" },
          { value: "LIVEHEALTHY_PRODUCTION_INDEX_z-a", label: "Name Z-A" },
        ]}
      />
      <div className="d-none d-sm-flex pb-3">
        <span
          className={`btn btn-icon nav-link-style ${gridStyle} me-2 cursor-pointer`}
          onClick={() => updateView("grid")}
        >
          <i className="ci-view-grid"></i>
        </span>
        <span
          onClick={() => updateView("list")}
          className={`btn btn-icon nav-link-style ${listStyle} cursor-pointer`}
        >
          <i className="ci-view-list"></i>
        </span>
      </div>
    </div>
  );
}
