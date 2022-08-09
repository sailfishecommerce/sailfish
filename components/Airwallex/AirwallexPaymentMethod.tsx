import useAirwallex from "@/hooks/useAirwallex";
import { AirwallexDropin } from "@/components";
import { useEffect } from "react";

export default function AirwallexPaymentMethod() {
  const { airwallex } = useAirwallex();

  console.log("airwallex airwallex", airwallex);

  useEffect(() => {
    if (airwallex.clientSecret === null && airwallex.paymentIntentId === null) {
      console.log("airwallex not initialized");
    }
  }, [airwallex]);

  return (
    <div className="accordion-item">
      <h3 className="accordion-header">
        <a
          className="accordion-button collapsed"
          href="#paypal"
          data-bs-toggle="collapse"
        >
          <i className="ci-paypal me-2 align-middle"></i>
          Pay with Airwallex
        </a>
      </h3>
      <div
        className="accordion-collapse collapse"
        id="paypal"
        data-bs-parent="#payment-method"
      >
        <div className="accordion-body fs-sm">
          <p>
            <span className="fw-medium">Airwallex</span> - the safer, easier way
            to pay
          </p>
          <AirwallexDropin
            intent_id={airwallex.paymentIntentId}
            client_secret={airwallex.clientSecret}
          />
        </div>
      </div>
    </div>
  );
}
