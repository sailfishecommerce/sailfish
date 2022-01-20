/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Highlight, connectRefinementList } from "react-instantsearch-dom";
import LoadCategorySidebar from "@/components/CategorySidebarLoader";
import { useRouter } from "next/router";

const categories = {
  "personal-care": "Personal Care",
  medicines: "Medicines",
  beauty: "Beauty",
  "medical-aids": "Medical Aids",
  "hair-colours": "Hair Colours",
  "veterinary-and-pet-care": "Veterinary and Pet Care",
  confectionery: "Confectionery",
  health: "Health",
};

export function CategoriesList({
  items,
  isFromSearch,
  refine,
  searchForItems,
}) {
  const { query } = useRouter();
  const queryString = query.slug;
  const selectedCategory = categories[queryString];

  const filteredItem = items.filter((item) => item.label === selectedCategory);

  function searchItems(e) {
    searchForItems(e.currentTarget.value);
  }

  useEffect(() => {
    refine([selectedCategory]);
  }, []);

  return (
    <div className="widget widget-categories mb-4 pb-0 border-bottom">
      <h3 className="widget-title">Product Type</h3>
      <div className="input-group input-group-sm mb-2">
        <input
          className="widget-filter-search form-control rounded-end"
          type="text"
          onChange={searchItems}
          placeholder="Search"
        />
        <i className="ci-search position-absolute top-50 end-0 translate-middle-y fs-sm me-3"></i>
      </div>
      <div className="accordion mt-n1" id="shop-categories">
        {items.length > 0 ? (
          filteredItem.map((item) => (
            <div key={item.label} className="accordion-item">
              <h3 className="text-sm">
                <a className="cat-link">
                  {isFromSearch ? (
                    <Highlight attribute="label" hit={item} />
                  ) : (
                    <>
                      {item.label}
                      <span className="mx-2 badge bg-danger">{item.count}</span>
                    </>
                  )}
                </a>
              </h3>
            </div>
          ))
        ) : (
          <LoadCategorySidebar />
        )}
      </div>
      <style jsx>
        {`
          a.cat-link {
            font-size: 0.9375rem;
            color: #4b566b;
            fontweight: bold;
          }
          a:hover {
            color: #fe696a;
          }
          a.badge {
            font-size: 0.75rem;
            font-weight: normal;
            color: white;
          }
          .accordion {
            scrollbar-width: thin;
            scrollbar-color: darkgrey slategrey;
            max-height: 370px;
            overflow-y: auto;
          }
          .accordion::-webkit-scrollbar {
            width: 8px;
          }
          .accordion::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          }
          .accordion::-webkit-scrollbar-thumb {
            background-color: darkgrey;
            outline: 1px solid slategrey;
            border: 0px;
          }
        `}
      </style>
    </div>
  );
}

export const MarketplaceCategoriesRefinementList =
  connectRefinementList(CategoriesList);
