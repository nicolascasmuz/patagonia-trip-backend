import algoliasearch from "algoliasearch";

const client = algoliasearch(
  process.env.ALGOLIA_APPID,
  process.env.ALGOLIA_ADMINAPIKEY
);

const businessIndex = client.initIndex("business");

export { businessIndex };
