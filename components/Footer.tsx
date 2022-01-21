/* eslint-disable @next/next/no-img-element */

import { memo } from "react";
import BottomTab from "./BottomTab";
import FooterBottomSection from "./FooterBottomSection";
import FooterTopSection from "./FooterTopSection";

export default function FooterComponent() {
  return (
    <footer className="footer w-100">
      <FooterTopSection />
      <FooterBottomSection />
      <BottomTab />
    </footer>
  );
}

const Footer = memo(FooterComponent);

Footer.whyDidYouRender = true;
