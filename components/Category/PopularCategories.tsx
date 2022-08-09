import { useCategoryData } from "@/hooks/useCategory";
import PopularCategory from "@/components/Category/PopularCategory";
import LoadingPopularCategory from "@/components/Loader/PopularCategoryLoader";

export default function PopularCategories() {
  const [data, status] = useCategoryData();

  // re-render component on data change
  const topCategories = data?.results?.filter(
    (category: { topId: string }) => !category.topId
  );

  const getFirstThreeCategories = (category: any[]) =>
    category !== undefined ? category.slice(12, 15) : [];

  return (
    <section className="container popularCategories position-relative pt-3 pt-lg-0 pb-5 mt-lg-n10 popularCategory">
      <div className="row">
        <div className="col-xl-8 col-lg-9">
          <div className="card border-0 shadow-lg">
            <div className="card-body px-3 pt-grid-gutter pb-0">
              <div className="row g-0 popularCategoriesRow">
                {status === "error" ? (
                  "Unable to fetch"
                ) : status === "loading" ? (
                  <LoadingPopularCategory />
                ) : (
                  getFirstThreeCategories(topCategories).map(
                    (category: {
                      id: string;
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
          .card-body {
            height: 260px;
          }
          @media (max-width: 768px) {
            .popularCategories,
            .card-body {
              width: 100%;
              min-height: 900px;
              max-height: 950px;
            }
            section.popularCategory {
              margin-bottom: 30px;
              margin-top: -70px;
            }
            .popularCategoriesRow {
              flex-directio: column;
            }
          }
        `}
      </style>
    </section>
  );
}
