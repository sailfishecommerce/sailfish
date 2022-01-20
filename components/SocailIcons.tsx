import React from "react";

export default function SocailIcons() {
  return (
    <div className="d-inline-block align-middle">
      <a
        className="btn-social bs-google me-2 mb-2"
        href="#"
        data-bs-toggle="tooltip"
        title="Sign in with Google"
      >
        <i className="ci-google"></i>
      </a>
      <a
        className="btn-social bs-facebook me-2 mb-2"
        href="#"
        data-bs-toggle="tooltip"
        title="Sign in with Facebook"
      >
        <i className="ci-facebook"></i>
      </a>
      <a
        className="btn-social bs-twitter me-2 mb-2"
        href="#"
        data-bs-toggle="tooltip"
        title="Sign in with Twitter"
      >
        <i className="ci-twitter"></i>
      </a>
    </div>
  );
}
