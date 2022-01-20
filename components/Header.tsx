import { memo } from "react";
import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import TopHeaderSlider from "@/components/Carousel/TopHeaderSlider";

function HeaderComponent() {
  return (
    <header className="shadow-sm w-100">
      <Topbar support="00123-456-789" topbarBgColor="#373F50">
        <TopHeaderSlider />
      </Topbar>
      <Nav navBgColor="white" local />
    </header>
  );
}

const Header = memo(HeaderComponent);

export default Header;
Header.whyDidYouRender = true;
