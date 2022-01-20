import { connectHits } from "react-instantsearch-dom";

import Product from "./Product";
import ProductList from "@/components/ProductList";

export function ProductHit({ hits }: any) {
  return (
    <div className="row mx-n2">
      {hits.map((hit: any, index: number) => (
        <Product key={index} product={hit} />
      ))}
    </div>
  );
}

export const HitProduct = connectHits(ProductHit);

export function ProductHitList({ hits }: any) {
  return (
    <div className="row mx-n2">
      {hits.map((hit: any, index: number) => (
        <ProductList key={index} product={hit} />
      ))}
    </div>
  );
}

export const HitProductList = connectHits(ProductHitList);
