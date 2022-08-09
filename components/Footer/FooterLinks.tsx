import Link from "next/link";

import footerContent from "@/json/footer.json";
import { useCategoryData } from "@/hooks/useCategory";
import useVbout from "@/hooks/useVbout";
import useAlgoliaEvents from "@/hooks/useAlgoliaEvents";
import useMarketplaceCategory from "@/hooks/useMarketplaceCategory";
import FooterLinkItem, {
  contentLinkType,
} from "@/components/Footer/FooterLinkItem";

export default function FooterLinks() {
  const [categories, status] = useCategoryData();

  if (status === "success") {
    footerContent.section1[0].links = categories?.results.slice(12);
  }
  const { addCategoryView } = useVbout();
  const { itemViewed } = useAlgoliaEvents();

  const selectedFooterCategory = useMarketplaceCategory();

  const categoryImage = (contentLink: any) =>
    typeof contentLink?.images[0] === "string"
      ? contentLink?.images[0]
      : contentLink?.images[0].file.url;

  function vboutCategoryViewHandler(contentLink: contentLinkType) {
    addCategoryView({
      id: contentLink.id,
      categoryId: contentLink.slug,
      categoryName: contentLink?.name,
      categoryLink: `categories/${contentLink.slug}`,
      categoryImage: contentLink?.images ? categoryImage(contentLink) : "",
    });
  }

  function categoryEvents(contentLink: contentLinkType) {
    vboutCategoryViewHandler(contentLink);
    itemViewed("category_viewed", [contentLink.id]);
  }
  return (
    <>
      {footerContent.section1.map((content, index) => {
        return content.group ? (
          <div key={index} className="col-md-4 col-sm-6">
            {content.group.map((groupedContent, index) => (
              <FooterLinkItem
                key={index}
                group
                title={groupedContent.name}
                content={groupedContent.links}
                groupEvent={categoryEvents}
              />
            ))}
          </div>
        ) : (
          <div key={index} className="col-md-4 col-sm-6">
            <FooterLinkItem
              group
              title={content.name}
              content={content.links}
              linkEvent={selectedFooterCategory}
            />
          </div>
        );
      })}
    </>
  );
}
