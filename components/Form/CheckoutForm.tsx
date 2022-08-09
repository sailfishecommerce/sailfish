import { useState, memo } from "react";
import CheckoutPaymentMethod from "@/components/Payment/CheckoutPaymentMethod";
import ShippingCheckoutForm from "@/components/Form/ShippingCheckoutForm";

function CheckoutFormComponent() {
  const [formStages, setFormStages] = useState<any>({
    stage1: false,
    shippingForm: null,
    stage2: false,
  });

  return (
    <div className="accordion mb-3" id="shipping-form">
      <ShippingCheckoutForm
        formStages={formStages}
        setFormStages={setFormStages}
      />
      <CheckoutPaymentMethod formStages={formStages} />
    </div>
  );
}

const CheckoutForm = memo(CheckoutFormComponent);

export default CheckoutForm;

CheckoutForm.whyDidYouRender = true;
