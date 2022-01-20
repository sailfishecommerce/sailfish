/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import CarouselWrapper from "./CarouselWrapper";
import carouselContent from "@/json/blog-grid-carousel.json";

export default function BlogGridCarousel() {
  const settings = {
    items: 2,
    nav: false,
    autoHeight: true,
    responsive: {
      "0": { items: 1 },
      "700": { items: 2, gutter: 20 },
      "991": { items: 2, gutter: 30 },
    },
    controlsText: [
      '<i class="ci-arrow-left"></i>',
      '<i class="ci-arrow-right"></i>',
    ],
    controlsContainer: "#blog-grid-controls",
  };
  return (
    <div className="pt-5 position-relative">
      <div className="tns-controls" id="blog-grid-controls">
        <button type="button">
          <i className="ci-arrow-left"></i>
        </button>
        <button type="button">
          <i className="ci-arrow-right"></i>
        </button>
      </div>
      <CarouselWrapper onClick={() => {}} settings={settings}>
        {carouselContent.map((content) => (
          <article key={content.title}>
            <Link href={content.link} passHref>
              <a className="blog-entry-thumb mb-3">
                <span className="blog-entry-meta-label fs-sm">
                  <i className="ci-time"></i>
                  {content.date}
                </span>
                <img src={content.image} alt="Featured post" />
              </a>
            </Link>
            <div className="d-flex justify-content-between mb-2 pt-1">
              <h2 className="h5 blog-entry-title mb-0">
                <Link href={content.link} passHref>
                  <a>{content.title}</a>
                </Link>
              </h2>
              <Link href="/blog-single-sidebar#comments" passHref>
                <a className="blog-entry-meta-link fs-sm text-nowrap ms-3 pt-1">
                  <i className="ci-message"></i>
                  {content.comment}
                </a>
              </Link>
            </div>
            <div className="d-flex align-items-center fs-sm">
              <a className="blog-entry-meta-link" href="#">
                <div className="blog-entry-author-ava">
                  <img src={content.authorImage} alt={content.author} />
                </div>
                {content.author}
              </a>
              <span className="blog-entry-meta-divider"></span>
              <div className="fs-sm text-muted">
                in{" "}
                {content.category.map((category) => (
                  <a href="#" key={category} className="blog-entry-meta-link">
                    {category}
                  </a>
                ))}
                {content.category.length > 1 ? "," : ""}
              </div>
            </div>
          </article>
        ))}      
      </CarouselWrapper>
    </div>
  );
}
