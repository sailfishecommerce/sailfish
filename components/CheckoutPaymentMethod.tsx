import { toast } from "react-toastify";

import { accordionButtonStyle } from "@/lib/single-Checkout";
import BankTransferPaymentMethod from "./BankTransferPaymentMethod";
import AirwallexPaymentMethod from "./AirwallexPaymentMethod";
import PaymentWithStripe from "./PaymentWithStripe";

interface CheckoutPaymentMethodProps {
  formStages: {
    stage1: boolean;
    shippingForm: null | any;
    stage2: boolean;
  };
}

export default function CheckoutPaymentMethod({
  formStages,
}: CheckoutPaymentMethodProps) {
  const accordion = accordionButtonStyle(formStages);

  function paymentHandler(e: any) {
    e.preventDefault();
    if (!formStages.stage1) {
      toast.error("Please complete stage 1");
    }
  }

  return (
    <div className="accordion-item">
      <h2 className="h6 pb-3 mb-2 accordion-header">
        <a
          className={accordion.headClassName}
          href={accordion.href}
          onClick={paymentHandler}
          data-bs-toggle="collapse"
        >
          <span className="badge-custom me-2">2</span>
          Choose payment method
        </a>
      </h2>
      <div
        className={accordion.bodyClassName}
        id="payment"
        data-bs-parent="#shipping-form"
      >
        <div className="">
          <div className="accordion-body">
            <div className="accordion mb-2" id="payment-method">
              <PaymentWithStripe formStages={formStages} />
              <AirwallexPaymentMethod />
              <BankTransferPaymentMethod />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .badge-custom {
            height: 25px;
            width: 25px;
            background-color: #fe696a;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            font-weight: bold;
            font-size: 14px;
          }
        `}
      </style>
    </div>
  );
}

CheckoutPaymentMethod.whyDidYouRender = true;
