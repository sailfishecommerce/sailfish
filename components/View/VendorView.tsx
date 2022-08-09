/* eslint-disable @next/next/no-img-element */
import { InstantSearch, Configure } from "react-instantsearch-hooks-web";
import Link from "next/link";
import searchClient from "@/lib/algoliaConfig";

import AlgoliaCurrentRefinement from "@/components/AlgoliaWidgets/AlgoliaCurrentRefinement";
import ShopBannerToolbar from "../Banner/ShopBannerToolbar";
import InfiniteProductHits from "../AlgoliaWidgets/InfiniteHits";
import VendorCategories from "@/components/Category/VendorCategories";

interface MarketplaceProps {
  category?: {
    name: string;
    slug: string;
  };
  vendor: any;
}

export default function VendorView({ category, vendor }: MarketplaceProps) {
  return (
    <InstantSearch
      indexName="LIVEHEALTHY_PRODUCTION_INDEX"
      searchClient={searchClient}
    >
      <Configure
        hitsPerPage={16}
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
                <li className="breadcrumb-item link">
                  <Link href="/" passHref>
                    <a className="text-nowrap">Home</a>
                  </Link>
                </li>
                {category ? (
                  <li className="breadcrumb-item link">{category?.name}</li>
                ) : (
                  <li className="breadcrumb-item link">
                    {/* <Link href="/shop" passHref> */}
                    <a>Shop</a>
                    {/* </Link> */}
                  </li>
                )}
                <li
                  className="breadcrumb-item text-nowrap active"
                  aria-current="page"
                >
                  {vendor}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container pb-5 mb-2 mb-md-4">
        <div className="row">
          <VendorCategories vendorView />
          <section className="col-lg-9">
            <ShopBannerToolbar />
            <div>
              <div className="row mx-n2 mb-5">
                <InfiniteProductHits minHitsPerPage={16} animation={true} />
              </div>
              <hr className="mb-2" />
            </div>
          </section>
        </div>
      </div>
      <style jsx>
        {`
          .breadcrumb-item.link a:hover {
            color: red;
          }
        `}
      </style>
    </InstantSearch>
  );
}
