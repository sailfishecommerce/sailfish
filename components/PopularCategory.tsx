import Link from "next/link";

import Image from "@/components/Image";
import useMarketplaceCategory from "@/hooks/useMarketplaceCategory";

interface PopularCategoryProps {
  category: {
    images: {
      file: {
        url: string;
      };
    }[];
    name: string;
    slug: string;
  };
}

export default function PopularCategory({ category }: PopularCategoryProps) {
  const selectedFooterCategory = useMarketplaceCategory();

  return (
    <div className="popularCategory col-sm-4 px-2 mb-grid-gutter">
      <Link href={`/collections/product-type/${category.slug}`} passHref>
        <a
          onClick={() => selectedFooterCategory(category.name)}
          className="imgLink d-block text-center text-decoration-none me-1"
        >
          <Image
            height={320}
            width={350}
            src={category.images[0].file.url}
            alt={category.name}
            placeholder="blur"
            blurDataURL={category.images[0].file.url}
            loading="lazy"
            className="d-block rounded mx-1 mb-3"
          />
          <h3 className="fs-base pt-1 mb-0">{category.name}</h3>
        </a>
      </Link>
      <style jsx>
        {`
          .popularCategory img {
            height: 200px;
          }
          .popularCategory img:hover {
            -webkit-transform: scale(1.03);
            -moz-transform: scale(1.03);
            -ms-transform: scale(1.03);
            transform: scale(1.03);
            -webkit-transition: -webkit-transform 300ms ease-in 0s;
            transition: transform 300ms ease-in 0s;
          }
          .popularCategory img {
            width: 300px;
            height: 200px;
          }
          .popularCategory:hover h3 {
            color: #fb696a;
          }
          @media (max-width: 768px) {
            .imgLink img {
              width: 100%;
              height: 250px;
            }
          }
        `}
      </style>
    </div>
  );
}
