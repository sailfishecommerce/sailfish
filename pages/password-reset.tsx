import { Formik } from "formik";
import { useRouter } from "next/router";

import Applayout from "@/layout/Applayout";
import passwordResetForm from "@/json/password-reset.json";
import { displayFormElement } from "@/components/FormElement";
import { forgotPasswordSchema } from "@/components/AuthSchema";
import { useAccount, useLoading, useToast } from "@/hooks";

export default function AccountPasswordRecovery() {
  const router = useRouter();
  const { recoverPassword } = useAccount();
  const { isLoading, isSuccessful, hasError } = useToast();
  const { updateLoadingState } = useLoading();
  const searchParams = router.query;
  const key: string | any = searchParams.key;

  console.log("key", key);

  return (
    <Applayout title="Reset your password">
      <div className="container py-4 py-lg-5 my-4">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <h2 className="h3 mb-4">Forgot your password?</h2>
            <p className="fs-md">
              Reaset your password, ensure to fill details appropriately
            </p>
            <div className="card py-2 mt-4">
              <Formik
                initialValues={{
                  newPassword: "",
                  confirmNewPassword: "",
                }}
                validationSchema={forgotPasswordSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  const loading = isLoading();
                  updateLoadingState();
                  recoverPassword(values.newPassword, key)
                    .then((response) => {
                      console.log("response", response);
                      updateLoadingState();
                      if (response?.success) {
                        isSuccessful(loading, "Password reset successful");
                        router.push("/my-account");
                      } else {
                        hasError(loading, "error resetting password");
                      }
                    })
                    .catch((err) => {
                      console.log("err", err);
                      updateLoadingState();
                      hasError(loading, "error resetting password");
                    });
                  resetForm();
                  setSubmitting(false);
                }}
              >
                {(formik) => (
                  <form
                    onSubmit={formik.handleSubmit}
                    className="card-body needs-validation"
                    noValidate
                  >
                    <div className="row">
                      {passwordResetForm.reset.map((formInput) => (
                        <div className="col-12" key={formInput.name}>
                          {displayFormElement(formInput, formik)}
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Applayout>
  );
}
