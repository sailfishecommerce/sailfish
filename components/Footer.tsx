/* eslint-disable @next/next/no-img-element */

import { memo } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";
import BottomTab from "./BottomTab";
import FooterBottomSection from "./FooterBottomSection";
import FooterTopSection from "./FooterTopSection";

export default function FooterComponent() {
  const tabWidth = useMediaQuery("(max-width:768px)");

  return (
    <footer className="footer w-100">
      <FooterTopSection />
      <FooterBottomSection />
      {tabWidth ? <BottomTab /> : null}
    </footer>
  );
}

const Footer = memo(FooterComponent);

Footer.whyDidYouRender = true;
