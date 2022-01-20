import { useState } from "react";
import CheckoutPaymentMethod from "@/components/CheckoutPaymentMethod";
import ShippingCheckoutForm from "@/components/ShippingCheckoutForm";

export default function CheckoutForm() {
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
