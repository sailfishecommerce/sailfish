import { useState } from "react";
import { Formik } from "formik";

import { useAccount, useLoading } from "@/hooks";
import Applayout from "@/layout/Applayout";
import { passwordRecoverySchema } from "@/components/AuthSchema";
import { displayFormElement } from "@/components/FormElement";
import passwordResetForm from "@/json/password-reset.json";

type stateType = { status: any; email?: string };

export default function AccountPasswordRecovery() {
  const { forgotPassword } = useAccount();
  const [recoveryStatus, setRecoveryStatus] = useState<null | stateType>(null);
  const { updateLoadingState } = useLoading();
  console.log("recoveryStatus", recoveryStatus);

  return (
    <Applayout title="Recover your password with ease">
      <div className="container py-4 py-lg-5 my-4">
        {recoveryStatus?.email && (
          <div
            data-aos="zoom-in-up"
            className="alert bg-danger text-white text-center col-8 mb-5 mx-auto"
          >
            Reset password link has been sent to{" "}
            <span className="fw-bold">{recoveryStatus?.email}</span>, please
            check your e-mail
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <h2 className="h3 mb-4">Forgot your password?</h2>
            <p className="fs-md">
              Change your password in three easy steps. This helps to keep your
              new password secure.
            </p>
            <ol className="list-unstyled fs-md">
              <li>
                <span className="text-primary me-2">1.</span>
                Fill in your email address below.
              </li>
              <li>
                <span className="text-primary me-2">2.</span>
                We&#39;ll email you a reset link
              </li>
              <li>
                <span className="text-primary me-2">3.</span>
                Click on the reset link to reset your password
              </li>
            </ol>
            <div className="card py-2 mt-4">
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={passwordRecoverySchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  console.log("values", values);
                  updateLoadingState();
                  forgotPassword(values.email)
                    .then((response) => {
                      console.log("response forgotPassword", response);
                      updateLoadingState();
                      setRecoveryStatus({
                        status: response,
                        email: values.email,
                      });
                      resetForm();
                    })
                    .catch((error) => {
                      console.log("error forgotPassword", error);
                      setRecoveryStatus({
                        status: error,
                      });
                      updateLoadingState();
                      resetForm();
                    });
                  setSubmitting(false);
                }}
              >
                {(formik) => (
                  <form
                    onSubmit={formik.handleSubmit}
                    className="card-body needs-validation"
                    noValidate
                  >
                    {passwordResetForm.recover.map((formInput) => (
                      <div key={formInput.name} className="col-12">
                        {displayFormElement(formInput, formik)}
                      </div>
                    ))}
                    <button
                      disabled={formik.isSubmitting}
                      className="btn btn-primary"
                      type="submit"
                    >
                      Get new password
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
