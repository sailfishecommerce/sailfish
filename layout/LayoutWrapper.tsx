import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import dynamic from "next/dynamic";

import useCart from "@/hooks/useCart";
import useScroll from "@/hooks/useScroll";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import Reward from "@/components/Rewards";
import { toggleAuthModal } from "@/redux/ui-slice";
import useLoading from "@/hooks/useLoading";
import "react-toastify/dist/ReactToastify.css";

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
        <script id="vboutTrackingCodeScript">
          {`
            var _vbset = _vbset || [];
            _vbset.push(['_account', 'VBT-88360-6048']);
            _vbset.push(['_domain', 'https://livehealthy.hk']);

            (function() {
              var vbt = document.createElement('script'); vbt.type = 'text/javascript'; vbt.async = true; 
              vbt.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'www.vbt.io/tracker?_account='+_vbset[0][1]+'&_domain='+_vbset[1][1];var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(vbt, s);
            })();
        `}
        </script>
        <meta name="robots" content="noindex" />
        <meta
          name="google-site-verification"
          content="jzOTMxF7oUbLPiv-axyDSRh7yVdltNu-gP2gKfcBIpc"
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
      {loading && <SpinnerOverlay />}
      {loadingState && <LoadingBar />}
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" color="#fe6a6a" href="/safari-pinned-tab.svg" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <NextNProgress color="red" options={{ showSpinner: false }} />
      <ToastContainer />

      <div className="content position-relative">{children}</div>
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
