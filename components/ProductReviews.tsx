/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { productType } from "@/types";
import ProductReviewForm from "./ProductReviewForm";
import productReview from "@/json/product-review.json";
import RatingStar from "./RatingStar";

interface Props {
  product: productType;
}
export default function ProductReviews({ product }: Props) {
  console.log("product", product);
  return (
    <div className="border-top my-lg-3 py-5 w-100">
      <Head>
        <script
          src={`https://en.trustmate.io/api/widget/95d50730-e6a5-4465-b950-3fab710cf306/script?product=/products/${product.slug}`}
          defer
        ></script>
        <script
          src="https://en.trustmate.io/api/widget/5c6b265a-9520-4676-9d01-2ecfca53d95c/script"
          defer
        ></script>
      </Head>
      <div className="container pt-md-2" id="reviews">
        <div className="row pt-4">
          <div className="col-md-7">
            <div className="d-flex justify-content-between pb-4">
              <h2 className="h3 mb-4"> Reviews</h2>
              <div className="d-flex align-items-center flex-nowrap">
                <label
                  className="fs-sm text-muted text-nowrap me-2 d-none d-sm-block"
                  htmlFor="sort-reviews"
                >
                  Sort by:
                </label>
                <select
                  className="form-select form-select-sm"
                  id="sort-reviews"
                >
                  {productReview.sortReviews.map((review) => (
                    <option key={review}>{review}</option>
                  ))}
                </select>
              </div>
            </div>
            {productReview.reviews.map((review) => (
              <div
                key={review.name}
                className="product-review pb-4 mb-4 border-bottom"
              >
                <div className="d-flex mb-3">
                  <div className="d-flex align-items-center me-4 pe-2">
                    <img
                      className="rounded-circle"
                      src={review.authorImage}
                      width="50"
                      alt={review.name}
                    />
                    <div className="ps-3">
                      <h6 className="fs-sm mb-0">{review.name}</h6>
                      <span className="fs-ms text-muted">{review.date}</span>
                    </div>
                  </div>
                  <div>
                    <RatingStar rate={review.rating} />
                    <div className="fs-ms text-muted">{review.note}</div>
                  </div>
                </div>
                <p className="fs-md mb-2">{review.text}</p>
                <ul className="list-unstyled fs-ms pt-1">
                  <li className="mb-1">
                    <span className="fw-medium">Pros:&nbsp;</span>
                    {review.pros}
                  </li>
                  <li className="mb-1">
                    <span className="fw-medium">Cons:&nbsp;</span>
                    {review.cons}
                  </li>
                </ul>
                <div className="text-nowrap">
                  <button className="btn-like" type="button">
                    {review.like}
                  </button>
                  <button className="btn-dislike" type="button">
                    {review.dislike}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <ProductReviewForm />
        </div>
        <div className="row-pb-2">
          <div id="95d50730-e6a5-4465-b950-3fab710cf306"></div>
          <div id="5c6b265a-9520-4676-9d01-2ecfca53d95c"></div>
        </div>
      </div>
    </div>
  );
}
