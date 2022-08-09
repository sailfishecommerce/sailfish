/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "react-query";

import useCategory from "@/hooks/useCategory";
import { categorySlugType } from "@/types";

type categoryType = {
  name: string;
  id: string;
  topId?: string;
  slug: string;
};

interface SubCategoryItemProps {
  subCat: categoryType;
  slug: categorySlugType;
}

function SubCategoryItem({ subCat, slug }: SubCategoryItemProps) {
  const { getProductsInACategory } = useCategory();
  const { data, status } = useQuery("getProductsInACategory", () =>
    getProductsInACategory(subCat.slug)
  );

  return (
    <li key={subCat?.id} className="widget-list-item widget-filter-item">
      <Link href={`/${slug}/${subCat.slug}`} passHref>
        <a className="widget-list-link d-flex justify-content-between align-items-center">
          <span className="widget-filter-item-text">{subCat?.name}</span>
          <span className="fs-xs text-muted ms-3">{data?.results.length}</span>
        </a>
      </Link>
    </li>
  );
}

interface CategoryItemProps {
  category: categoryType;
  subCategories: categoryType[];
  categorySlug: categorySlugType;
}

export default function CategoryItem({
  category,
  categorySlug,
  subCategories,
}: CategoryItemProps) {
  const [categoryProduct, setCategoryProduct] = useState<any>(null);
  const { getProductsInACategory } = useCategory();

  const subCategory = subCategories.filter((sub) => sub.topId === category.id);
  const checkCategory = (cat: { id: string }) =>
    subCategories.some((subCat) => subCat.topId === cat.id);

  useEffect(() => {
    getProductsInACategory(category.slug).then((response) =>
      setCategoryProduct(response)
    );
  }, []);

  //
  return (
    <div className="categoryItem">
      {checkCategory(category) ? (
        <div className="accordion-item">
          <h3 className="accordion-header">
            <a
              className="accordion-button collapsed"
              role="button"
              href={`#${category.slug}`}
              data-bs-toggle="collapse"
              aria-expanded="false"
              aria-controls={category.slug}
            >
              <div>
                <Link href={`/${categorySlug}/${category.slug}`} passHref>
                  <a>
                    {category.name}{" "}
                    <span className="mx-2 badge bg-danger">
                      {categoryProduct?.results.length}
                    </span>
                  </a>
                </Link>
              </div>
            </a>
          </h3>
          <div
            className="accordion-collapse collapse"
            id={category.slug}
            data-bs-parent="#shop-categories"
          >
            <div className="accordion-body">
              <div className="widget widget-links widget-filter">
                <div className="input-group input-group-sm mb-2">
                  <input
                    className="widget-filter-search form-control rounded-end"
                    type="text"
                    placeholder="Search"
                  />
                  <i className="ci-search position-absolute top-50 end-0 translate-middle-y fs-sm me-3"></i>
                </div>
                <ul
                  className="widget-list data widget-filter-list pt-1"
                  data-simplebar
                  data-simplebar-auto-hide="false"
                >
                  <li className="widget-list-item widget-filter-item">
                    <Link href={`/${categorySlug}/${category.slug}`} passHref>
                      <a className="widget-list-link d-flex justify-content-between align-items-center">
                        <span className="widget-filter-item-text">
                          View all
                        </span>
                        <span className="fs-xs text-muted ms-3">
                          {categoryProduct?.results.length}
                        </span>
                      </a>
                    </Link>
                  </li>
                  {subCategory.map((subCat) => (
                    <SubCategoryItem
                      key={subCat.id}
                      slug={categorySlug}
                      subCat={subCat}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="productCategory">
          <h3 className="text-sm">
            <Link href={`/${categorySlug}/${category.slug}`} passHref>
              <a className="cat-link">{category.name}</a>
            </Link>
            <a href="#" className="mx-2 badge bg-danger">
              {categoryProduct?.results.length}
            </a>
          </h3>
        </div>
      )}
      <style jsx>
        {`
          .widget-list.data {
            height: 8rem;
          }
          .productCategory h3 a.cat-link {
            font-size: 0.9375rem;
            color: #4b566b;
            font-weight: normal;
          }
          .productCategory h3 a:hover {
            color: #fe696a;
          }
          .productCategory a.badge {
            font-size: 0.75rem;
            font-weight: normal;
            color: white;
          }
        `}
      </style>
    </div>
  );
}
