import { Modal } from "react-bootstrap";

import SignupForm from "../SignupForm";
import SigninForm from "../SigninForm";
import { modalType } from "@/types";

export default function AuthModal({ show, onHide }: modalType) {
  return (
    <Modal show={show} onHide={onHide} role="dialog">
      <Modal.Header className="bg-secondary" closeButton>
        <ul className="nav nav-tabs card-header-tabs" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link fw-medium active"
              href="#signin-tab"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="true"
            >
              <i className="ci-unlocked me-2 mt-n1"></i>
              Sign in
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link fw-medium"
              href="#signup-tab"
              data-bs-toggle="tab"
              role="tab"
              aria-selected="false"
            >
              <i className="ci-user me-2 mt-n1"></i>Sign up
            </a>
          </li>
        </ul>
      </Modal.Header>
      <Modal.Body className="tab-content py-4">
        <SigninForm />
        <SignupForm />
      </Modal.Body>
    </Modal>
  );
}
