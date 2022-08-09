import { Configure, InstantSearch } from "react-instantsearch-dom";
import searchClient from "@/lib/algoliaConfig";

import { HitProduct } from "@/components/Product/ProductHit";

export default function HomepageHits() {
  return (
    <InstantSearch
      indexName="LIVEHEALTHY_PRODUCTION_INDEX"
      searchClient={searchClient}
    >
      <Configure
        hitsPerPage={6}
        clickAnalytics
        distinct
        enablePersonalization={true}
      />
      <section className="container pt-md-3 pb-0 mb-md-3 w-100">
        <h3 className="text-center mb-2">Trending Products</h3>
        <HitProduct />
      </section>
    </InstantSearch>
  );
}
