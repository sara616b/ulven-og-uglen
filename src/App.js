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

function App() {
  const [siteData, setSiteData] = useState({
    title: "Ulven og Uglen",
    basketContent: [],
    navigationIsOpen: false,
    bog: [],
  });

  useEffect(() => {
    const podsToFetch = [
      "bog",
      "blogindlg",
      "forfatter",
      "social_medie",
      "om_forlag_underside",
      "global_side",
    ];
    podsToFetch.map((podName) => {
      fetch(
        `http://sarahfrederiksen.dk/kea/ulvenoguglen/wordpress/wp-json/wp/v2/${podName}?per_page=100`
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

  function addToBasket(bog) {
    // copy basket, if it isn't empty
    let newBasket = [];
    if (siteData.basketContent !== []) {
      newBasket = [...siteData.basketContent];
    }
    const isInBasket = siteData.basketContent.findIndex(
      (bookToCheck) => bookToCheck.isbn === bog.isbn
    );
    console.log(isInBasket);
    if (isInBasket === -1) {
      //if the book isn't already in the basket, add it
      newBasket.push({ titel: bog.titel, isbn: bog.isbn, amount: 1 });
    } else {
      newBasket.map((bookToCheck) => {
        if (bookToCheck.isbn === bog.isbn) {
          bookToCheck.amount += 1;
        }
        return bookToCheck;
      });
    }
    console.log("newBasket", newBasket);

    setSiteData((prev) => {
      prev.basketContent = newBasket;
      return { ...prev };
    });
  }

  return (
    <Router
    // basename="/kea/ulvenoguglen"
    >
      <div className="App">
        {/* Generel content set up: HEADER + MAIN CONTENT pr ROUTE + FOOTER */}
        <Header props={siteData} setSiteData={setSiteData}></Header>
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
                      ? findPageInfo("Forside")
                      : null
                  }
                  books={siteData.bog !== undefined ? siteData.bog : null}
                  social_medie={
                    siteData.social_medie !== undefined
                      ? siteData.social_medie
                      : null
                  }
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
            {/* About */}
            <Route path="/about" exact render={() => <About />} />
            {siteData.om_forlag_underside !== undefined
              ? siteData.om_forlag_underside.map((underside) => {
                  return (
                    <Route
                      key={underside.id}
                      path={`/about/${underside.slug}`}
                      exact
                      render={() => <AboutSubPage props={siteData} />}
                    />
                  );
                })
              : null}
            {/* Basket */}
            <Route path="/basket" exact render={() => <Basket />} />
          </Switch>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
