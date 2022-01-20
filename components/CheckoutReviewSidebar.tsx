import { cartType } from "@/types";
import FormattedPrice from "@/lib/formatPrice";

interface CheckoutReviewSidebarProps {
  cart: cartType;
}
export default function CheckoutReviewSidebar({
  cart,
}: CheckoutReviewSidebarProps) {
  return (
    <aside className="col-lg-4 pt-4 pt-lg-0 ps-xl-5">
      <div className="bg-white rounded-3 shadow-lg p-4 ms-lg-auto">
        <div className="py-2 px-xl-2">
          <h2 className="h6 text-center mb-4">Order summary</h2>
          <ul className="list-unstyled fs-sm pb-2 border-bottom">
            <li className="d-flex justify-content-between align-items-center">
              <span className="me-2">Subtotal:</span>
              <span className="text-end">
                <FormattedPrice price={cart.sub_total} />
              </span>
            </li>
            <li className="d-flex justify-content-between align-items-center">
              <span className="me-2">Shipping:</span>
              <span className="text-end">
                <FormattedPrice price={cart.shipment_total} />
              </span>
            </li>
            <li className="d-flex justify-content-between align-items-center">
              <span className="me-2">Taxes:</span>
              <span className="text-end">
                <FormattedPrice price={cart.tax_total} />
              </span>
            </li>
            <li className="d-flex justify-content-between align-items-center">
              <span className="me-2">Discount:</span>
              <span className="text-end">
                <FormattedPrice price={cart.discount_total} />
              </span>
            </li>
          </ul>
          <h3 className="fw-normal text-center my-4">
            <FormattedPrice price={cart.grand_total} />$
          </h3>
          <form className="needs-validation" method="post" noValidate>
            <div className="mb-3">
              <input
                className="form-control"
                type="text"
                placeholder="Promo code"
                required
              />
              <div className="invalid-feedback">Please provide promo code.</div>
            </div>
            <button
              className="btn btn-outline-primary d-block w-100"
              type="button"
            >
              Apply promo code
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
