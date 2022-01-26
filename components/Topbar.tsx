/* eslint-disable @next/next/no-img-element */
import { Dropdown } from "react-bootstrap";
import Link from "next/link";

import TopHeaderSlider from "@/components/Carousel/TopHeaderSlider";
import CurrencyLanguageDropdown from "@/components/CurrencyLanguageDropdown";
import styles from "@/styles/Topbar.module.css";

export default function Topbar() {
  return (
    <>
      <div className={`${styles.topbar} topbar topbar-dark`}>
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
                  00123-456-789
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
              +00331697720
            </a>
          </div>
          <TopHeaderSlider />
          <div className="ms-3 text-nowrap">
            <Link href="/order-tracking" passHref>
              <a className="topbar-link me-4 d-none d-md-inline-block">
                <i className="ci-location"></i>Order tracking
              </a>
            </Link>
            <CurrencyLanguageDropdown />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .topbar.topbar-dark {
            background-color: #373f50;
            width: 100%;
            height: 70px;
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
    </>
  );
}
