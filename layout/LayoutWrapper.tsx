/* eslint-disable react-hooks/exhaustive-deps */
import { PropsWithChildren, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";

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

const SlideCart = dynamic(() => import("../components/Cart/SlideCart"));
const NextNProgress = dynamic(() => import("../components/Loader/Nprogress"));
const LoadingBar = dynamic(() => import("../components/Loader/loadingBar"));
const SpinnerOverlay = dynamic(() => import("../components/Loader/SpinnerOverlay"));
const AuthModal = dynamic(() => import("../components/Modal/AuthModal"));
const QuickViewModal = dynamic(
  () => import("../components/Modal/QuickViewModal")
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
      <LayoutMetatag />
      <Script
        type="text/javascript"
        src="node_modules/default-passive-events/dist/index.js"
        strategy="afterInteractive"
      />
      <Head>
        <link
          href="https://CZT5MA7JLJ-dsn.algolia.net"
          rel="preconnect"
          crossOrigin="true"
        />
      </Head>
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
