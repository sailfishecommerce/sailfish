import { useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/router";

import usePayment from "./usePayment";
import useSwellCart from "./useSwellCart";
import { useAuth, useToast, useAccount, useCart } from "@/hooks";
import { sendProductReview, updateSubmittedOrder } from "@/redux/payment-slice";
import { updateCart } from "@/redux/cart-slice";
import useVbout from "@/hooks/useVbout";
import useModal from "@/hooks/useModal";
import { vboutOrderData } from "@/lib/vbout";

export default function useProcessPayment() {
  const router = useRouter();
  const { tokenizePayment, submitUserOrder } = usePayment();
  const { getUserDetails } = useAuth();
  const { onShowModal } = useModal();

  const { getACart } = useSwellCart();
  const { cart }: any = useCart();
  const { updateUserBillingInfo, createUserAddresstAtCheckout } = useAccount();
  const dispatch = useAppDispatch();
  const [loadingState, setLoadingState] = useState(false);
  const { createVboutOrder } = useVbout();
  const { isLoading, isSuccessful, hasError } = useToast();

  function processPayment(data: any, loading: any) {
    function vboutOrder(order: any) {
      return createVboutOrder(vboutOrderData(cart, order));
    }
    setLoadingState(true);
    tokenizePayment()
      .then((tokenPaymentResponse) => {
        console.log("tokenPaymentResponse", tokenPaymentResponse);
        if (!tokenPaymentResponse?.code) {
          getACart()
            .then((response) => {
              console.log("response makePayment", response);
              updateUserBillingInfo(data, response.billing.card?.token)
                .then((response) => {
                  console.log("response userBilling", response);
                  submitUserOrder()
                    .then((response: any) => {
                      console.log("submitOrder", response);
                      if (response.paid) {
                        setLoadingState(false);
                        dispatch(sendProductReview(true));
                        vboutOrder(response);
                        isSuccessful(loading, "payment successful");
                        dispatch(
                          updateSubmittedOrder({
                            account: response?.account,
                            orderNumber: response?.number,
                            products: response?.items,
                          })
                        );
                        router.push("/checkout-complete");
                        dispatch(updateCart(null));
                      }
                      return response;
                    })
                    .catch((error) => {
                      console.log("error submitUserOrder", error);
                      hasError(loading, error?.message);
                    });
                })
                .catch((error) => {
                  console.log("updateUserBillingInfo error", error);
                  hasError(loading, error?.message);
                });
            })
            .catch((error) => {
              hasError(loading, error?.message);
            });
        } else {
          hasError(loading, tokenPaymentResponse?.message);
          setLoadingState(false);
        }
      })
      .catch((err) => {
        console.log("error makePayment", err);
        hasError(loading, err?.message);
      });
  }

  async function makePayment(data: any) {
    console.log("cart.accountId", cart?.accountId, "cart", cart);
    const loading = isLoading();
    getUserDetails().then((response) => {
      console.log("response getUserDetails", response);
      if (response === null) {
        createUserAddresstAtCheckout(data)
          .then((response) => {
            console.log("createUserAddresstAtCheckout", response);
            if (response.email.code === "UNIQUE") {
              hasError(
                loading,
                "you have an existing account with us, please login"
              );
              onShowModal(
                "CHECKOUT_NOTIFICATION_MODAL",
                response.email.fields.email
              );
            } else {
              processPayment(data, loading);
            }
          })
          .catch((err) => {
            console.log("err createUserAddresstAtCheckout", err?.message);
          });
      } else {
        processPayment(data, loading);
      }
    });
  }

  return {
    makePayment,
    loadingState,
  };
}
