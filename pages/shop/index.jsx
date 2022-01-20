import { Component } from "react";
import { withRouter } from "next/router";
import qs from "qs";
import { findResultsState } from "react-instantsearch-dom/server";

import searchClient from "@/lib/algoliaConfig";
import Applayout from "@/layout/Applayout";
import MarketplaceTemp from "@/components/MarketplaceTemp";
import styles from "@/styles/shop.module.css";
const updateAfter = 700;

// const createURL = (state) => `?${qs.stringify(state)}`;

const pathToSearchState = (path) =>
  path.includes("?") ? qs.parse(path.substring(path.indexOf("?") + 1)) : {};

// const searchStateToURL = (searchState) =>
//   searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : "";

const DEFAULT_PROPS = {
  searchClient,
  indexName: "New_Livehealthy_products_index",
};

function getCategorySlug(name) {
  return name.split(" ").map(encodeURIComponent).join("-");
}

function getCategoryName(slug) {
  return slug.split("-").map(decodeURIComponent).join(" ");
}

const createURL = (state) => {
  const isDefaultRoute =
    !state.query &&
    state.page === 1 &&
    state.refinementList &&
    state.refinementList?.vendor.length === 0 &&
    state.refinementList?.tags.length === 0 &&
    state?.menu &&
    !state.menu?.product_type;

  const categoryPath = state.menu?.product_type
    ? `${getCategorySlug(state.menu.product_type)}/`
    : "";

  const queryParameters = {};

  if (state.query) {
    queryParameters.query = encodeURIComponent(state.query);
  }

  if (state.page !== 1) {
    queryParameters.page = state.page;
  }

  if (state.refinementList.vendor) {
    queryParameters.vendor = [state.refinementList.vendor].map(
      encodeURIComponent
    );
  }

  if (state.refinementList.tags) {
    queryParameters.tags = [state.refinementList.tags].map(encodeURIComponent);
  }

  const queryString = qs.stringify(queryParameters, {
    addQueryPrefix: true,
    arrayFormat: "repeat",
  });

  if (isDefaultRoute) {
    return "";
  }

  return `shop${categoryPath}${queryString}`;
};

const searchStateToURL = (searchState) => {
  console.log("searchState", searchState);
  const searchValue = searchState ? createURL(searchState) : "";
  return searchValue;
};

const urlToSearchState = (location) => {
  console.log("location", location);
  const pathnameMatches = location.pathname?.match(/shop\/(.*?)\/?$/);
  const category = getCategoryName(
    (pathnameMatches && pathnameMatches[1]) || ""
  );
  const {
    query = "",
    page = 1,
    vendors = [],
    tags = [],
  } = qs.parse(location?.search?.slice(1));
  // `qs` does not return an array when there's a single value.
  const allVendors = Array.isArray(vendors)
    ? vendors
    : [vendors].filter(Boolean);
  const allTags = Array.isArray(tags) ? tags : [tags].filter(Boolean);
  console.log("allVendors", allVendors, "allTags", allTags);
  return {
    query: decodeURIComponent(query),
    page,
    menu: {
      product_type: decodeURIComponent(category),
    },
    refinementList: {
      vendor: allVendors.map(decodeURIComponent),
      tags: allTags.map(decodeURIComponent),
    },
  };
};

class Shop extends Component {
  state = {
    searchState: urlToSearchState(this.props.searchState),
    lastRouter: this.props.router,
  };

  static async getInitialProps({ asPath }) {
    const searchState = pathToSearchState(asPath);
    console.log("asPath", asPath, "searchState", searchState);
    const resultsState = await findResultsState(MarketplaceTemp, {
      ...DEFAULT_PROPS,
      searchState,
    });

    return {
      resultsState,
      searchState,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.lastRouter !== props.router) {
      return {
        searchState: pathToSearchState(props.router.asPath),
        lastRouter: props.router,
      };
    }

    return null;
  }

  onSearchStateChange = (searchState) => {
    console.log("searchState", searchState);
    console.log("this?.state?.searchState", this.state);
    clearTimeout(this.debouncedSetState);

    const searchStateValue = {
      searchState: {
        ...searchState,
        ...this.state.searchState,
      },
    };

    console.log("searchStateValuesearchStateValue", searchStateValue);

    this.debouncedSetState = setTimeout(() => {
      const href = searchStateToURL(searchState);

      this.props.router.push(href, href, {
        shallow: true,
      });
    }, updateAfter);

    this.setState((prevState) => {
      console.log("prevState", prevState);
      return {
        ...this.state,
        searchState,
      };
    });
  };
  render() {
    console.log("this.state", this.state);

    return (
      <Applayout
        title="Shop for quality imported products from Australia. Choose from over 10,000 genuine health, personal care, confectionery, beauty and baby care products. Get vitamins, health and food supplements, cosmetics, confectionery, quit smoking aids, hair colours, baby food and much more. Owned & operated by HK'ers"
        local
      >
        <div className={styles.shop}>
          <MarketplaceTemp
            {...DEFAULT_PROPS}
            searchState={this.props.searchState}
            resultsState={this.props.resultsState}
            onSearchStateChange={this.onSearchStateChange}
            createURL={createURL}
          />
        </div>
      </Applayout>
    );
  }
}

export default withRouter(Shop);
