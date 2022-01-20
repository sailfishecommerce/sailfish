import { useQuery } from "react-query";

import useCategory from "@/hooks/useCategory";
import PopularCategory from "@/components/PopularCategory";
import LoadingPopularCategory from "@/components/PopularCategoryLoader";

export default function PopularCategories() {
  const { listAllCategory } = useCategory();
  const { data, status } = useQuery("listAllCategory", listAllCategory);
  const topCategories = data?.results?.filter(
    (category: { topId: string }) => !category.topId
  );

  const getFirstThreeCategories = (category: any[]) => category.slice(12, 15);

  return (
    <section className="container popularCategories position-relative pt-3 pt-lg-0 pb-5 mt-lg-n10 popularCategory">
      <div className="row">
        <div className="col-xl-8 col-lg-9">
          <div className="card border-0 shadow-lg">
            <div className="card-body px-3 pt-grid-gutter pb-0">
              <div className="row g-0 ps-1">
                {status === "error" ? (
                  "Unable to fetch"
                ) : status === "loading" ? (
                  <LoadingPopularCategory />
                ) : (
                  getFirstThreeCategories(topCategories).map(
                    (category: {
                      name: any;
                      images: { file: { url: string } }[];
                      slug: string;
                    }) => (
                      <PopularCategory
                        key={category.name}
                        category={category}
                      />
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .popularCategories {
            z-index: 10;
          }
          @media (max-width: 768px) {
            section.popularCategory {
              margin-top: -70px;
            }
          }
        `}
      </style>
    </section>
  );
}
