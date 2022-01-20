import { memo } from "react";
import {
  Configure,
  InstantSearch,
  connectRefinementList,
} from "react-instantsearch-dom";

import searchClient from "@/lib/algoliaConfig";
import { HitProduct } from "@/components/ProductHit";

interface Props {
  category: string;
}

function CategoryRefinement() {
  return null;
}

const RefinedCategory = connectRefinementList(CategoryRefinement);

function CategoryProducts({ category }: Props) {
  return (
    <section className="container pt-md-3 pb-0 mb-md-3 w-100">
      <h2 className="h3 text-start">{category} products</h2>
      <InstantSearch
        indexName="New_Livehealthy_products_index"
        searchClient={searchClient}
      >
        <Configure
          hitsPerPage={3}
          clickAnalytics
          distinct
          enablePersonalization={true}
        />
        <RefinedCategory
          defaultRefinement={[category]}
          attribute="product_type"
        />
        <HitProduct />
      </InstantSearch>
      <style jsx>
        {`
          section.container h2 {
            font-size: 20px;
          }
        `}
      </style>
    </section>
  );
}
export const CategoriesProducts = memo(CategoryProducts);
