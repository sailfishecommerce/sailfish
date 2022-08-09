import { PropsWithChildren } from "react";
import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";

import LayoutWrapper from "./LayoutWrapper";
import useLoading from "@/hooks/useLoading";
import Header from "@/components/Header";

const Footer = dynamic(() => import("@/components/Footer"));
const LoadingBar = dynamic(() => import("@/components/Loader/loadingBar"));

interface Applayout {
  title: string;
}

export default function Applayout({
  children,
  title,
}: PropsWithChildren<Applayout>) {
  const { loading } = useLoading();

  return (
    <LayoutWrapper>
      <Script strategy="beforeInteractive" id="truconversionScript">{`
        var _tip = _tip || [];
        (function(d,s,id){
            var js, tjs = d.getElementsByTagName(s)[0];
            if(d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.async = true;
            js.src = d.location.protocol + '//app.truconversion.com/ti-js/19189/ae4b0.js';
            tjs.parentNode.insertBefore(js, tjs);
        }(document, 'script', 'ti-js'));                       
      `}</Script>

      <Head>
        <title>{title} | Sailfish</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css"
        />
        <script
          src="https://en.trustmate.io/api/widget/4420c1ed-e3a7-47c2-b6a2-2d7386a819da/script"
          defer
        ></script>
        <script
          src="https://en.trustmate.io/api/widget/01739a85-4698-4d4c-90d5-876048fba847/script"
          defer
        ></script>
      </Head>
      {loading && <LoadingBar />}
      <Header />
      {children}
      <div id="4420c1ed-e3a7-47c2-b6a2-2d7386a819da"></div>
      <div id="01739a85-4698-4d4c-90d5-876048fba847"></div>
      <Footer />
    </LayoutWrapper>
  );
}

Applayout.whyDidYouRender = true;
