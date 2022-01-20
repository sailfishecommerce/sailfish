import Applayout from "@/layout/Applayout";
import AccountSigninForm from "@/components/AccountSigninForm";
import AccountSignupForm from "@/components/AccountSignupForm";

export default function MyAccountPage() {
  return (
    <Applayout title="Signup | Sign in">
      <div className="container py-4 py-lg-5 my-4">
        <div className="row">
          <AccountSigninForm />
          <AccountSignupForm />
        </div>
      </div>
    </Applayout>
  );
}
