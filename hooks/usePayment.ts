import swellClientInit from "@/lib/config";

const inputClasses = { base: "form-control StripeElement" };

export default function usePayment() {
  const { swell, initializeSwell } = swellClientInit();

  initializeSwell();

  async function createStripeSeparateCardElements(
    cardNumberElementId: string,
    cardExpiryElementId: string,
    cardCVCElementId: string
  ) {
    return await swell.payment.createElements({
      card: {
        separateElements: true,
        cardNumber: {
          elementId: cardNumberElementId,
          options: {
            classes: inputClasses,
            placeholder: "Credit Card Number",
            showIcon: true,
            iconStyle: "solid",
          },
        },
        cardExpiry: {
          elementId: cardExpiryElementId,
          options: {
            classes: inputClasses,
          },
        },
        cardCvc: {
          elementId: cardCVCElementId,
          options: {
            classes: inputClasses,
          },
        },
        onChange: (event: any) => {
          console.log("onChange", event);
          if (event.complete) {
            console.log("all fields field", event);
          }
          let displayError: HTMLElement | any =
            document.getElementById("card-errors");
          if (event.error) {
            displayError.textContent = event.error.message;
          } else {
            displayError.textContent = "";
          }
        },
        onReady: (event: any) => {
          // optional, called when the Element is fully rendered
          return console.log("onReady", event);
        },
        onFocus: (event: any) => {
          // optional, called when the Element gains focus
          return console.log("onFocused", event);
        },
        onBlur: (event: any) => {
          // optional, called when the Element loses focus
          return console.log("onBlur", event);
        },
        onEscape: (event: any) => {
          // optional, called when the escape key is pressed within an Element
        },
        onClick: (event: any) => {
          // optional, called when the Element is clicked
          console.log("onSuccess", event);
        },
        onSuccess: (result: any) => {
          // optional, called on card payment success
          console.log("result", result);
        },
        onError: (error: any) => {
          // optional, called on card payment error
          console.log("error", error);
        },
      },
    });
  }

  async function tokenizePayment() {
    return await swell.payment.tokenize({
      card: {
        onError: (err: any) => {
          console.log("error tokenizePayment", err);
          return err;
        },
        onSuccess: (ev: any) => {
          console.log("erv success", ev);
          return ev;
        },
      },
    });
  }

  async function submitUserOrder() {
    return await swell.cart.submitOrder();
  }

  return {
    createStripeSeparateCardElements,
    tokenizePayment,
    submitUserOrder,
  };
}
