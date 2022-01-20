import { useAppSelector } from "@/hooks/useRedux";

export default function useShippingPayment() {
  const { userDetail } = useAppSelector((state) => state.auth);
  const { paymentForm }: any = useAppSelector((state) => state.payment);

  const formValues = {
    firstName: paymentForm
      ? paymentForm.firstName
      : userDetail
      ? userDetail.firstName
      : "",
    lastName: paymentForm
      ? paymentForm.lastName
      : userDetail
      ? userDetail.lastName
      : "",
    email: paymentForm ? paymentForm.email : userDetail ? userDetail.email : "",
    companyName: paymentForm ? paymentForm.companyName : "",
    country: paymentForm ? paymentForm.country : "",
    address1: paymentForm ? paymentForm.address1 : "",
    state: paymentForm ? paymentForm.state : "",
    city: paymentForm ? paymentForm.city : "",
    zip: paymentForm ? paymentForm.zip : "",
    address2: paymentForm ? paymentForm.address2 : "",
  };

  return {
    formValues,
  };
}
