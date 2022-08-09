/* eslint-disable @next/next/no-img-element */

import { memo } from "react";

import useMediaQuery from "@/hooks/useMediaQuery";
import BottomTab from "@/components/Widgets/BottomTab";
import FooterBottomSection from "@/components/Footer/FooterBottomSection";
import FooterTopSection from "@/components/Footer/FooterTopSection";

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
