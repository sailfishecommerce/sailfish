import Link from "next/link";
import useMediaQuery from "@/hooks/useMediaQuery";

import Image from "@/components/Widgets/Image";
import useMarketplaceCategory from "@/hooks/useMarketplaceCategory";

interface PopularCategoryProps {
  category: {
    id: string;
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
  const tabWidth = useMediaQuery("(max-width:768px)");
  const size = tabWidth
    ? { height: 250, width: 300 }
    : { height: 250, width: 250 };

  return (
    <div className="popularCategory col-12 col-md-4 px-2 d-flex justify-content-center align-items-center rounded  mb-2 mb-lg-0">
      <Link
        href={`/collections/product-type/${category.name}?id=${category.id}`}
        passHref
      >
        <a
          onClick={() => selectedFooterCategory(category.name)}
          className="imgLink d-flex w-75 w-lg-100 flex-column text-center text-decoration-none me-1"
        >
          <Image
            height={size.height}
            width={size.width}
            src={category.images[0].file.url}
            alt={category.name}
            placeholder="blur"
            blurDataURL={category.images[0].file.url}
            loading="lazy"
            className="d-block rounded mx-1 mb-3"
            slider="true"
            layout="responsive"
          />
          <h3 className="fs-base pt-1 mb-0">{category.name}</h3>
        </a>
      </Link>
      <style jsx>
        {`
          .popularCategory img {
            height: 200px;
          }
          .popularCategory a:hover {
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
            .imgLink {
              width: 100%;
              margin: 10px;
              height: 250px;
            }
          }
        `}
      </style>
    </div>
  );
}
