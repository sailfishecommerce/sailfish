import { SearchBox, InstantSearch, Configure } from "react-instantsearch-dom";
import { useRef, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import SearchbarHits from "@/components/Searchbarhits";
import searchClient from "@/lib/algoliaConfig";
import useMediaQuery from "@/hooks/useMediaQuery";
import useVbout from "@/hooks/useVbout";
import { useAppSelector } from "@/hooks/useRedux";
import { useAppDispatch } from "@/redux/store";
import { updateQuery } from "@/redux/algolia-slice";

type paramsType = {
  params: {
    query: string;
  };
};

export default function SearchBar() {
  const [querylength, setQueryLength] = useState(null);
  const dispatch = useAppDispatch();
  const inputRef = useRef(null);
  const { closeSearchView } = useAppSelector((state) => state.algolia);
  const { userDetail }: any = useAppSelector((state) => state.auth);
  const tabWidth = useMediaQuery("(max-width:768px)");
  const { addProductSearch } = useVbout();

  console.log("closeSearchView", closeSearchView);

  const inputClassName = !tabWidth
    ? "input-group d-none d-lg-flex mx-4"
    : "mobileInput w-100 my-0";

  const inputContainerClassName = !tabWidth ? "search-box w-100" : "my-3";

  useEffect(() => {
    const searchInputRef: any = inputRef.current;
    searchInputRef.className = "form-control rounded-end pe-5";
  }, []);

  const algoliasearchClient = {
    ...searchClient,
    search(requests: any) {
      const reqlength = requests[0].params?.query.length;
      setQueryLength(reqlength);
      dispatch(updateQuery(requests[0].params?.query));
      const searchContent = {
        id: uuidv4(),
        email: userDetail?.email ? userDetail?.email : "",
        query: requests[0]?.params?.query,
      };
      reqlength > 0 && addProductSearch(searchContent);
      if (requests.every(({ params }: paramsType): boolean => !params.query)) {
        return Promise.resolve({
          results: requests.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
          })),
        });
      }
      return searchClient.search(requests);
    },
  };

  return (
    <InstantSearch
      indexName="New_Livehealthy_products_index"
      searchClient={algoliasearchClient}
    >
      <Configure clickAnalytics distinct enablePersonalization={true} />
      <div className="searchBox">
        <div className={inputContainerClassName}>
          <SearchBox
            translations={{
              placeholder: "Search for products...",
            }}
            autoFocus
            showLoadingIndicator
            inputRef={inputRef}
            className={inputClassName}
          />
        </div>
        {querylength ? <SearchbarHits /> : ""}
      </div>
      <style jsx>
        {`
          .searchBox {
            display: flex;
            flex-direction: column;
            width: 55%;
          }
          .navbar-tool:hover .logout {
            color: red;
          }
          .results {
            position: absolute;
            z-index: 100;
            background-color: white;
            left: 10%;
            padding: 10px;
            width: 75%;
            height: 400px;
            overflow: auto;
            margin-top: 5%;
            border-radius: 0;
            padding: 16px;
            padding-top: 19px;
            box-shadow: 0px 8px 16px 0px #33333329;
          }
          .results h6 {
            line-height: 1;
            text-transform: uppercase;
            border-bottom: 1px solid #333;
            font-weight: 500;
            color: #333;
            font-size: 14px;
            letter-spacing: 0;
            margin: 0 8px 0;
            padding-bottom: 7px;
            margin-bottom: 4px;
          }
          .search-box {
            position: relative;
          }
          @media (max-width: 768px) {
            .results {
              z-index: 1000;
              left: 5%;
              top: 24%;
              padding: 0px;
              width: 90%;
            }
            .searchBox {
              width: 100%;
            }
          }
        `}
      </style>
    </InstantSearch>
  );
}
