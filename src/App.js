import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Frontpage from "./pages/Frontpage";
import Webshop from "./pages/Webshop";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Basket from "./pages/Basket";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AboutSubPage from "./pages/AboutSubPage";
import BookDetails from "./pages/BookDetails";
import BlogDetails from "./pages/BlogDetails";
import Search from "./pages/Search";
import Order from "./pages/Order";
import Forfatter from "./pages/Forfatter";

function App() {
  const [siteData, setSiteData] = useState({
    title: "Ulven og Uglen",
    basketContent: JSON.parse(localStorage.getItem("basketUlvenOgUglen")),
    navigationIsOpen: false,
    bog: [],
    searchString: "",
    blogindlg: [],
    forfatter: [],
  });

  useEffect(() => {
    const podsToFetch = [
      "bog",
      "blogindlg",
      "forfatter",
      "social_medie",
      "om_forlag_underside",
      "global_side",
      "hvad_er_fantasy",
    ];
    podsToFetch.map((podName) => {
      fetch(
        `https://sarahfrederiksen.dk/kea/ulvenoguglen/wordpress/wp-json/wp/v2/${podName}?per_page=100`
      )
        .then((res) => res.json())
        .then((res) => {
          setSiteData((prev) => {
            prev[podName] = res;
            return { ...prev };
          });
        });
      return null;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "basketUlvenOgUglen",
      JSON.stringify(siteData.basketContent)
    );
  }, [siteData]);

  function findPageInfo(page) {
    let info;
    siteData.global_side.map((side) => {
      if (side.title.rendered === page) {
        info = { ...side };
      }
      return null;
    });
    return info;
  }

  function loadSearch(searchFor) {
    setSiteData((prev) => {
      siteData.searchString = searchFor;
      return { ...prev };
    });
    // window.location.assign(
    //   `/kea/ulvenoguglen/search?s=${siteData.searchString}`
    // );
    window.location.assign(`/search?s=${siteData.searchString}`);
  }
  function addToBasket(e, bog) {
    // Adding and removing class for animation
    e.target.classList.add("adding");
    e.target.innerText = "Lagt i kurv 🗸";
    setTimeout(() => {
      e.target.classList.remove("adding");
      e.target.innerText = "Læg i kurv";
    }, 1000);
    // copy basket, if it isn't empty
    let newBasket = [];
    let isInBasket = -1;
    if (siteData.basketContent !== [] && siteData.basketContent !== null) {
      newBasket = [...siteData.basketContent];
      isInBasket = siteData.basketContent.findIndex(
        (bookToCheck) => bookToCheck.isbn === bog.isbn
      );
    }
    if (isInBasket === -1) {
      //if the book isn't already in the basket, add it
      newBasket.push({ ...bog, amount: 1 });
    } else {
      newBasket.map((bookToCheck) => {
        if (bookToCheck.isbn === bog.isbn) {
          bookToCheck.amount += 1;
        }
        return bookToCheck;
      });
    }
    setSiteData((prev) => {
      prev.basketContent = newBasket;
      return { ...prev };
    });
  }
  function removeFromBasket(bog) {
    const itemToRemove = siteData.basketContent.findIndex(
      (bookToCheck) => bookToCheck.isbn === bog.isbn
    );
    siteData.basketContent.splice(itemToRemove, 1);
    setSiteData((prev) => {
      return { ...prev };
    });
  }
  function updateAmountInBasket(bog, action) {
    const nextBasket = siteData.basketContent.map((book) => {
      if (book.id === bog.id) {
        if (action === "+") {
          book.amount += 1;
        } else if (action === "-") {
          book.amount -= 1;
        }
      }
      return book;
    });
    setSiteData((prev) => {
      prev.basketContent = nextBasket;
      return { ...prev };
    });
  }
  function clearBasket() {
    setSiteData((prev) => {
      prev.basketContent = [];
      return { ...prev };
    });
  }

  return (
    // <Router>
    <Router basename="/kea/ulvenoguglen">
      <div className="App">
        {/* Generel content set up: HEADER + MAIN CONTENT pr ROUTE + FOOTER */}
        <Header
          props={siteData}
          setSiteData={setSiteData}
          loadSearch={loadSearch}
        ></Header>
        <main>
          <Switch>
            {/* Frontpage */}
            <Route
              path="/"
              exact
              render={() => (
                <Frontpage
                  frontpage={
                    siteData.global_side !== undefined
                      ? findPageInfo("Sider")
                      : null
                  }
                  books={siteData.bog !== undefined ? siteData.bog : null}
                  blog={
                    siteData.blogindlg !== undefined ? siteData.blogindlg : null
                  }
                  social_medie={
                    siteData.social_medie !== undefined
                      ? siteData.social_medie
                      : null
                  }
                  addToBasket={addToBasket}
                />
              )}
            />
            {/* Webshop */}
            <Route
              path="/webshop"
              exact
              render={() => (
                <Webshop
                  bog={siteData.bog !== undefined ? siteData.bog : {}}
                  siteData={siteData}
                  addToBasket={addToBasket}
                />
              )}
            />

            {/* Book Details */}
            <Route
              path="/webshop/details"
              exact
              render={() => (
                <BookDetails siteData={siteData} addToBasket={addToBasket} />
              )}
            />
            {/* Blog */}
            <Route
              path="/blog"
              exact
              render={() => <Blog props={siteData} />}
            />

            {/* Blog Details */}
            <Route
              path="/blog/details"
              exact
              render={() => <BlogDetails siteData={siteData} />}
            />

            {/* About */}
            <Route
              path="/about"
              exact
              render={() => (
                <About
                  about={
                    siteData.global_side !== undefined
                      ? findPageInfo("Sider")
                      : null
                  }
                />
              )}
            />
            {siteData.om_forlag_underside !== undefined
              ? siteData.om_forlag_underside.map((underside) => {
                  return (
                    <Route
                      key={underside.id}
                      path={`/about/${underside.slug}`}
                      exact
                      render={() => (
                        <AboutSubPage
                          props={siteData.om_forlag_underside}
                          siteData={siteData}
                        />
                      )}
                    />
                  );
                })
              : null}

            {/* Forfatter */}
            <Route
              path="/forfatter"
              exact
              render={() => <Forfatter siteData={siteData} />}
            />

            {/* Basket */}
            <Route
              path="/basket"
              exact
              render={() => (
                <Basket
                  siteData={siteData}
                  removeFromBasket={removeFromBasket}
                  updateAmountInBasket={updateAmountInBasket}
                />
              )}
            />

            {/* Order */}
            <Route
              path="/bestil"
              exact
              render={() => (
                <Order
                  siteData={siteData}
                  clearBasket={clearBasket}
                  setSiteData={setSiteData}
                />
              )}
            />
            {/* Search results */}
            <Route
              path={`/search`}
              render={() => (
                <Search siteData={siteData} addToBasket={addToBasket} />
              )}
            />
          </Switch>
        </main>
        <Footer siteData={siteData}></Footer>
      </div>
    </Router>
  );
}

export default App;
