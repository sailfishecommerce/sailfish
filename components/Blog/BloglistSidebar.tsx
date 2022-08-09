/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import blogContentData from "@/json/blog-list-sidebar.json";

export default function BloglistSidebar() {
  return (
    <aside className="col-lg-4">
      <div
        className="offcanvas offcanvas-collapse offcanvas-end border-start ms-lg-auto"
        id="blog-sidebar"
      >
        <div className="offcanvas-header align-items-center shadow-sm">
          <h2 className="h5 mb-0">Sidebar</h2>
          <button
            className="btn-close ms-auto"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div
          className="offcanvas-body py-grid-gutter py-lg-1 px-lg-4"
          data-simplebar
          data-simplebar-auto-hide="true"
        >
          <div className="widget widget-links mb-grid-gutter pb-grid-gutter border-bottom mx-lg-2">
            <h3 className="widget-title">Blog categories</h3>
            <ul className="widget-list">
              {blogContentData.categories.map((category) => (
                <li key={category.name} className="widget-list-item">
                  <a
                    className="widget-list-link d-flex justify-content-between align-items-center"
                    href="#"
                  >
                    <span>{category.name}</span>
                    <span className="fs-xs text-muted ms-3">
                      {category.count}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="widget mb-grid-gutter pb-grid-gutter border-bottom mx-lg-2">
            <h3 className="widget-title">Trending posts</h3>
            {blogContentData.trendingPost.map((content) => (
              <div
                key={content.title}
                className="d-flex align-items-center mb-3"
              >
                <Link href="/blog-single" passHref>
                  <a className="flex-shrink-0">
                    <img
                      className="rounded"
                      src={content.image}
                      width="64"
                      alt="Post image"
                    />
                  </a>
                </Link>
                <div className="ps-3">
                  <h6 className="blog-entry-title fs-sm mb-0">
                    <Link href="/blog-single" passHref>
                      <a>{content.title}</a>
                    </Link>
                  </h6>
                  <span className="fs-ms text-muted">
                    by{" "}
                    <a href="#" className="blog-entry-meta-link">
                      {content.author}
                    </a>
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="widget pb-grid-gutter mx-lg-2">
            <h3 className="widget-title">Popular tags</h3>
            {blogContentData.popularTags.map((tag) => (
              <a key={tag} className="btn-tag me-2 mb-2" href="#">
                #{tag}
              </a>
            ))}
          </div>
          <div className="blogBg bg-size-cover bg-position-center rounded-3 py-5 mx-lg-2">
            <div className="py-5 px-4 text-center">
              <h5 className="mb-2">Your Add Banner Here</h5>
              <p className="fs-sm text-muted">Hurry up to reserve your spot</p>
              <a className="btn btn-primary btn-shadow btn-sm" href="#">
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          #blog-sidebar {
            max-width: 22rem;
          }
          .blogBg {
            background-image: url(img/blog/banner-bg.jpg);
          }
        `}
      </style>
    </aside>
  );
}
