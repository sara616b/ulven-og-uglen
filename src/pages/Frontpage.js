import { Link } from "react-router-dom";
import Input from "../components/Input";
import BookDisplay from "../components/BookDisplay";
import parse from "html-react-parser";

export default function Frontpage({ frontpage, books, social_medie }) {
  console.log(frontpage);
  console.log(social_medie);

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
        <div className="white-wave"></div>
        <div className="max-width">
          <div className="content">
            <div className="text">
              <div className="logo"></div>
              <h1>{frontpage[0].titel}</h1>
              <p>{frontpage[0].slogan}</p>
            </div>
            <div className="books">
              {books !== null
                ? books.map((bog) => {
                    const booksToShow =
                      frontpage[0].boger_til_splash.split(",");
                    return booksToShow.map((isbn, index) => {
                      if (isbn === bog.isbn && index < 5) {
                        return (
                          <img
                            className={`books-in-splash book${index}`}
                            src={bog.forsidebillede.guid}
                            alt="forsidebillede"
                          />
                        );
                      }
                      return null;
                    });
                  })
                : "loading"}
            </div>
            <Link to="/webshop">
              <button className="cta-contrast">Gå til webshop</button>
            </Link>
          </div>
        </div>
      </section>
      <section className="newest-books">
        <div className="max-width">
          <div className="books">
            {books !== null
              ? books.map((bog) => {
                  const booksToShow =
                    frontpage[0].ids_pa_nyeste_boger.split(",");
                  return booksToShow.map((isbn, index) => {
                    if (isbn === bog.isbn) {
                      return (
                        <BookDisplay
                          key={bog.id + index}
                          book={bog}
                        ></BookDisplay>
                      );
                    }
                    return null;
                  });
                })
              : "loading"}
          </div>
        </div>
      </section>
      <section className="book-cta">
        <div className="max-width">
          <section className="book-grid">
            {books !== null
              ? books.map((bog) => {
                  const booksToShow = frontpage[0].fremhaevede_boger.split(",");
                  return booksToShow.map((isbn, index) => {
                    if (isbn === bog.isbn && index < 4) {
                      return (
                        <BookDisplay
                          key={bog.id + index}
                          book={bog}
                        ></BookDisplay>
                      );
                    }
                    return null;
                  });
                })
              : "loading"}
          </section>
          <section className="text">
            <h2>{frontpage[0].tekst_om_boger}</h2>
            <Link to="/webshop">
              <button className="cta-contrast">Gå til webshop</button>
            </Link>
          </section>
        </div>
      </section>
      <section className="blog-cta">
        <div className="max-width">
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
        </div>
      </section>
      <section className="newsletter-cta">
        <div className="max-width">
          <div className="holder">
            <div className="content">
              <h2>{frontpage[0].nyhedsbrev_tekst}</h2>
              <form>
                <Input
                  id="email"
                  label="E-mail:"
                  type="text"
                  isRequired="true"
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  error="Venligst, indtast en valid e-mail addresse"
                  placeholder="aaa@bbb.com"
                ></Input>
                <button className="cta-contrast">Tilmeld</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="socials">
        <div className="max-width">
          <div className="holder">
            <h2>Følg os på</h2>
            <div>
              {social_medie !== null
                ? social_medie.map((some) => {
                    console.log(some);
                    return (
                      <a
                        key={some.navn}
                        className="social-media-icon"
                        href={some.link}
                      >
                        {parse(some.svg_ikon)}
                      </a>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </section>
    </section>
  ) : (
    "loading"
  );
}
