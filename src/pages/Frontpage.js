import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from "../components/Input";
import BookDisplay from "../components/BookDisplay";

export default function Frontpage({ frontpage, books, social_medie }) {
  console.log(frontpage);
  console.log(social_medie);

  const [inputEl, setInputEl] = useState();

  useEffect(() => {
    if (inputEl !== undefined) {
      inputEl.setSelectionRange(0, 0);
    } else return;
    setInputEl();
  }, [inputEl]);

  return frontpage !== null ? (
    <section className="frontpage">
      <section className="splash">
        <div
          className="image"
          style={{
            backgroundImage: `url(${frontpage[0].splash_billede.guid})`,
          }}
        ></div>
        <div className="overlay"></div>
        <div className="content">
          <div className="text">
            <div className="logo"></div>
            <h1>{frontpage[0].titel}</h1>
            <p>{frontpage[0].slogan}</p>
          </div>
          <div className="books">
            {books !== null
              ? books.map((bog) => {
                  const booksToShow = frontpage[0].boger_til_splash.split(",");
                  return booksToShow.map((isbn) => {
                    if (isbn === bog.isbn) {
                      return (
                        <img
                          className="books-in-splash"
                          src={bog.forsidebillede.guid}
                        />
                      );
                    }
                    return null;
                  });
                })
              : "loading"}
          </div>
        </div>
      </section>
      <section className="newest-books">
        <div className="books">
          {books !== null
            ? books.map((bog) => {
                const booksToShow = frontpage[0].ids_pa_nyeste_boger.split(",");
                return booksToShow.map((isbn) => {
                  if (isbn === bog.isbn) {
                    return <BookDisplay key={bog.id} book={bog}></BookDisplay>;
                  }
                  return null;
                });
              })
            : "loading"}
        </div>
      </section>
      <section className="book-cta">
        <section className="book-grid">
          {books !== null
            ? books.map((bog) => {
                const booksToShow = frontpage[0].fremhaevede_boger.split(",");
                return booksToShow.map((isbn) => {
                  if (isbn === bog.isbn) {
                    return <BookDisplay key={bog.id} book={bog}></BookDisplay>;
                  }
                  return null;
                });
              })
            : "loading"}
        </section>
        <section>
          <h2>{frontpage[0].tekst_om_boger}</h2>
          <Link to="/webshop">
            <button className="cta-contrast">Gå til webshop</button>
          </Link>
        </section>
      </section>
      <section className="blog-cta">
        <section>
          <h2>{frontpage[0].tekst_om_blog}</h2>
          <Link to="/blog">
            <button className="cta-contrast">Gå til bloggen</button>
          </Link>
        </section>
        <section>
          {/* {books !== null
            ? books.map((bog) => {
                const booksToShow = frontpage[0].ids_pa_nyeste_boger.split(",");
                return booksToShow.map((isbn) => {
                  if (isbn === bog.isbn) {
                    return (
                      <img
                        className="bookdisplay"
                        src={bog.forsidebillede.guid}
                      />
                    );
                  }
                });
                return null;
              })
            : "loading"} */}
        </section>
      </section>
      <section className="newsletter-cta">
        <div className="holder">
          <div className="content">
            <h2>{frontpage[0].nyhedsbrev_tekst}</h2>
            <form>
              <Input
                id="email"
                label="E-mail"
                type="text"
                isRequired="true"
                // pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$"
                error="Venligst, indtast en valid e-mail addresse"
                placeholder="aaa@bbb.com"
                setInputEl={setInputEl}
              ></Input>
              <button className="cta-contrast">Tilmeld</button>
            </form>
          </div>
        </div>
      </section>
      <section className="socials">
        <div className="holder">
          <h2>Følg os på</h2>
          <div>
            {social_medie !== null
              ? social_medie.map((some) => {
                  return (
                    <div
                      key={some.navn}
                      style={{ backgroundImage: `url(${some.ikon.guid})` }}
                      className="social-media-icon"
                    ></div>
                  );
                })
              : null}
          </div>
        </div>
      </section>
    </section>
  ) : (
    "loading"
  );
}
