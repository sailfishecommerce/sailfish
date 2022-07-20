import instantsearch from "instantsearch.js";
import searchClient from "@/lib/algoliaConfig";

var liveHealthyIndex = instantsearch({
  indexName: "LIVEHEALTHY_PRODUCTION_INDEX",
  searchClient: searchClient,
});

const renderRefinementList = (renderOptions, isFirstRender) => {
  const { items } = renderOptions;
  console.log("items", items);
  return items;
};

const customRefinementList =
  instantsearch.connectors.connectRefinementList(renderRefinementList);

export default function useAlgoliaHits() {
  const liveHealthyCategories = liveHealthyIndex.addWidgets([
    customRefinementList({
      attribute: "product_type_2",
    }),
  ]);

  return liveHealthyCategories;
}
