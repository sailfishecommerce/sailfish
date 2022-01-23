import AppModal from "@/components/modal/AppModal";
import SignupForm from "../SignupForm";
import SigninForm from "../SigninForm";
import { modalType } from "@/types";
import authData from "@/json/auth-modal.json";

function AuthHeader() {
  return (
    <ul className="nav nav-tabs card-header-tabs" role="tablist">
      {authData.map((content) => (
        <li key={content.href} className="nav-item">
          <a
            className={content.className}
            href={content.href}
            data-bs-toggle="tab"
            role="tab"
            aria-selected={content.selected}
          >
            <i className={content.icon}></i>
            {content.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function AuthModal({ show, onHide }: modalType) {
  return (
    <AppModal show={show} onHide={onHide} header={<AuthHeader />}>
      <SigninForm />
      <SignupForm />
    </AppModal>
  );
}
