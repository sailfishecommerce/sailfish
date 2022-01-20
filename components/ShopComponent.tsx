/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useQuery } from "react-query";

import CategoriesSidebar from "@/components/CategoriesSidebar";
import SpinnerRipple from "@/components/spinnerLoader";
import { productType } from "@/types";
import Product from "@/components/Product";
import ShopBannerToolbar from "@/components/ShopBannerToolbar";
import ShopPagination from "@/components/ShopPagination";
import useSwellProducts from "@/hooks/useSwellProducts";
import { useAppSelector } from "@/hooks/useRedux";
import ProductList from "@/components/ProductList";

export default function ShopComponent() {
  const { allProducts } = useSwellProducts();
  const { data, status } = useQuery("allProducts", allProducts);
  const { productView } = useAppSelector((state) => state.shop);
  console.log("");
  return (
    <div>
      <div className="page-title-overlap bg-dark pt-4">
        <div className="container d-lg-flex justify-content-between py-2 py-lg-3">
          <div className="order-lg-2 mb-3 mb-lg-0 pt-lg-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-light flex-lg-nowrap justify-content-center justify-content-lg-start">
                <li className="breadcrumb-item">
                  <Link href="/" passHref>
                    <a className="text-nowrap">Home</a>
                  </Link>
                </li>
                <li className="breadcrumb-item text-nowrap">
                  <Link href="/shop" passHref>
                    <a>Shop</a>
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container pb-5 mb-2 mb-md-4">
        <div className="row">
          <CategoriesSidebar categorySlug="shop" />
          <section className="col-lg-9">
            <ShopBannerToolbar />
            {status === "error" ? (
              <p>Error fetching products</p>
            ) : status === "loading" ? (
              <div className="spinner d-flex m-auto justify-content-center align-items-center">
                <SpinnerRipple />
              </div>
            ) : (
              <div>
                <div className="row mx-n2">
                  {data.results.map((product: productType) =>
                    productView === "grid" ? (
                      <Product key={product.id} product={product} forCategory />
                    ) : (
                      <ProductList key={product.id} product={product} />
                    )
                  )}
                </div>
                <div className="py-sm-2 mt-5">
                  <div className="d-sm-flex justify-content-between align-items-center bg-secondary overflow-hidden mb-4 rounded-3">
                    <div className="py-4 my-2 my-md-0 py-md-5 px-4 ms-md-3 text-center text-sm-start">
                      <h4
                        className="fs-lg fw-light mb
                            -2"
                      >
                        Converse All Star
                      </h4>

                      <h3 className="mb-4">Make Your Day Comfortable</h3>
                      <a className="btn btn-primary btn-shadow btn-sm" href="#">
                        Shop Now
                      </a>
                    </div>
                    <img
                      className="d-block ms-auto"
                      src="/img/shop/catalog/banner.jpg"
                      alt="Shop Converse"
                    />
                  </div>
                </div>
                <hr className="my-3" />
                <ShopPagination />
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
