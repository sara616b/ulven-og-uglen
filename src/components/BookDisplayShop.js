import { Link } from "react-router-dom";

export default function BookDisplayShop({ book: bog, addToBasket }) {
  const authors =
    bog.forfatter.length > 50
      ? `${bog.forfatter.substring(0, 40)}...`
      : bog.forfatter;
  return (
    <div className="bog-element">
      <div className="background">
        <Link to={`/webshop/details?titel=${bog.slug}`}>
          <div className="content">
            <div className="image-holder">
              <img
                className="forsidebillede"
                src={bog.forsidebillede.guid}
                alt={`Forside på ${bog.titel}`}
              />
            </div>
            <div className="info">
              <h3 className="titel">{bog.titel}</h3>
              <p className="forfatter">af {authors}</p>
              <p className="pris">{bog.pris},- kr</p>
            </div>
          </div>
        </Link>
        <button
          onClick={() => {
            addToBasket(bog);
          }}
          className="cta-contrast"
        >
          Læg i kurv
        </button>
      </div>
    </div>
  );
}
