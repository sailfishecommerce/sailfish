/* eslint-disable @next/next/no-img-element */
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import CurrencyLanguageDropdown from "@/components/CurrencyLanguageDropdown";
import styles from "@/styles/Topbar.module.css";

interface TopbarProps {
  support: string;
  topbarBgColor: string;
  children: any;
}
export default function Topbar({
  support,
  topbarBgColor,
  children,
}: TopbarProps) {
  return (
    <div className="topbar topbar-dark">
      <div className="container">
        <Dropdown
          className={`${styles.dropdown} topbar-text dropdown d-md-none`}
        >
          <Dropdown.Toggle className="topbar-link dropdown-toggle">
            Useful links
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu">
            <Dropdown.Item>
              <a className="dropdown-item" href="tel:00331697720">
                <i className="ci-support text-muted me-2"></i>
                {support}
              </a>
            </Dropdown.Item>
            <li>
              <Link href="/order-tracking" passHref>
                <a className="dropdown-item">
                  <i className="ci-location text-muted me-2"></i>
                  Order tracking
                </a>
              </Link>
            </li>
          </Dropdown.Menu>
        </Dropdown>
        <div className="topbar-text text-nowrap d-none d-md-inline-block">
          <i className="ci-support"></i>
          <span className="text-muted me-1">Support</span>
          <a className="topbar-link" href="tel:00331697720">
            {support}
          </a>
        </div>
        {children}
        <div className="ms-3 text-nowrap">
          <Link href="/order-tracking" passHref>
            <a className="topbar-link me-4 d-none d-md-inline-block">
              <i className="ci-location"></i>Order tracking
            </a>
          </Link>
          <CurrencyLanguageDropdown />
        </div>
      </div>
      <style jsx>
        {`
          .topbar.topbar-dark {
            background-color: ${topbarBgColor};
            width: 100%;
          }
          @media (max-width: 768px) {
            .topbar a.topbar-link.dropdown-toggle {
              font-size: 12px;
            }
            .topbar-text.dropdown {
              display: none;
            }
            .topbar-text {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}
