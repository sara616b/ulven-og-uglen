import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import BookDisplayShop from "../components/BookDisplayShop";
import { Link, useLocation } from "react-router-dom";

export default function BookDetails({ siteData, addToBasket }) {
  const [bog, setBog] = useState({});
  const [otherBooks, setOtherBooks] = useState([]);
  useEffect(() => {
    const findBookSlugInURL = new URLSearchParams(window.location.search).get(
      "titel"
    );
    siteData.bog.map((bog) => {
      if (bog.slug === findBookSlugInURL) {
        setBog({ ...bog });
        const bookSuggestions = [];
        const sugISBNS = bog.relaterede_boger.split(",");
        siteData.bog.map((book) => {
          sugISBNS.map((number) => {
            if (book.isbn === number) {
              bookSuggestions.push({ ...book });
            }
            return null;
          });
          return null;
        });
        setOtherBooks(bookSuggestions);
      }
      return null;
    });
  }, [siteData.bog, useLocation()]);
  return (
    <div className="max-width">
      <Breadcrumbs
        links={[
          { link: "/", text: "Forside" },
          { link: "/webshop", text: "Webshop" },
          { link: `/webshop/details?titel=${bog.slug}`, text: bog.titel },
        ]}
      />
      {bog !== {} ? (
        <div className="book-details-holder">
          <div className="content">
            <div className="upper-holder">
              <div className="image-holder">
                <img
                  className="forsidebillede"
                  src={
                    bog.forsidebillede !== undefined
                      ? bog.forsidebillede.guid
                      : ""
                  }
                  alt={`Forside på ${bog.titel}`}
                />
              </div>
              <div className="info">
                <h3 className="titel">
                  {bog.titel !== undefined ? bog.titel : ""}
                </h3>
                <Link to={`/search?s=${bog.forfatter}`}>
                  <p className="forfatter">
                    af {bog.forfatter !== undefined ? bog.forfatter : ""}
                  </p>
                </Link>
                <p className="pris">
                  {bog.pris !== undefined ? bog.pris : ""},- kr
                </p>
                <button
                  onClick={(e) => {
                    addToBasket(e, bog);
                  }}
                  className="cta-contrast"
                >
                  Læg i kurv
                </button>
                <div className="small">
                  <p className="format">
                    Format: {bog.format !== undefined ? bog.format : ""}
                  </p>
                  {bog.serie !== undefined && bog.serie !== "" && (
                    <p className="serie">Serie: {bog.serie}</p>
                  )}
                  <p className="sider">
                    {bog.sideantal !== undefined ? bog.sideantal : ""} sider
                  </p>
                </div>
              </div>
            </div>
            <p className="beskrivelse">
              <strong>Beskrivelse</strong>
              <br />
              {bog.beskrivelse !== undefined ? bog.beskrivelse : ""}
            </p>
          </div>
          <div>
            <h2>Lignende bøger...</h2>
            <div className="other-books">
              {otherBooks.map((suggestion) => {
                return (
                  <BookDisplayShop
                    book={suggestion}
                    addToBasket={addToBasket}
                    key={suggestion.isbn}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        "Bog indlæses..."
      )}
    </div>
  );
}
