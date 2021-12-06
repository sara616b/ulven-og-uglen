import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Input from "./Input";

export default function Navigation({ props, setSiteData, loadSearch }) {
  const whenToChangeBurgerMenu = 750;
  const aboutNav = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [urlDisplayed, setUrlDisplay] = useState();
  const [subNavOpen, setSubNavOpen] = useState({
    omForlag: false,
  });
  const [aboutNavLocation, setAboutNavLocation] = useState();
  const [amountInBasket, setAmountInBasket] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    if (aboutNav !== null) {
      if (aboutNav.current !== undefined && aboutNav.current !== null) {
        setAboutNavLocation(
          aboutNav.current.offsetLeft + aboutNav.current.clientWidth / 2 - 7
        );
      }
    }
  }, []);

  useEffect(() => {
    let amountInBasketUpdated = 0;
    if (props.basketContent !== null) {
      props.basketContent.map((bog) => {
        amountInBasketUpdated += bog.amount;
        return null;
      });
    }
    setAmountInBasket(amountInBasketUpdated);
  }, [props]);

  useEffect(() => {
    setUrlDisplay(window.location.href.indexOf("about"));
  }, [useLocation()]);

  function toggleNavigation(isNavigationOpen) {
    setSiteData((prev) => {
      prev["navigationIsOpen"] = !isNavigationOpen;
      return { ...prev };
    });
  }

  function toggleSubNavigation(navName, isOpen) {
    setSubNavOpen((prev) => {
      prev[navName] = !isOpen;
      return { ...prev };
    });
  }

  function handleResize() {
    setWindowWidth(window.innerWidth);
    if (aboutNav !== null) {
      if (aboutNav.current !== undefined && aboutNav.current !== null) {
        setAboutNavLocation(
          aboutNav.current.offsetLeft + aboutNav.current.clientWidth / 2 - 7
        );
      }
    }
  }

  return (
    <div>
      <div
        className={`${
          !props.navigationIsOpen ? "nav-closed" : ""
        } navigation-line`}
      >
        <div
          className={`${
            props.navigationIsOpen && windowWidth < whenToChangeBurgerMenu
              ? "content-mobile"
              : "content-web contentMobil"
          } content`}
        >
          {(props.navigationIsOpen || windowWidth > whenToChangeBurgerMenu) && (
            <div
              className={
                props.navigationIsOpen && windowWidth < whenToChangeBurgerMenu
                  ? "nav-mobile Buger"
                  : "nav-web"
              }
            >
              <Link
                to="/webshop"
                className={
                  window.location.href.includes("/webshop") ? "chosen" : ""
                }
              >
                <button>Webshop</button>
              </Link>
              <Link
                to="/blog"
                className={
                  window.location.href.includes("/blog") ? "chosen" : ""
                }
              >
                <button>Blog</button>
              </Link>
              <div>
                <div>
                  <Link
                    to="/about"
                    className={
                      window.location.href.includes("/about") ? "chosen" : ""
                    }
                    ref={aboutNav}
                  >
                    <button>Om Forlaget</button>
                  </Link>

                  {windowWidth < whenToChangeBurgerMenu ? (
                    <button
                      onClick={() =>
                        toggleSubNavigation("omForlag", subNavOpen.omForlag)
                      }
                      className={`${
                        subNavOpen.omForlag ? "open" : "closed"
                      } nav-sub-arrow`}
                    >
                      ^
                    </button>
                  ) : null}
                </div>
                {(windowWidth < whenToChangeBurgerMenu &&
                  subNavOpen.omForlag) ||
                (windowWidth > whenToChangeBurgerMenu &&
                  urlDisplayed !== -1) ? (
                  <div className="nav-subpages">
                    <div className="content">
                      {windowWidth > whenToChangeBurgerMenu ? (
                        <div
                          className="nav-arrow"
                          style={{
                            left: `${aboutNavLocation}px`,
                          }}
                        ></div>
                      ) : null}

                      {props.om_forlag_underside !== undefined
                        ? props.om_forlag_underside.map((underside) => {
                            return (
                              <Link
                                key={underside.id}
                                to={`/about/${underside.slug}`}
                                className={
                                  window.location.href.includes(underside.slug)
                                    ? "chosen"
                                    : ""
                                }
                              >
                                <button>{underside.title.rendered}</button>
                              </Link>
                            );
                          })
                        : null}
                    </div>
                  </div>
                ) : null}
              </div>
              <Link to="/basket">
                <button className="cta-contrast kurv-cta">
                  Gå til kurv{" "}
                  {amountInBasket !== 0 ? `(${amountInBasket})` : ""}
                  <svg
                    id="kurv-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                  >
                    <g id="Shop_kurv_sort" data-name="Shop kurv sort">
                      <polygon points="31.5 35.5 37.36 35.5 45.5 22.5 40.5 21.5 31.5 35.5" />
                      <polygon points="70.5 35.5 64.64 35.5 56.5 22.5 61.5 21.5 70.5 35.5" />
                      <path d="M51,40.34H17.43V52.07h6.75L29.5,76.5H71.62l5.15-24.43h7.68V40.34ZM40.73,72.2H36.5V55.5h4.23Zm8,0H44.5V55.5h4.23Zm8,0H52.5V55.5h4.23Zm8,0H60.5V55.5h4.23Z" />
                    </g>
                  </svg>
                </button>
              </Link>
              <div className="search">
                <Input
                  id="search"
                  label=""
                  type="text"
                  placeholder="Søg..."
                  value={props.searchString}
                  onkeypress={(e) => {
                    if (e.code === "Enter") {
                      window.location.assign(`/search?s=${props.searchString}`);
                    }
                  }}
                  onChange={(e) => {
                    setSiteData((prev) => {
                      props.searchString = e.target.value;
                      return { ...prev };
                    });
                  }}
                />
                <Link
                  className="search-button"
                  to={`/search?s=${props.searchString}`}
                >
                  <svg
                    id="search-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                  >
                    <g id="search-icon" data-name="Søg ikon sort">
                      <path d="M59.5,54.5a25,25,0,1,0-6.14,5.81L77.61,84.56l6-6Zm-20,3a18,18,0,1,1,18-18A18,18,0,0,1,39.5,57.5Z" />
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          )}
          <div className="nav-logo">
            <Link to="/">
              <svg
                id="logo-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 353 284"
              >
                <g id="_2_sort_logo_copy" data-name="2 sort logo copy">
                  <g id="Layer_14_copy" data-name="Layer 14 copy">
                    <path d="M132.78,172.34a1,1,0,0,0,1.66-.54c.32-1.89-.17-5.65-.37-11.8a12.89,12.89,0,0,0-.7-4.2c-.42-1.19-.94-2-1.3-2.8-.59-1.38-1.73-2.94-4-6-2.55-3.46-3.21-4.06-3-5,.44-1.93,4-2.81,6-3,4.42-.42,8,1.77,10,3a53.84,53.84,0,0,1,8,6c.85.8,2.64,2.61,4,3,2.08.59,3.7-.3,6-1,1.58-.48,2.72-.65,7-1,5.2-.42,6.79-.63,10,0h0a75.81,75.81,0,0,0,11.43,3.74,4.64,4.64,0,0,0,3.27-.45,3.59,3.59,0,0,0,.85-.67A24.62,24.62,0,0,1,202.86,145l.14,0c3.38-.84,6.81-1.65,10,0a5.58,5.58,0,0,1,3,3c.91,2.81-1.76,5.74-2,6-1.53,1.64-2.45,1.2-4,3a9.44,9.44,0,0,0-2,4c-.57,2.53.48,3,0,6-.25,1.58-.57,1.62-1,4-.38,2.13-.56,3.22,0,4,.83,1.15,2.72,1.29,4,1,1.56-.35,1.93-1.26,4-3,2.63-2.22,3-1.56,6-4a25.74,25.74,0,0,0,4-4,12.07,12.07,0,0,0,2-3c.95-2.39.1-3.88,0-8a42.48,42.48,0,0,1,.25-4.76c.16-2.3.47-8.35,0-27-.32-12.79-.55-13.22,0-16a47.22,47.22,0,0,1,6-15c1.3-2.18,3.86-5.46,9-12,2.34-3,6.52-6.12,9-9,3.8-4.41,4.41-6.57,4-8-.69-2.4-6.47-.53-11,0a8.28,8.28,0,0,1-7-2c-1.72-1.3-.22-4.3,1-7,1.4-3.13,1.46-2.93,3-6,2-4,1.16-6.55,1-10-.1-2.09.49-11.1-3-12-1.75-.45-3.37.35-10,8-8.58,9.89-13.87,14.83-14,15-6.77,8.39-7.54,8.08-11,10-4.74,2.63-8.44,1.88-11,2-10.06.44-12.64-1.13-18,1-3.93,1.56-4,3.17-11,10-5.11,5-4.86,4.8-9,9-6.79,6.87-7.13,9.29-13,14-2.53,2-4,4.35-11,7-3.88,1.47-7.35,2.53-13,5-7.44,3.24-9,5.3-9,6,.11,1.57,1.64,1.71,8,5,4.67,2.41,8,2.62,9,5,1.26,3,.52,7.39-3,14-.41.77-1.14,2.23-2.65,5.14a66,66,0,0,0-3.39,7.08A42.08,42.08,0,0,0,115,155c0,.51,0,0,2.66,2.67a4.73,4.73,0,0,1,.58.68c.64.89,1.85,2.24,6.76,6.65,1.22,1.09,1,1,4,4A45.71,45.71,0,0,1,132.78,172.34Z" />
                    <path d="M116.07,219.21c-.07,8.58-.07,5.94,0,11.46a4.73,4.73,0,0,1,0,.65,26.69,26.69,0,0,0,.15,6.35,4.75,4.75,0,0,0,.88,2.32h0c2.6,3.51,9.57,1.91,19.18,2.24,8,.27,12.77,1.64,13.82-.24.53-.94.12-2.2-2-6-3.21-5.76-4.24-8.17-6-11-1.89-3.05-3.5-7.42-7-16-2-5-2.73-7-5.07-9-.3-.25-2.54-1.51-7-4-2.83-1.58-4.27-2.37-5-2-.91.46-2.07,1.83-2,8,.08,6.48.28,7.86,0,11" />
                    <path d="M204.07,209c-1.41,1.72-2.14,3.63-3.37,6.57-.29.7-.63,1.43-.63,1.43-1.46,3.19-1.8,3.18-3,6-2.19,5.17-1.26,4.71-3,7a48.35,48.35,0,0,0-4,6,8.74,8.74,0,0,0-1,3,4,4,0,0,0,0,2c.46,1.07,2.4,1.68,8.18,1.24,6.36-.49,9.54-.73,11-2,2.29-2,3.24-6.28,4-15,.12-1.43.26-3,.54-4.89,1.06-7.2,1.93-12.24,4.46-17.11.44-.86,1.35-2.5.75-3.24s-2.69-.1-3,0c-1.9.64-3.23.66-6,3a13.47,13.47,0,0,0-3,3C204,209,204.51,208.47,204.07,209Z" />
                  </g>
                  <g id="Layer_15_copy" data-name="Layer 15 copy">
                    <path d="M349.07,18.1c-.9-.25-2.87,4.17-3.78,6.22-2.3,5.16-2.87,8.39-4,11.88-1.22,3.77-2.86,6.68-6.15,12.5A176.54,176.54,0,0,1,323.88,66C312.15,82.38,313.6,81.53,308.14,88.7,300.36,98.93,293.86,105.36,283,116c-14.95,14.77-14.38,12.26-28.61,26.5-8,8-16.55,15.54-24.27,23.83-.44.47-4.92,4.15-13.89,11.5-3.89,3.19-6.47,5.24-9.37,4.59-2.73-.61-4.77-3.37-5.44-5.87-.75-2.8.62-3.76,1.79-9.83,1.27-6.58.07-7.58,1.8-9.84s3.48-2.1,5.87-5.44c.81-1.14,2.22-3.11,1.57-4.18-.79-1.31-4.21-.54-5.65-.22a23.24,23.24,0,0,0-9.38,4.59c-4.46,3.74-4.73,6.67-7.33,6.8-1.59.07-1.76-1-5.55-3.05a34.18,34.18,0,0,0-8.37-3.15,27.69,27.69,0,0,0-7.74-1c-3.1.07-5.45.71-9.27,1.76-5.42,1.49-6,2.27-7.85,1.82-1.52-.36-1.92-1.07-6.17-5.19-3.51-3.39-5.3-5.11-6.85-5.92-3.77-2-8.5-2.38-9.16-1.06-.38.76.65,2,2.66,4.35,3.11,3.66,4.39,3.88,5.44,5.87.85,1.61.38,2.17.41,7.8,0,6,.58,7.17.24,12-.29,4.26-.47,6.41-1.68,7-2.95.42-7.38-4-11-7.47-8.38-8-12.56-12-13-12.53-7.07-8.87-15.73-16.34-23.1-24.95-13.11-15.29-12.72-12.75-26.5-28.62-10-11.48-16-18.39-22.94-29.18-4.89-7.58-3.51-6.62-13.94-23.89A176.28,176.28,0,0,1,15.86,35C13,29,11.61,26,10.7,22.1,9.84,18.53,9.52,15.28,7.62,10,6.87,7.84,5.25,3.28,4.34,3.46,3.14,3.69,3.83,12,4,13.35c.29,3.28.64,4.41,1.71,10.68,1.22,7.18.93,6.73,1.71,10.68a88.54,88.54,0,0,0,3.07,12.15c1.8,5.34,2.71,8,4.54,10.79a29.71,29.71,0,0,1,4,7.23c.65,1.83,1.44,4.09.51,5-1.43,1.37-6.58-1-7.06-.27-.33.5,2,1.75,4.13,3,1.86,1.09,2.5.7,4.18,1.57,2.07,1.08,2,2.16,4.76,5.14,3.23,3.54,3.4,3.66,3.34,5.08a4.43,4.43,0,0,1-4.4,4.08c-2.63.13-3.83-.72-4.24-.16-.25.34-.73.67,1.31,2.88s4.81,3.72,4.75,5.13-6.55,1.21-6.49,3.29c0,.69,2.42,3.63,11.71,8.23,7.4,3.67,11.82,5.41,11.82,5.41,3.66,1.44,6.33,2.3,6.9,4.51a3.82,3.82,0,0,1-.84,3.51c-1.24,1.27-2.79.44-5.7,1.2-2.34.6-5.21,2.14-5.09,3.34s4.09,2.14,6.28,2.36c3.87.39,4.93-.75,7.07.27s3.77,3.36,3.34,5.09c-.19.78-.73,1-2.94,2.71-3,2.3-4.54,3.47-4.4,4.08.27,1.13,3.91,0,7.69,2.42a7.9,7.9,0,0,1,3.4,3.67c.9,2.26-.33,3.24.52,5,1.05,2.14,2.38,2.57,4.75,5.14l5.44,5.87c3.4,3.67,5.07,4.72,8.89,8.12,2.09,1.87,4.15,5,8.2,7.39,2.4,1.41,3.62,1.85,15.33,6.25,10.51,4,9.5,3.6,10.46,3.94,9.46,3.42,11.55,2.84,15.38,4.84,4.59,2.4,6.13,5.26,8,8.62l.08.16c3.21,6.52,3.47,7.12,4.59,9.37,3.35,6.75,3.65,6.79,4.6,9.38,1.93,5.26.79,5.28,2.5,8.59,1.56,3,3.05,4,5.32,8.69,1.07,2.18,1.34,3.17,1.25,4.3-.12,1.67-.93,2.42-3,5.54a51.42,51.42,0,0,0-3.78,6.22,40,40,0,0,0-2.36,6.28c-.91,2.86-1.44,4.58-.9,4.92.38.24,1.07-.33,4.35-2.66,2.62-1.86,3.08-2.14,3.62-2,1.72.49,1.91,4.68,1.93,5,.13,3.63-1.45,6-1,6.33.79.48,4.21-6,7.29-5.38,1.45.29,2.29,2.05,2.71,2.94,1.15,2.39.21,3.66,1.15,7.12.39,1.45.94,3.48,2,3.61,1.63.22,3.54-4.36,3.72-4.81,1.07-2.6.84-4,2.37-6.28.72-1.08,1.35-2,2.2-2,1.83,0,2.47,4.43,4.08,4.4.54,0,.91-.54,3-4.13,1.94-3.35,2.27-4,3-4.13,1.75-.24,2.88,3.3,4.13,3s1.88-3.56,1-6.34c-.78-2.34-2.09-2.37-3.35-5.08-1-2.24-.35-2.68-1.19-5.7-1.33-4.78-2.84-4.67-2.56-7.18.25-2.22,1.38-3.25,3.78-6.22,3-3.75,3.18-3.87,6-9.68s3.06-6.46,5.41-11.82,2.35-5.05,4.57-8.32,4-6.07,8.8-8.15c4-1.7,5.34-1.69,15-4.37,1-.28,0,0,10.73-3.13,12-3.49,13.27-3.83,15.77-5.06a54.14,54.14,0,0,0,9.43-6c4.07-3.1,5.81-4,9.48-7.42l5.87-5.44c2.57-2.37,3.93-2.7,5.14-4.75,1-1.66-.17-2.73.89-4.92a8,8,0,0,1,3.67-3.4c4-2.07,7.5-.71,7.86-1.82.19-.6-1.23-1.88-4.08-4.4-2.07-1.84-2.58-2.14-2.72-2.94-.29-1.75,1.57-4,3.72-4.81s3.19.36,7.07.27c2.2-.05,6.2-.53,6.44-1.87.22-1.18-2.52-2.94-4.81-3.72-2.85-1-4.46-.28-5.6-1.63a3.87,3.87,0,0,1-.57-3.56c.75-2.17,3.48-2.82,7.23-4,0,0,4.54-1.4,12.2-4.49,9.62-3.87,12.24-6.62,12.31-7.31.22-2.07-6.27-2.36-6.22-3.77s2.94-2.72,5.14-4.76,1.74-2.41,1.52-2.77c-.36-.59-1.63.17-4.24-.17a4.43,4.43,0,0,1-4.08-4.4c.05-1.42.23-1.53,3.73-4.81,2.94-2.76,3-3.84,5.13-4.75,1.75-.75,2.35-.31,4.3-1.25,2.19-1.08,4.63-2.14,4.34-2.67-.42-.78-5.74,1.2-7.06-.27-.86-.95.1-3.14.89-4.92a29.72,29.72,0,0,1,4.52-6.9c2-2.62,3.14-5.22,5.35-10.41a88.1,88.1,0,0,0,4-11.88c1.08-3.88.76-3.45,2.53-10.51,1.55-6.18,2-7.28,2.53-10.52C348.92,26.63,350.25,18.42,349.07,18.1ZM158.21,178.47a6,6,0,1,1,.33-8.48A6,6,0,0,1,158.21,178.47Zm32.51,1.25a6,6,0,1,1,.32-8.48A6,6,0,0,1,190.72,179.72Z" />
                  </g>
                </g>
              </svg>
              <button>Ulven og Uglen</button>
            </Link>
          </div>
          {windowWidth < whenToChangeBurgerMenu && (
            <button
              onClick={() => toggleNavigation(props.navigationIsOpen)}
              className="burger-menu-icon"
            >
              {props.navigationIsOpen ? "X" : "☰"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
