import { Icon } from "@iconify/react";

import { productType } from "@/types";

interface Props {
  product: productType;
}

export default function ProductPanel({ product }: Props) {
  return (
    <div className="accordion mb-4 mt-3" id="productPanels">
      <div className="accordion-item">
        <h3 className="accordion-header">
          <a
            className="accordion-button"
            href="#productInfo"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="productInfo"
          >
            <i className="ci-announcement text-muted fs-lg align-middle mt-n1 me-2"></i>
            Product info
          </a>
        </h3>
        <div
          className="accordion-collapse collapse show"
          id="productInfo"
          data-bs-parent="#productPanels"
        >
          <div className="accordion-body">
            <h6 className="fs-sm mb-2">Benefits</h6>
            <ul className="fs-sm px-0">
              {product?.content?.productBenefits.map(
                (benefit: { icon: string; text: string }) => (
                  <li className="my-1 list-unstyled" key={benefit.icon}>
                    <Icon
                      fontSize="22px"
                      className="mx-2"
                      icon={benefit.icon}
                    />
                    {benefit.text}
                  </li>
                )
              )}
            </ul>
            <h6 className="fs-sm mb-2">Quantity in Stock</h6>
            <ul className="fs-sm ps-4 mb-0">
              <li>{product.content.maxQuantity}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h3 className="accordion-header">
          <a
            className="accordion-button collapsed"
            href="#shippingOptions"
            role="button"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="shippingOptions"
          >
            <i className="ci-delivery text-muted lead align-middle mt-n1 me-2"></i>
            Shipping options
          </a>
        </h3>
        <div
          className="accordion-collapse collapse"
          id="shippingOptions"
          data-bs-parent="#productPanels"
        >
          <div className="accordion-body fs-sm">
            <div className="d-flex justify-content-between border-bottom pb-2">
              <div>
                <div className="fw-semibold text-dark">Courier</div>
                <div className="fs-sm text-muted">2 - 4 days</div>
              </div>
              <div>$26.50</div>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <div>
                <div className="fw-semibold text-dark">Local shipping</div>
                <div className="fs-sm text-muted">up to one week</div>
              </div>
              <div>$10.00</div>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <div>
                <div className="fw-semibold text-dark">Flat rate</div>
                <div className="fs-sm text-muted">5 - 7 days</div>
              </div>
              <div>$33.85</div>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
              <div>
                <div className="fw-semibold text-dark">UPS ground shipping</div>
                <div className="fs-sm text-muted">4 - 6 days</div>
              </div>
              <div>$18.00</div>
            </div>
            <div className="d-flex justify-content-between pt-2">
              <div>
                <div className="fw-semibold text-dark">
                  Local pickup from store
                </div>
                <div className="fs-sm text-muted">&mdash;</div>
              </div>
              <div>$0.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
