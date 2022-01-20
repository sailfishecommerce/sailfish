import algoliasearch from "algoliasearch";

const searchClient = algoliasearch(
  "CZT5MA7JLJ",
  `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY}`
);

export default searchClient;
