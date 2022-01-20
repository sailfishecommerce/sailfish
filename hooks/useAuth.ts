import useAccount from "@/hooks/useAccount";

import useToast from "./useToast";
import { toggleAuthModal } from "@/redux/ui-slice";
import { useAppDispatch } from "@/hooks/useRedux";
import { authorizeError, authorizeUser, logout } from "@/redux/auth-slice";
import useLoading from "./useLoading";
import useVbout from "./useVbout";

export default function useAuth() {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccessful, hasError } = useToast();
  const { updateLoadingState } = useLoading();
  const { addNewUserToList } = useVbout();

  const { loginUser, logoutUser, signedUserDetails, createUserAccount } =
    useAccount();

  async function signIn(values: any, formik: any, notModal?: boolean) {
    const toastId = isLoading();
    updateLoadingState();
    loginUser(values)
      .then((response) => {
        if (response) {
          isSuccessful(toastId, `Welcome back, ${values.email}`);

          formik.resetForm();
          formik.setSubmitting(false);
          dispatch(authorizeUser(response));
          updateLoadingState();
          !notModal && dispatch(toggleAuthModal());
        } else {
          hasError(toastId, "login not successful");
          formik.setSubmitting(false);
          updateLoadingState();
        }
      })
      .catch((error) => {
        hasError(toastId, error?.message);
        dispatch(authorizeError());
        formik.setSubmitting(false);
        updateLoadingState();
      });
  }

  async function signUp(values: any, formik: any, notModal?: boolean) {
    const toastId = isLoading();
    addNewUserToList(values.email);
    updateLoadingState();
    createUserAccount(values)
      .then((response) => {
        if (response?.email.code === "UNIQUE") {
          hasError(toastId, `${values.email} already exists `);
          updateLoadingState();
        } else {
          isSuccessful(toastId, `${values.email}, sign up successful`);
          dispatch(authorizeUser(response));
          formik.resetForm();
          updateLoadingState();

          !notModal && dispatch(toggleAuthModal());
        }
        formik.setSubmitting(false);
      })
      .catch((error) => {
        hasError(toastId, error?.message);
        dispatch(authorizeError());
        formik.setSubmitting(false);
        updateLoadingState();
      });
  }

  async function userLogout() {
    const toastId = isLoading();
    updateLoadingState();
    logoutUser()
      .then((response) => {
        if (response?.success) {
          dispatch(logout());
          updateLoadingState();
          isSuccessful(toastId, "logout successful");
        } else {
          hasError(toastId, "unable to logout user");
          updateLoadingState();
        }
      })
      .catch((err) => {
        hasError(toastId, err?.message);
        updateLoadingState();
      });
  }

  async function getUserDetails() {
    return await signedUserDetails();
  }

  return {
    signIn,
    signUp,
    userLogout,
    getUserDetails,
  };
}
