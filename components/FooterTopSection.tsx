import { useQuery } from "react-query";
import Link from "next/link";

import footerContent from "@/json/footer.json";
import useCategory from "@/hooks/useCategory";
import { contentLinkType } from "@/types";
import useVbout from "@/hooks/useVbout";
import useAlgoliaEvents from "@/hooks/useAlgoliaEvents";
import useMarketplaceCategory from "@/hooks/useMarketplaceCategory";

interface Props {
  topSectionBgColor: string;
}

export default function FooterTopSection({ topSectionBgColor }: Props) {
  const { listAllCategory } = useCategory();
  const { data, status } = useQuery("listAllCategory", listAllCategory);

  const categories = data?.results.slice(12);

  if (status === "success") {
    footerContent.section1[0].links = categories;
  }
  const { addCategoryView } = useVbout();
  const { itemViewed } = useAlgoliaEvents();

  const selectedFooterCategory = useMarketplaceCategory();

  function vboutCategoryViewHandler(contentLink: contentLinkType) {
    addCategoryView({
      id: contentLink.id,
      categoryId: contentLink.slug,
      categoryName: contentLink.name,
      categoryLink: `categories/${contentLink.slug}`,
      categoryImage: contentLink.images[0]?.file?.url,
    });
  }
  function categoryEvents(contentLink: contentLinkType) {
    vboutCategoryViewHandler(contentLink);
    itemViewed("category_viewed", contentLink.id, [contentLink.slug]);
  }

  return (
    <>
      <div className="topSection pt-5">
        <div className="container">
          <div className="row pb-2">
            {footerContent.section1.map((content, index) => {
              return content.group ? (
                <div key={index} className="col-md-4 col-sm-6">
                  {content.group.map((groupedContent, index) => (
                    <div
                      key={index}
                      className="widget widget-links widget-light pb-2 mb-4"
                    >
                      <h3 className="widget-title text-light">
                        {groupedContent.name}
                      </h3>
                      <ul className="widget-list">
                        {groupedContent.links.map(
                          (contentLink: any, index: number) => (
                            <li key={index} className="widget-list-item">
                              <Link href={`/${contentLink.slug}`} passHref>
                                <a
                                  onClick={() => categoryEvents(contentLink)}
                                  className="widget-list-link"
                                >
                                  {contentLink.name}
                                </a>
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div key={index} className="col-md-4 col-sm-6">
                  <div className="widget widget-links widget-light pb-2 mb-4">
                    <h3 className="widget-title text-light">{content.name}</h3>
                    <ul className="widget-list">
                      {content.links.map((contentLink) => (
                        <li key={contentLink.name} className="widget-list-item">
                          <Link
                            href={`/collections/product-type/${contentLink.slug}`}
                            passHref
                          >
                            <a
                              onClick={() =>
                                selectedFooterCategory(contentLink.name)
                              }
                              className="widget-list-link"
                            >
                              {contentLink.name}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
            <div className="col-md-4">
              <div className="widget pb-2 mb-4">
                <h3 className="widget-title text-light pb-1">Stay informed</h3>
                <div className="subscription-form validate">
                  <div className="input-group flex-nowrap">
                    <i className="ci-mail position-absolute top-50 translate-middle-y text-muted fs-base ms-3"></i>
                    <input
                      className="form-control rounded-start"
                      type="email"
                      name="EMAIL"
                      placeholder="Your email"
                      required
                    />
                    <button
                      className="btn btn-primary"
                      type="submit"
                      name="subscribe"
                    >
                      Subscribe*
                    </button>
                  </div>
                  <div className="antispam-container" aria-hidden="true">
                    <input
                      className="subscription-form-antispam"
                      type="text"
                      name="b_c7103e2c981361a6639545bd5_29ca296126"
                      tabIndex={-1}
                    />
                  </div>
                  <div className="form-text text-light opacity-50">
                    *Subscribe to our newsletter to receive early discount
                    offers, updates and new products info.
                  </div>
                  <div className="subscription-status"></div>
                </div>
              </div>
              <div className="widget pb-2 mb-4">
                <h3 className="widget-title text-light pb-1">
                  Download our app
                </h3>
                <div className="d-flex flex-wrap">
                  <div className="me-2 mb-2">
                    <a className="btn-market btn-apple" href="#" role="button">
                      <span className="btn-market-subtitle">
                        Download on the
                      </span>
                      <span className="btn-market-title">App Store</span>
                    </a>
                  </div>
                  <div className="mb-2">
                    <a className="btn-market btn-google" href="#" role="button">
                      <span className="btn-market-subtitle">
                        Download on the
                      </span>
                      <span className="btn-market-title">Google Play</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .topSection {
            background-color: ${topSectionBgColor};
          }
          .antispam-container {
            position: absolute;
            left: -5000px;
          }
        `}
      </style>
    </>
  );
}
