/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Link from "next/link";

import CategoriesSidebar from "@/components/CategoriesSidebar";
import ProductList from "@/components/ProductList";
import SpinnerRipple from "@/components/spinnerLoader";
import { categorySlugType, categoryType, productType } from "@/types";
import useCategory from "@/hooks/useCategory";
import Product from "@/components/Product";
import ShopBannerToolbar from "@/components/ShopBannerToolbar";
import ShopPagination from "@/components/ShopPagination";
import { useAppSelector } from "@/hooks/useRedux";

interface ProductCategoryProps {
  category: categoryType;
  categorySlug: categorySlugType;
}

export default function ProductCategory({
  category,
  categorySlug,
}: ProductCategoryProps) {
  const { getProductsInACategory } = useCategory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState<null | []>(null);
  const { productView } = useAppSelector((state) => state.shop);

  function getCategoryProduct(slug: string) {
    setLoading(true);
    getProductsInACategory(slug)
      .then((response) => {
        console.log("response getCategoryProduct", response);
        setCategoryProducts(response.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setCategoryProducts(null);
        setError(error);
      });
  }

  useEffect(() => {
    getCategoryProduct(category.slug);
  }, [category.slug]);

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
                <li className="breadcrumb-item active text-nowrap">
                  <a>{category.name}</a>
                </li>
              </ol>
            </nav>
          </div>
          <div className="order-lg-1 pe-lg-4 text-center text-lg-start">
            <h1 className="h3 text-light mb-0">{category.name}</h1>
          </div>
        </div>
      </div>
      <div className="container pb-5 mb-2 mb-md-4">
        <div className="row">
          <CategoriesSidebar categorySlug={categorySlug} />
          <section className="col-lg-9">
            <ShopBannerToolbar />
            {error ? (
              <p>Error fetching products</p>
            ) : loading ? (
              <div className="spinner d-flex m-auto justify-content-center align-items-center">
                <SpinnerRipple />
              </div>
            ) : (
              <div className="">
                {categoryProducts && categoryProducts.length > 0 ? (
                  <div>
                    <div className="row mx-n2">
                      {categoryProducts.map((product: productType) =>
                        productView === "grid" ? (
                          <Product
                            key={product.id}
                            product={product}
                            forCategory
                          />
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
                          <a
                            className="btn btn-primary btn-shadow btn-sm"
                            href="#"
                          >
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
                ) : (
                  <img
                    src="/img/noProduct.png"
                    alt="no product in this category"
                  />
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
