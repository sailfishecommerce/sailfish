import { Formik } from "formik";

import checkoutFormContent from "@/json/checkout-form.json";
import { checkoutFormSchema } from "./CheckoutFormSchema";
import { displayFormElement } from "./FormElement";
import { useAppDispatch } from "@/hooks/useRedux";
import { AddressInputGroup } from "@/components";
import { accordionButtonStyle } from "@/lib/single-Checkout";
import { updatePaymentForm } from "@/redux/payment-slice";
import useShippingPayment from "@/hooks/useShippingPayment";

interface ShippingCheckoutFormProps {
  formStages: {
    stage1: boolean;
    shippingForm: null | any;
    stage2: boolean;
  };
  setFormStages: any;
}

export default function ShippingCheckoutForm({
  formStages,
  setFormStages,
}: ShippingCheckoutFormProps): JSX.Element {
  const accordion = accordionButtonStyle(formStages);
  const { formValues } = useShippingPayment();
  const dispatch = useAppDispatch();

  return (
    <div className="accordion-item">
      <h2 className="h6 pt-1 pb-3 mb-3 accordion-header">
        <a
          className={accordion.shippingHead}
          href="#form1"
          data-bs-toggle="collapse"
        >
          <span className="badge-custom me-2">1</span>
          Shipping address
        </a>
      </h2>
      <div
        className={accordion.shippingBody}
        id="form1"
        data-bs-parent="#shipping-form"
      >
        <div className="accordion-body">
          <Formik
            initialValues={formValues}
            validationSchema={checkoutFormSchema}
            onSubmit={(values, { setSubmitting }) => {
              setFormStages({
                ...formStages,
                shippingForm: values,
                stage1: true,
              });
              setSubmitting(false);
              dispatch(updatePaymentForm({ form: values, completed: true }));
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <div>
                  {checkoutFormContent.personalDetails.content.map(
                    (formRow, index) => (
                      <div key={index} className="row">
                        {formRow.map((formInput, index) => (
                          <div key={index} className="col-sm-6">
                            {displayFormElement(formInput, formik)}
                          </div>
                        ))}
                      </div>
                    )
                  )}
                  <AddressInputGroup formik={formik} />
                </div>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="btn btn-outline-primary d-flex mt-3 mb-2 mx-auto font-bold"
                >
                  Proceed
                </button>
              </form>
            )}
          </Formik>
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
