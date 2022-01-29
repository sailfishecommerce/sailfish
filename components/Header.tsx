import { memo } from "react";

import Topbar from "@/components/Topbar";
import Nav from "@/components/Nav";
import styles from "@/styles/ui.module.css";

function HeaderComponent() {
  return (
    <header className={`${styles.header} shadow-sm w-100`}>
      <Topbar />
      <Nav />
    </header>
  );
}

const Header = memo(HeaderComponent);

export default Header;

Header.whyDidYouRender = true;
