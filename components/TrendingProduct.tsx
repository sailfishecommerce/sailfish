import Link from "next/link";
import { memo, useCallback, useRef } from "react";
import { useVirtual } from "react-virtual";
import Product from "./Product";
import { productType } from "@/types";

interface PropsType {
  products: productType[];
}

function TrendingProductsCatalog({ products }: PropsType) {
  const parentRef: any = useRef();

  const rowVirtualizerFixed = useVirtual({
    size: products.length,
    parentRef,
    estimateSize: useCallback(() => 10, []),
    overscan: 6,
  });

  return (
    <section className="container pt-md-3 pb-0 mb-md-3 w-100">
      <h2 className="text-center trending">Trending products</h2>
      <div
        ref={parentRef}
        style={{ height: `${rowVirtualizerFixed.totalSize}px` }}
        className="row pt-4 mx-n2"
      >
        {rowVirtualizerFixed.virtualItems.map((virtualRow: any) => (
          <Product
            key={virtualRow.index}
            product={products[virtualRow.index]}
            algoliaEvent="click"
          />
        ))}
        <div className="text-center pt-1 mt-1 mb-3">
          <Link href="/shop" passHref>
            <a className="btn btn-outline-accent">
              More products<i className="ci-arrow-right ms-1"></i>
            </a>
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          h2.trending {
            font-size: 24px;
          }
          @media (max-width: 768px) {
            h2.trending {
              font-size: 18px;
            }
          }
        `}
      </style>
    </section>
  );
}

const TrendingProducts = memo(TrendingProductsCatalog);

export default TrendingProducts;

TrendingProducts.whyDidYouRender = true;
