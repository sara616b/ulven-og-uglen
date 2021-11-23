import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "./Input";

export default function Navigation({ props, setSiteData }) {
  const whenToChangeBurgerMenu = 630;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [urlDisplayed, setUrlDisplay] = useState();
  const [subNavOpen, setSubNavOpen] = useState({
    omForlag: false,
  });

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

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
              : "content-web"
          } content`}
        >
          <div className="nav-logo">
            <Link to="/">
              <button>Ulven og Uglen</button>
            </Link>
          </div>
          {(props.navigationIsOpen || windowWidth > whenToChangeBurgerMenu) && (
            <div
              className={
                props.navigationIsOpen && windowWidth < whenToChangeBurgerMenu
                  ? "nav-mobile"
                  : "nav-web"
              }
            >
              <Link to="/webshop">
                <button>Webshop</button>
              </Link>
              <Link to="/blog">
                <button>Blog</button>
              </Link>
              <div>
                <div>
                  <Link to="/about">
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
                        <div className="nav-arrow"></div>
                      ) : null}
                      {props.om_forlag_underside !== undefined
                        ? props.om_forlag_underside.map((underside) => {
                            return (
                              <Link
                                key={underside.id}
                                to={`/about/${underside.slug}`}
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
                <button>Kurv</button>
              </Link>
              <div className="search">
                <Input id="search" label="" type="text" placeholder="Søg..." />
                <button
                  onClick={() => {
                    console.log("Trying to search");
                  }}
                >
                  Søg
                </button>
              </div>
            </div>
          )}
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
