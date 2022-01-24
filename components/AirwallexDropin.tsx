import { useEffect, useState, useMemo } from "react";
import {
  createElement,
  loadAirwallex,
  getElement,
  confirmPaymentIntent,
  ElementType,
} from "airwallex-payment-elements";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useToast, useLoading } from "@/hooks";

interface AirwallexDropinProps {
  intent_id: string | any;
  client_secret: string | any;
}
export default function AirwallexCard({
  intent_id,
  client_secret,
}: AirwallexDropinProps) {
  const [elementShow, setElementShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { loading, updateLoadingState } = useLoading();
  const { isLoading, isSuccessful, hasError } = useToast();

  console.log("intent_id", intent_id, "client_secret", client_secret);

  useEffect(() => {
    loadAirwallex({
      env: "demo",
      origin: window.location.origin,
      fonts: [
        {
          src: "https://checkout.airwallex.com/fonts/CircularXXWeb/CircularXXWeb-Regular.woff2",
          family: "AxLLCircular",
          weight: 400,
        },
      ],
    }).then(() => {
      createElement("card" as ElementType)?.mount("airwallexCard");
    });

    const onReady = (event: CustomEvent): void => {
      setElementShow(true);
      console.log(`Elements ready with ${JSON.stringify(event.detail)}`);
    };

    const onError = (event: CustomEvent): void => {
      const { error } = event.detail;
      setIsSubmitting(false);
      setErrorMessage(error.message ?? JSON.stringify(error));
      console.error("There is an error", error);
    };

    window.addEventListener("onReady", onReady as EventListener);
    window.addEventListener("onError", onError as EventListener);
    return () => {
      window.removeEventListener("onReady", onReady as EventListener);
      window.removeEventListener("onError", onError as EventListener);
    };
  }, []);

  useEffect(() => {
    if (loading && !isSubmitting && errorMessage.length > 0) {
      updateLoadingState();
      toast.error(errorMessage);
    }
  }, [errorMessage, isSubmitting, loading]);

  const triggerConfirm = (): void => {
    setIsSubmitting(true);
    const loading = isLoading();
    setErrorMessage("");
    const card = getElement("card");
    if (card) {
      confirmPaymentIntent({
        element: card,
        id: intent_id,
        client_secret,
        payment_method_options: {
          card: {
            auto_capture: true,
          },
        },
      })
        .then((response) => {
          console.log("response triggerConfirm", response);
          setIsSubmitting(false);
          isSuccessful(loading, "Payment successful");
          window.alert(
            `Payment Intent confirmation was successful: ${JSON.stringify(
              response
            )}`
          );
          router.push("/checkout-complete");
        })
        .catch((error) => {
          setIsSubmitting(false);
          setErrorMessage(error.message ?? JSON.stringify(error));
          console.error("There is an error", error);
          hasError(loading, error);
        });
    }
  };

  const fieldContainerStyle = useMemo(
    () => ({
      display: elementShow ? "block" : "none",
    }),
    [elementShow]
  );

  return (
    <div>
      {!elementShow && <p>Loading...</p>}
      {errorMessage.length > 0 && (
        <p
          className="alert bg-danger text-white text-center fw-bold"
          id="error"
        >
          {errorMessage}
        </p>
      )}
      <div className="field-container" style={fieldContainerStyle}>
        <div id="airwallexCard" className="form-control" />
        <button
          className="btn btn-outline-primary d-flex m-auto mt-4 mb-2"
          onClick={triggerConfirm}
          disabled={isSubmitting}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
