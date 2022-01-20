import { InstantSearch } from "react-instantsearch-dom";
import Link from "next/link";
import { connectRefinementList } from "react-instantsearch-dom";

import searchClient from "@/lib/algoliaConfig";
import useVbout from "@/hooks/useVbout";
import useAlgoliaEvents from "@/hooks/useAlgoliaEvents";
import footerContent from "@/json/footer.json";
import { replaceSpaceWithHypen } from "@/lib/formatString";

type contentLinkType = {
  id: string;
  slug: string;
  name: string;
  label: string;
  images: {
    file: {
      url: string;
    };
  }[];
};

function Categorylinks({ items }: any) {
  const { itemViewed } = useAlgoliaEvents();
  const { addCategoryView } = useVbout();

  footerContent.section1[0].links = items;

  function getCategorySlug(categoryName: string) {
    const slug = replaceSpaceWithHypen(categoryName);

    return slug;
  }

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
                      <li
                        key={`${contentLink.slug}-${index}`}
                        className="widget-list-item"
                      >
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
                {content.links.map((contentLink: any) => (
                  <li key={contentLink.name} className="widget-list-item">
                    <Link
                      href={`/collections/${getCategorySlug(
                        contentLink.label
                      )}`}
                      passHref
                    >
                      <a className="widget-list-link">{contentLink.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
}

export const FooterCategoryLinks = connectRefinementList(Categorylinks);

export default function FooterCategoryList() {
  return (
    <InstantSearch
      indexName="New_Livehealthy_products_index"
      searchClient={searchClient}
    >
      <FooterCategoryLinks attribute="product_type" />
    </InstantSearch>
  );
}
