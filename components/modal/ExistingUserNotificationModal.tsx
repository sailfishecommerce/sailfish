import { useRouter } from "next/router";

import Image from "@/components/Image";
import AppModal from "@/components/modal/AppModal";
import useModal from "@/hooks/useModal";
import { useAppDispatch } from "@/hooks/useRedux";
import { toggleAuthModal } from "@/redux/ui-slice";
import { modalType } from "@/types";

function ModalHeader() {
  return (
    <div>
      <h5 className="text-center text-danger mt-2 mx-auto mb-0">
        A user exist with this email
      </h5>
    </div>
  );
}

interface Props extends modalType {
  data: string | null;
}

export default function ExistingUserNotificationModal({
  show,
  onHide,
  data,
}: Props) {
  const router = useRouter();
  const { onHideModal } = useModal();
  const dispatch = useAppDispatch();

  function forgotPassword() {
    onHideModal();
    router.push("/account-password-recovery");
  }

  function loginHandler() {
    onHideModal();
    dispatch(toggleAuthModal());
  }

  return (
    <AppModal show={show} onHide={onHide} header={<ModalHeader />}>
      <div className="d-flex align-items-center mx-auto justify-content-center mb-1">
        <h6 className="text-center mb-0 me-1">
          Hello, thanks for shopping with us
        </h6>
        <Image
          src="/shopping-bag.png"
          alt="shopping bag"
          height={40}
          width={40}
        />
      </div>
      <h6 className="text-center">
        A user with the email address{" "}
        <span className="text-decoration-underline fw-bold">{data} </span>{" "}
        already exist
      </h6>
      <p className="text-center">
        Please
        <a
          onClick={loginHandler}
          className="btn-link fw-bold text-decoration-underline ms-1 me-1 cursor-pointer"
        >
          login
        </a>
        with this email to continue with your payment
      </p>
      <p className="text-center">
        <a
          onClick={forgotPassword}
          className="btn-link fw-bold text-decoration-underline cursor-pointer"
        >
          Forgot password ?
        </a>
      </p>
    </AppModal>
  );
}
