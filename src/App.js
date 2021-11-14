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

function App() {
  const [siteData, setSiteData] = useState({
    title: "Ulven og Uglen",
  });

  useEffect(() => {
    const podsToFetch = ["bog"];
    podsToFetch.map((podName) => {
      fetch(
        `http://sarahfrederiksen.dk/kea/ulvenoguglen/wordpress/wp-json/wp/v2/${podName}`
      )
        .then((res) => res.json())
        .then((res) => {
          setSiteData((prev) => {
            prev[podName] = res;
            return { ...prev };
          });
        });
    });
  }, []);
  console.log(siteData);

  return (
    <Router
    // basename="/kea/ulvenoguglen"
    >
      <div className="App">
        {/* Generel content set up: HEADER + MAIN CONTENT pr ROUTE + FOOTER */}
        <Header title={siteData.title}></Header>
        <main>
          <Switch>
            {/* Frontpage */}
            <Route path="/" exact render={() => <Frontpage />} />
            {/* Webshop */}
            <Route
              path="/webshop"
              render={() => (
                <Webshop bog={siteData.bog !== undefined ? siteData.bog : {}} />
              )}
            />
            {/* Blog */}
            <Route path="/blog" render={() => <Blog />} />
            {/* About */}
            <Route path="/about" render={() => <About />} />
            {/* Basket */}
            <Route path="/basket" render={() => <Basket />} />
          </Switch>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
