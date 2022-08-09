/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Highlight, connectRefinementList } from "react-instantsearch-dom";
import LoadCategorySidebar from "@/components/CategorySidebarLoader";
import { useRouter } from "next/router";
import toTitleCase, { replaceHypenWithSpace } from "@/lib/formatString";

export function SingleVendorList({
  items,
  isFromSearch,
  refine,
  searchForItems,
  createURL,
}: any) {
  const { query }: any = useRouter();

  console.log("query", query);
  const formattedVendor: any = replaceHypenWithSpace(query.slug);
  const vendor = toTitleCase(formattedVendor);

  console.log("vendor", vendor);

  useEffect(() => {
    refine([vendor]);
  }, []);

  function searchItems(e: any) {
    searchForItems(e.currentTarget.value);
  }
  function refineSearch(item: any) {
    createURL(item.value);
    refine(item.value);
  }

  return (
    <div className="widget widget-categories mb-4 pb-4 border-bottom">
      <h3 className="widget-title">Vendors</h3>
      <div className="accordion mt-n1" id="shop-categories">
        <div className="accordion-item">
          <h3 className="text-sm">
            <a className="cat-link">{vendor}</a>
          </h3>
        </div>
      </div>
      <style jsx>
        {`
          a.cat-link {
            font-size: 0.9375rem;
            color: #4b566b;
            font-weight: bold;
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
            max-height: 400px;
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

export const SingleVendorRefinementList =
  connectRefinementList(SingleVendorList);
