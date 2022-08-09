import Link from "next/link";

export type contentLinkType = {
  name: string;
  id?: string | any;
  slug: string;
  images?: any;
};

interface Props {
  group: boolean;
  title: string;
  content: contentLinkType[];
  linkEvent?: (contentLink: string) => void;
  groupEvent?: (contentLink: contentLinkType) => void;
}

export default function FooterLinkItem({
  linkEvent,
  groupEvent,
  content,
  title,
  group,
}: Props) {
  const groupLink = (contentLink: contentLinkType) =>
    group
      ? `/${contentLink.slug}`
      : `/collections/product-type/${contentLink.name}?id=${contentLink.id}`;

  const linkEventMethod = (contentLink: contentLinkType) =>
    group && groupEvent
      ? groupEvent(contentLink)
      : linkEvent
      ? linkEvent(contentLink.name)
      : null;

  return (
    <div className="widget widget-links widget-light pb-2 mb-4">
      <h3 className="widget-title text-light">{title}</h3>
      <ul className="widget-list">
        {content.map((contentLink: any) => (
          <li key={contentLink.id} className="widget-list-item">
            <Link href={groupLink(contentLink)} passHref>
              <a
                onClick={() => linkEventMethod(contentLink)}
                className="widget-list-link"
              >
                {contentLink.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
