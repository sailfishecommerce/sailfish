/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { InstantSearch, Configure } from "react-instantsearch-dom";
import Link from "next/link";

import AlgoliaCurrentRefinement from "@/components/AlgoliaCurrentRefinement";
import Categories from "@/components/Categories";
import ShopBannerToolbar from "./ShopBannerToolbar";
import InfiniteProductHits from "./InfiniteHits";
import { useRouter } from "next/router";

interface MarketplaceProps {
  searchState: any;
  resultsState: any;
  onSearchStateChange: () => void;
  createURL: () => void;
  indexName: string;
  searchClient: any;
  onSearchParameters: () => void;
  category?: {
    name: string;
    slug: string;
  };
}

export default function MarketplaceTemp(
  props: any,
  {
    category,
    searchState,
    resultsState,
    onSearchStateChange,
    createURL,
    indexName,
    onSearchParameters,
    searchClient,
  }: MarketplaceProps
) {
  const [loadPageStatus, setLoadPageStatus] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router?.isReady) {
      setLoadPageStatus(true);
    }
  }, [router?.isReady]);
  return (
    <InstantSearch
      indexName={indexName}
      searchClient={searchClient}
      resultsState={resultsState}
      onSearchStateChange={onSearchStateChange}
      searchState={searchState}
      createURL={createURL}
      onSearchParameters={onSearchParameters}
      {...props}
    >
      <Configure
        hitsPerPage={9}
        clickAnalytics
        distinct
        enablePersonalization={true}
      />
      <div className="page-title-overlap bg-dark pt-4">
        <div className="container d-lg-flex justify-content-between py-2 py-lg-3">
          <div className="order-lg-2 mb-3 mb-lg-0 pt-lg-2">
            <nav aria-label="breadcrumb">
              <AlgoliaCurrentRefinement />
              <ol className="breadcrumb breadcrumb-light flex-lg-nowrap justify-content-center justify-content-lg-start">
                <li className="breadcrumb-item">
                  <Link href="/" passHref>
                    <a className="text-nowrap">Home</a>
                  </Link>
                </li>
                {category ? (
                  <li className="breadcrumb-item text-nowrap">
                    {category?.name}
                  </li>
                ) : (
                  <li className="breadcrumb-item text-nowrap active">Shop</li>
                )}
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container pb-5 mb-2 mb-md-4">
        <div className="row">
          <Categories />
          <section className="col-lg-9">
            {loadPageStatus && <ShopBannerToolbar />}
            <div>
              <div className="row mx-n2 mb-5">
                {loadPageStatus && (
                  <InfiniteProductHits minHitsPerPage={9} animation={true} />
                )}
              </div>
              <hr className="mb-2" />
            </div>
          </section>
        </div>
      </div>
    </InstantSearch>
  );
}
