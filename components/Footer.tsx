/* eslint-disable @next/next/no-img-element */

import BottomTab from "./BottomTab";
import FooterBottomSection from "./FooterBottomSection";
import FooterTopSection from "./FooterTopSection";

interface FooterProps {
  topSectionBgColor: string;
  bottomSectionBgColor: string;
}
export default function Footer({
  topSectionBgColor,
  bottomSectionBgColor,
}: FooterProps) {
  return (
    <footer className="footer w-100">
      <FooterTopSection topSectionBgColor={topSectionBgColor} />
      <FooterBottomSection bottomSectionBgColor={bottomSectionBgColor} />
      <BottomTab />
    </footer>
  );
}

Footer.whyDidYouRender = true;
