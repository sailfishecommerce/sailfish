import { Formik } from "formik";
import Link from "next/link";

import { useAppDispatch } from "@/hooks/useRedux";
import { signinFormSchema } from "./AuthSchema";
import authContent from "@/json/authForm.json";
import { displayFormElement } from "./FormElement";
import { useAuth } from "@/hooks";
import { toggleAuthModal } from "@/redux/ui-slice";

export default function SigninForm() {
  const { signIn } = useAuth();
  const dispatch = useAppDispatch();

  function toggleAuthmodal() {
    dispatch(toggleAuthModal());
  }
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={signinFormSchema}
      onSubmit={(values, formik) => signIn(values, formik)}
    >
      {(formik) => (
        <form
          className="needs-validation tab-pane fade show active"
          autoComplete="off"
          noValidate
          onSubmit={formik.handleSubmit}
          id="signin-tab"
        >
          {authContent.signIn.map((content, index) => (
            <div key={index} className="row">
              {displayFormElement(content, formik)}
            </div>
          ))}
          <div className="mb-3 d-flex flex-wrap justify-content-between">          
            <Link href="/account-password-recovery" passHref>
              <a onClick={toggleAuthmodal} className="fs-sm">
                Forgot password?
              </a>
            </Link>
          </div>
          <button
            className="btn btn-primary btn-shadow d-block w-100"
            type="submit"
          >
            Sign in
          </button>
        </form>
      )}
    </Formik>
  );
}
