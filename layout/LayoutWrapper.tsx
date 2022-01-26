import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import Head from "next/head";

import useCart from "@/hooks/useCart";
import useScroll from "@/hooks/useScroll";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Reward from "@/components/Rewards";
import { toggleAuthModal } from "@/redux/ui-slice";
import useLoading from "@/hooks/useLoading";
import LayoutMetatag from "./LayoutMetatag";
import "react-toastify/dist/ReactToastify.css";
import useModal from "@/hooks/useModal";
import displayAppModal from "@/lib/displayAppModal";

const SlideCart = dynamic(() => import("../components/SlideCart"));
const NextNProgress = dynamic(() => import("../components/Nprogress"));
const LoadingBar = dynamic(() => import("../components/loadingBar"));
const SpinnerOverlay = dynamic(() => import("../components/SpinnerOverlay"));
const AuthModal = dynamic(() => import("../components/modal/AuthModal"));
const QuickViewModal = dynamic(
  () => import("../components/modal/QuickViewModal")
);

export default function LayoutWrapper({ children }: PropsWithChildren<{}>) {
  const { toggleCart, slideCart } = useCart();
  const { modal, onHideModal } = useModal();
  const { scroll } = useScroll();
  const UI = useAppSelector((state) => state.UI);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.checkout);
  const loadingData = useLoading();

  const loadingState = loadingData.loading;

  const showPointer = scroll > 450 ? true : false;

  function toggleAuthModalHandler() {
    dispatch(toggleAuthModal());
  }

  return (
    <div>
      <Head>
        <link
          rel="preconnect"
          href="https://czt5ma7jlj.algolia.net"
          crossOrigin="true"
        />
      </Head>
      <LayoutMetatag />
      <div data-aos="fade-up" id="head" />
      {slideCart && <SlideCart toggle={toggleCart} />}
      {UI?.quickViewModal?.active && (
        <QuickViewModal product={UI.quickViewModal} />
      )}
      {UI?.displayAuthModal && (
        <AuthModal onHide={toggleAuthModalHandler} show={UI.displayAuthModal} />
      )}
      {modal && displayAppModal(modal, onHideModal)}
      {loading && <SpinnerOverlay />}
      {loadingState && <LoadingBar />}
      <NextNProgress color="red" options={{ showSpinner: false }} />
      <ToastContainer />

      <div className="content position-relative h-100">{children}</div>
      <div className="position-relative sailfish-reward-widget">
        <Reward />
      </div>
      {showPointer && (
        <a
          href="#head"
          data-aos="fade-right-up"
          className="goUp position-fixed d-flex"
        >
          <i className="fas fa-arrow-circle-up"></i>
        </a>
      )}

      <style jsx>
        {`
          .goUp {
            font-size: 25px;
            right: 20px;
            bottom: 20px;
            z-index: 1000;
          }

          .goUp:hover {
            color: red;
            background-color: white;
          }
          .goUp:hover i {
            color: red;
          }

          .goUp i {
            position: fixed;
            right: 20px;
            z-index: 200;
            bottom: 20px;
          }
        `}
      </style>
    </div>
  );
}

LayoutWrapper.whyDidYouRender = true;
