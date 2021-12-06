import { Link } from "react-router-dom";

export default function BookDisplay({ book: bog, addToBasket }) {
  const authors =
    bog.forfatter.length > 30
      ? `${bog.forfatter.substring(0, 20)}...`
      : bog.forfatter;
  return (
    <div className="bog-element">
      <div className="background">
        <Link to={`/webshop/details?titel=${bog.slug}`}>
          <div className="content">
            <img
              className="forsidebillede"
              src={bog.forsidebillede.guid}
              alt={`Forside på ${bog.titel}`}
            />
            <div className="info">
              <h3 className="titel">{bog.titel}</h3>
              <p className="forfatter">{authors}</p>
              <p className="pris">{bog.pris},- kr</p>
              <p className="beskrivelse">
                {bog.beskrivelse.substring(0, 150)} ...
              </p>
            </div>
          </div>
        </Link>
        <button
          onClick={(e) => {
            addToBasket(e, bog);
          }}
          className="cta-contrast"
        >
          Læg i kurv
        </button>
      </div>
    </div>
  );
}
