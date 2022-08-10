/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState } from "react";

import Image from "@/components/Widgets/Image";
import useCart from "@/hooks/useCart";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleAuthModal, toggleSlideCart } from "@/redux/ui-slice";
import menuLink from "@/json/menu.json";
import { useAuth } from "@/hooks";
import SearchBar from "@/components/Search/SearchBar";
import useScroll from "@/hooks/useScroll";
import useMediaQuery from "@/hooks/useMediaQuery";
import MobileCategoryList from "@/components/Category/MobileCategoryList";
import FormattedPrice from "@/lib/formatPrice";
import styles from "@/styles/ui.module.css";

const HeaderCartDropdown = dynamic(
  () => import("@/components/Header/HeaderCartDropdown")
);
const NavDropdown = dynamic(() => import("@/components/Nav/NavDropdown"));

export default function Nav() {
  const { authorized, userDetail }: any = useAppSelector((state) => state.auth);
  const { userLogout } = useAuth();
  const { useCartData } = useCart();
  const router = useRouter();
  const [toggleCollection, setToggleCollection] = useState(false);
  const { scroll } = useScroll();
  const scrollUp = Number(scroll) > 400 ? true : false;
  const navStyle = scrollUp ? "navbar-sticky navbar-stuck" : "navbar-sticky";
  const dispatch = useAppDispatch();
  const tabWidth = useMediaQuery("(max-width:768px)");
  const largerDeviceWidth = useMediaQuery("(min-width:768px)");

  const { data: cart } = useCartData();

  function toggleAuthModalHandler() {
    dispatch(toggleAuthModal());
  }

  function onCollectionMenuHandler() {
    setToggleCollection(!toggleCollection);
  }

  function toggleSlideCartMobile() {
    tabWidth && dispatch(toggleSlideCart());
  }

  return (
    <>
      <nav className={`${navStyle} ${styles.nav}`}>
        <div className="navbar navbar-expand-lg navbar-light">
          <div className="container position-relative">
            <Link href="/" passHref>
              <a className="navbar-brand d-none d-sm-block flex-shrink-0">
                <Image
                  src="/logo.webp"
                  alt="logo"
                  layout="responsive"
                  height={70}
                  width={200}
                />
              </a>
            </Link>
            <Link href="/" passHref>
              <a className="navbar-brand d-sm-none flex-shrink-0 me-2">
                <Image
                  src="/logo.webp"
                  layout="responsive"
                  alt="logo"
                  height={50}
                  width={150}
                />
              </a>
            </Link>
            {largerDeviceWidth && <SearchBar />}
            <div className="navbar-toolbar d-flex flex-shrink-0 align-items-center">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <a className="navbar-tool navbar-stuck-toggler ms-5" href="#">
                <span className="navbar-tool-tooltip">Expand menu</span>
                <div className="navbar-tool-icon-box">
                  <i className="navbar-tool-icon ci-menu"></i>
                </div>
              </a>
              {!authorized ? (
                <a
                  className="navbar-tool cursor-pointer ms-1 ms-lg-4 me-lg-2"
                  href="#"
                  onClick={toggleAuthModalHandler}
                >
                  <span className="navbar-tool-tooltip">
                    Sign-in / Sign-up{" "}
                  </span>
                  <div className="navbar-tool-icon-box">
                    <i className="navbar-tool-icon ci-user"></i>
                  </div>
                  <div className="navbar-tool-text d-flex flex-column me-2 align-items-start">
                    <small>Hello, Sign in</small>My Account
                  </div>
                </a>
              ) : (
                <a
                  onClick={userLogout}
                  href="#"
                  className="navbar-tool cursor-pointer ms-1 ms-lg-5 me-n1 me-lg-2"
                >
                  <span className="navbar-tool-tooltip">Logout</span>
                  <div className="navbar-tool-icon-box">
                    <i className="navbar-tool-icon ci-user me-5"></i>
                  </div>
                  <div className="navbar-tool-text ms-n3">
                    <small className="d-flex flex-column me-3">
                      <span>Hello,</span> <span>{userDetail.name}</span>
                    </small>
                    <p className="logout mb-0">Logout</p>
                  </div>
                </a>
              )}
              <div className="navbar-tool dropdown ms-3">
                <a
                  onClick={toggleSlideCartMobile}
                  className="navbar-tool-icon-box bg-secondary dropdown-toggle"
                >
                  {cart?.items?.length > 0 && (
                    <span className="navbar-tool-label">
                      {cart?.items?.length}
                    </span>
                  )}
                  <i className="navbar-tool-icon ci-cart"></i>
                </a>
                <div className="d-flex price-overview flex-column">
                  <small>My Cart</small>
                  <a className="navbar-tool-text">
                    {cart?.grandTotal ? (
                      <FormattedPrice price={cart?.grandTotal} />
                    ) : (
                      <FormattedPrice price={0} />
                    )}
                  </a>
                </div>
                {cart?.items.length > 0 && <HeaderCartDropdown cart={cart} />}
              </div>
            </div>
          </div>
        </div>
        <div className="navbar navbar-expand-lg navbar-light navbar-stuck-menu mt-n2 pt-0 pb-2">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarCollapse">
              {tabWidth && (
                <small className="ms-0 my-2 text-danger fw-bold">
                  Hello, {userDetail.name ? userDetail.name : "Guest"}
                </small>
              )}
              {tabWidth && <SearchBar />}
              {/*<!-- Search-->*/}
              {/* <div className="input-group d-lg-none my-3">
              <i className="ci-search position-absolute top-50 start-0 translate-middle-y text-muted fs-base ms-3"></i>
              <input
                className="form-control rounded-start"
                type="text"
                placeholder="Search for products"
              />
            </div> */}
              {/*<!-- Departments menu-->*/}
              <ul className="navbar-nav navbar-mega-nav pe-lg-2 me-lg-2">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle ps-lg-0"
                    href="#"
                    onClick={onCollectionMenuHandler}
                    data-bs-toggle="dropdown"
                  >
                    <i className="ci-view-grid me-2"></i>
                    Collections
                  </a>
                  {largerDeviceWidth ? (
                    <NavDropdown />
                  ) : (
                    !largerDeviceWidth &&
                    toggleCollection && <MobileCategoryList />
                  )}
                </li>
              </ul>
              <ul className="navbar-nav">
                {menuLink.map((menu, index) => {
                  const style = router.asPath === menu.link ? "active" : "";
                  return (
                    <li
                      key={`${menu.link}-${index}`}
                      className={`nav-item dropdown ${style}`}
                    >
                      <Link href={menu.link} passHref>
                        <a className="nav-link">{menu.name}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <style jsx>
        {`
          .navbar-sticky {
            background-color: white;
            width: 100%;
          }
          .navbar-brand.d-sm-none.flex-shrink-0.me-2 img {
            height: 50px;
            width: 100%;
          }
          .price-overview {
            width: 80px;
            margin-left: 10px;
          }
          .navbar-tool-text {
            display: flex;
            align-items: center;
            padding-left: 0px;
          }
          @media (max-width: 768px) {
            .navbar-toolbar {
              justify-content: space-between;
              width: 100%;
              margin-left: -15px;
            }
          }
        `}
      </style>
    </>
  );
}

Nav.whyDidYouRender = true;
