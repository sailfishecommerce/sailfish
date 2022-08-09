import Link from "next/link";
import { memo, useCallback, useRef } from "react";
import { useVirtual } from "react-virtual";

import Product from "@/components/Product";
import useMediaQuery from "@/hooks/useMediaQuery";
import { productType } from "@/types";

interface PropsType {
  products: productType[];
}

function TrendingProductsCatalog({ products }: PropsType) {
  const mobileView = useMediaQuery("(max-width:768px)");

  function updateProductSize(productData: any[]) {
    const productSize = mobileView ? productData.slice(0, 14) : productData;
    return productSize;
  }

  console.log("products[0]", products[0]);

  return (
    <section className="container pt-md-3 pb-0 mb-md-3 d-flex flex-column align-items-center">
      <h2 className="text-center trending">Trending products</h2>
      <div className="grid-wrapper">
        <div className="pt-4 mx-n2 productGrid">
          {updateProductSize(products).map((product: productType) => (
            <Product
              key={product.id}
              product={product}
              algoliaEvent="click"
              className="p-2"
            />
          ))}
        </div>
      </div>
      <div className="text-center pt-1 mt-1 mb-3">
        <Link href="/shop" passHref>
          <a className="btn btn-outline-accent">
            More products<i className="ci-arrow-right ms-1"></i>
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          h2.trending {
            font-size: 24px;
          }
          .productGrid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
          }
          @media (max-width: 768px) {
            .grid-wrapper {
              margin: auto;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            h2.trending {
              font-size: 18px;
            }
            .productGrid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 380px) {
            h2.trending {
              font-size: 18px;
            }
            .productGrid {
              display: grid;
              grid-template-columns: repeat(2, 180px);
            }
          }
          @media (max-width: 330px) {
            h2.trending {
              font-size: 15px;
            }
            .productGrid {
              display: grid;
              grid-template-columns: repeat(1, 1fr);
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
