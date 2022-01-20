/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, MutableRefObject } from "react";

import useStripeElement from "@/hooks/useStripeElement";
import { Button } from "@/components/UIElement";
import SpinnerRipple from "@/components/spinnerLoader";
import styles from "@/styles/ui.module.css";

interface PaymentInputType {
  inputRef: MutableRefObject<null>;
}

function PaymentInput({ inputRef }: PaymentInputType): JSX.Element {
  return (
    <div className="mb-0 col-sm-12">
      <div ref={inputRef} id="card-element-id"></div>
    </div>
  );
}

interface StripePaymentMethodType {
  makePaymentHandler: () => void;
  loading: boolean;
}

export default function StripePaymentMethod({
  makePaymentHandler,
  loading,
}: StripePaymentMethodType) {
  useStripeElement();
  const inputRef = useRef(null);
  const disableButton = inputRef === null ? true : false;

  return (
    <div className="row px-0 d-flex flex-column">
      <div className="d-flex mx-auto justify-content-center">
        {inputRef === null && <SpinnerRipple />}
      </div>
      <PaymentInput inputRef={inputRef} />
      <div className="col-4 mx-auto mt-3">
        <Button
          onClick={makePaymentHandler}
          disable={disableButton}
          className={`${styles.uiElement} btn-outline-primary d-block w-100 mt-0`}
          text="Submit"
          loading={loading}
        />
      </div>
      <style jsx>
        {`
          button.btn {
            position: relative;
          }

          .loading {
            margin-left: 35px;
          }
        `}
      </style>
    </div>
  );
}
