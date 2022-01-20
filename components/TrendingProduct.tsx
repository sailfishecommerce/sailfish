import Link from "next/link";
import { memo } from "react";
import Product from "./Product";
import { productType } from "@/types";

interface PropsType {
  products: productType[];
}

function TrendingProductsCatalog({ products }: PropsType) {
  return (
    <section className="container pt-md-3 pb-0 mb-md-3 w-100">
      <h2 className="text-center trending">Trending products</h2>
      <div className="row pt-4 mx-n2">
        {products.map((product: productType) => (
          <Product key={product.id} product={product} />
        ))}
        <div className="text-center pt-5 mt-5">
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
